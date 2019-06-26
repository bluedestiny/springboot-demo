//登录超时跳转回主页
$.ajaxSetup({
    contentType: "application/x-www-form-urlencoded;charset=utf-8",
    dataFilter: function (data, type) {
        if (data == "timeOut" || data == "[object XMLDocument]") {
            window.top.location.replace("/esearch/login.html");
            alert("登录超时,请重新登录！");
            return null;
        } else {
            return data;
        }
    }
});