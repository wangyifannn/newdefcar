// 车辆列表
function loadCarList(data, tablename) {
    $.ajax({
        "url": "http://localhost/car/CarMangae0/json/datatable.json",
        // "url": "http://192.168.0.222:8080/car-management/tempcar/query.action",
        "type": "post",
        "data": data,
        "async": false,
        contentType: 'application/json;charset=UTF-8', //contentType很重要 
        crossDomain: true, //cors解决post跨域问题，后台要进行相关配置
        "success": function(res) {
            console.log(res);
            if (tablename == "carListtable") {
                // $('#carListtable').bootstrapTable('destroy');
                createcarTable("#carListtable", "carListtable_toolbar", res,
                    "测试车辆-车辆列表", "carName", "vSn", "vin", "engineNumber", "cGroup", true, true,
                    "", "车辆名称", "车辆编号", "车架号", "发动机号", "所属分组",
                    true, caroperateEvents, caroperateFormatter, "client",
                    "status", "检查进度", "创建日期", "makeTime", "project", "项目工程师",
                    "all");
            } else if (tablename == "safeTable") {
                createcarTable("#safeTable", "safeTable_toolbar", res,
                    "测试车辆-安全检查列表", "vSn", "vCarSn", "carName", "engineNumber", "makeTime", true, true,
                    "", "车辆编号", "车牌号", "车辆名称", "发动机编号", "创建日期",
                    true, safeoperateEvents, safeoperateFormatter, "client",
                    "cGroup", "所属分组", "status", "检查进度", "product_sn", "项目号", "all");
            } else if (tablename == "wriringTable") {
                createcarTable("#wriringTable", "wriringTable_toolbar", res,
                    "测试车辆-线束检查列表", "vSn", "vCarSn", "carName", "engineNumber", "makeTime", true, true,
                    "", "车辆编号", "车牌号", "车辆名称", "发动机编号", "创建日期",
                    true, wiringoperateEvents, wiringoperateFormatter, "client",
                    "cGroup", "所属分组", "status", "检查进度", "product_sn", "项目号", "all");
            } else if (tablename == "bomTable") {
                createcarTable("#bomTable", "bomTable_toolbar", res,
                    "测试车辆-bom检查列表", "vSn", "vCarSn", "carName", "engineNumber", "makeTime", true, true,
                    "", "车辆编号", "车牌号", "车辆名称", "发动机编号", "创建日期",
                    true, bomoperateEvents, bomoperateFormatter, "client",
                    "cGroup", "所属分组", "status", "检查进度", "product_sn", "项目号", "all");
            }
        },
        "error": function(res) {
            console.log(res);
        }
    });
}
// 判断车辆状态，加载车辆按钮，0或null：已录入，1：已点检，2：已安全检查，3：已线束检查，4：已BOM检查，5：还车点检完毕
function caroperateFormatter(value, row, index) {
    window.location.hash = "pagenum=" + getHashParameter("pagenum") + "&id=" + row.id + "&vSn=" + row.vSn + "&vin=" + row.vin + "&engineNumber=" + row.engineNumber; //车辆数据库编号
    var hrefString = "";
    var nextCheck = "";
    // if (row.status == 0) {
    //     nextCheck = "新车点检";
    //     hrefString = "carCheck";
    // } else if (row.status == 1) {
    //     nextCheck = "安全检查";
    //     hrefString = "sCheck";
    // } else if (row.status == 2) {
    //     nextCheck = "线束检查";
    //     hrefString = "wiringCheck";
    // } else if (row.status == 3) {
    //     nextCheck = "BOM检查";
    //     hrefString = "bomCheck";
    // } else if (row.status == 4) {
    //     nextCheck = "等待审核";
    //     hrefString = "auditList";
    // } else {
    //     nextCheck = "检查完毕";
    // }
    return [
        // '<button type="button" id="btn_cardel" class="RoleOfA btn btn-default  btn-sm" style="margin-right:15px;">删除</button>',
        '<button type="button" id="btn_cardel" class="RoleOfA btn btn-default  btn-sm" style="margin-right:15px;">录入</button>',
        '<a href="#carDetail" data-toggle="tab"><button type="button" id="btn_cardetail" class="btn btn-default  btn-sm" style="margin-right:15px;">详情</button></a>',
        '<button type="button" id="btn_cardel" class="RoleOfA btn btn-default  btn-sm" style="margin-right:15px;">安全</button>',
        '<button type="button" id="btn_cardel" class="RoleOfA btn btn-default  btn-sm" style="margin-right:15px;">线束</button>',
        '<button type="button" id="btn_cardel" class="RoleOfA btn btn-default  btn-sm" style="margin-right:15px;">BOM</button>',
        '<button type="button" id="btn_cardel" class="RoleOfA btn btn-default  btn-sm" style="margin-right:15px;">研发</button>',
        '<button type="button" id="btn_cardel" class="RoleOfA btn btn-default  btn-sm" style="margin-right:15px;">审核</button>'
        // '<button type="button" id="btn_cardel" class="RoleOfA btn btn-default  btn-sm" style="margin-right:15px;">修改</button>',
        // '<a href="#' + hrefString + '" data-toggle="tab"><button type="button" id="btn_' + hrefString + '" class="btn btn-default btn-sm nextCheck_btn" style="margin-right:15px;">' + nextCheck + '</button></a>'
    ].join('');
}

window.caroperateEvents = {
    'click .nextCheck_btn': function(e, value, row, index) {
        // $(".carList").removeClass("active");
    },
    'click #btn_cardel': function(e, value, row, index) {
        $(this).parent().parent().remove();
        delCarList("http://192.168.0.222:8080/car-management/tempcar/delete.action", row.id, "get", "tempcarlist",
            "临时车辆列表", "删除失败", "删除成功");
    },
    'click #btn_cardetail': function(e, value, row, index) {
        $(".carList").removeClass("active");
        window.location.hash = "pagenum=" + 1 + "&id=" + row.id + "&vSn=" + row.vSn; //车辆数据库编号
        $("#carTypeInForm").addClass("active").siblings().removeClass("active");
        $(".detailitem0").addClass("checkitem_active").siblings().removeClass("checkitem_active");
        cartypein_info(row.vSn, "#carTypeInForm");

    },
    'click #btn_carCheck': function(e, value, row, index) {
        $(".carList").removeClass("active");

        $("#carCheck #vSn").val(row.vSn); //车辆编号
        $("#carCheck #vin").val(row.vin); //车架号
        $("#returncarCheck #vSn").val(row.vSn); //车辆编号
        $("#carCheck input").attr("readOnly", false);
        window.location.hash = "pagenum=" + getHashParameter("pagenum") + "&id=" + row.id + "&vSn=" + row.vSn + "&vin=" + row.vin + "&engineNumber=" + row.engineNumber; //车辆数据库编号
    },
    'click #btn_sCheck': function(e, value, row, index) {
        $(".carList").removeClass("active");

        window.location.hash = "pagenum=" + getHashParameter("pagenum") + "&id=" + row.id + "&vSn=" + row.vSn + "&vin=" + row.vin + "&engineNumber=" + row.engineNumber; //车辆数据库编号
        initsafeCheck(".pot_pressure");
    },
    'click #btn_wiringCheck': function(e, value, row, index) {
        $(".carList").removeClass("active");

        window.location.hash = "pagenum=" + getHashParameter("pagenum") + "&id=" + row.id + "&vSn=" + row.vSn + "&vin=" + row.vin + "&engineNumber=" + row.engineNumber; //车辆数据库编号
        initWiringCheck("");
    },
    'click #btn_bomCheck': function(e, value, row, index) {
        $(".carList").removeClass("active");

        window.location.hash = "pagenum=" + getHashParameter("pagenum") + "&id=" + row.id + "&vSn=" + row.vSn + "&vin=" + row.vin + "&engineNumber=" + row.engineNumber; //车辆数据库编号
        initBomCheck();
    },
    'click #btn_auditList': function(e, value, row, index) {
        $(".carList").removeClass("active");
        loadAuditList();
    },
    'click #btn_returncarCheck': function(e, value, row, index) {
        $(".carList").removeClass("active");
        $("#returncarCheck #vSn").val(row.vSn); //车辆编号
        window.location.hash = "pagenum=" + getHashParameter("pagenum") + "&id=" + row.id + "&vSn=" + row.vSn + "&vin=" + row.vin + "&engineNumber=" + row.engineNumber; //车辆数据库编号
    }

};

function safeoperateFormatter(value, row, index) {
    window.location.hash = "pagenum=" + getHashParameter("pagenum") + "&id=" + row.id + "&vSn=" + row.vSn + "&vin=" + row.vin + "&engineNumber=" + row.engineNumber; //车辆数据库编号
    return [
        // '<button type="button" id="btn_cardel" class="RoleOfA btn btn-default  btn-sm" style="margin-right:15px;">删除</button>',
        '<a href="#carDetail" data-toggle="tab"><button type="button" id="btn_cardetail" class="btn btn-default  btn-sm" style="margin-right:15px;">详情</button></a>',
        '<a href="#" data-toggle="tab"><button type="button" id="safe_btn" class="btn btn-default btn-sm safe_btn" style="margin-right:15px;">' + "安全检查" + '</button></a>'
    ].join('');
}
window.safeoperateEvents = {
    'click #btn_cardel': function(e, value, row, index) {
        $(this).parent().parent().remove();
        delCarList("http://192.168.0.222:8080/car-management/tempcar/delete.action", row.id, "get", "tempcarlist",
            "临时车辆列表", "删除失败", "删除成功");
    },
    'click #safe_btn': function(e, value, row, index) {
        // $(this).parent().parent().remove();
        // delCarList("http://192.168.0.222:8080/car-management/tempcar/delete.action", row.id, "get", "tempcarlist",
        //     "临时车辆列表", "删除失败", "删除成功");
    },
    'click #btn_cardetail': function(e, value, row, index) {
        $(".carList").removeClass("active");
        window.location.hash = "pagenum=" + 1 + "&id=" + row.id + "&vSn=" + row.vSn; //车辆数据库编号
        $("#carTypeInForm").addClass("active").siblings().removeClass("active");
        $(".detailitem0").addClass("checkitem_active").siblings().removeClass("checkitem_active");
        cartypein_info(row.vSn, "#carTypeInForm");
    }
};

function wiringoperateFormatter(value, row, index) {
    window.location.hash = "pagenum=" + getHashParameter("pagenum") + "&id=" + row.id + "&vSn=" + row.vSn + "&vin=" + row.vin + "&engineNumber=" + row.engineNumber; //车辆数据库编号
    return [
        '<a href="#carDetail" data-toggle="tab"><button type="button" id="btn_cardetail" class="btn btn-default  btn-sm" style="margin-right:15px;">详情</button></a>',
        '<a href="#" data-toggle="tab"><button type="button" id="safe_btn" class="btn btn-default btn-sm safe_btn" style="margin-right:15px;">' + "线束检查" + '</button></a>'
    ].join('');
}
window.wiringoperateEvents = {
    'click #btn_cardel': function(e, value, row, index) {
        $(this).parent().parent().remove();
        delCarList("http://192.168.0.222:8080/car-management/tempcar/delete.action", row.id, "get", "tempcarlist",
            "临时车辆列表", "删除失败", "删除成功");
    },
    'click #safe_btn': function(e, value, row, index) {},
    'click #btn_cardetail': function(e, value, row, index) {
        $(".carList").removeClass("active");
        window.location.hash = "pagenum=" + 1 + "&id=" + row.id + "&vSn=" + row.vSn; //车辆数据库编号
        $("#carTypeInForm").addClass("active").siblings().removeClass("active");
        $(".detailitem0").addClass("checkitem_active").siblings().removeClass("checkitem_active");
        cartypein_info(row.vSn, "#carTypeInForm");
    }
};

function bomoperateFormatter(value, row, index) {
    window.location.hash = "pagenum=" + getHashParameter("pagenum") + "&id=" + row.id + "&vSn=" + row.vSn + "&vin=" + row.vin + "&engineNumber=" + row.engineNumber; //车辆数据库编号
    return [
        '<a href="#carDetail" data-toggle="tab"><button type="button" id="btn_cardetail" class="btn btn-default  btn-sm" style="margin-right:15px;">详情</button></a>',
        '<a href="#" data-toggle="tab"><button type="button" id="safe_btn" class="btn btn-default btn-sm safe_btn" style="margin-right:15px;">' + "BOM检查" + '</button></a>'
    ].join('');
}
window.bomoperateEvents = {
    'click #btn_cardel': function(e, value, row, index) {
        $(this).parent().parent().remove();
        delCarList("http://192.168.0.222:8080/car-management/tempcar/delete.action", row.id, "get", "tempcarlist",
            "临时车辆列表", "删除失败", "删除成功");
    },
    'click #safe_btn': function(e, value, row, index) {},
    'click #btn_cardetail': function(e, value, row, index) {
        $(".carList").removeClass("active");
        window.location.hash = "pagenum=" + 1 + "&id=" + row.id + "&vSn=" + row.vSn; //车辆数据库编号
        $("#carTypeInForm").addClass("active").siblings().removeClass("active");
        $(".detailitem0").addClass("checkitem_active").siblings().removeClass("checkitem_active");
        cartypein_info(row.vSn, "#carTypeInForm");
    }
};
// 加载车辆状态列表
function findStatusList(appendbox, statusobj) {
    var groupOption = "";
    for (var r = 0; r < statusobj.length; r++) {
        groupOption += '<option value="' + statusobj[r].value + '">' + statusobj[r].name + '</option>';
    }
    var groupBox = '<span>状态：</span><span><select class="status-mdoel_select">' + groupOption + '</select></span><button type="button" class="groupsearch_btn">查询</button>';
    console.log(groupBox);
    $(appendbox).html($(appendbox).html() + groupBox);
};

// 车辆分组列表
function findGroupList(appendbox, url, limitinfo) {
    $.ajax({
        "url": url,
        "type": "get",
        "data": {},
        "dataType": "jsonp", //数据类型为jsonp  
        "jsonp": "jsonpCallback", //服务端用于接收callback调用的function名的参数  
        "success": function(res) {
            var cargroupOption = "";
            // 如果只是想要分组的列表，做以下限制
            if (limitinfo == "limitinfo") {
                for (var r = 0; r < res.length; r++) {
                    cargroupOption += '<option value="' + res[r].id + '">' + res[r].name + '组</option>';
                }
                $(appendbox).html(cargroupOption);
                return;
            }
            var groupOption = "";
            groupOption = '<option value="" name="" remark="">全部</option>';
            for (var r = 0; r < res.length; r++) {
                groupOption += '<option value="' + res[r].id + '" name="' + res[r].name + '" remark="' + res[r].remark + '">' + res[r].name + '</option>';
            }
            var groupBox = '<span class="car_group_name">分组：</span><span><select id="group_opt" class="group-mdoel_select">' + groupOption + '</select></span>';
            $(appendbox).html($(appendbox).html() + groupBox);
            findStatusList("#carList .groupbox", statusobj);

            $("#carList .groupsearch_btn").click(function() {
                $('#carListtable').bootstrapTable('destroy');
                var groupdata = {
                    "vSn": $("#group_carvSn").val(),
                    "status": $(".status-mdoel_select").val(),
                    "carName": "",
                    "cGroup": {
                        "id": $("#group_opt option:selected").attr("value"),
                        "name": $("#group_opt option:selected").attr("name"),
                        "remark": $("#group_opt option:selected").attr("remark")
                    }
                };
                var data = JSON.stringify(groupdata);
                loadCarList(data);
            })
        },
        "error": function(res) {
            console.log(res);
        }
    })
}



$(".caradd_btn").click(function() {
    $(".carTypeIn").addClass("active").siblings().removeClass("active");
    window.location.hash = "";
    $(this).attr("href", "#carTypeIn");
});


// 车辆总表
function loadsumCarList(dat) {
    $.ajax({
        "url": "http://192.168.0.222:8080/car-management/car/pageQuery.action?page=1&size=1000",
        "type": "get",
        data: dat,
        contentType: 'application/json;charset=UTF-8', //contentType很重要 
        crossDomain: true, //cors解决post跨域问题，后台要进行相关配置
        "success": function(res) {
            console.log(res);
            $('#sumCarListTable').bootstrapTable('destroy');
            createsumcarTable("#sumCarListTable", "toolbar_sumCarListTable", res.pageData,
                "vSn", "product_sn", "product_status", "customer", "projectEngineer", "check_s", true, true,
                "车辆编号", "项目号", "项目状态", "客户", "主管程序师", "车辆状态",
                "upcheckTime", "接车日期", "backchecktime", "还车日期", "vCarType", "厂牌型号", "vCarTypetwo", "厂牌型号",
                "engineCapacity", "吨位", "engineNumber", "发动机号", "vin", "车架号",
                "carInsurance", "保险NO", "carInsurance", "保险起始日",
                "carInsurance", "保险终止日", "carLicense", "车牌到期日", "carLicense", "车牌",
                true, sumcaroperateEvents, sumcaroperateFormatter, "client", "测试车辆-车辆总表");
        },
        "error": function(res) {
            console.log(res);
        }
    });
}
// 查询
var filArr = [
    // { "name": "客户", "place": "客户名", "inputName": "customer" },
    // { "name": "车辆编号", "place": "车辆编号", "inputName": "vsn" },
    { "name": "项目编号", "place": "项目编号", "inputName": "product_sn" },
    { "name": "项目工程师", "place": "项目工程师", "inputName": "projectEngineer" },
    { "name": "车辆状态", "place": "车辆状态", "inputName": "check_s" },
    { "name": "厂牌型号", "place": "厂牌型号", "inputName": "vCarType" }
    // { "name": "发动机编号", "place": "发动机编号", "inputName": "engineNumber" },
    // { "name": "车架号", "place": "车架号", "inputName": "vin" },
    // { "name": "保险编号", "place": "保险编号", "inputName": "NO" },
    // { "name": "保险起始日", "place": "保险起始日", "inputName": "i_startTime" },
    // { "name": "保险结束日", "place": "保险结束日", "inputName": "i_endTime" },
    // { "name": "牌照结束日", "place": "牌照结束日", "inputName": "licenseEndTime" },
    // { "name": "接车日期", "place": "接车日期", "inputName": "uptime" },
    // { "name": "还车日期", "place": "还车日期", "inputName": "backtime" },
    // { "name": "项目状态", "place": "项目状态", "inputName": "project_status" }
];

function creatSelect(name) {
    var ss = "";
    var optstyle = "";
    for (var i = 0; i < filArr.length; i++) {
        if (i < 14) {
            if (i >= 9 && i <= 13) {
                var ifdata = "much-date";
            } else {
                var ifdata = "";
            }
            optstyle = '<input type="text" name="' + filArr[i].inputName + '" class="form-control ' + ifdata + '" value="" placeholder="' + filArr[i].place + '"> '
        } else {
            optstyle = '<select><option value="1" name="' + filArr[i].inputName + '">进行中</option><option value="2" name="' + filArr[i].inputName + '">已完成</option></select> '
        }
        ss += '<div class="form-group">' +
            '<label for="exampleInputName2">' + filArr[i].name + '：</label>' +
            '<span>' + optstyle + '</span>' +
            '</div>'
    }
    ss += '<button type="button" style="margin-left:20px;" class="btn btn-default sumcar_search_btn">查询</button>';
    $(name).html(ss);
}
creatSelect("#sumcar_search_form");

function sumcaroperateFormatter(value, row, index) {
    return [
        '<button type="button" id="btn_sumcardel_row" class="RoleOfA btn btn-default  btn-sm" style="margin-right:15px;">删除</button>',
        '<a href="#carDetail" data-toggle="tab"><button type="button" id="btn_sumcardetail" class="RoleOfB btn btn-default  btn-sm" style="margin-right:15px;">详情</button></a>',
        '<a href="#" data-toggle="tab"><button type="button" id="btn_sumcarInsurance" class="RoleOfB btn btn-default  btn-sm" style="margin-right:15px;">保险</button></a>',
        '<a href="#" data-toggle="tab"><button type="button" id="btn_sumcarPlate" class="RoleOfB btn btn-default  btn-sm" style="margin-right:15px;">车牌</button></a>'
    ].join('');
}

window.sumcaroperateEvents = {
    'click #btn_sumcardel_row': function(e, value, row, index) {
        $(this).parent().parent().remove();
        delCarList("http://192.168.0.222:8080/car-management/car/delete.action", row.id, "get", "sumCarList",
            "车辆总表", "删除失败", "删除成功");
    },
    'click #btn_sumcarInsurance': function(e, value, row, index) { //保险
        window.location.hash = "pagenum=" + 1 + "&id=" + row.id + "&vSn=" + row.vSn; //车辆数据库编号
        creatInsurance(".insurance_Form", insuranceArr);
        $("#insurance_model .vsn").val(row.vSn);
        $("#insurance_model").modal();
    },
    'click #btn_sumcarPlate': function(e, value, row, index) { //车牌
        window.location.hash = "pagenum=" + 1 + "&id=" + row.id + "&vSn=" + row.vSn; //车辆数据库编号
        creatInsurance(".palte_Form", plateArr);
        $("#plate_model .vsn").val(row.vSn);
        $("#plate_model").modal();
    },
    'click #btn_sumcardetail': function(e, value, row, index) {
        window.location.hash = "pagenum=" + 1 + "&id=" + row.id + "&vSn=" + row.vSn; //车辆数据库编号
        $("#carTypeInForm").addClass("active").siblings().removeClass("active");
        $(".detailitem0").addClass("checkitem_active").siblings().removeClass("checkitem_active");
        cartypein_info(row.vSn, "#carTypeInForm");
        $(".sumCarList").removeClass("active");
    }
};
// 删除所有成功
$("#del_sumcar_all").click(function() {
    var h = $("#sumCarListTable").bootstrapTable('getSelections');
    deletAllLog(h, "sumCarListTable");
});
// 查询搜索按钮及回车触发
$("#sumcar_search_form").click(function() {
    var seardata = $("#sumcar_search_form").serialize();
    seardata += "&product_status=" + $("#sumcar_search_form option:selected").val();
    loadsumCarList(seardata);
})
$("body").keydown(function() {
    if (event.keyCode == "13") { //keyCode=13鏄洖杞﹂敭
        var seardata = $("#sumcar_search_form").serialize();
        seardata += "&product_status=" + 1;
        loadsumCarList(seardata);
    }
});

// 保险记录模态框内容
var insuranceArr = [
    { "name": "车辆编号", "place": "车辆编号", "inputName": "vsn" },
    { "name": "保险编号", "place": "项目编号", "inputName": "NO" },
    { "name": "保险起始时间", "place": "保险起始时间", "inputName": "startTime" },
    { "name": "保险结束时间", "place": "保险结束时间", "inputName": "endTime" },
    { "name": "厂牌型号", "place": "厂牌型号", "inputName": "instype" },
];
var plateArr = [
    { "name": "车辆编号", "place": "车辆编号", "inputName": "vsn" },
    { "name": "车牌号", "place": "车牌号", "inputName": "LicenseNo" },
    { "name": "牌照起始日期", "place": "牌照起始日期", "inputName": "licenseStartTime" },
    { "name": "牌照结束时间", "place": "牌照结束时间", "inputName": "licenseEndTime" }
];

function creatInsurance(name, arr) {
    var formContent = "";
    var formC = "";
    $(name).html("");
    for (var i = 0; i < arr.length; i++) {
        if (i >= 2 && i <= 3) {
            var ifdata = " much-date";
        } else {
            var ifdata = "";
        }
        formC = '<input type="text" name="' + arr[i].inputName + '" class="form-control ' + arr[i].inputName + ifdata + '" value="" placeholder="' + arr[i].place + '"> '
        formContent += '<div class="form-group">' +
            '<label for="inputEmail3" class="col-sm-4 control-label">' + arr[i].name + '：</label>' +
            '<div class="col-sm-6">' + formC + '</div>' +
            '</div>'
    }
    if (name == ".insurance_Form") {
        var bt = '<button type="button" class="btn btn-default modal_ins_btn" aria-label="" data-dismiss="" >提交</button>'
    } else if (name == ".palte_Form") {
        var bt = '<button type="button" class="btn btn-default modal_plate_btn" aria-label="" data-dismiss="">提交</button>'
    }
    formContent += '<div class="form-group"><div class="col-sm-offset-5 col-sm-6">' + bt +
        '<button type="button" style="margin-left:20px;" class="btn btn-default" data-dismiss="modal">取消</button>' +
        '</div></div>';
    $(name).html(formContent);
    lay('.much-date').each(function() {
        laydate.render({
            elem: this,
            trigger: 'click',
            type: 'datetime', //精确到 时分秒
            value: null,
            theme: '#041473' //自定义颜色主题
        });
    });
    $(".modal_ins_btn").click(function() {
        if ($(".insurance_Form .vsn").val() == "" || $(".insurance_Form .NO").val() == "" ||
            $(".insurance_Form .startTime").val() == "" || $(".insurance_Form .endTime").val() == "") {
            toastr.warning('有选项未填写，请填写', '保险', messageOpts);
            return;
        }
        var insuUrl = "http://192.168.0.222:8080/car-management/car/addCarInsurance.action?id=" + getHashParameter("id");
        var insData = $(".insurance_Form").serialize();
        subAjax(insuUrl, insData, "get", "modal_ins_btn", "车辆保险", "保险提交失败", "保险提交成功");
        $(this).attr({ "data-dismiss": "modal", "aria-label": "Close" });

    });
    $(".modal_plate_btn").click(function() {
        if ($(".palte_Form .vsn").val() == "" || $(".palte_Form .LicenseNo").val() == "" ||
            $(".palte_Form .licenseStartTime").val() == "" || $(".palte_Form .licenseEndTime").val() == "") {
            toastr.warning('有选项未填写', '车牌号', messageOpts);
            return;
        }
        var plaUrl = "http://192.168.0.222:8080/car-management/car/addCarLicense.action?id=" + getHashParameter("id");
        var plaData = $(".palte_Form").serialize();
        subAjax(plaUrl, plaData, "get", "modal_plate_btn", "车牌号", "车牌号提交失败", "车牌号提交成功");
        $(this).attr({ "data-dismiss": "modal", "aria-label": "Close" });
    })
}



function subAjax(url, dat, type, name, tit, filToa, sucToa) {
    $.ajax({
        url: url,
        type: type,
        data: dat,
        "dataType": "jsonp", //数据类型为jsonp  
        "jsonp": "jsonpCallback", //服务端用于接收callback调用的function名的参数
        success: function(res) {
            console.log(res);
            if (res.ret == true) {
                toastr.success(sucToa, tit, messageOpts);
                if (name == "modal_ins_btn") {
                    loadsumCarList("");
                } else if (name == "modal_plate_btn") {
                    loadsumCarList("");
                }
            } else {
                toastr.warning(filToa, tit, messageOpts);
            }
        },
        "error": function(res) {
            toastr.error('程序内部错误', tit, messageOpts);
        }
    })
}