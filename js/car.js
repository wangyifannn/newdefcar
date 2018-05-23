function loadCarList() {
    $("#carListtable").bootstrapTable('destroy').bootstrapTable({
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
        toolbar: "carListtable_toolbar",
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
                "title": "测试车辆-车辆列表",
                "halign": "center",
                "align": "center",
                "colspan": 11
            }],
            [{ field: "checkbox", title: "全选", checkbox: true, align: 'center' },
                { field: 'index', title: "序号", valign: "middle", align: "center", width: "5%", formatter: function(value, row, index) { return index + 1; } },
                { field: "name", title: "车辆名称", align: 'center' },
                { field: "name", title: "车辆编号", align: 'center' },
                { field: "name", title: "车架号", align: 'center' },
                { field: "name", title: "项目工程师", align: 'center' },
                {
                    field: "name",
                    title: "所属分组",
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
                },
                {
                    field: "name",
                    title: "检查进度",
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
                },
                { field: "name", title: "创建时间", align: 'center' },
                { field: "name", title: "备注", align: 'center' },
                { field: 'operate', title: '操作', align: 'center', events: caroperateEvents, formatter: caroperateFormatter }
            ]
        ]
    });
}

function caroperateFormatter(value, row, index) {
    return [
        '<a href="#carTypeIn" data-toggle="tab"><button type="button" id="carTypeIn_btn" class="my_btn btn btn-default btn-sm" style="margin-right:15px;">录入</button></a>',
        '<a href="#sCheck" data-toggle="tab"><button type="button" id="safe_btn" class="my_btn btn btn-default btn-sm" style="margin-right:15px;">安全</button></a>',
        '<a href="#wiringCheck" data-toggle="tab"><button type="button" id="warining_btn" class="my_btn btn btn-default btn-sm" style="margin-right:15px;">线束</button></a>',
        '<a href="#bomCheck" data-toggle="tab"><button type="button" id="bomCheck" class="my_btn btn btn-default btn-sm" style="margin-right:15px;">BOM</button></a>',
        '<button type="button" id="rd_btn" class="my_btn btn btn-default btn-sm" style="margin-right:15px;">研发</button>',
        '<a href="#carDetail" data-toggle="tab"><button type="button" id="details_btn" class="my_btn btn btn-default  btn-sm" style="margin-right:15px;">详情</button></a>',
        '<button type="button" id="audit_btn" class="my_btn btn btn-default  btn-sm" style="margin-right:15px;">审核</button>',
    ].join('');
}

window.caroperateEvents = {
    'click #safe_btn': function(e, value, row, index) { //安全
        initsafeCheck("#sCheck .pot_pressure", "#sCheck .check_itembox");
    },
    'click #warining_btn': function(e, value, row, index) { //线束
        getcnid(2, "#wiringCheck .wcheck_itembox");
    },
    'click #bomCheck': function(e, value, row, index) { //bom
        getcnid(3, "#bomCheck .bomcheck_itembox");
    },
    'click #rd_btn': function(e, value, row, index) { //研发
        $("#toolRecord_model").modal();
        initToolRecord("#toolRecord_model .toolForm", row.vSn);
        $("#toolRecord_model .vSn").val(row.vSn);
        window.location.hash = row.vSn;
    },
    'click #audit_btn': function(e, value, row, index) { //取消授权、禁用
        $("#add_model").modal();
        $("#add_model #myModalLabel").html("车辆审核");
        creatForm(auditInfo, "#add_model .modal-body form", "sub_audit_btn");
        // showData("#add_model .modal-body form", row); // 编辑时数据回显
        $(".sub_audit_btn").click(function() {
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
$("#Insurance_apply").click(function() {
    var Ins_Arr = $("#carListtable").bootstrapTable('getSelections');
    deletAll(Ins_Arr, "Ins_apply");
});

// 审核模态框
var auditInfo = [
    { "name": "车辆编号", "type": "text", "inputName": "vSn", "must": "*" },
    { "name": "安全检查人", "type": "text", "inputName": "safeCheck", "must": "*" },
    { "name": "安全核对人", "type": "text", "inputName": "safeVerify", "must": "" },
    { "name": "线束检查人", "type": "text", "inputName": "wCheck", "must": "*" },
    { "name": "线束核对人", "type": "text", "inputName": "wVerify", "must": "" },
    { "name": "bom检查人", "type": "text", "inputName": "bCheck", "must": "*" },
    { "name": "bom核对人", "type": "text", "inputName": "bVerify", "must": "" },
    {
        "name": "审核是否通过",
        "type": "radio",
        "inputName": "ifaudit",
        "must": "*",
        "option": [{ "name": "是" }, { "name": "否" }]
    },
    { "name": "审核备注", "type": "text", "inputName": "remark", "must": "" },
];

/* 
楼层导航
*/
$(function() {
    //1.楼梯什么时候显示，800px scroll--->scrollTop
    $(window).on('scroll', function() {
        var $scroll = $(this).scrollTop();
        if ($scroll >= 800) {
            $('#loutinav').show();
        } else {
            $('#loutinav').hide();
        }
        //4.拖动滚轮，对应的楼梯样式进行匹配
        $('.louti').each(function() {
            var $loutitop = $('.louti').eq($(this).index()).offset().top + 400;
            //console.log($loutitop);
            if ($loutitop > $scroll) { //楼层的top大于滚动条的距离
                $('#loutinav li').removeClass('active');
                $('#loutinav li').eq($(this).index()).addClass('active');
                return false; //中断循环
            }
        });
    });
    //2.获取每个楼梯的offset().top,点击楼梯让对应的内容模块移动到对应的位置  offset().left
    var $loutili = $('#loutinav li').not('.last');
    $loutili.on('click', function() {
        $(this).addClass('active').siblings('li').removeClass('active');
        var $loutitop = $('.louti').eq($(this).index()).offset().top;
        //获取每个楼梯的offsetTop值
        $('html,body').animate({ //$('html,body')兼容问题body属于chrome
            scrollTop: $loutitop
        })
    });
    //3.回到顶部
    $('.last').on('click', function() {
        $('html,body').animate({ //$('html,body')兼容问题body属于chrome
            scrollTop: 0
        })
    });
})