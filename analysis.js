var tmp = [{ dataIndex: 'id', title: '系统ID', },
{ dataIndex: 'Year', title: '年份', },
{ dataIndex: 'bandid', title: '波段号', },
{ dataIndex: 'bandname', title: '波段名称', },
{ dataIndex: 'fgid', title: '风格', },
{ dataIndex: 'plid', title: '品类', },
{ dataIndex: 'xlid', title: '小类', },
{ dataIndex: 'supplyqty', title: '上货款数', },
{ dataIndex: 'kindqty', title: '提供样版数', },
{ dataIndex: 'uploaddate', title: '上传图片截止时间', },
{ dataIndex: 'maildate', title: '邮寄样衣时间', },
{ dataIndex: 'approvaldate', title: '审版时间', },
{ dataIndex: 'indate', title: '上市日期', },
{ dataIndex: 'Enclosure', title: '附件', },
{ dataIndex: 'editor', title: '编辑人', },
{ dataIndex: 'editdate', title: '编辑时间', },
{ dataIndex: 'checker', title: '审核人', },
{ dataIndex: 'checkdate', title: '审核时间', },
{ dataIndex: 'operatorName', title: '业务员', },
{ dataIndex: 'status', title: '状态', render: (value, row, index) => value == 1 ? '已审核' : '未审核' },
{ dataIndex: 'remarks', title: '备注', }];
var txt = '';
for (var index = 0; index < tmp.length; index++) {
    txt = txt + tmp[index].dataIndex + ', '
}
console.log(txt)
var jsona = {}
for (var index = 0; index < tmp.length; index++) {
    var element = tmp[index];
    // jsona[tmp[index].dataIndex] = {value:tmp[index].dataIndex}
    console.log(tmp[index].dataIndex + ': ' + 'Form.createFormField({ value: "'+tmp[index].dataIndex +'"}),')
}
// console.log(jsona)
// for (var index = 0; index < tmp.length; index++) {
//     var element = tmp[index];
//     console.log('<Description term="'+ element.title +'">{' +element.dataIndex + '}</Description>')
// }

