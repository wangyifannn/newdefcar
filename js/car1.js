// 数据库 加载权限列表
function requestTypein(url, data, that, next) {
    console.log(url);
    $.ajax({
        "url": url,
        "type": "get",
        "async": false,
        "dataType": "jsonp", //数据类型为jsonp  
        "jsonp": "jsonpCallback", //服务端用于接收callback调用的function名的参数  
        "data": data,
        "success": function(res) {
            console.log(res);
            toastr.success(res.msg, '提示', messageOpts);
            var id, vSn, vin, engineNumber;
            id = getHashParameter("id");
            vSn = getHashParameter("vSn");
            vin = getHashParameter("vin");
            engineNumber = getHashParameter("engineNumber");
            if (getHashParameter("id") == null) {

                if (res.data == null || res.data.id == null || res.data.id == undefined) {
                    // 如果是驾驶员录入
                    id = "";
                    vSn = "";
                    vin = "";
                    engineNumber = "";
                } else {
                    id = res.data.id;
                    vSn = res.data.vSn;
                    vin = res.data.vin;
                    engineNumber = res.data.engineNumber;
                }
            }
            if (res.ret == true) {
                window.location.hash = "id=" + id + "&pagenum=1&vSn=" + vSn + "&vin=" + vin + "&engineNumber=" + engineNumber; //车辆数据库编号
                if (next == "carCheck") {
                    initcarCheck(); //初始化接车点检
                } else if (next == "sCheck") {
                    initsafeCheck(".pot_pressure"); //初始化安全检查
                } else if (next == "initReturnCarCheck") {
                    initReturnCarCheck(""); //初始化还车检点
                } else if (next == "driverList") {
                    loadDriverList(1, 10);
                    return;
                }
                $(that).parent().attr("href", "#" + next);
                $('a[href="#' + next + '"]').tab('show');
                // 将提交成功，返回的数据存入session
                window.localStorage.formData = JSON.stringify(res);
            } else {
                toastr.error("提交失败，请重新提交", '提示', messageOpts);
                return;
            }
        },
        "error": function(res) {
            toastr.error("程序内部错误", '还车点检', messageOpts);
        }
    })
}
// bom检查申请
$("#typein_bom").click(function() {
    $("#insurance_model").modal();
    bomApply("#insurance_model .modal-body", $("#carTypeIn .vSn").val(), bomapplyArr);
});
// 研发工具记录按钮
$("#typein_tools_btn").click(function() {
    $("#toolRecord_model").modal();
    ToolRecordApply("#toolRecord_model .tool_Form", $("#carTypeIn .vSn").val());
    $("#toolRecord_model .vSn").val($("#carTypeIn .vSn").val());
});
// 车辆录入-----------------------------------------------------------------------------------------
// 车辆编号校验
$("#carTypeIn .vSn").bind('input porpertychange', function() {
    console.log($("#carTypeIn .vSn").val());
    if ($("#carTypeIn .vSn").val() == null || $("#carTypeIn .vSn").val() == "") {
        return;
    } else {
        checkParams("/tempcar/check/" + $("#carTypeIn .vSn").val() + "/1.action", ".vSn_tips", "", "#carTypeIn_btn");
    }
});
// 车辆录入
$("#carTypeIn_btn").click(function() {
    $(this).parent().attr("href", "#");
    if ($("#carTypeIn .vSn").val() == "" || $("#carTypeIn .product_sn").val() == "" || $("#carTypeIn .vin").val() == "" || $("#carTypeIn .engineNumber").val() == "") {
        alert("有必填项未填写！");
        return;
    }
    var id = "";
    if (getHashParameter("id")) {
        id = getHashParameter("id");
    }
    // 有25个字段
    var carinfodata = {
        "id": id,
        "vSn": $("#carTypeIn .vSn").val(), //试验车号
        "vin": $("#carTypeIn .vin").val(), //车架号
        "product_sn": $("#carTypeIn .product_sn").val(),
        "product_name": $("#carTypeIn .product_name").val(),
        "carName": $("#carTypeIn .carName").val(),
        "vCarType": $("#carTypeIn .vCarType").val(),
        "customer": $("#carTypeIn .customer").val(),
        "projectEngineer": $("#carTypeIn .projectEngineer").val(),
        "contactNumber": $("#carTypeIn .contactNumber").val(),
        "engineType": $("#carTypeIn .engineType").val(),
        "engineNumber": $("#carTypeIn .engineNumber").val(),
        "engineCapacity": $("#carTypeIn .engineCapacity").val(),
        "FuelType": $("#carTypeIn .FuelType").val(),
        "oilspecification": $("#carTypeIn .oilspecification").val(),
        "tyresize": $("#carTypeIn .tyresize").val(),
        "GBTS": $("#carTypeIn .GBTS").val(), //变速箱油规格
        "reaTireP": $("#carTypeIn .reaTireP").val(),
        "frontTireP": $("#carTypeIn .frontTireP").val(),
        "vehicleQuality": $("#carTypeIn #vehicleQuality").val(),
        "loadMethod": $("#carTypeIn #loadMethod").val(),
        "loadData": $("#carTypeIn #loadData").val(),
        "operator": "", //签字人、操作人,后台生成
        "makeTime": $("#carTypeIn #makeTime").val(), //makeTime
        "remark": $("#carTypeIn #remark").val(), //备注
        "gid": $("#carTypeIn .gids").val() //车辆分组
    };
    var that = this;
    requestTypein("http://192.168.0.222:8080/car-management/tempcar/addTcar.action", carinfodata, that, "carCheck");
});
// 接车点检-----------------------------------------------------------------------------------------
// 接车点检初始化表单
function initcarCheck() {
    formReset();
    // console.log(getHashParameter("vSn"));
    $("#carCheck #vSn").val(getHashParameter("vSn")); //车辆编号
    $("#carCheck #vin").val(getHashParameter("vin")); //车架号
    $("#carCheck #engineNumber").val(getHashParameter("engineNumber")); //发动机编号
}

inputVal("#carCheck #sparetyre", "#carCheck_btn");
inputVal("#carCheck #tools", "#carCheck_btn");
inputVal("#carCheck #jack", "#carCheck_btn");
inputVal("#carCheck #warningboard", "#carCheck_btn");
inputVal("#carCheck #fire", "#carCheck_btn");
inputVal("#carCheck #keys", "#carCheck_btn");
inputVal("#carCheck #ododmeter", "#carCheck_btn");
inputVal("input[name='send_iphone']", "#carCheck_btn");
// 接车点检重置
$(".resetcheck_btn").click(function() {
    initcarCheck();
});
// 接车点检提交
$("#carCheck_btn").click(function() {
    if ($("#pickone").val() == "" || $("#").val() == "") {
        alert("有必填项未填写");
        return;
    }
    $(this).parent().attr("href", "#" + "carList");
    var carCheckdata = {
        "tcarid": getHashParameter("id"), //数据库编号
        "vSn": getHashParameter("vSn"), //车辆编号
        "vin": getHashParameter("vin"), //车架号
        "engineNumber": getHashParameter("engineNumber"), //发动机编号
        "facade": $("input[name='carfacade']:checked").val(),
        "item": $("#item").val(),
        "tools": $("#tools").val(),
        "sparetyre": $("#sparetyre").val(), //备用轮胎
        "jack": $("#jack").val(),
        "warningboard": $("#warningboard").val(),
        "fire": $("#fire").val(),
        "keyy": $("#keys").val(),
        "odometer": $("#ododmeter").val(), //*
        "pickone": $("#pickone").val(),
        "telephone": $("input[name='send_iphone']").val(),
        "send_p": $("#send_p").val(),
        "time": $("input[name='receiverdata']").val()
    };
    console.log(carCheckdata);
    var that = this;
    requestTypein("http://192.168.0.222:8080/car-management/car/upcheck.action", carCheckdata, that, "sCheck");
});
// 接车点检返回到车辆录入界面，数据回显
$("#carcheck_return").click(function() {
    cartypein_info(getHashParameter("vSn"), "#carTypeIn"); //调用 detail.js里面的车辆录入信息回显函数
    $(".cartypein_tips").html("");
});

// 安全检查---------------------------------------------------------------
// 安全检查上一步
$("#carWiring_return").click(function() {
    FindCheckinfo("http://192.168.0.222:8080/car-management/car/findUpcheck.action?vSn=" + getHashParameter("vSn"), "#carCheck");
    $(".carcheck_tips").html("");
});
// 页面检查菜单（安全检测、线束检查、bom检查等）
function addMenu(boxname, num) {
    $.ajax({
        "url": "http://192.168.0.222:8080/car-management/car/findAllCheckName.action",
        "type": "get",
        "success": function(res) {
            console.log(res);
            var Ahref = "";
            var active = "";
            for (var a = 0; a < res.length; a++) {
                if (res[a].id == num) {
                    console.log(res[a].id);
                    active = "checkitem_active";
                } else {
                    active = "";
                }
                Ahref += '<a href="#" data-toggle="tab"><button type="button" class="checkitem' + res[a].id + ' ' + active + '">' + res[a].name + '</button></a>';
            }
            $(boxname).html(Ahref);
            $('.checkitem1').click(function() {
                $(this).parent().attr("href", "#" + "sCheck");
                addMenu("#sCheck .checkMenus", 1);
                initsafeCheck(".pot_pressure"); //初始化安全检查
            });
            $('.checkitem2').click(function() {
                $(this).parent().attr("href", "#" + "wiringCheck");
                addMenu("#wiringCheck .checkMenus", 2);
                initWiringCheck("");
            });
            $('.checkitem3').click(function() {
                $(this).parent().attr("href", "#" + "bomCheck");
                addMenu("#bomCheck .checkMenus", 3);
                initBomCheck();
            });
        }
    })
}



function getcnid(url, boxname) {
    // 安全检查
    $.ajax({
        // "url": "http://localhost/car/CarMangae0/json/item" + url + ".json",
        "url": "http://192.168.0.222:8080/car-management/car/findAllParentItem.action?CNID=" + url,
        "type": "get",
        "success": function(res) {
            // console.log(res);
            if (url == 1 || url == 3) {
                if (url == 1) {
                    var checkboxs = '<div class="checktitle"><span>检查项目</span><span>要求</span><span>状态</span><span>说明（注明问题不能解决的原因）</span></div>';
                    for (var i = 0; i < res.length; i++) {
                        checkboxs += '<div class="checkitem"><span>' + res[i].pname +
                            '</span><span>' + res[i].carCheckRequest.request +
                            '</span><span class="style1_radio"><input type="radio" checked="" class="statusy" value="Y" name="itemstatus' + i + '">是' +
                            '&nbsp;&nbsp;&nbsp;<input type="radio" checked="" class="statusno" value="N" name="itemstatus' + i + '">否' +
                            '&nbsp;&nbsp;&nbsp;<input type="radio" checked="" class="" value="NA" name="itemstatus' + i + '">NA' +
                            '</span><span> <input type="text" class="item' + i + 'explain explain_input" value="" name="explain' + i + '"></span></div>';
                    }
                } else if (url == 3) {
                    var checkboxs = '<div class="checktitle"><span>零部件名称</span><span>零部件号</span><span>状态</span><span>说明（注明问题不能解决的原因）</span></div>';
                    for (var i = 0; i < res.length; i++) {
                        checkboxs += '<div class="checkitem"><span><input type="text" class="bom_name" value="' + res[i].pname + '">' +
                            '</span><span><input type="text" class="bom_num" value="' + res[i].components.name + '">' +
                            '</span><span class="style1_radio"><input type="radio" checked="" class="statusy my_radio" value="Y" name="itemstatus' + i + '">是' +
                            '&nbsp;&nbsp;&nbsp;<input type="radio" checked="" class="statusno my_radio" value="N" name="itemstatus' + i + '">否' +
                            '&nbsp;&nbsp;&nbsp;<input type="radio" checked="" class="my_radio" value="NA" name="itemstatus' + i + '">NA' +
                            '</span><span> <input type="text" class="item' + i + 'explain explain_input" value="" name="explain' + i + '"></span></div>';
                    }
                    for (var j = 11; j < 16; j++) {
                        checkboxs += '<div class="checkitem"><span><input type="text" class="bom_name"></span><span><input type="text" class="bom_num">' +
                            '</span><span class="style1_radio"><input type="radio" checked="" class="statusy my_radio" value="Y" name="itemstatus' + j + '">是' +
                            '&nbsp;&nbsp;&nbsp;<input type="radio" checked="" class="statusno my_radio" value="N" name="itemstatus' + j + '">否' +
                            '&nbsp;&nbsp;&nbsp;<input type="radio" checked="" class="my_radio" value="NA" name="itemstatus' + j + '">NA' +
                            '</span><span> <input type="text" class="item' + j + 'explain explain_input" value="" name="explain' + j + '"></span></div>';
                    }
                }
            } else if (url == 2 || url == 4) {
                if (url == 2) {
                    var checkboxs = '<div class="checktitle"><span>检查项目</span><span class="itemlist2">状态</span><span class="itemlist3">说明（注明问题不能解决的原因）</span></div>';
                } else if (url == 4) {
                    var checkboxs = '<div class="checktitle"><span class="itemlist1"><span class="itemlist_head">名称</span><span class="item_child">简明安装使用要求</span></span><span class="itemlist2">状态</span><span class="itemlist3">说明（注明问题不能解决的原因）</span></div>';
                }
                for (var i = 0; i < res.length; i++) {
                    var childitem = "";
                    var childstatus = "";
                    var childexplain = "";
                    if (res[i].carCheckItems.length == 0) {
                        checkboxs += '<div class="checkitem"><span class="itemlist1">' + res[i].pname +
                            '</span><span class="itemlist2 rowradio"><input checked="" type="radio" class="statusy my_radio" value="Y" name="status' + i + '">是' +
                            '&nbsp;&nbsp;&nbsp;<input type="radio" checked="" class="statusno my_radio" value="N" name="status' + i + '">否' +
                            '&nbsp;&nbsp;&nbsp;<input type="radio" checked="" class="my_radio" value="NA" name="status' + i + '">NA' +
                            '</span><span class="itemlist3"><input type="text" class="item' + i + 'explain explain_input" value="" name="explain' + i + '"></span></div>'
                    } else {
                        for (var j = 0; j < res[i].carCheckItems.length; j++) {
                            childitem += '<p>' + res[i].carCheckItems[j].cname + '</p>';
                            childstatus += '<p class="rowradio"><input type="radio" checked="" class="statusy my_radio" value="Y" name="statuschild' + i + j + '">是' +
                                '&nbsp;&nbsp;&nbsp;<input type="radio" checked="" class="statusno my_radio" value="N" name="statuschild' + i + j + '">否' +
                                '&nbsp;&nbsp;&nbsp;<input type="radio" checked="" class="my_radio" value="NA" name="statuschild' + i + j + '">NA</p>';
                            childexplain += '<p><input type="text" class="item' + j + 'explain explain_input" value="" name="explainchild' + i + j + '"></p>';
                        }
                        checkboxs += '<div class="checkitem"><span class="itemlist1">' +
                            '<span class="itemlist_head head' + i + '">' + res[i].pname + '</span>' +
                            '<span class="item_child itemlist1_child' + i + '">' + childitem + '</span>' +
                            '</span><span class="itemlist2">' + childstatus + '</span>' +
                            '<span class="itemlist3">' + childexplain + '</span></div>';
                    }
                }
            }
            $(boxname).html(checkboxs);
            $(".statusy").prop("checked", true); //默认单选框选中是
            // $("#sCheck .item25explain").val("请确认检查车辆的发动机编号为：" + getHashParameter("engineNumber") + ",车架号为：" + getHashParameter("vin"));
        }
    });
}
var cylinderArr = ["缸压（Bar）:", "1缸", "2缸", "3缸", "4缸", "燃油压力(Bar)", "实测"];
var cylinderName = ["cylinder", "one", "two", "three", "four", "fuel", "actual"];

// 初始化缸压内容
function initcylinder(box1) {
    var boxs = "";
    for (var j = 0; j < cylinderArr.length; j++) {
        boxs += '<div><label>' + cylinderArr[j] + '</label><input name="' + cylinderName[j] + '_p" type="text" value=""></div>'
    }
    $(box1).html(boxs);
    $("input[name='fuel_p']").val("4.0");
    $("input[name='fuel_p']").attr("readOnly", true);
    $("input[name='cylinder_p']").css("display", "none");
}

function initsafeCheck(box1) {
    // 缸压
    initcylinder(box1);
    // 初始化检查项目表
    getcnid(1, "#sCheck .check_itembox");
}
//安全检查重置
$(".resetsafe_btn").click(function() {
    myformReset();
});
// 线束检查重置
$(".resetwiring_btn").click(function() {
    myformReset();
});
// bom检查重置
$(".resetbom_btn").click(function() {
    myformReset();
});
// 添加表单序列化为json的方法
$.fn.mychangeform = function() {
    var aaa = this.serialize();
    var serializeArr = aaa.split("&");
    var changeArr = []; //最终传给后台的数组对象
    for (var s = 0; s < serializeArr.length; s = s + 2) {
        var f = {
            "status": "",
            "explanation": ""
        };
        f.status = serializeArr[s].split("=")[1];
        changeArr.push(f);
    }
    console.log(changeArr);
    var explainArr = [];
    // 取出explain的值，存入数组，再将值赋值给changeArr
    for (var ss = 1; ss < serializeArr.length; ss = ss + 2) {
        console.log(serializeArr[ss].split("=")[1]);
        explainArr.push(serializeArr[ss].split("=")[1]);
        for (var e = 0; e < explainArr.length; e++) {
            changeArr[e].explanation = decodeURI(explainArr[e]);
        }
    }
    return changeArr;
};

// 判断单选框是否有空
function isAllChecked(radioLength) {
    for (var i = 0; i < radioLength; i++) {
        var radios = document.getElementsByName('itemstatus' + i);
        var checkedCount = 0;
        for (var j = 0; j < radios.length; j++) {
            if (radios[j].checked) {
                checkedCount++;
            }
        }
        if (!checkedCount) {
            return false;
        }
    }
    return true;
}

function potAjax(type, url, dat, sucdata, faildata, tit) {
    $.ajax({
        type: type,
        url: url,
        data: dat,
        success: function(data) {
            console.log(data);
            if (data.ret == true) {
                toastr.success(sucdata, tit, messageOpts);
            } else {
                toastr.warning(faildata, tit, messageOpts);
            }
        },
        error: function(res) {
            toastr.warning("系统内部错误，请联系程序员小哥哥~", messageOpts, messageOpts);
        }
    });
}
// 安全检查提交
$("#sCheck_btn").click(function() {
    // 单选框的值不能为空，否则不能提交
    if (isAllChecked(12) == false) {
        alert("有选项未选择");
        return;
    }
    $.ajax({
        type: "get",
        url: "http://192.168.0.222:8080/car-management/car/findCldCheckByCar/" + getHashParameter("vSn") + ".action",
        dataType: "json",
        contentType: 'application/json;charset=UTF-8', //contentType很重要 
        crossDomain: true,
        success: function(data) {
            console.log(data);
            if (data == null) {
                console.log($(".pot_pressure").serializeObject());
                var pot_obj = $(".pot_pressure").serializeObject();
                potAjax("get", "http://192.168.0.222:8080/car-management/car/saveClacyLindersss.action?vSn=" + getHashParameter('vSn'),
                    pot_obj, "缸压提交成功，待审核", "缸压提交失败，请联系管理员", "缸压");
            } else {
                var potData = $(".pot_pressure").serializeObject();
                potData.id = data.id;
                console.log(potData);
                potAjax("get", "http://192.168.0.222:8080/car-management/car/updateCldCheckByCar/" + getHashParameter("vSn") + ".action",
                    potData, "缸压更新成功，待审核~", "缸压更新失败，请联系管理员~", "缸压");

            }
        },
        error: function(dat) {
            toastr.warning("系统内部错误，请联系程序员小哥哥~", '安全检查', messageOpts);
        }
    });
    // 安全检测表
    var form2 = $(".check_itembox").mychangeform();
    $.ajax({
        type: "get",
        url: "http://192.168.0.222:8080/car-management/car/findSafeCheckByCar/" + getHashParameter("vSn") + ".action",
        dataType: "json",
        contentType: 'application/json;charset=UTF-8', //contentType很重要 
        crossDomain: true,
        data: {},
        success: function(data) {
            console.log(data);
            if (data == null || data.length == 0) {
                Dataport("http://192.168.0.222:8080/car-management/car/addSafeCheck/" + getHashParameter("vSn") + ".action",
                    "post", JSON.stringify(form2), "安全/附件检查", "安全/附件检查提交成功，待审核~", "安全/附件检查提交失败，请联系管理员~");
                // myformReset(); //表单重置
            } else {
                for (var i = 0; i < data.length; i++) {
                    form2[i].uuid = data[i].uuid;
                }
                Dataport("http://192.168.0.222:8080/car-management/car/updateSafeCheckByCar/" + getHashParameter("vSn") + ".action",
                    "post", JSON.stringify(form2), "安全/附件检查", "安全/附件检查更新成功，待审核~", "安全/附件检查更新失败，请联系管理员~");
            }
        },
        error: function(dat) {
            toastr.warning("系统内部错误，请联系程序员小哥哥~", '安全检查', messageOpts);
        }
    });
});

//线束检查初始化 -------------------------------------------------------------------------------------------------------------
//线束检查初始化
function initWiringCheck(box1) {
    addMenu("#wiringCheck .checkMenus", 2);
    // 初始化检查项目表
    getcnid(2, ".wcheck_itembox");
}

// 线束检查提交
$("#wiringCheck_btn").click(function() {
    var item1 = $("#wiringCheck .my_radio:checked");
    var item2 = $("#wiringCheck input[type='text']");
    var sucArr = [];
    for (var i = 0; i < item1.length; i++) {
        var sucobj = {};
        sucArr.push({ "status": item1[i].value, "explanation": item2[i].value })
    }
    console.log(JSON.stringify(sucArr));
    // 先判断线束表单是否已经提交
    $.ajax({
        "url": "http://192.168.0.222:8080/car-management/car/findHiCheckByCar/" + getHashParameter("vSn") + ".action",
        "type": "get",
        "data": {},
        contentType: 'application/json;charset=UTF-8', //contentType很重要 
        crossDomain: true,
        "success": function(res) {
            console.log(res);
            if (res == null || res.length == 0) {
                Dataport("http://192.168.0.222:8080/car-management/car/addHiCheck/" + getHashParameter("vSn") + ".action",
                    "post", JSON.stringify(sucArr), "线束检查", "线束检查提交成功，待审核~", "BOM检查提交失败，请联系管理员~");

            } else {
                for (var i = 0; i < res.length; i++) {
                    sucArr[i].uuid = res[i].uuid;
                }
                Dataport("http://192.168.0.222:8080/car-management/car/updateHiCheckByCar/" + getHashParameter("vSn") + ".action",
                    "post", JSON.stringify(sucArr), "线束检查", "线束检查更新成功，待审核~", "BOM检查更新失败，请联系管理员~");
            }
        },
        "error": function(res) {
            toastr.warning('发生内部错误，请联系程序员', '查看安全/附件检查信息', messageOpts);
        }
    });
});
//bom检查初始化 -------------------------------------------------------------------------------------------------------------
function initBomCheck(box1) {
    addMenu("#bomCheck .checkMenus", 3);
    // 初始化检查项目表
    getcnid(3, ".bomcheck_itembox");
}
// bom检查提交
$("#bomCheck_btn").click(function() {
    // 单选框的值不能为空，否则不能提交
    if (isAllChecked(11) == false) {
        alert("有选项未选择");
        return;
    }
    var item1 = $("#bomCheck .bom_name");
    var item2 = $("#bomCheck .bom_num");
    var item3 = $("#bomCheck .my_radio:checked");
    var item4 = $("#bomCheck .explain_input");
    var bomobjArrs = [];
    for (var i = 0; i < item1.length; i++) {
        var bomobj = {};
        bomobjArrs.push({ "bomName": item1[i].value, "partName": item2[i].value, "status": item3[i].value, "explanation": item4[i].value })
            // if (item1[i].value != null && item1[i].value != "") {
            //     console.log(bomobjArrs[i]);
            // }
    }
    console.log(bomobjArrs);
    // 先检查是否已提交如果未提交则提交否则更新
    $.ajax({
        "url": "http://192.168.0.222:8080/car-management/car/findEmsAndBomCheckByCar/" + getHashParameter("vSn") + ".action",
        "type": "get",
        "data": {},
        contentType: 'application/json;charset=UTF-8', //contentType很重要 
        crossDomain: true,
        "success": function(res) {
            console.log(res);
            if (res == null || res.length == 0) {
                // 提交接口
                Dataport("http://192.168.0.222:8080/car-management/car/addEmsAndBomCheck/" + getHashParameter("vSn") + ".action",
                    "post", JSON.stringify(bomobjArrs), "BOM检查", "BOM检查提交成功，待审核~", "BOM检查提交失败，请联系管理员~");
            } else {
                // 更新接口
                for (var i = 0; i < res.length; i++) {
                    bomobjArrs[i].uuid = res[i].uuid;
                }
                Dataport("http://192.168.0.222:8080/car-management/car/updateEmsAndBomCheckByCar/" + getHashParameter("vSn") + ".action",
                    "post", JSON.stringify(bomobjArrs), "BOM检查", "BOM检查更新成功，待审核~", "BOM检查更新失败，请联系管理员~");
            }
        },
        "error": function(res) {
            toastr.warning('发生内部错误，请联系程序员', '查看安全/附件检查信息', messageOpts);
        }
    });
});
//安全、线束、bom 提交和更新接口封装
function Dataport(url, type, dat, tiptitle, tipcontent_suc, tipcontent_fail) {
    console.log(dat);
    $.ajax({
        type: type,
        url: url,
        contentType: 'application/json;charset=UTF-8', //contentType很重要 
        crossDomain: true,
        data: dat,
        success: function(data) {
            console.log(data);
            if (data.ret == true) {
                toastr.success(tipcontent_suc, tiptitle, messageOpts);
            } else {
                toastr.warning(tipcontent_fail, tiptitle, messageOpts);
            }
        },
        error: function(res) {
            toastr.warning("系统内部错误，请联系程序员小哥哥~", messageOpts, messageOpts);
        }
    });
}

// 还车点检----------------------------------------------------------------------------------------
$(".resetreturncheck_btn").click(function() {
    formReset();
    $("#returncarCheck #vSn").val(getHashParameter("vSn")); //车辆编号
    $("#returncarCheck #vin").val(getHashParameter("vin")); //车架号
    $("#returncarCheck #engineNumber").val(getHashParameter("engineNumber")); //发动机编号
});
$("#returncarCheck_btn").click(function() {
    if ($("#returncarCheck .trans_sn").val() == "" || $("#returncarCheck .forpeople").val() == "") {
        toastr.warning('有选项为空', '还车点检', messageOpts);
        return;
    }
    var returncarCheckdata = {
        "vSn": $("#returncarCheck .vSn").val(),
        "toolisrecycled": $("#returncarCheck input[name='toolisrecycled']:checked").val(),
        "sparetyre": $("#returncarCheck .sparetyre").val(), //备用轮胎
        "tools": $("#returncarCheck .tools").val(),
        "jack": $("#returncarCheck .jack").val(),
        "warningboard": $("#returncarCheck .warningboard").val(), //紧急停车牌
        "fire": $("#returncarCheck .fire").val(),
        "keyy": $("#returncarCheck .keyy").val(), //钥匙数量
        "odometer": $("#returncarCheck .ododmeter").val(),
        "proposer": $("#returncarCheck .proposer").val(),
        "forpeople": $("#returncarCheck .forpeople").val(), //交车人
        "pickone": $("#returncarCheck .pickone").val(),
        "pick_tel": $("#returncarCheck .pick_tel").val(), //接车人电话
        "pick_card": $("#returncarCheck .pick_card").val(),
        "trans_sn": $("#returncarCheck .trans_sn").val(), //运输车号
        "time": $("#returncarCheck input[name='receivecar']").val()
    };
    requestTypein("http://192.168.0.222:8080/car-management/car/backCheck.action", returncarCheckdata, "", "");
});

// 还车点检返回
$(".returncarcheck_return").click(function() {
    loadsucAudit();
});


// 驾驶员录入：
$(".add_driver").click(function() {
    if ($("#drivername").val() == "") {
        alert("有必填项未填写！");
        return;
    }
    // 有22个字段
    var driverCheckdata = {
        "name": $("#drivername").val(), //驾驶员姓名
        "sex": $("input[name='driversex']:checked").val(),
        "age": $("#driverage").val(),
        "telephone": $("#telephone").val(),
        "birthday": $("#birthday").val(),
        "iccard": $("#iccard").val(),
        "isallow": $("input[name='isallow']:checked").val(), //是否授权
        "allowStartTime": $("#allowStartTime").val(),
        "allowEndTime": $("#allowEndTime").val(),
        "remark": $("#carTypeIn_remake").val()
    }
    var that = this;
    requestTypein("http://192.168.0.222:8080/car-management/carDriver/add.action", driverCheckdata, that, "driverList");
    $(this).attr({ "data-dismiss": "modal", "aria-label": "Close" });
});
// 驾驶员更新：
$(".update_driver").click(function() {
    console.log("update");
    if ($("#drivername").val() == "") {
        alert("有必填项未填写！");
        return;
    }
    // 有22个字段
    var driveupdata = {
        "id": getHashParameter("driverid"),
        "name": $("#drivername").val(), //驾驶员姓名
        "sex": $("input[name='driversex']:checked").val(),
        "age": $("#driverage").val(),
        "telephone": $("#telephone").val(),
        "birthday": $("#birthday").val(),
        "iccard": $("#iccard").val(),
        "isallow": $("input[name='isallow']:checked").val(), //是否授权
        "allowStartTime": $("#allowStartTime").val(),
        "allowEndTime": $("#allowEndTime").val(),
        "remark": $("#carTypeIn_remake").val()
    }
    console.log(driveupdata);
    var that = this;
    requestTypein("http://192.168.0.222:8080/car-management/carDriver/update.action", driveupdata, that, "driverList");
    $(this).attr({ "data-dismiss": "modal", "aria-label": "Close" });

});