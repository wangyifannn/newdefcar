function loadDriverList() {
    $("#DriverTable").bootstrapTable('destroy').bootstrapTable({
        // url: 'http://localhost/car/defcar/json/driverList.json',
        url: 'https://wangyifannn.github.io/newdefcar/json/driverList.json',
        // url: 'http://192.168.0.222:8080/car-management/carDriver/CarDriverList.action',
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
        toolbar: "toolbar_DriverTable",
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
        exportDataType: "selected",
        showExport: true, //是否显示导出按钮  
        buttonsAlign: "left", //按钮位置  
        exportTypes: ['excel'], //导出文件类型  
        Icons: 'glyphicon-export',
        exportOptions: {
            ignoreColumn: [0, 8], //忽略某一列的索引  
            fileName: '测试车辆-驾驶员管理列表', //文件名称设置  
            worksheetName: 'sheet1', //表格工作区名称  
            type: 'excel',
            tableName: '测试车辆-驾驶员管理列表',
            excelstyles: ['background-color', 'color', 'font-size', 'font-weight']
                // onMsoNumberFormat: DoOnMsoNumberFormat
        },
        exportDataType: "selected",
        uniqueId: "id", // 每一行的唯一标识  
        //得到查询的参数
        queryParams: function(params) {
            console.log(params);
            //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            var temp = {
                size: params.limit, //页面大小
                page: (params.offset / params.limit) + 1, //页码
                sort: params.sort, //排序列名  
                sortOrder: params.order //排位命令（desc，asc） 
            };
            console.log(temp);
            return temp;
        },
        // responseHandler: function(res) {
        //     console.log(res);
        //     return {
        //         total: res.total,
        //         rows: res.rows
        //     };
        // },
        onLoadSuccess: function(res) {
            console.log(res);
        },
        onLoadError: function() {
            console.log("数据加载失败！");
        },
        columns: [
            [{
                "title": "测试车辆-驾驶员管理列表",
                "halign": "center",
                "align": "center",
                "colspan": 11
            }],
            [{
                field: "checkbox",
                title: "全选",
                checkbox: true,
                align: 'center'
            }, {
                field: 'index',
                title: "序号",
                valign: "middle",
                align: "center",
                width: "5%",
                formatter: function(value, row, index) {
                    return index + 1;
                }
            }, {
                field: "name",
                title: "姓名",
                align: 'center',
            }, {
                field: "iccard",
                title: "员工卡号",
                align: 'center'
            }, {
                field: "iccard",
                title: "iccard",
                align: 'center'
            }, {
                field: "iccard",
                title: "电话",
                align: 'center'
            }, {
                field: "iccard",
                title: "分组所属",
                align: 'center'
            }, {
                field: "isallow",
                title: "授权状态",
                align: 'center',
                formatter: function(value, row, index) {
                    var a = "";
                    if (value == null) {
                        var a = '';
                    } else if (value == "1") {
                        var a = '<span style="color:red">禁用</span>';
                    } else if (value == "2") {
                        var a = '<span style="color:green">正常</span>';
                    }
                    return a;
                }
            }, {
                field: "allowStartTime",
                title: "起始日期",
                align: 'center'
            }, {
                field: "allowEndTime",
                title: "终止日期",
                align: 'center'
            }, {
                field: 'operate',
                title: '操作',
                align: 'center',
                events: driveroperateEvents,
                formatter: driveroperateFormatter
            }]
        ]
    });
}

function driveroperateFormatter(value, row, index) {
    // 未授权
    if (row.isallow == 1) {
        return [
            '<button type="button" id="btn_driverdel" class="my_btn btn btn-default  btn-sm" style="margin-right:15px;">删除</button>',
            '<button type="button" id="btn_driverup" class="my_btn btn btn-default  btn-sm" style="margin-right:15px;">修改</button>',
            '<button type="button" id="btn_driverimpower" class="my_btn btn btn-default  btn-sm" style="margin-right:15px;">授权</button>'
        ].join('');
    } else if (row.isallow == 2) {
        return [
            '<button type="button" id="btn_driverdel" class="my_btn btn btn-default  btn-sm" style="margin-right:15px;">删除</button>',
            '<button type="button" id="btn_driverup" class="my_btn btn btn-default  btn-sm" style="margin-right:15px;">修改</button>',
            '<button type="button" id="btn_drivercancelimpower" class="my_btn btn btn-default  btn-sm" style="margin-right:15px;">禁用</button>'
        ].join('');
    }
}

window.driveroperateEvents = {
    'click #btn_driverdel': function(e, value, row, index) { //删除
        var delrow = [];
        delrow.push(row);
        deletAll(delrow, "driverdel");
    },
    'click #btn_driverup': function(e, value, row, index) { //修改
        console.log(row);
        $("#add_model").modal();
        $("#add_model #myModalLabel").html("驾驶员修改");
        creatForm(addDrverInfo, "#add_model .modal-body form", "editDriver_btn");
        showData("#add_model .modal-body form", row); // 编辑时数据回显
        $(".editDriver_btn").click(function() {
            var subcar_data = $("#add_model .modal-body form").serialize();
            var opt = "&carType=" + $("#add_model option:selected").attr("name");
            subcar_data += opt;
            var subcar_ubtrl = allurl + "/data-management/vehicle/add.json";
            console.log(subcar_data);
            $(this).attr({ "data-dismiss": "modal", "aria-label": "Close" });
            subData(subcar_url, subcar_data, "post", "editDriver_btn");
        })
    },
    'click #btn_driverimpower': function(e, value, row, index) { //授权
        var delrow = [];
        delrow.push(row.id);
        var approveobj = {
            "startTime": $("#add_model .modal-body" + ' input[name="' + "startTime" + '"]').val(),
            "endTime": $("#add_model .modal-body" + ' input[name="' + "endTime" + '"]').val(),
            ids: delrow
        };
        deletAll(approveobj, "approve_all");
    },
    'click #btn_drivercancelimpower': function(e, value, row, index) { //取消授权、禁用
        // window.location.hash = "driverid=" + row.id + "&pageindex=" + index;
        var delrow = [];
        delrow.push(row);
        deletAll(delrow, "cancelimpower");
    }
};
$("#driver_add_btn").click(function() {
    $("#add_model").modal();
    $("#add_model #myModalLabel").html("驾驶员录入");
    creatForm(addDrverInfo, "#add_model .modal-body form", "subdriver_btn");
    $(".subdriver_btn").click(function() {
        var subcar_data = $("#add_model .modal-body form").serialize();
        var opt = "&carType=" + $("#add_model option:selected").attr("name");
        subcar_data += opt;
        var subcar_url = allurl + "/data-management/vehicle/add.json";
        $(this).attr({ "data-dismiss": "modal", "aria-label": "Close" });
        subData(subcar_url, subcar_data, "post", "subDriver_btn");
    })
});

// 删除选中的驾驶员
$("#del_driver_all").click(function() {
    var driver_del_Arr = $("#DriverTable").bootstrapTable('getSelections');
    deletAll(driver_del_Arr, "driverdel");
});
// 取消授权
$("#cancel_approve_all").click(function() {
    var driver_del_Arr = $("#DriverTable").bootstrapTable('getSelections');
    deletAll(driver_del_Arr, "cancelimpower");
});
//批量授权del_driver_all
$("#approve_all").click(function() {
    var approve_Arr = $("#DriverTable").bootstrapTable('getSelections');
    deletAll(approve_Arr, "approve_all");
});
// 新增驾驶员
var addDrverInfo = [
    { "name": "姓名", "type": "text", "inputName": "name", "must": "*" },
    { "name": "员工卡号", "type": "text", "inputName": "EmployeeCard", "must": "*" },
    { "name": "电话", "type": "text", "inputName": "telephone", "must": "" },
    { "name": "iccard", "type": "text", "inputName": "iccard", "must": "" },
    {
        "name": "所属分组",
        "type": "checkbox",
        "inputName": "driverGroup",
        "must": "",
        "option": [{ "name": "A组" }, { "name": "B组" }, { "name": "C组" }]
    },
    {
        "name": "是否授权",
        "type": "radio",
        "inputName": "isallow",
        "must": "",
        "option": [{ "name": "是" }, { "name": "否" }]
    },
    { "name": "备注", "type": "text", "inputName": "remark", "must": "" }
];
// 授权模态框
var approveInfo = [
    { "name": "姓名", "type": "text", "inputName": "name", "must": "*" },
    { "name": "授权起始日", "type": "today-date", "inputName": "startTime", "must": "*" },
    { "name": "授权终止日", "type": "end-date", "inputName": "endTime", "must": "*" },
];