/*
Created By Sun Rui,All Rights Reserved
Licensed To Mysoft
Under The MIT Licence
Open Source Project
*/
this.version = function() {
    return "0.0";
}
this.createdby = function() {
    return "SunRui@2014-2022";
}
this.BinaryAnd = function(a, b) {
    var res = "";
    //unfinish
}
this.num2bin = function(nNum) {
    //num 必须为整数
    var sBin = "";
    var aBins = new Array();
    var nDec = parseInt(nNum);
    if (nDec.toString().indexOf(".") > 0 || nDec < 0) return "";
    //开始转换
    while (nDec > 0) {
        sBin = (nDec % 2).toString() + sBin;
        nDec = parseInt(nDec / 2);
    }
    return sBin;
}
this.num2byte = function(nNum) {
    //num 必须为整数
    var sBin = "";
    var aBins = new Array();
    var nDec = parseInt(nNum);
    if (nDec.toString().indexOf(".") > 0 || nDec < 0) return "";
    //开始转换
    while (nDec > 0) {
        aBins.push((nDec % 2).toString());
        nDec = parseInt(nDec / 2);
    }
    return aBins.join("");
}
this.byteAnd = function(a, b) {
    var c = a & b;
    return c;
}
this.bin2dec = function(sBin) {
    var nNum = new Number();
    sBin = String(sBin);
    var nLength = sBin.length;
    if (nLength == 0) {
        return 0;
    }
    var nIndex = 0;
    for (nIndex = nLength - 1; nIndex >= 0; nIndex--) {
        if (sBin.substr(nIndex, 1) != "1" && sBin.substr(nIndex, 1) != "0") {
            return 0;
        }
        nNum += parseInt(sBin.substr(nIndex, 1)) * Math.pow(2, nLength - nIndex - 1);
    }
    return nNum;
}
