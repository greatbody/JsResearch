//全局变量，仅此一个
var nCurrentLoc = 1;
/*
 *功能：加入一行数据到表格
 *参数： sName   姓名
 *       sEmail  E-mail
 *       sRemark 备注
 *       nLastId 上个选中项的id
 *返回值及说明：Number 插入的行的行号
 *创建人：孙瑞
 *创建时间：2013-12-04 17:11
 *修改时间：无
 *关联外部变量及类型：
 *   nCurrentLoc     全局变量
 */
function addRow(sName, sEmail, sRemark, nLastId) {
	var oTable = document.getElementById("tblEdit");
	var oRow = oTable.insertRow();
	(function() {
		var oMyRow = oRow;
		oRow.onclick = function() {
			//debugger;
			document.getElementById("tblEdit").rows(nCurrentLoc).className = "";
			oMyRow.className = "rowSelected";
			nCurrentLoc = oMyRow.rowIndex;
		}
	})();
	var oCell = oRow.insertCell(0);
	oCell.innerText = oRow.rowIndex;
	oCell = oRow.insertCell(1);
	oCell.innerText = sName;
	oCell = oRow.insertCell(2);
	oCell.innerText = sEmail;
	oCell = oRow.insertCell(3);
	oCell.innerText = sRemark;
	document.getElementById("tblEdit").rows(nLastId).className = "";
	document.getElementById("tblEdit").rows(oRow.rowIndex).className = "rowSelected";
	return oRow.rowIndex;
}

/*
 *功能：检测输入的数据是否符合要求
 *参数： sName   姓名
 *       sEmail  E-mail
 *       sRemark 备注
 *返回值及说明：Boolean
 *           True    符合要求
 *           False   不符合要求
 *创建人：孙瑞
 *创建时间：2013-12-04 17:24
 *修改时间：无
 *关联外部变量及类型：无
 */
function checkInput(sName, sEmail, sRemark) {
	if (sName == "") {
		alert("请输入姓名");
		return false;
	} else if (sEmail == "") {
		alert("请输入邮箱地址");
		return false;
	} else if (sRemark == "") {
		alert("请输入备注");
		return false;
	}
	return true;
}

/*
 *功能：根据行号删除一行
 *参数： nLine   行号
 *       oTable  表格
 *返回值及说明：Boolean
 *           True    成功删除
 *           False   删除失败
 *创建人：孙瑞
 *创建时间：2013-12-04 17:24
 *修改时间：无
 *关联外部变量及类型：无
 */
function deleteLine(oTable, nLine) {
	if (oTable.rows(nLine) == null) {
		return false;
	}
	oTable.deleteRow(nCurrentLoc);
	return true;
}

/*【】
 *功能：将表格中从nLine开始的序号都重新设置
 *参数： nLine   行号
 *       oTable  表格
 *返回值及说明：Boolean
 *           True    符合要求
 *           False   不符合要求
 *创建人：孙瑞
 *创建时间：2013-12-04 18:30
 *修改时间：无
 *关联外部变量及类型：无
 */
function orderLine(oTable, nLine) {
	for (var nIndex = nLine; nIndex < oTable.rows.length; nIndex++) {
		oTable.rows(nIndex).cells(0).innerHTML = nIndex;
	}
}

/*【】
 *功能：选中指定行，同时取消另一指定行的选定
 *参数： nLineSet  待选中的行号
 *       nLineDel  待取消选中的行号
 *       oTable  表格
 *返回值及说明：无
 *创建人：孙瑞
 *创建时间：2013-12-04 18:40
 *修改时间：无
 *关联外部变量及类型：无
 */
function selectLine(oTable, nLineSet, nLineDel) {
	if (nLineDel == -1) {
		oTable.rows(nLineSet).className = "rowSelected";
	} else {
		oTable.rows(nLineDel).className = "";
		oTable.rows(nLineSet).className = "rowSelected";
	}
}

/*
 *功能：响应按钮按下事件，添加文本框中内容
 *参数：无
 *返回值：无
 *创建人：孙瑞
 *创建时间：2013-12-04 15:51
 *修改时间：无
 */
function onBtnAddRowClick() {
	//获取输入内容
	var sName = "", sEmail = "", sRemark = "";
	sName = document.getElementById("txtName").value;
	sEmail = document.getElementById("txtEmail").value;
	sRemark = document.getElementById("txtRemark").innerHTML;
	//检测输入
	if (checkInput(sName, sEmail, sRemark) == false) {
		return;
	}
	//检测通过，开始进行加入数据的处理
	nCurrentLoc = addRow(sName, sEmail, sRemark, nCurrentLoc);
}

/*
 *功能：响应按钮按下事件，删除表格中选中行，并对序号重新处理
 *参数：无
 *返回值：无
 *创建人：孙瑞
 *创建时间：2013-12-04 16:30
 *修改时间：2013-12-04 18:40
 */
function onBtnDelRowClick() {
	var oMyTable = document.getElementById("tblEdit");
	//debugger;
	//确认nCurrentLoc不为0
	if (nCurrentLoc > 0 && oMyTable.rows(nCurrentLoc) != null) {
		//对当前的nCurrentLoc的那一行删除
		deleteLine(oMyTable, nCurrentLoc);
		//判断还剩下几行：
		if (oMyTable.rows.length == 1) {
			//只剩下一行了，即只剩下标题行了（标题的rowIndex=0）
			nCurrentLoc = 1;
		} else if (oMyTable.rows.length > 1) {
			if (oMyTable.rows(nCurrentLoc) == null) {
				//这种情况，当前nCurrentLoc指向的行不存在，说明删除的这行是最末尾行
				nCurrentLoc--;
				selectLine(oMyTable, nCurrentLoc, -1);
			} else {
				//不是最末尾行
				selectLine(oMyTable, nCurrentLoc, -1);
				//对后面的进行排序：
				orderLine(oMyTable, nCurrentLoc)
			}
		}
	}
}