function replace(sSource, sFind) {
    sSource = String(sSource);
    var sOut = new Array();
    var nIndex = 0;
    for (nIndex = 0; nIndex < sSource.length; nIndex++) {
        if (sSource.charAt(nIndex) == sFind) { }
        else {
            sOut.push(sSource.charAt(nIndex))
        }
    }
    return sOut.join("");
}

function splitString(sSource, sFind, AllowEmpty) {
    var sArr = new Array();
    var isAllowEmpty = true;
    var nOldIndex = 0;
    sSource = String(sSource);
    var nFirstIndex = sSource.indexOf(sFind, 0);
    //如果源字符串为空或null，则返回空Array
    if (sSource == null || sSource.length == 0)
        return sArr;
    //如果分隔字符串为空或找不到分隔字符串，则返回空Array
    if (nFirstIndex == -1 || sFind == "" || sFind == null) {
        sArr.push(sArr);
        return sArr;
    }
    if (AllowEmpty == null)
        isAllowEmpty = true;
    while (nFirstIndex != -1) {
        var sTmp = sSource.substr(nOldIndex, nFirstIndex - nOldIndex);
        if (isAllowEmpty == false && sTmp == "") { }
        else {
            sArr.push(sTmp);
        }
        nOldIndex = nFirstIndex + sFind.length;
        nFirstIndex = sSource.indexOf(sFind, nOldIndex);
        if (nFirstIndex == -1) {
            var sTmpIn = sSource.substr(nOldIndex);
            if (isAllowEmpty == false && sTmpIn == "") { }
            else {
                sArr.push(sTmpIn);
            }
        }
    }
    return sArr;
}

function replaceString(sSource, sFind, sReplace) {
    return splitString(sSource, sFind, true).join(sReplace);
}

function test() {
    var k = "100,000,123.00";
    alert(replace(k, ","));
}
