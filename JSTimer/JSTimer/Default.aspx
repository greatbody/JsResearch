<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="Default.aspx.vb" Inherits="JSTimer._Default" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
    <title>JSTimer - SunSoft</title>
    <script src="Timer.js"></script>
</head>
<body>
    <div>
        <button onclick="onBtnBegin()">开始</button>
        <button onclick="onBtnStop()">停止</button>
    </div>
    <div>
        <span id="showtip">OriginText</span>
    </div>
</body>
</html>
