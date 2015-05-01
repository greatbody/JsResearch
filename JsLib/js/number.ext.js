/**
 * 
 * @authors SunRui (sunruiyeyipeng@163.com)
 * @date    2015-04-30 17:53:18
 * @version v1.0
 */
Number.prototype.add=function(num){
	return this+num;
};

function __checkFloatParam(num, checkString) {
    if (!(typeof num == 'number' || typeof num == 'string')) {
        throw new Error("参数类型不正确");
    }
    if (typeof num == 'number' && isNaN(num)) {
        throw new Error("参数值是NaN");
    }
    if (typeof num == 'string') {
        if (checkString == true) {
            var str = num.toString().replace(/,/g, "");
            if (isNaN(str)) {
                throw new Error("参数值不是数值");
            }
        }
    }
}
function __expToFix(s) {
    if (!isNaN(s)) {
        if (s.indexOf("e") >= 0 || s.indexOf("E") >= 0) {
            var arr = s.toLowerCase().split("e");
            return __movePoint(arr[0], parseInt(arr[1]));
        }
    }
    return s;
}
function __movePointLeft(str, scale) {
    var s, s1, s2, ch, ps, sign;
    ch = '.';
    sign = '';
    s = str ? str : "";

    if (scale <= 0) return s;
    ps = s.split('.');
    s1 = ps[0] ? ps[0] : "";
    s2 = ps[1] ? ps[1] : "";
    if (s1.slice(0, 1) == '-') {
        s1 = s1.slice(1);
        sign = '-';
    }
    if (s1.length <= scale) {
        ch = "0.";
        s1 = __padLeft(s1, scale);
    }
    return sign + s1.slice(0, -scale) + ch + s1.slice(-scale) + s2;
}
/*浮点允许相关方法*/
function __padLeft(str, nSize, ch) {
    var len = 0;
    var s = str ? str : "";
    ch = ch ? ch : '0';

    len = s.length;
    while (len < nSize) {
        s = ch + s;
        len++;
    }
    return s;
}
//对浮点数的小数位进行四舍五入处理。
//参数：    num:需要处理的数字
//          fractionDigits:小数保留位，值为大于等于0的整数。
//返回：    返回截断处理后的数字。
function accRound(num, fractionDigits) {
    if (arguments.length < 1) throw new Error("参数错误");
    __checkFloatParam(num, true);

    var r = (fractionDigits != undefined && !isNaN(fractionDigits) && fractionDigits < __FRACTION_DIGITS) ? fractionDigits : __FRACTION_DIGITS;
    if (r <= 0) r = 0;

    var s, s1, s2, start, n;

    var s1 = __expToFix(num.toString().replace(/,/g, ""));
    start = s1.indexOf(".");
    s = __movePoint(s1, r);
    n = Number(s1);

    if (start >= 0) {
        s2 = Number(s1.substr(start + r + 1, 1));
        if (s2 >= 5 && n >= 0 || s2 < 5 && n < 0) {
            s = Math.ceil(s);
        }
        else {
            s = Math.floor(s);
        }
    }

    return Number(__movePoint(s.toString(), -r));
}

//解决浮点运算精度丢失问题
//参数：    num1:第一个运算值
//          num2:第二个运算值
//operation：运算符，只支持加减乘除
//fractionDigits：小数位，不能超过6位
function calcDoubleFix(num1, num2, operation, fractionDigits) {
    if (arguments.length < 3) throw new Error("参数错误");
    //3.0中通替过calcDoubleFix，因为无法明确使用情况，所以需要支持"a"+123的场景
    __checkFloatParam(num1, false);
    __checkFloatParam(num2, false);

    var n, n1, n2, s, s1, s2, ps;

    s1 = __expToFix(num1.toString().replace(/,/g, ""));
    ps = s1.split('.');
    n1 = ps[1] ? ps[1].length : 0;

    s2 = __expToFix(num2.toString().replace(/,/g, ""));
    ps = s2.split('.');
    n2 = ps[1] ? ps[1].length : 0;

    var blnNumber = !isNaN(s1) && s1 != "" && !isNaN(s2) && s2 != "";
    if (blnNumber) {
        switch (operation) {
            case '+':
                n = n1 > n2 ? n1 : n2;
                s = Number(__movePoint(s1, n)) + Number(__movePoint(s2, n));
                break;
            case '-':
                n = n1 > n2 ? n1 : n2;
                s = Number(__movePoint(s1, n)) - Number(__movePoint(s2, n));
                break;
            case '*':
                n = n1 + n2;
                s = Number(s1.replace('.', '')) * Number(s2.replace('.', ''));
                break;
            case '/':
                n = n1 - n2;
                s = Number(s1.replace('.', '')) / Number(s2.replace('.', ''));
                break;
            default:
                throw new Error("calcDoubleFix只支持加减乘除运算");
        }
        s = __movePoint(__expToFix(s.toString()), -n);
        return accRound(Number(s), fractionDigits);
    }
    else {
        switch (operation) {
            case '+':
                return num1 + num2;
            default:
                throw new Error("calcDoubleFix不支持字符串的乘除减运算");
        }
    }
}