var optionFactory = {
    packSelect: function(oSelect) {
        if (!oSelect) return null;
        return {
            _oSelect: oSelect,
            initSelect: function() {
                ///<summary>清空select</summary>
                this._oSelect.options.length = 0;
            },
            insertAt: function(index, text, value) {
                ///<param name="index">插入点序号</param>
                ///<param name="text">显示文本</param>
                ///<param name="value">选项值</param>
                ///<summary>在指定位置插入项，指定位置不合法时插入失败</summary>
                if (index < 0 || index > this.getLength()) {
                    //alert("向select中插入指定内容时index超限！");
                    throw new Error(44, "向select中插入指定内容时index超限！");
                }
                var oOpt = new Option();
                if (arguments.length == 1) {
                    oOpt.text = text;
                    oOpt.value = value;
                }
                switch (arguments.length) {
                    case 2:
                        {
                            oOpt.text = text;
                            oOpt.value = value;
                            break;
                        }
                    case 1:
                        {
                            oOpt.text = text;
                            oOpt.value = text;
                            break;
                        }
                    default:
                        oOpt.text = text;
                        oOpt.value = value;
                }
                this._oSelect.options.add(oOpt, index);
            },
            insertTop: function(text, value) {
                ///<param name="text">显示文本</param>
                ///<param name="value">选项值</param>
                ///<summary>在Select头部插入项</summary>
                this.insertAt(0, text, value);
            },
            insertBottom: function(text, value) {
                ///<param name="text">显示文本</param>
                ///<param name="value">选项值</param>
                ///<summary>在Select末尾插入项</summary>
                this.insertAt(this.getLength(), text, value);
            },
            insertJSON: function(json) {
                ///<param name="json">一个对象，含有键值对</param>
                if (json && json.length > 0 && json[0].text && json[0].value) {
                    for (var i = 0; i < json.length; i++) {
                        this.insertBottom(json[i].text, json[i].value);
                    }
                }
            },
            getLength: function() {
                ///<summary>返回option长度</summary>
                return this._oSelect.options.length;
            },
            getSelected: function() {
                ///<summary>返回当前select的选定项,返回的是一个对象，有text,value两个属性</summary>
                var option = this._oSelect[this._oSelect.selectedIndex];
                return { "text": option.text, "value": option.value };
            },
            selectByText: function(text) {
                ///<summary>根据文本选定值</summary>
                var options = this._oSelect;
                for (var i = 0; i < options.length; i++) {
                    if (options[i].text == text) {
                        options.selectedIndex = i;
                        return;
                    }
                }
            },
            selectByValue: function(value) {
                var options = this._oSelect;
                for (var i = 0; i < options.length; i++) {
                    if (options[i].value == value) {
                        options.selectedIndex = i;
                        return;
                    }
                }
            }
        };
    },
    packFromId: function(id) {
        var oSelect = document.getElementById(id);
        return this.packSelect(oSelect);
    }
};
$(document).ready(function() {
    var oSelectOpr = optionFactory.packSelect($("#companyList")[0]);
    oSelectOpr.insertJSON([{ "text": "Beat It", "value": "Dangerous" }, { "text": "Billie Jean", "value": "Thriller" }, { "text": "Man In The Mirror", "value": "Michael"}]);
});

function testc() {
    var oSelectOpr = optionFactory.packSelect($("#companyList")[0]);
    var t = oSelectOpr.getSelected();

}

function testIT() {
    var oSelectOpr = optionFactory.packSelect($("#companyList")[0]);
    oSelectOpr.selectByText("Billie Jean");
}

function testValue() {
    var oSelectOpr = optionFactory.packFromId("companyList");
    oSelectOpr.selectByValue("Michael");
}