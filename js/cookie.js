
// 获取用户名（在cookie中获取）
function getUserName() {
    let username = getCookie("username");

    if (username) {
        // 放到span里
        $("userSpan").innerHTML = username;
        // 让div显示
        $("welcome-box").style.display = "block";
        $("login-box").style.display = "none";
    } else {
        // 2）、如果没有读取到了，那就显示login-box
        $("login-box").style.display = "block";
    }

}
// 1、获取用户名
getUserName();
// 2、给登录按钮绑定事件
$("btnLogin").onclick = function () {
    location.href = "login.html";
}

$("btnLogout").onclick = function () {
    if (confirm("您确定要注销吗？") == true) {
        // 1、删除cookie
        removeCookie("username");
        // 2、刷新页面
        location.reload();
        $("welcome-box").style.display = "none";
        $("login-box").style.display = "block";
    }
}

$("btnReg").onclick = function () {
    location.href = "reg.html";
}


function $(str) {
    return document.getElementById(str);
}