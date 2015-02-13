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
this.Jia = function(nA, nB) {
    var nLocDotA = getDotLoc(nA);
    var nLocDotB = getDotLoc(nB);
    var nMax = nLocDotA > nLocDotB ? nLocDotA : nLocDotB;
    nA = nA * Math.pow(10, nMax);
    nB = nB * Math.pow(10, nMax);
    var res = nA + nB;
    res = res / (Math.pow(10, nMax));
    return res;
}
this.Jian = function(nA, nB) {
    var nLocDotA = getDotLoc(nA);
    var nLocDotB = getDotLoc(nB);
    var nMax = nLocDotA > nLocDotB ? nLocDotA : nLocDotB;
    nA = nA * Math.pow(10, nMax);
    nB = nB * Math.pow(10, nMax);
    var res = nA - nB;
    res = res / (Math.pow(10, nMax));
    return res;
}
this.Chen = function(nA, nB) {
    var nLocDotA = getDotLoc(nA);
    var nLocDotB = getDotLoc(nB);
    var nMax = nLocDotA > nLocDotB ? nLocDotA : nLocDotB;
    nA = nA * Math.pow(10, nMax);
    nB = nB * Math.pow(10, nMax);
    var res = nA * nB;
    res = res / Math.pow(10, 2 * nMax);
    return res;
}
this.Chu = function(nA, nB) {
    var nLocDotA = getDotLoc(nA);
    var nLocDotB = getDotLoc(nB);
    var nMax = nLocDotA > nLocDotB ? nLocDotA : nLocDotB;
    nA = nA * Math.pow(10, nMax);
    nB = nB * Math.pow(10, nMax);
    var res = nA / nB;
    //res = res / Math.pow(10, 2 * nMax);
    return res;
}
function getDotLoc(nNumber) {
    var nPoint = String(nNumber).indexOf(".");
    if (nPoint >= 0) {
        nPoint++;
    }
    else {
        return 0;
    }
    //接下来的nPoint表示以1为第一个字符序号的点的未知
    return String(nNumber).length - nPoint;
}