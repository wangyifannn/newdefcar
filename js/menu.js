var statusobj = [{
    value: "",
    name: "全部"
}, {
    value: 0,
    name: "已录入"
}, {
    value: 1,
    name: "已点检"
}, {
    value: 2,
    name: "已安全检查"
}, {
    value: 3,
    name: "已线束检查"
}, {
    value: 4,
    name: "已bom检查"
}, {
    value: 5,
    name: "已审核"
}, {
    value: 6,
    name: "已还车"
}];

$.ajax({
    "url": "http://localhost/car/defcar/json/menu.json",
    // "url": "https://wangyifannn.github.io/newdefcar/json/menu.json",
    "type": "get",
    "data": {},
    // "dataType": "jsonp", //数据类型为jsonp  
    // "jsonp": "jsonpCallback", //服务端用于接收callback调用的function名的参数
    "success": function(res) {
        console.log(res);
        var menuli = "";
        for (var i = 0; i < res.length; i++) {
            menuli =
                '<li class="sidebar-dropdown">' +
                '<a class="sidebar_dropdown_hover two_a" href="#"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-' + res[i].url + '"></use></svg><span>' +
                res[i].name + '</span><span class="badge">' + res[i].childrenMenus.length + '</span></a>' +
                '<div class="sidebar-submenu">' +
                '<ul class="menuli_ulli' + i + '">' +
                '</ul>' +
                '</div>' +
                '</li>';
            $("#myTab").append(menuli);
            var menuli_ulli = "";
            for (var k = 0; k < res[i].childrenMenus.length; k++) {
                var menuli_ulli_menu3li = "";
                if (res[i].childrenMenus[k].childrenMenus.length > 0) {
                    for (var j = 0; j < res[i].childrenMenus[k].childrenMenus.length; j++) {
                        menuli_ulli_menu3li += '<li class="' + res[i].childrenMenus[k].childrenMenus[j].url + '"><a href="#' + res[i].childrenMenus[k].childrenMenus[j].url + '" data-toggle="tab">' + res[i].childrenMenus[k].childrenMenus[j].name + '</a> </li>';
                    }
                    menuli_ulli += '<li class="sidebar-dropdown threeMenu">' +
                        '<a class="sidebar_dropdown_hover three_a" href="#"><span>' +
                        res[i].childrenMenus[k].name + '</span><span class="badge">' + res[i].childrenMenus[k].childrenMenus.length + '</span></a>' +
                        '<div class="sidebar-submenu">' +
                        '<ul class="menuli_ulli_menu3li' + i + '">' + menuli_ulli_menu3li + '</ul>' +
                        '</div>' +
                        '</li>';
                } else {
                    menuli_ulli += '<li class="' + res[i].childrenMenus[k].url + '"><a href="#' + res[i].childrenMenus[k].url + '" data-toggle="tab">' + res[i].childrenMenus[k].name + '</a> </li>';
                }
                $(".menuli_ulli" + i).html(menuli_ulli);
            }
        }
        $(".sidebar-dropdown > a.two_a").click(function() {
            $(".sidebar-submenu").slideUp(250);
            if ($(this).parent().hasClass("active")) {
                $(".sidebar-dropdown").removeClass("active");
                $(this).parent().removeClass("active");
            } else {
                $(".sidebar-dropdown").removeClass("active");
                $(this).next(".sidebar-submenu").slideDown(250);
                $(this).parent().addClass("active");
            }
        });

        $(".maintainLog").click(function() {
            loadLog("http://192.168.0.222:8080/car-management/log/findCarMaintainLog.action", "日志列表", "#maintainLogTable", "#toolbar_maintainLogTable");
        })
        $(".dataLog").click(function() {
            loadLog("http://192.168.0.222:8080/car-management/log/findCarSystemLog.action", "日志列表", "#sysLogTable", "#toolbar_sysLogTable");
        });
        // 车辆管理日志
        $(".manageLog").click(function() {
            loadLog("http://192.168.0.222:8080/car-management/log/findCarLog.action", "日志列表", "#carLogTable", "#toolbar_carLogTable");
        });
        // 驾驶员管理日志
        $(".approveLog").click(function() {
            loadLog("http://192.168.0.222:8080/car-management/log/findCarDriverLog.action", "日志列表", "#driverLogTable", "#toolbar_driverLogTable");
        })
        $(".carTypeIn").click(function() {
            $(this).children().css({ color: "#1B6DDA" });
            $(this).siblings().children().css({ color: "white" });
        })
        $("#toggle-sidebar").click(function() {
            $(".page-wrapper").toggleClass("toggled");
        });
        // 点击选中切换页面并改变面包屑导航路径
        $(".sidebar-submenu ul li").click(function() {
            if ($(this).parent().parent().parent().hasClass("threeMenu")) {
                var ss = '<li>' + $(this).parent().parent().siblings().children()[0].innerText + "/" + '</li><li>' + this.innerText + '</li>';
                changBread(this.parentNode.parentNode.parentNode.children[0].innerText, ss);
            } else if ($(this).hasClass("threeMenu")) {
                changBread(this.parentNode.parentNode.parentNode.children[0].children[1].innerText, "车辆录入");
            } else {
                changBread(this.parentNode.parentNode.parentNode.children[0].children[1].innerText, this.innerText);

            }
            var sib = $(this).parent().parent().parent().siblings();
            for (var i = 0; i < sib.length; i++) {
                $(sib[i]).removeClass("active");
                if (sib[i].children[1]) {
                    var li2 = sib[i].children[1].children[0];
                    for (var j = 0; j < li2.children.length; j++) {
                        $(li2.children[j]).removeClass("active");
                    }
                }
            }
        });

        //驾驶员管理
        $(".driverList").click(function() {
            $("#driverTypeIn").removeClass("active");
            $("#driverList").addClass("active");
            loadDriverList();
            console.log($(this).attr("class"));
            window.location.hash = $(this).attr("class");
        });
        // 车辆录入
        $(".carList").click(function() {
            window.location.hash = $(this).attr("class");
        });
        // 车辆列表
        $(".carTypeIn").click(function() {});
        // 接车点检
        $(".carCheck").click(function() {
            creatForm(carCheckInfo, "#carCheck form", "carCheck_btn");
        });
        // 安全检查列表
        $(".safe_table").click(function() {
            loadCarList(JSON.stringify({
                "vSn": null
            }), "safeTable");
        });
        // 保险录入
        $(".insuranceTypeIn").click(function() {
            loadCarList(JSON.stringify({
                "vSn": null
            }), "safeTable");
        });
        $(".carList").click(function() {
            loadCarList(JSON.stringify({
                "vSn": null
            }), "carListtable");
        });
        $(".maintainList").click(function() {
            $('#maintainList').bootstrapTable('destroy');
            window.location.hash = "pagenum=1";
            loadMaintainList(1, 10);
        });
        $(".rights").click(function() {
            loadRightsList();
            $("#rights_list").show();
            $("#add_rights_form").hide();
        });
        $(".role").click(function() {
            loadRoleList();
            loadmenuChoice();
            loadrightsList(".role_check_box", "rolepid");
            $("#role_list").show();
            $("#role .form-horizontal").hide();
        });
        $(".user").click(function() {
            //----解决用户列表点解添加按钮，再点击角色管理等其他选项，再回来点击用户管理时页面失效问题------------------------------------------------------
            $("#user .form-horizontal").hide();
            $("#user_rightbox").show();
            loadrolesList(".user_check_box", "rolepid");
            loadUserList();
        });
        $(".menu").click(function() {
            $("#menu .form-horizontal").hide();
            loadMenuList();
        });
        // 点击维修申请，重置申请表单
        $(".maintainTypeIn").click(function() {
            myformReset();
            $(".send_tips").html("");
        })
    },
    "error": function(data) {
        // window.location.href = "../../../car/CarMangae0/html/login.html";
    }
})


// 解决tabs标签在当前页面点击后，再次点击，失效问题。
function removecss(box) {
    $(".sidebar-submenu a").removeClass("active");
}