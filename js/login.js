var pass = document.getElementsByClassName("pass_input")[0];
var users = {};
var successUser = {};
$(document).ready(function() {
    // 获取 localStoage 的userinfo信息
    var local_user = window.localStorage.getItem("userinfo");
    local_user = JSON.parse(local_user);
    console.log(local_user);
    if (local_user != null) {
        $(".pass_input").val(local_user.pass);
        $(".user_input").val(local_user.name);
    }
    // 密码是否可见
    var flag = false;
    var motionLogin = document.getElementsByName("autologin")[0];

    function LoginAjax() {
        var logindata = "";
        if (motionLogin.checked) {
            logindata = {
                "autologin": "true",
                username: $(".user_input").val(),
                password: $(".pass_input").val()
            }
        } else {
            logindata = {
                username: $(".user_input").val(),
                password: $(".pass_input").val()
            }
        }
        // 登录
        $.ajax({
            url: "https://192.168.0.222:8080/car-management/user/login.action",
            type: "get",
            data: logindata,
            dataType: "jsonp", //数据类型为jsonp  
            jsonp: "jsonpCallback", //服务端用于接收callback调用的function名的参数  
            success: function(data) {
                console.log(data);
                if (data.ret == false) {
                    $(".logininfo_group").html(data.msg);
                    successUser.flag = false;
                } else {
                    $(".logininfo_group").html(data.msg);
                    successUser.flag = true;
                    window.localStorage.successUser = JSON.stringify(data);
                    window.location.href = "../index.html";
                }
            }
        })
    }
    // 点击登录按钮进行判断
    $(".login_btn").click(function() {
        LoginAjax();
    });
    //回车提交事件
    $("body").keydown(function() {
        if (event.keyCode == "13") { //keyCode=13是回车键
            console.log(this);
            LoginAjax();
        }
    });
    $("#rember").prop("checked") == false;
    // 选择下次自动登陆。存入localStorage;
    motionLogin.onclick = function() {
        if (motionLogin.checked) {
            console.log(true);
            users.name = $(".user_input").val();
            users.pass = $(".pass_input").val();
            console.log(users);
            // localStorage只支持string类型的存储。
            window.localStorage.userinfo = JSON.stringify(users);
        } else {
            console.log(false);
            window.localStorage.removeItem("userinfo");
        }
    }
})