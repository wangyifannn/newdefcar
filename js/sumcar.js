function loadsumCarList() {
    $("#sumcarTable").bootstrapTable('destroy').bootstrapTable({
        url: 'https://wangyifannn.github.io/newdefcar/json/driverList.json',
        // url: 'http://localhost/car/defcar/json/driverList.json',
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
        toolbar: "sumcarTable_toolbar",
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
            fileName: '测试车辆-车辆总表', //文件名称设置  
            worksheetName: 'sheet1', //表格工作区名称  
            tableName: '测试车辆-车辆总表',
            excelstyles: ['background-color', 'color', 'font-size', 'font-weight']
                // onMsoNumberFormat: DoOnMsoNumberFormat
        },
        exportDataType: "selected",
        uniqueId: "vSn", // 每一行的唯一标识  
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
        onLoadSuccess: function(res) {
            console.log(res);
        },
        onLoadError: function() {
            console.log("数据加载失败！");
        },
        columns: [
            [{
                "title": "测试车辆-车辆总表",
                "halign": "center",
                "align": "center",
                "colspan": 22
            }],
            [{ field: "checkbox", title: "全选", checkbox: true, align: 'center' },
                { field: 'index', title: "序号", valign: "middle", align: "center", width: "5%", formatter: function(value, row, index) { return index + 1; } },
                { field: "name", title: "车辆编号", align: 'center' },
                { field: "name", title: "项目号", align: 'center' },
                { field: "name", title: "项目状态", align: 'center' },
                { field: "name", title: "客户", align: 'center' },
                { field: "name", title: "项目工程师", align: 'center' },
                { field: "name", title: "车辆状态", align: 'center' },
                { field: "name", title: "车辆类型", align: 'center' },
                { field: "name", title: "发动机号", align: 'center' },
                { field: "name", title: "车架号", align: 'center' },
                { field: "name", title: "吨位", align: 'center' },
                { field: "name", title: "接车日期", align: 'center' },
                { field: "name", title: "还车日期", align: 'center' },
                { field: "name", title: "厂牌型号（车）", align: 'center' },
                { field: "name", title: "厂牌型号（保）", align: 'center' },
                { field: "name", title: "保单号", align: 'center' },
                { field: "name", title: "保险起始日", align: 'center' },
                { field: "name", title: "保险终止日", align: 'center' },
                { field: "name", title: "临牌到期日", align: 'center' },
                { field: "name", title: "临牌", align: 'center' },
                { field: 'operate', title: '操作', align: 'center', events: sumcaroperateEvents, formatter: sumcaroperateFormatter }
            ]
        ]
    });
}

function sumcaroperateFormatter(value, row, index) {
    return [
        '<a href="#carDetail" data-toggle="tab"><button type="button" id="sumcar_detail" class="my_btn btn btn-default btn-sm" style="margin-right:15px;">详情</button></a>',
        // '<button type="button" id="audit_btn" class="my_btn btn btn-default  btn-sm" style="margin-right:15px;">编辑</button>',
    ].join('');
}

window.sumcaroperateEvents = {
    'click #sumcar_detail': function(e, value, row, index) { //，
    }
};
$("#yanche").click(function() {
    // var Ins_Arr = $("#carListtable").bootstrapTable('getSelections');
    // deletAll(Ins_Arr, "Ins_apply");
});
$("#sumcar_filter").click(function() {
    $("#add_model").modal();
    $("#add_model #myModalLabel").html("车辆筛选");
    creatForm(sumcar_filter, "#add_model .modal-body form", "sumcar_filter_btn");
    $(".sumcar_filter_btn").click(function() { //完成维修
        var sub_data = $("#add_model .modal-body form").serialize();
        var sub_url = allurl + "/data-management/vehicle/add.json";
        console.log(sub_data);
        $(this).attr({ "data-dismiss": "modal", "aria-label": "Close" });
        subData(sub_url, sub_data, "post", "sub_sumcar_filter");
    });
});
// 车辆总表查询
var sumcar_row_filter = [
    { "name": "项目号", "type": "text", "inputName": "vSn", "must": "" },
    { "name": "车架号", "type": "text", "inputName": "safeCheck", "must": "" },
    { "name": "发动机号", "type": "text", "inputName": "safeVerify", "must": "" },
    { "name": "项目工程师", "type": "text", "inputName": "wCheck", "must": "" }
];
creatSelect(sumcar_row_filter, "#sumCarList .sumcar_top .form-inline", "sumcar_filter_btn");
var sumcar_filter = [
    { "name": "厂牌型号", "type": "text", "inputName": "vSn", "must": "" },
    { "name": "发动机号", "type": "text", "inputName": "safeCheck", "must": "" },
    { "name": "车架号", "type": "text", "inputName": "safeVerify", "must": "" },
    { "name": "保单号", "type": "text", "inputName": "wCheck", "must": "" },
    {
        "name": "保险日期",
        "type": "range",
        "inputName": "wCheck",
        "must": "",
        "option": [{ "name": "起始日期" }, { "name": "终止日期" }]
    },
    {
        "name": "牌照日期",
        "type": "range",
        "inputName": "wCheck",
        "must": "",
        "option": [{ "name": "起始日期" }, { "name": "终止日期" }]
    },
    {
        "name": "接车日期",
        "type": "range",
        "inputName": "wCheck",
        "must": "",
        "option": [{ "name": "起始日期" }, { "name": "终止日期" }]
    },
    {
        "name": "还车日期",
        "type": "range",
        "inputName": "wCheck",
        "must": "",
        "option": [{ "name": "起始日期" }, { "name": "终止日期" }]
    },
    {
        "name": "项目状态",
        "type": "button",
        "inputName": "wCheck",
        "must": "",
        "option": [{ "name": "进行中" }, { "name": "已完成" }]
    },
    {
        "name": "车辆计数",
        "type": "button",
        "inputName": "wCheck",
        "must": "",
        "option": [{ "name": "先前归还" }, { "name": "当月归还" },
            { "name": "当月新车" }, { "name": "当月归还" },
            { "name": "在用车辆" }, { "name": "停止车辆" },
            { "name": "有临牌无保险" }, { "name": "有保险无临牌" }
        ]
    },
];

function creatFilter(filArr, name, btnname) {
    var ss = "";
    var optstyle = "";
    for (var i = 0; i < filArr.length; i++) {
        if (filArr[i].type == "range") {
            var ifdata = "";
            var rangeoptions = "";
            rangeoptions = '<div class="range_group"><input type="text" name="' + filArr[i].option[0].name + '" class="form-control col-sm-7 much-date">————' +
                '<input type="text" name="' + filArr[i].option[1].name + '" class="form-control col-sm-7 much-date"></div>';
        } else if (filArr[i].type == "text") {
            optstyle = '<input type="text" name="' + filArr[i].inputName + '" class="form-control col-sm-7 ' + filArr[i].inputName + '"> <label class="col-sm-5 tip_style ">' + filArr[i].must + '</label>'
            var textoptions = "";
            textoptions = '<div class="form-group">' +
                '<label class="col-sm-4 control-label">' + filArr[i].name + '：</label>' +
                '<div class="col-sm-6">' + optstyle + '</div>' +
                '</div>'
        } else if (filArr[i].type == "button") {
            var btn = "";
            var btnoptions = "";
            for (var j = 0; j < filArr[i].option.length; j++) {
                btn += '<button name="' + filArr[i].option[j].name + '" class="' + filArr[i].option[j].name + '">' + filArr[i].option[j].name + '</button>';
            }
            btnoptions = '<div class="button_group">' + btn + '</div>';
        }
        ss = textoptions + rangeoptions + btnoptions;
    }
    ss += '<div class="form-group">' +
        '<div class="form_btngroup clearfix">' +
        '<button type="button" data-dismiss="" aria-label="" class="btn btn-default pull-left btn-primary ' + btnname + '">确定</button>' +
        '<button type="button" class="btn btn-default btn-primary pull-right" data-dismiss="modal">取消</button>' +
        '</div>' +
        '</div>';
    $(name).html(ss);
    lay('.much-date').each(function() {
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