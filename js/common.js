var todayDate = new Date();
var dateend = new Date(todayDate);
dateend.setDate(todayDate.getDate() + 365);
lay('.much-date').each(function() {
    laydate.render({
        elem: this,
        trigger: 'click',
        format: 'yyyy-MM-dd',
        value: null,
        theme: '#041473'
    });
});
lay('.today-date').each(function() {
    laydate.render({
        elem: this,
        trigger: 'click',
        format: 'yyyy-MM-dd',
        value: todayDate,
        theme: '#041473'
    });
});
lay('.end-date').each(function() {
    laydate.render({
        elem: this,
        trigger: 'click',
        format: 'yyyy-MM-dd',
        value: dateend,
        theme: '#041473'
    });
});
var allurl = window.allurl = "http://192.168.0.222:8080";
/**
 * 获取hash参数
 */
function getHashParameter(key) {
    var params = getHashParameters();
    return params[key];
}

function getHashParameters() {
    var arr = (location.hash || "").replace(/^\#/, '').split("&");
    var params = {};
    for (var i = 0; i < arr.length; i++) {
        var data = arr[i].split("=");
        if (data.length == 2) {
            params[data[0]] = data[1];
        }
    }
    return params;
}
// 历史回退，监听hash 变化，改变页面tabs
function changeTabs() {
    var htmlHas = window.location.hash;
    var htmlli = htmlHas.split("#")[1];
    htmlli = "." + htmlli;
    //左侧菜单 显示隐藏切换
    $(htmlli).parent().siblings().slideUp(250);
    $(htmlli).siblings().removeClass("active");
    $(htmlli).siblings().removeClass("active");
    $(htmlli).parent().parent().parent().siblings().removeClass("active");
    $(htmlli).parent().parent().slideDown(250);
    $(htmlli).addClass("active");
    $(htmlli).parent().addClass("active");
    $(htmlli).parent().parent().parent().addClass("active");

    //右侧tabs 显示隐藏切换
    $(htmlHas).siblings().removeClass("active");
    $(htmlHas).addClass("active");
}

// 表单重置
function myformReset() {
    $(':input', 'form')
        .not(':button,:radio,:submit') // 去除不需要重置的input类型
        .val('')
        .removeAttr('checked')
        .removeAttr('selected');
};
// 设置消息提示框的配置xinxi
toastr.options = messageOpts;
//设置显示配置
var messageOpts = {
    "closeButton": true, //是否显示关闭按钮
    "debug": false, //是否使用debug模式
    "positionClass": "toast-top-center", //弹出窗的位置
    "onclick": null,
    "showDuration": "300", //显示的动画时间
    "hideDuration": "1000", //消失的动画时间
    "timeOut": "1500", //展现时间
    "extendedTimeOut": "80000", //加长展示时间
    "showEasing": "swing", //显示时的动画缓冲方式
    "hideEasing": "linear", //消失时的动画缓冲方式
    "showMethod": "fadeIn", //显示时的动画方式
    "hideMethod": "fadeOut" //消失时的动画方式
};
// s 页面懒加载
document.onreadystatechange = loadingChange; //当页面加载状态改变的时候执行这个方法.  
function loadingChange() {
    if (document.readyState == "complete") { //当页面加载状态为完全结束时进入   
        $(".loading").hide(); //当页面加载完成后将loading页隐藏  
        $(".fixed-table-loading").hide(); //当页面加载完成后将loading页隐藏  
    } else {
        setTimeout(function() {
            $(".loading").hide(); //当页面加载完成后将loading页隐藏  
            $(".fixed-table-loading").hide(); //当页面加载完成后将loading页隐藏 
        }, 3000)
    }
}
// 表单正则判断函数
function inputVal(inputid, but) {
    var reg = /^\d{1,}$/; //必须为int型
    var originhtml = $(inputid).siblings().html();
    $(inputid).bind('input porpertychange', function() {
        var val = $(inputid).val();
        if (val == "") {
            return;
        }
        var regg = reg.test(val);
        if (regg == false) {
            $(inputid).siblings().html("格式不正确");
            $(inputid).siblings().removeClass("col-sm-2").addClass("col-sm-5 vSn_tips");
            $(but).attr("disabled", true);
        } else {
            $(inputid).siblings().html(originhtml);
            $(inputid).siblings().removeClass("col-sm-5 vSn_tips").addClass("col-sm-2");
            $(but).attr("disabled", false);
        }
    });
}
// checkbox 反选
function Invert(btn, name) {
    $(btn).click(function() {
        $(name + ' input[name="checkbox"]').prop("checked", this.checked);
    });
    var $subBox = $(name + " input[name='checkbox']");
    $subBox.click(function() {
        $(btn).attr("checked", $subBox.length == $(name + " input[name='checkbox']:checked").length ? true : false);
    });
}
// 删除所有接口
function deletAll(a, name) {
    // var a = $("#carLogTable").bootstrapTable('getSelections');
    var delArr = [];
    var nameArr = [];
    var delString = "";
    var delata = {};
    // console.log(a);
    if (a.length >= 1) {
        for (var i = 0; i < a.length; i++) {
            delArr.push(a[i].id);
            nameArr.push(a[i].name);
        }
        delString = delArr.join(",");
        nameString = nameArr.join(",");
        delata = {
            "ids": delString
        };

        if (name == "editcarInfo") { //编辑更新车辆信息
            // 编辑车辆信息
            $("#addcar_model").modal();
            $("#addcar_model #myModalLabel").html("编辑车辆信息");
            creatForm(addcarInfo, "#addcar_model .modal-body .form-horizontal", "subcar_btn");
        } else if (name == "Ins_apply") { //保险申请
            $("#del_model").modal();
            $("#del_model .text-center").html('<i class="glyphicon glyphicon-thumbs-up"></i>&nbsp;&nbsp;<span>确认申请吗？</span>');
            $(".modal_del").click(function() {
                console.log(delata);
                delPort(allurl + "/data-management/terminal/delete.json", delata, "get", name,
                    "申请保险", "申请保险失败", "申请保险成功");
            })
        } else if (name == "driverdel") { //删除驾驶员
            $("#del_model").modal();
            $(".modal_del").click(function() {
                delPort(allurl + "/data-management/terminal/delete.json", delata, "get", name,
                    "驾驶员删除", "驾驶员删除失败", "驾驶员删除成功");
            })
        } else if (name == "cancelimpower") { //取消驾驶员授权
            $("#del_model").modal();
            $("#del_model .text-center").html('<i class="glyphicon glyphicon-remove"></i>&nbsp;&nbsp;<span>确认要取消授权吗？</span>');
            $(".modal_del").click(function() {
                delPort(allurl + "/data-management/terminal/delete.json", delata, "get", name,
                    "驾驶员取消授权", "驾驶员取消授权失败", "驾驶员取消授权成功");
            })
        } else if (name == "approve_all") { //驾驶员授权
            var approveArr = [];
            for (var i = 0; i < a.length; i++) {
                approveArr.push({
                    "id": a[i].id
                });
            }
            var approveobj = {
                "startTime": $("#add_model .modal-body" + ' input[name="' + "startTime" + '"]').val(),
                "endTime": $("#add_model .modal-body" + ' input[name="' + "endTime" + '"]').val(),
                ids: approveArr
            };
            $("#add_model").modal();
            $("#add_model #myModalLabel").html("驾驶员授权");
            creatForm(approveInfo, "#add_model .modal-body form", "approve_btn");
            $("#add_model .modal-body .name").val(nameString);
            $(".approve_btn").click(function() { //点击确认
                delPort(allurl + "/car-management/carDriver/authorized.action", approveArr, "post",
                    name, "驾驶员授权", "授权失败", "授权成功");
                $(this).attr({ "data-dismiss": "modal", "aria-label": "Close" });
            })
        }
    } else {
        toastr.warning('最少选中一行', '提示', messageOpts);
    }
}
// 删除接口
function delPort(url, dat, type, name, tit, filToa, sucToa) {
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
                if (name == "Ins_apply") {
                    // 保险申请成功是否跳转到保险申请页面，还是继续停留在车辆列表页面？
                } else if (name == "del_allcar") {} else if (name == "cancel_bind" || name == "cancel_bind_row") { //解除绑定
                } else if (name == "driverdel") { //删除驾驶员
                    loadDriverList();
                } else if (name == "sumCarList") {
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

// 通用数据提交接口
function subData(url, data, type, name) {
    $.ajax({
        url: url,
        type: type,
        data: data,
        "dataType": "jsonp", //数据类型为jsonp  
        "jsonp": "jsonpCallback", //服务端用于接收callback调用的function名的参数
        success: function(res) {
            console.log(res);
            if (res.ret == true) {
                toastr.success(res.msg, "提示", messageOpts);
                console.log(name);
                if (name == "subDriver_btn" || name == "editDriver_btn") {
                    console.log("驾驶员添加成功");
                } else if (name == "subcar_btn" || name == "editcar_btn") {}
            } else {
                toastr.warning(res.msg, "提示", messageOpts);
                return;
            }
        },
        "error": function(res) {
            toastr.error('程序内部错误', tit, messageOpts);
        }
    })
}
// 表单查询选项封装  inline型
function creatSelect(filArr, name, btnname) {
    var ss = "";
    var optstyle = "";
    for (var i = 0; i < filArr.length; i++) {
        if (filArr[i].type == "data") {
            var ifdata = "today-date";
            optstyle = '<input type="text" class="' + ifdata + '" lay-key="1"> '
        } else if (filArr[i].type == "select") {
            var ifdata = "";
            var options = "";
            for (var j = 0; j < filArr[i].option.length; j++) {
                options += '<option value="' + filArr[i].option[j].name + '" name="' + filArr[i].option[j].name + '">' + filArr[i].option[j].name + '</option>';
            }
            optstyle = '<select class="">' + options + '</select>'
        } else if (filArr[i].type == "text") {
            var ifdata = "";
            optstyle = '<input type="text" name="' + filArr[i].inputName + '" class="form-control ' + ifdata + '" > '
        }
        ss += '<div class="form-group">' +
            '<label for="exampleInputName2">' + filArr[i].name + '：</label>' +
            '<span>' + optstyle + '</span>' +
            '</div>'
    }
    ss += '<button type="button" style="margin-left:20px;" class="btn btn-default my_btn ' + btnname + '">查询</button>';
    $(name).html(ss);
};
// 表单查询选项封装  even_style型
function creatForm(filArr, name, btnname) {
    var ss = "";
    var optstyle = ""
    for (var i = 0; i < filArr.length; i++) {
        if (filArr[i].type == "data") {
            var ifdata = "much-date";
            optstyle = '<input type="text" name="' + filArr[i].inputName + '" class="form-control col-sm-7 ' + ifdata + '" value="" typeholder="' + filArr[i].type + '"> <label class="col-sm-5 tip_style ">' + filArr[i].must + '</label>'
        } else if (filArr[i].type == "today-date") {
            optstyle = '<input type="text" name="' + filArr[i].inputName + '" class="form-control col-sm-7 today-date" value="" typeholder="' + filArr[i].type + '"> <label class="col-sm-5 tip_style ">' + filArr[i].must + '</label>'
        } else if (filArr[i].type == "end-date") {
            optstyle = '<input type="text" name="' + filArr[i].inputName + '" class="form-control col-sm-7 end-date" value="" typeholder="' + filArr[i].type + '"> <label class="col-sm-5 tip_style ">' + filArr[i].must + '</label>'
        } else if (filArr[i].type == "select") {
            var ifdata = "";
            var options = "";
            for (var j = 0; j < filArr[i].option.length; j++) {
                options += '<option value="' + filArr[i].option[j].name + '" name="' + filArr[i].option[j].name + '" class="' + filArr[i].option[j].name + '">' + filArr[i].option[j].name + '</option>';
            }
            optstyle = '<select class="form-control col-sm-7 ' + filArr[i].inputName + '">' + options + '</select> <label class="col-sm-5 tip_style ">' + filArr[i].must + '</label>'
        } else if (filArr[i].type == "checkbox") {
            var optstyle = "";
            for (var j = 0; j < filArr[i].option.length; j++) {
                optstyle += '<input type="checkbox" value="' + filArr[i].option[j].name + '" name="' + filArr[i].option[j].name + '" class="' + filArr[i].option[j].name + '">' + filArr[i].option[j].name;
            }
        } else if (filArr[i].type == "radio") {
            var optstyle = "";
            for (var j = 0; j < filArr[i].option.length; j++) {
                optstyle += '<input type="radio" value="' + filArr[i].option[j].name + '" name="' + filArr[i].option[j].name + '" class="' + filArr[i].option[j].name + '">' + filArr[i].option[j].name;
            }
        } else if (filArr[i].type == "text") {
            optstyle = '<input type="text" name="' + filArr[i].inputName + '" class="form-control col-sm-7 ' + filArr[i].inputName + '" value="" typeholder="' + filArr[i].type + '"> <label class="col-sm-5 tip_style ">' + filArr[i].must + '</label>'
        } else if (filArr[i].type == "file") {
            optstyle = '<input type="file" name="' + filArr[i].inputName + '" class="form-control col-sm-7 ' + filArr[i].inputName + '" value="" typeholder="' + filArr[i].type + '"> <label class="col-sm-5 tip_style ">' + filArr[i].must + '</label>'
        }
        ss += '<div class="form-group">' +
            '<label class="col-sm-4 control-label">' + filArr[i].name + '：</label>' +
            '<div class="col-sm-6">' + optstyle + '</div>' +
            '</div>'
    }
    ss += '<div class="form-group">' +
        '<div class="col-sm-offset-4 col-sm-5">' +
        '<button type="button" data-dismiss="" aria-label="" class="btn btn-default btn-primary ' + btnname + '">保存</button>' +
        '<button type="button" class="btn btn-default btn-primary" data-dismiss="modal">取消</button>' +
        '</div>' +
        '</div>';
    $(name).html(ss);
    lay('.today-date').each(function() {
        laydate.render({
            elem: this,
            trigger: 'click',
            format: 'yyyy-MM-dd',
            value: todayDate,
            theme: '#041473'
        });
    });
    lay('.end-date').each(function() {
        laydate.render({
            elem: this,
            trigger: 'click',
            format: 'yyyy-MM-dd',
            value: dateend,
            theme: '#041473'
        });
    });
};
// form表单数据回显函数
function showData(boxname, obj) {
    for (var k in obj) {
        console.log($(boxname + ' input[name="' + k + '"]'));
        $(boxname + ' input[name="' + k + '"]').val(obj[k]);
        $(boxname + ' option[name="' + obj[k] + '"]').attr("selected", "selected");
    }
}
// 面包屑导航/路径导航
function changBread(bread1, bread2) {
    breadHtml = "<ol class='breadcrumb'> <li><span>当前位置:&nbsp;&nbsp;&nbsp;测试车辆管理系统&nbsp;&nbsp;&nbsp;</span>" + bread1 + " </li><li>" +
        bread2 + "</li> </ol>";
    $("#page_left_title").html(breadHtml);
}
changBread("GPS", "车辆地图");

function getcnid(url, boxname) {
    console.log(url);
    $.ajax({
        // "url": "http://localhost/car/defcar/json/item" + url + ".json",
        "url": "https://wangyifannn.github.io/newdefcar/json/item" + url + ".json",
        // "url": "http://192.168.0.222:8080/car-management/car/findAllParentItem.action?CNID=" + url,
        "type": "get",
        "success": function(res) {
            if (url == 1 || url == 3) {
                if (url == 1) {
                    var checkboxs = '<div class="checktitle"><span>检查项目</span><span>要求</span><span>状态</span><span>说明问题原因</span></div>';
                    for (var i = 0; i < res.length; i++) {
                        checkboxs += '<div class="checkitem"><span>' + res[i].pname +
                            '</span><span>' + res[i].carCheckRequest.request +
                            '</span><span class="style1_radio"><input type="radio" checked="" class="statusy" value="Y" name="itemstatus' + i + '">是' +
                            '&nbsp;&nbsp;&nbsp;<input type="radio" checked="" class="statusno" value="N" name="itemstatus' + i + '">否' +
                            '&nbsp;&nbsp;&nbsp;<input type="radio" checked="" class="" value="NA" name="itemstatus' + i + '">NA' +
                            '</span><span> <input type="text" class="item' + i + 'explain explain_input" value="" name="explain' + i + '"></span></div>';
                    }
                } else if (url == 3) {
                    var checkboxs = '<div class="checktitle"><span>零部件名称</span><span>零部件号</span><span>状态</span><span>说明问题原因</span></div>';
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
                    var checkboxs = '<div class="checktitle"><span>检查项目</span><span class="itemlist2">状态</span><span class="itemlist3">说明问题原因</span></div>';
                } else if (url == 4) {
                    var checkboxs = '<div class="checktitle"><span class="itemlist1"><span class="itemlist_head">名称</span><span class="item_child">简明安装使用要求</span></span><span class="itemlist2">状态</span><span class="itemlist3">说明问题原因</span></div>';
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

function initsafeCheck(box1, box2) {
    initcylinder(box1); // 缸压
    getcnid(1, box2); // 初始化检查项目表
}

function findSafeInfo(box1, box2) {
    initcylinder(box1); // 缸压
    getcnidSolve(1, box2); // 初始化检查项目表
}



function initToolRecord(name, vSn, page) {
    // 查询装备记录详情，如果有，加载列表页面，没有进入选择页面
    $.ajax({
        // url: "http://192.168.0.222:8080/car-management/car/develop/find/" + vSn + ".action",
        url: "https://wangyifannn.github.io/newdefcar/json/tool.json",
        // url: "http://localhost/car/defcar/json/tool.json",
        type: "get",
        data: {},
        success: function(res) {
            console.log(res);
            if (res == null || toolnameArr.length == 0) {
                $(name).html("");
                if (page == "detail") {
                    toastr.warning('尚未申请研发工具等', '研发工具装备记录详情', messageOpts);
                    return;
                }
                toastr.success('未申请，请填写', '研发工具装备记录', messageOpts);
                var checkitems = '<div class="checktitle"><span>工具或设备名称</span></div>';
                for (var i = 0; i < 10; i++) {
                    checkitems += '<div class="checkitem" id="' + i + '"><span><input type="text" class="bom_name" value="' + res[i].toolName + '">' +
                        '</span></div>';
                }
                $(name).html(checkitems);
                $("#tool_submit_btn").click(function() {
                    var toolNameArr = $(".tool_Form input[name='toolname']:checked");
                    var toolArr = [];
                    for (var i = 0; i < toolNameArr.length; i++) {
                        toolArr.push({ "toolName": toolNameArr[i].value });
                    }
                    // 申请研发
                    $.ajax({
                        url: "http://192.168.0.222:8080/car-management/car/develop/save/" + vSn + ".action",
                        type: "post",
                        data: JSON.stringify(toolArr),
                        contentType: 'application/json;charset=UTF-8', //contentType很重要 
                        crossDomain: true,
                        success: function(res) {
                            console.log(res);
                            if (res.ret == true) {
                                toastr.success('研发工具申请成功', '研发工具装备记录', messageOpts);
                            } else {
                                toastr.warning('研发工具申请失败', '研发工具装备记录', messageOpts);
                            }
                        },
                        "error": function(res) {
                            toastr.error('程序内部错误', '审核', messageOpts);
                        }
                    })
                })
            } else {
                var optname = "操作";
                var datecontent = "";
                var optcontent = '<button type="button" class="tool_btn btn my_btn" value="">提交</button>';
                if (page == "detail") {
                    optname = "操作人";
                    $(name + " input").attr("disabled", "disabled");
                }
                var toolItem = '<div class="checktitle"><span style="width:41%;">研发工具申请信息</span><span style="width:59%;">研发工具装备信息</span></div>';
                toolItem += '<div class="checktitle"><span>工具或设备名称</span><span>申请人</span><span>装备日期</span><span>' + optname + '</span></div>';
                for (var i = 0; i < res.length; i++) {
                    if (page == "detail") {
                        optcontent = res[i].operator;
                        datecontent = res[i].equippedDate;
                        if (res[i].operator == "") {
                            optcontent = "--";
                            datecontent = "--";
                        }
                    } else {
                        datecontent = '<input placeholder="请选择日期"  id="installtoolTime' + i + '" class="form-control col-sm-7 layer-date">';
                    }
                    toolItem += '<div class="checkitem" id="' + res[i].id + '"><span><input type="text" readOnly="readOnly" class="bom_name" value="' + res[i].toolName + '">' +
                        '</span><span><input type="text" readOnly="readOnly" class="bom_num" value="' + res[i].applicant + '">' +
                        '</span><span>' + datecontent +
                        '</span><span>' + optcontent + '</span></div>';
                }
                $(name).html("");
                $(name).html(toolItem);
                for (var i = 0; i < toolnameArr.length; i++) {
                    laydate.render({
                        elem: '#installtoolTime' + i, //装备日期
                        type: 'datetime', //精确到 时分秒
                        theme: '#041473'
                    });
                }
                // 装备提交
                $(".tool_btn").click(function() {
                    // 研发装备提交
                    var toolDataArr = [];
                    console.log($(this).parent().parent());
                    console.log($(this).parent().parent().attr("id"));
                    console.log($(this).parent().siblings().children(".layer-date"));
                    console.log($(this).parent().siblings().children(".layer-date").val());
                    // 申请编号，装备日期
                    toolDataArr.push({ id: $(this).parent().parent().attr("id"), "equippedDate": $(this).parent().siblings().children(".layer-date").val() });
                    $.ajax({
                        url: "http://192.168.0.222:8080/car-management/car/develop/update/" + vSn + ".action",
                        type: "post",
                        data: JSON.stringify(toolDataArr),
                        contentType: 'application/json;charset=UTF-8', //contentType很重要 
                        crossDomain: true,
                        success: function(res) {
                            console.log(res);
                            if (res.ret == true) {
                                toastr.success('装备日期提交成功', '研发工具装备记录', messageOpts);
                            } else {
                                toastr.warning('装备日期提交失败', '研发工具装备记录', messageOpts);
                            }
                        },
                        "error": function(res) {
                            toastr.error('程序内部错误', '审核', messageOpts);
                        }
                    })
                })
            }
        },
        "error": function(res) {
            toastr.error('程序内部错误', '审核', messageOpts);
        }
    })
}

// 5列
function getcnidSolve(url, boxname) {
    console.log(url);
    $.ajax({
        // "url": "http://localhost/car/defcar/json/item" + url + ".json",
        "url": "https://wangyifannn.github.io/newdefcar/json/item" + url + ".json",
        // "url": "http://192.168.0.222:8080/car-management/car/findAllParentItem.action?CNID=" + url,
        "type": "get",
        "success": function(res) {
            if (url == 1 || url == 3) {
                if (url == 1) {
                    var checkboxs = '<div class="checktitle"><span>检查项目</span><span>要求</span><span>状态</span><span>说明问题原因</span><span>注明解决方法</span></div>';
                    for (var i = 0; i < res.length; i++) {
                        checkboxs += '<div class="checkitem"><span>' + res[i].pname +
                            '</span><span>' + res[i].carCheckRequest.request +
                            '</span><span class="style1_radio"><input type="radio" checked="" class="statusy" value="Y" name="itemstatus' + i + '">是' +
                            '&nbsp;&nbsp;&nbsp;<input type="radio" checked="" class="statusno" value="N" name="itemstatus' + i + '">否' +
                            '&nbsp;&nbsp;&nbsp;<input type="radio" checked="" class="" value="NA" name="itemstatus' + i + '">NA' +
                            '</span><span><input type="text" class="item' + i + 'explain explain_input" value="" name="explain' + i + '"></span>' +
                            '<span><input type="text" class="solve' + i + ' solve_input" value="" name="solve' + i + '"></span></div>';
                    }
                } else if (url == 3) {
                    var checkboxs = '<div class="checktitle"><span>零部件名称</span><span>零部件号</span><span>状态</span><span>说明问题原因</span><span>注明解决方法</span></div>';
                    for (var i = 0; i < res.length; i++) {
                        checkboxs += '<div class="checkitem"><span><input type="text" class="bom_name" value="' + res[i].pname + '">' +
                            '</span><span><input type="text" class="bom_num" value="' + res[i].components.name + '">' +
                            '</span><span class="style1_radio"><input type="radio" checked="" class="statusy my_radio" value="Y" name="itemstatus' + i + '">是' +
                            '&nbsp;&nbsp;&nbsp;<input type="radio" checked="" class="statusno my_radio" value="N" name="itemstatus' + i + '">否' +
                            '&nbsp;&nbsp;&nbsp;<input type="radio" checked="" class="my_radio" value="NA" name="itemstatus' + i + '">NA' +
                            '</span><span> <input type="text" class="item' + i + 'explain explain_input" value="" name="explain' + i + '"></span>' +
                            '<span><input type="text" class="solve' + i + ' solve_input" value="" name="solve' + i + '"></span></div>';
                    }
                }
            } else if (url == 2 || url == 4) {
                if (url == 2) {
                    var checkboxs = '<div class="checktitle"><span>检查项目</span><span class="itemlist2">状态</span><span class="itemlist3">说明问题原因</span><span>注明解决方法</span></div>';
                } else if (url == 4) {
                    var checkboxs = '<div class="checktitle"><span class="itemlist1"><span class="itemlist_head">名称</span><span class="item_child">简明安装使用要求</span></span><span class="itemlist2">状态</span><span class="itemlist3">说明问题原因</span><span>注明解决方法</span></div>';
                }
                for (var i = 0; i < res.length; i++) {
                    var childitem = "";
                    var childstatus = "";
                    var childexplain = "";
                    var childsolve = "";
                    if (res[i].carCheckItems.length == 0) {
                        checkboxs += '<div class="checkitem"><span class="itemlist1">' + res[i].pname +
                            '</span><span class="itemlist2 rowradio"><input checked="" type="radio" class="statusy my_radio" value="Y" name="status' + i + '">是' +
                            '&nbsp;&nbsp;&nbsp;<input type="radio" checked="" class="statusno my_radio" value="N" name="status' + i + '">否' +
                            '&nbsp;&nbsp;&nbsp;<input type="radio" checked="" class="my_radio" value="NA" name="status' + i + '">NA' +
                            '</span><span class="itemlist3"><input type="text" class="item' + i + 'explain explain_input" value="" name="explain' + i + '"></span>' +
                            '<span class="itemlist4"><input type="text" class="solve' + i + ' solve_input" value="" name="solve' + i + '"></span></div>';
                    } else {
                        for (var j = 0; j < res[i].carCheckItems.length; j++) {
                            childitem += '<p>' + res[i].carCheckItems[j].cname + '</p>';
                            childstatus += '<p class="rowradio"><input type="radio" checked="" class="statusy my_radio" value="Y" name="statuschild' + i + j + '">是' +
                                '&nbsp;&nbsp;&nbsp;<input type="radio" checked="" class="statusno my_radio" value="N" name="statuschild' + i + j + '">否' +
                                '&nbsp;&nbsp;&nbsp;<input type="radio" checked="" class="my_radio" value="NA" name="statuschild' + i + j + '">NA</p>';
                            childexplain += '<p><input type="text" class="item' + j + 'explain explain_input" value="" name="explainchild' + i + j + '"></p>';
                            childsolve += '<p><input type="text" class="solve' + i + ' solve_input" value="" name="solve' + i + '"></p>';
                        }
                        checkboxs += '<div class="checkitem"><span class="itemlist1">' +
                            '<span class="itemlist_head head' + i + '">' + res[i].pname + '</span>' +
                            '<span class="item_child itemlist1_child' + i + '">' + childitem + '</span>' +
                            '</span><span class="itemlist2">' + childstatus + '</span>' +
                            '<span class="itemlist3">' + childexplain + '</span>' +
                            '<span class="itemlist4">' + childsolve + '</span></div>';
                    }
                }
            }
            $(boxname).html(checkboxs);
            $(".statusy").prop("checked", true); //默认单选框选中是
        }
    });
}