// 新车点检信息
var returnCarInfo = [
    { "name": "车辆编号", "type": "text", "inputName": "vSn", "must": "*" },
    {
        "name": "研发工具是否回收",
        "type": "radio",
        "inputName": "item",
        "must": "",
        "option": [{ "name": "是" }, { "name": "否" }]
    },
    { "name": "运输车号", "type": "text", "inputName": "", "must": "*" },
    { "name": "随车工具", "type": "text", "inputName": "tools", "must": "套" },
    { "name": "还车申请人", "type": "text", "inputName": "keys", "must": "*" },

    { "name": "停车警示牌", "type": "text", "inputName": "warningboard", "must": "只" },
    { "name": "交车人", "type": "text", "inputName": "pickone", "must": "*" },
    { "name": "备用轮胎", "type": "text", "inputName": "sparetyre", "must": "只" },
    { "name": "接车人", "type": "text", "inputName": "send_p", "must": "*" },
    { "name": "里程表", "type": "text", "inputName": "ododmeter", "must": "km" },
    { "name": "接车人电话", "type": "text", "inputName": "send_iphone", "must": "" },
    { "name": "千斤顶", "type": "text", "inputName": "jack", "must": "只" },
    { "name": "接车人身份证", "type": "text", "inputName": "send_iphone", "must": "" },
    { "name": "车用灭火器", "type": "text", "inputName": "fire", "must": "只" },
    { "name": "日期", "type": "today-date", "inputName": "receiverdata", "must": "" },
    { "name": "钥匙数量", "type": "text", "inputName": "keys", "must": "把" },
    { "name": "备注", "type": "text", "inputName": "remark", "must": "" },
];
creatForm(returnCarInfo, "#returncarCheck form", "returncarCheck_btn");