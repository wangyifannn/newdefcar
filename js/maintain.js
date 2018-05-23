// 维修申请
// 车辆编号校验
$("#maintainTypeIn .vSn").bind('input porpertychange', function() {
    console.log($("#maintainTypeIn .vSn").val());
    if ($("#maintainTypeIn .vSn").val() == null || $("#maintainTypeIn .vSn").val() == "") {
        return;
    } else {
        $.ajax({
            url: "http://192.168.0.222:8080/car-management/car/check/" + $("#maintainTypeIn .vSn").val() + "/1.action",
            type: "get",
            "dataType": "jsonp", //数据类型为jsonp  
            "jsonp": "jsonpCallback", //服务端用于接收callback调用的function名的参数  
            success: function(res) {
                console.log(res);
                if (res.ret == false) {
                    $(".m_vSn_tips").html("车辆编号正确");
                    $("#send_btn").attr("disabled", false);
                    $.ajax({
                        type: "get",
                        url: "http://192.168.0.222:8080/car-management/carMaintain/check/" + $("#maintainTypeIn .vSn").val() + ".action",
                        "dataType": "jsonp", //数据类型为jsonp  
                        "jsonp": "jsonpCallback", //服务端用于接收callback调用的function名的参数  
                        data: {},
                        success: function(dat) {
                            console.log(dat);
                            if (dat.ret == false) {
                                $(".send_tips").html("车辆已在维修列表");
                                $(".m_vSn_tips").html("车辆已在维修列表");
                                $("#send_btn").attr("disabled", true);
                            } else {
                                $("#send_btn").attr("disabled", false);
                                $(".send_tips").html("");
                            }
                        }
                    });
                } else {
                    $("#send_btn").attr("disabled", true);
                    $(".m_vSn_tips").html("车辆编号不正确");
                }
            }
        });

    }
});

function addmaintain(url, da, that, box) {
    console.log(da);
    $.ajax({
        type: "get",
        url: "http://192.168.0.222:8080/car-management" + url,
        "dataType": "jsonp", //数据类型为jsonp  
        "jsonp": "jsonpCallback", //服务端用于接收callback调用的function名的参数  
        data: da,
        success: function(res) {
            console.log(res);
            if (res.ret == true) {
                $(box).html(res.msg);
                $(that).parent().attr("href", "#maintainList");
                $('a[href="#maintainList"]').tab('show');
                $(".maintainform").hide();
                loadMaintainList(1, 10, "", "");
                $('#coord_model').modal('hide');
                toastr.success('维修协调员填写信息提交成功', '维修协调员填写', messageOpts);
            } else {
                $(box).html(res.msg);
                $(".maintainform").show();
                toastr.warning('维修协调员填写信息提交失败', '维修协调员填写', messageOpts);
                return;
            }
        }
    });
}

$("#send_btn").click(function() {
    var url = "/carMaintain/PutInCarMaintainApply.action";
    // var maintain_form_data = $(".send_form").serializeObject();

    // maintain_form_data.send_time = changeDateFormat(new Date().getTime());
    // console.log(maintain_form_data);
    var that = this;
    addmaintain(url, maintain_form_data, that, ".send_tips");
});
// 维修协调员填写
$("#m_submit_btn").click(function() {
    var url = "/carMaintain/coordination.action";
    var maintain_form_data = $(".finish_form").serializeObject();
    maintain_form_data.infoid = getHashParameter("id");
    console.log(maintain_form_data);
    var that = this;
    addmaintain(url, maintain_form_data, that, "");
});

// 初始化加载维修列表
function loadMaintainList() {
    $('#maintainTable').bootstrapTable('destroy');
    $("#maintainTable").bootstrapTable({
        // url: 'https://wangyifannn.github.io/newdefcar/json/driverList.json',
        url: 'http://localhost/car/defcar/json/driverList.json',
        // dataType: "json", //数据类型
        // method: 'GET', //请求方式（*）
        dataType: 'json',
        // ajaxOptions: {
        //     xhrFields: { //跨域
        //         withCredentials: true
        //     },
        //     crossDomain: true
        // },
        striped: true, //是否显示行间隔色
        toggle: "table",
        toolbar: "toolbar_maintainTable",
        pagination: "true", //是否显示分页（*）
        sortOrder: "asc", //排序方式
        sidePagination: "server", //分页方式：client客户端分页，server服务端分页（*）
        pageNumber: 1, //初始化加载第一页，默认第一页
        pageSize: 5, //每页的记录行数（*）
        pageList: [5, 10, 50, 100], //可供选择的每页的行数（*）
        search: true, //是否搜索查询
        showColumns: true, //是否显示所有的列
        showRefresh: false, //是否显示刷新按钮
        sortable: true, //是否启用排序
        minimumCountColumns: 2, //最少允许的列数
        clickToSelect: true, //是否启用点击选中行
        searchOnEnterKey: true, //设置为 true时，按回车触发搜索方法
        strictSearch: false, //设置为 true启用全匹配搜索， 否则为模糊搜索
        showToggle: true, //是否显示切换视图（table/card）按钮
        searchAlign: "right",
        showExport: true,
        exportDataType: "basic",
        exportOptions: {
            ignoreColumn: [0, 8], //忽略某一列的索引  
            fileName: '测试车辆-车辆列表', //文件名称设置  
            worksheetName: 'sheet1', //表格工作区名称  
            tableName: '测试车辆-车辆列表',
            excelstyles: ['background-color', 'color', 'font-size', 'font-weight']
                // onMsoNumberFormat: DoOnMsoNumberFormat
        },
        exportDataType: "selected",
        uniqueId: "vSn", // 每一行的唯一标识  
        columns: [
            [{
                "title": "测试车辆维修列表",
                "halign": "center",
                "align": "center",
                // 合并维修列表 表头的列单元
                "colspan": 14
            }],
            [{
                field: 'ids',
                title: "序号",
                valign: "middle",
                align: "center",
                colspan: 1,
                rowspan: 2,
                width: "3%",
                formatter: function(value, row, index) {
                    return index + 1
                }
            }, {
                title: "送修申请表",
                valign: "middle",
                align: "center",
                colspan: 6,
                rowspan: 1
            }, {
                field: 'status',
                title: "当前状态",
                valign: "middle",
                align: "center",
                colspan: 1,
                rowspan: 2,
                width: "5%",
                background: '#BFEBEB',
                formatter: function(value, row, index) {
                    var a = "";
                    if (value == null) {
                        var a = '';
                    } else if (value == "1") {
                        var a = '<span style="color:red">排队中</span>';
                    } else if (value == "2") {
                        var a = '<span style="color:green">维修中</span>';
                    } else if (value == "3") {
                        var a = '<span style="color:blue">已维修</span>';
                    } else {
                        var a = '<span>已完成</span>';
                    }
                    return a;
                }
            }, {
                title: "维修协调员填写",
                valign: "middle",
                align: "center",
                colspan: 6,
                rowspan: 1
            }],
            [{
                field: 'vSn',
                title: '车辆编号',
                valign: "middle",
                align: "center",
                width: "6%"
            }, {
                field: 'carMaintainApply',
                title: '申请人',
                valign: "middle",
                align: "center",
                width: "6%",
                formatter: function(value, row, index) {
                    if (value == null) {
                        return "";
                    } else {
                        return value.sendPeople
                    }
                }
            }, {
                field: 'carMaintainApply',
                title: '维修项目',
                valign: "middle",
                align: "center",
                width: "8%",
                formatter: function(value, row, index) {
                    // return value.time
                    if (value == null) {
                        return "";
                    } else {
                        return value.reason
                    }
                }
            }, {
                field: 'carMaintainApply',
                title: '送修日期',
                valign: "middle",
                align: "center",
                width: "7%",
                formatter: function(value, row, index) {
                    // return value.time
                    if (value == null) {
                        return "";
                    } else {
                        return value.send_time
                    }
                }
            }, {
                field: 'carMaintainApply',
                title: '停放地点',
                valign: "middle",
                align: "center",
                width: "7%",
                formatter: function(value, row, index) {
                    if (value == null) {
                        return "";
                    } else {
                        return value.send_park
                    }
                }
            }, {
                field: 'carMaintainApply',
                title: '备注',
                valign: "middle",
                align: "center",
                width: "5%",
                formatter: function(value, row, index) {
                    if (value == null) {
                        return "";
                    } else {
                        return value.send_remark
                    }
                }
            }, {
                field: 'maintenancecoordination',
                title: '工作内容',
                valign: "middle",
                align: "center",
                width: "6%",
                formatter: function(value, row, index) {
                    if (value == null) {
                        return "";
                    } else {
                        return value.work
                    }
                }
            }, {
                field: 'maintenancecoordination',
                title: '操作人',
                valign: "middle",
                align: "center",
                width: "5%",
                formatter: function(value, row, index) {
                    if (value == null) {
                        return "";
                    } else {
                        return value.operator
                    }
                }

            }, {
                field: 'maintenancecoordination',
                title: '完成日期',
                valign: "middle",
                align: "center",
                width: "5%",
                formatter: function(value, row, index) {
                    if (value == null) {
                        return "";
                    } else {
                        return value.finish_time
                    }
                }

            }, {
                field: 'maintenancecoordination',
                title: '停放地点',
                valign: "middle",
                align: "center",
                width: "5%",
                formatter: function(value, row, index) {
                    if (value == null) {
                        return "";
                    } else {
                        return value.finish_park
                    }
                }
            }, {
                field: 'maintenancecoordination',
                title: '备注',
                valign: "middle",
                align: "center",
                width: "4%",
                formatter: function(value, row, index) {
                    if (value == null) {
                        return "";
                    } else {
                        return value.remark
                    }
                }
            }, {
                field: 'operate',
                title: '操作',
                valign: "middle",
                align: 'center',
                width: "12%",
                events: maintainListoperateEvents,
                formatter: maintainListFormatter
            }]
        ]
    })
}

function maintainListFormatter(value, row, index) {
    if (row.status == 1) {
        return [
            // '<button type="button" id="btn_maintaindel" class="RoleOfA btn btn-default  btn-sm my_btn" style="margin-right:10px;">删除</button>',
            '<button type="button" disabled="disabled" id="btn_ChangeStatus" class="RoleOfA btn btn-default  btn-sm my_btn" style="margin-right:10px;margin-top:5px;">分配</button>',
            '<a href="#" data-toggle="tab"><button type="button" disabled="disabled" id="btn_maintainpeople" class="RoleOfB btn btn-default  btn-sm my_btn" style="margin-right:10px;margin-top:5px;">完成</button></a>',
            '<button type="button" id="btn_maintainTop" class="RoleOfA btn btn-default  btn-sm my_btn" style="margin-right:10px;">优先</button>',
            '<button type="button" id="btn_maintaindel" class="RoleOfA btn btn-default  btn-sm my_btn" style="margin-right:10px;">保养</button>'
        ].join('');
    } else {
        return [
            '<button type="button" id="btn_ChangeStatus" class="RoleOfA btn btn-default  btn-sm my_btn" style="margin-right:10px;margin-top:5px;">分配</button>',
            '<a href="#" data-toggle="tab"><button type="button" disabled="disabled" id="btn_maintainpeople" class="RoleOfB btn btn-default  btn-sm my_btn" style="margin-right:10px;margin-top:5px;">完成</button></a>',
            '<button type="button" id="btn_maintainTop" class="RoleOfA btn btn-default  btn-sm my_btn" style="margin-right:10px;">优先</button>',
            '<button type="button" id="btn_maintaindel" class="RoleOfA btn btn-default  btn-sm my_btn" style="margin-right:10px;">保养</button>'
        ].join('');
    }
}
window.maintainListoperateEvents = {
    'click #btn_maintaindel': function(e, value, row, index) {
        $(this).parent().parent().remove();
        // 删除维修列表操作
        $.ajax({
            "url": "http://192.168.0.222:8080/car-management/carMaintain/delete.action",
            "type": "get",
            "data": {
                "infoid": row.id
            },
            "dataType": "jsonp", //数据类型为jsonp  
            "jsonp": "jsonpCallback", //服务端用于接收callback调用的function名的参数
            "success": function(res) {
                console.log(res);
                if (res.ret) {
                    var indexs = parseInt(index / 10);
                    loadMaintainList(indexs + 1, 10, "", "");
                }
            },
            "error": function(res) {
                console.log(res);
            }
        })
    },
    'click #btn_maintainpeople': function(e, value, row, index) {
        myformReset();
        $('#coord_model').modal();
        $("#coord_model #vSn").val(row.vSn);
        $("#coord_model #vSn").attr("readOnly", true);
        window.location.hash = "pagenum=" + getHashParameter("pagenum") + "&id=" + row.id + "&vSn=" + row.vSn; //车辆数据库编号
    },
    // 置顶操作
    'click #btn_maintainTop': function(e, value, row, index) {
        window.location.hash = "pagenum=" + getHashParameter("pagenum") + "&id=" + row.id + "&vSn=" + row.vSn; //车辆数据库编号
        $.ajax({
            "url": "http://192.168.0.222:8080/car-management/carMaintain/top.action",
            "type": "get",
            "data": {
                "infoid": row.id
            },
            "dataType": "jsonp", //数据类型为jsonp  
            "jsonp": "jsonpCallback", //服务端用于接收callback调用的function名的参数
            "success": function(res) {
                console.log(res);
                if (res.ret) {
                    loadMaintainList();
                }
            },
            "error": function(res) {
                console.log(res);
            }
        })
    },
    // 修改维修状态操作
    'click #btn_ChangeStatus': function(e, value, row, index) {
        console.log(row);
        $("#add_model").modal();
        $("#add_model #myModalLabel").html("分配任务");
        creatForm(dividedInfo, "#add_model .modal-body form", "editDriver_btn");
        showData("#add_model .modal-body form", row); // 编辑时数据回显
        $(".editDriver_btn").click(function() {
            var subcar_data = $("#addcar_model .modal-body form").serialize();
            var opt = "&carType=" + $("#addcar_model option:selected").attr("name");
            subcar_data += opt;
            var subcar_ubtrl = allurl + "/data-management/vehicle/add.json";
            console.log(subcar_data);
            $(this).attr({ "data-dismiss": "modal", "aria-label": "Close" });
            subData(subcar_url, subcar_data, "post", "editDriver_btn");
        })
    }
};
$("#auditLit_search_btn").click(function() {
    $('#tablescreen').bootstrapTable('destroy');
    loadMaintainList();
});

var maintainApply = [
    { "name": "车辆编号", "type": "text", "inputName": "vSn", "must": "*" },
    { "name": "停放地点", "type": "text", "inputName": "send_park", "must": "*" },
    { "name": "维修项目", "type": "text", "inputName": "reason", "must": "" },
    { "name": "备注", "type": "text", "inputName": "send_remark", "must": "*" },
];
var dividedInfo = [
    { "name": "车辆编号", "type": "text", "inputName": "vSn", "must": "*" },
    { "name": "预计完成日期", "type": "text", "inputName": "send_park", "must": "*" },
    { "name": "操作人", "type": "text", "inputName": "reason", "must": "" },
    { "name": "工作内容", "type": "text", "inputName": "reason", "must": "" },
    { "name": "备注", "type": "text", "inputName": "send_remark", "must": "*" },
];
// 新增维修申请
$("#add_maintain_apply").click(function() {
    $("#add_model").modal();
    $("#add_model #myModalLabel").html("新增维修申请");
    creatForm(maintainApply, "#add_model .modal-body form", "subMainApply_btn");
    $(".subMainApply_btn").click(function() {
        var subcar_data = $("#addcar_model .modal-body form").serialize();
        // var opt = "&carType=" + $("#addcar_model option:selected").attr("name");
        // subcar_data += opt;
        var subcar_url = allurl + "/data-management/vehicle/add.json";
        $(this).attr({ "data-dismiss": "modal", "aria-label": "Close" });
        subData(subcar_url, subcar_data, "post", "subDriver_btn");
    })
})