var saleDom = new ActiveXObject("Microsoft.XMLDOM");
//保存定单/合同信息，格式为：
//<es_Contract>
//		<合同字段1>xxxxx</合同字段1>
//		......
//		<dataxml entity=""s_OCDiscount"" keyname=""OCDiscountGUID"">
//			折扣列表信息 与合同编辑界面一样
//		</dataxml>
//</es_Contract>


/*------------------------------------------------------------------*/
//表单接口函数，需扩展
//1、Fill	--	表单填充
//2、GetXML --	表单取数
//3、Valid	--	表单校验
/*------------------------------------------------------------------*/

//功能：表单填充
//editableDomainList	当前步骤可编辑域
//invisibleDomainList   当前步骤不可见域
//domainXML				域XML

function Fill(editableDomainList, invisibleDomainList, domainXML) {
    var xmlDom = new ActiveXObject("Microsoft.XMLDOM");
    if (domainXML && domainXML.length > 0) {
        xmlDom.async = false;
        xmlDom.loadXML(domainXML);

        if (xmlDom.parseError.errorCode != 0)
            xmlDom = null;
    }
    else {
        xmlDom = null;
    }

    var sSaleModiApplyGUID = xmlDom.selectSingleNode("/BusinessType/Item/Domain[@name='销售变更申请GUID']").text;
    var sApproveStatus = xmlDom.selectSingleNode("/BusinessType/Item/Domain[@name='审核状态']").text;
    var sSaleGUID = xmlDom.selectSingleNode("/BusinessType/Item/Domain[@name='销售单GUID']").text;

}

//功能：表单取数
//参数：取值前的domainxml
//返回值 取值后的domainxml
function GetXML(domainXML) {
    var xmlDom = new ActiveXObject("Microsoft.XMLDOM");
    xmlDom.async = false;
    xmlDom.loadXML(domainXML);

    if (xmlDom.parseError.errorCode != 0) return "";

    xmlDom.selectSingleNode("/BusinessType/Item/Domain[@name='是否购买人变更']").text = (Form1.IsCstBg.checked) ? "1" : "0";


    return xmlDom.xml;
}

//功能：表单校验
//参数：可编辑域列表
function Valid(editableDomainList) {
    if (document.getElementById("txtSaleType").value == "合同") {
        if (Form1.IsCstBg.checked) {
            //上传一个图片文件
            var tblDocList = jQuery(appIframe3.document.getElementById("DocList"));
            var iCount = tblDocList.find("tr").length;
            var sFileName = "";
            var isAllow = 0;
            if (tblDocList.find("tr").length == 3) {
                alert("请至少上传一张图片附件");
                return false;
            }

            tblDocList.find("tr:gt(0)").each(function() {
                if (jQuery(this).find("span").attr("id") != "lblMsg") {
                    sFileName = jQuery(this).find("span").text();
                    if (sFileName.indexOf(".jpg") != -1 || sFileName.indexOf(".jpeg") != -1 || sFileName.indexOf(".bmp") != -1 || sFileName.indexOf(".png") != -1 || sFileName.indexOf(".gif") != -1) {
                        isAllow = 1;
                    }
                }
            });

            if (isAllow == 0) {
                alert("请至少上传一张图片附件");
                return false;
            }

        }
    }


    return true;
}


function GetIframeInnerHtml() {
    //获取当前页面的html代码.parentNode.parentNode.firstChild.firstChild.innerText
    return document.documentElement.innerHTML;
}

/*-------------------自定义的页面事件函数--------------------*/

//批量设置只读
function bathSetReadOnly(arrField, bValue) {
    for (var i = 0; i < arrField.length; i++) {
        if (bValue)
            eval("Form1." + arrField[i] + ".setReadOnly(true)");
        else
            eval("Form1." + arrField[i] + ".setReadOnly(false)");
    }
}

//将表单设为可编辑状态
function ProofContract() {

}

function TempSaveNoAlter(sProcessGUID) {
    return true;
}


function window.onload() {
    doOpenFile("审批相关附件", document.getElementById("txtBusinessGUID").value);
}


var WorkflowMng = {
    CurrentState: -9,
    initState: function(nState) {
        WorkflowMng.CurrentState = nState;
    },
    getState: function() {
        switch (WorkflowMng.CurrentState) {
            case -9:
                {
                    return "尚未初始化";
                }
            case -4:
                {
                    return "待发起";
                }
            case -3:
                {
                    return "草稿";
                }
            case -2:
                {
                    return "已作废";
                }
            case -1:
                {
                    return "已终止";
                }
            case 0:
                {
                    return "处理中";
                }
            case 1:
                {
                    return "已通过";
                }
            case 2:
                {
                    return "已归档";
                }
            default:
                {
                    return "未知状态";
                }
        }
    }
};
function PageLoad(sBusinessGUID, sDomainXML) {
    var xmlDom = new ActiveXObject("Microsoft.XMLDOM");
    if (sDomainXML && sDomainXML.length > 0) {
        xmlDom.async = false;
        xmlDom.loadXML(sDomainXML);

        if (xmlDom.parseError.errorCode != 0)
            return;
    }
    else {
        return;
    }
    //获取工作流审批状态
    var sResult = GetDataFromXMLHTTP("/SLXT/XSXC/XSXC_XMLHTTP.aspx", "GetLackTransApproveState", sBusinessGUID);
    var RelateDocOption = {
        Title: "相关文档",
        DocType: "缺件转签约",
        Mode: "2",
        UpFileState: (function() {
            if (sResult==""||sResult=="未审核") {
                return "Modify";
            } else {
                return "Look";
            }
        })(),
        IsAllowOpenFile: "true",
        FKGUID: sBusinessGUID
    };
    ConfigRelateDoc("appIframeWD", RelateDocOption);
    WorkflowMng.initState(parseInt(xmlDom.selectSingleNode("/BusinessType").attributes.getNamedItem("ProcessStatus").value, 10));
    alert(WorkflowMng.getState());
}
function ConfigRelateDoc(targetIframeId, option) {
    var oIframe = document.getElementById(targetIframeId);
    oIframe.src = "/Slxt/XSRZ/UpFile.aspx?Title=" + escape(option.Title) + "&DocType=" + escape(option.DocType) + "&UpFileState=" + escape(option.UpFileState) + "&FKGUID=" + escape(option.FKGUID) + "&mode=" + escape(option.Mode) + "&IsAllowOpenFile=" + escape(option.IsAllowOpenFile);
}