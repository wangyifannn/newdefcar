// 接车点检
creatForm(carCheckInfo, "#carCheckForm form", "carCheck_btn");
// 车辆录入信息
creatForm(addcarInfo, "#carTypeInForm .cartypein_apply_detail", "sub_cartypein");
ToolRecordApply("#carTypeInForm .rd_apply_detail", "");
bomApply("#carTypeInForm .bom_apply_detail", $("#carTypeIn .vSn").val(), bomapplyArr);

// 安全
findSafeInfo("#sCheckForm .pot_Form", "#sCheckForm .safe_Form");
// 线束
getcnidSolve(2, "#wiringCheckForm .wcheck_itembox");
// bom
getcnidSolve(3, "#bomCheckForm .bomcheck_itembox");
// 研发
initToolRecord("#toolForm .toolForm", "2");
// 审核信息
creatForm(auditInfo, "#add_model .modal-body form", "sub_audit_btn");

// .checkitem.bom_name input[value=""] 
// if () {

// }
var auditArr = [{ "name": "车辆编号" }, { "name": "安全检查人" },
    { "name": "安全核对人" }, { "name": "线束检查人" },
    { "name": "线束核对人" }, { "name": "BOM检查人" },
    { "name": "BOM核对人" }, { "name": "审核状态" },
    { "name": "审核说明" }
]
var auditdataArr = [{ "name": "2134432" }, { "name": "" },
    { "name": "" }, { "name": "ssa" },
    { "name": "as" }, { "name": "sa" },
    { "name": "sa" }, { "name": "sa" },
    { "name": "审aas核说明" }
]
var upkeepArr = [{ "name": "车辆编号" }, { "name": "德尔福编号" },
    { "name": "车架号" }, { "name": "发动机号" },
    { "name": "厂牌型号（车）" }, { "name": "保险起始日" },
    { "name": "终止日" }, { "name": "保单号" },
    { "name": "厂牌型号" }
]
var plateArr = [{ "name": "车辆编号" }, { "name": "保险起始日" },
    { "name": "终止日" }, { "name": "保单号" },
    { "name": "厂牌型号" }, { "name": "临牌号" },
    { "name": "临牌终止日" }
]

function findAuditInfo(arr, data, name) {
    var auditboxs = "";
    var audit_tit = "";
    var audit_con = "";
    var audit_span = "11.11%";
    if (name == ".plateDetail") {
        audit_span = "14.222%";
    }
    for (var i = 0; i < arr.length; i++) {
        audit_tit += "<span class='audit_span' style='width:" + audit_span + "'>" + arr[i].name + "</span>"
    }
    for (var j = 0; j < data.length; j++) {
        audit_con += "<span class='audit_span' style='width:" + audit_span + "'>" + data[j].name + "</span>"
    }
    var auditTit = "<div class='audit_title clearfix'>" + audit_tit + "</div>";
    var auditCon = "<div class='audit_row clearfix'>" + audit_con + "</div>";
    var auditFot = "<div class='audit_fot'><span>审核人：" + "王宇" + "</span><span>审核日期：" + "2019-20-22" + "</span></div>";
    auditboxs = auditTit + auditCon + auditFot;
    $(name).html(auditboxs);
}
findAuditInfo(auditArr, auditdataArr, ".auditDetail");
// 还车点检
creatForm(returnCarInfo, "#returncarForm form", "returncardetail_btn");
// 保险信息
findAuditInfo(upkeepArr, upkeepArr, ".upkeepDetail");
// 车牌信息
findAuditInfo(plateArr, plateArr, ".plateDetail");