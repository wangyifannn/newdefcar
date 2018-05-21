// 新车点检信息
var carCheckInfo = [
    { "name": "车辆编号", "type": "text", "inputName": "vSn", "must": "*" },
    { "name": "随车物品", "type": "text", "inputName": "item", "must": "" },
    { "name": "厂牌型号", "type": "text", "inputName": "", "must": "*" },
    { "name": "随车工具", "type": "text", "inputName": "tools", "must": "套" },
    { "name": "车架号", "type": "text", "inputName": "vin", "must": "*" },
    { "name": "停车警示牌", "type": "text", "inputName": "warningboard", "must": "只" },
    { "name": "发动机号", "type": "text", "inputName": "engineNumber", "must": "*" },
    { "name": "备用轮胎", "type": "text", "inputName": "sparetyre", "must": "只" },
    {
        "name": "车辆外观",
        "type": "checkbox",
        "inputName": "carApp",
        "must": "",
        "option": [{ "name": "正常" }, { "name": "见外观说明" }]
    },
    { "name": "千斤顶", "type": "text", "inputName": "jack", "must": "只" },
    { "name": "外观说明", "type": "text", "inputName": "AppDes", "must": "" },
    { "name": "车用灭火器", "type": "text", "inputName": "fire", "must": "只" },
    { "name": "送车人", "type": "text", "inputName": "pickone", "must": "" },
    { "name": "钥匙数量", "type": "text", "inputName": "keys", "must": "把" },
    { "name": "送车人电话", "type": "text", "inputName": "send_iphone", "must": "" },
    { "name": "里程表", "type": "text", "inputName": "ododmeter", "must": "km" },
    { "name": "接车人", "type": "text", "inputName": "send_p", "must": "" },
    { "name": "接车日期", "type": "today-date", "inputName": "receiverdata", "must": "" },
];
creatForm(carCheckInfo, "#carCheck form", "carCheck_btn");