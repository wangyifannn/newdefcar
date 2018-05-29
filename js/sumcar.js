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
        window.location.hash = "carDetail";
        $(".sumCarList").removeClass("active");
    }
};
$("#yanche").click(function() {
    // var Ins_Arr = $("#carListtable").bootstrapTable('getSelections');
    // deletAll(Ins_Arr, "Ins_apply");
});
$("#sumcar_filter").click(function() {
    $("#filter_model").modal();
    // $("#filter_model #myModalLabel").html("车辆筛选");
    // creatFilter(sumcar_filter, "#add_model .modal-body form", "sumcar_filter_btn");
    // $(".sumcar_filter_btn").click(function() {
    //     var sub_data = $("#add_model .modal-body form").serialize();
    //     var sub_url = allurl + "/data-management/vehicle/add.json";
    //     console.log(sub_data);
    //     $(this).attr({ "data-dismiss": "modal", "aria-label": "Close" });
    //     subData(sub_url, sub_data, "post", "sub_sumcar_filter");
    // });
});
// 车辆总表查询
var sumcar_row_filter = [
    { "name": "项目号", "type": "text", "inputName": "vSn", "must": "" },
    { "name": "车架号", "type": "text", "inputName": "safeCheck", "must": "" },
    { "name": "发动机号", "type": "text", "inputName": "safeVerify", "must": "" },
    { "name": "项目工程师", "type": "text", "inputName": "wCheck", "must": "" }
];
creatSelect(sumcar_row_filter, "#sumCarList .sumcar_top .form-inline", "sumcar_filter_btn");
$(".btn_filter button").click(function() {
    $(this).addClass('filter_choice_btn').siblings().removeClass('filter_choice_btn');
})