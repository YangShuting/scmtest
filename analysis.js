var tmp = [{  dataIndex:'Id', title: '主键ID',},
{  dataIndex:'sampleId' , title: '样衣编码',},
{  dataIndex:'samplename' , title:  '样衣名称',},
{  dataIndex:'supplierId' , title:  '供应商编码',},
{  dataIndex:'supplierName' , title:  '供应商名称',},
{  dataIndex:'bandid' , title:  '波段ID',},
{  dataIndex:'bandname' , title:  '波段名称',},
{  dataIndex:'pcode' , title:  '供应商货号',},
{  dataIndex:'deptid' , title:  '品类',},
{  dataIndex:'deptname' , title:  '品类名称',},
{  dataIndex:'dlid' , title:  '大类',},
{  dataIndex:'dlname' , title:  '大类名称',},
{  dataIndex:'pic' , title:  '图片',},
{  dataIndex:'ismain' , title: '是否主款',},
{  dataIndex:'jyfs' , title: '合作方式 1-试销',},
{  dataIndex:'editor' , title:  '编辑人',},
{  dataIndex:'editdate', title: '编辑时间',},
{  dataIndex:'checker' , title:  '审核人',},
{  dataIndex:'checkdate' , title:  '审核时间',},
{  dataIndex:'status' , title:  '状态',},
{  dataIndex:'flag', title:  '审批状态',},
{  dataIndex:'relflag' , title: '发布状态',},
{  dataIndex:'CompIsvisible', title:  '天天惠是否可见',},
{  dataIndex:'SupIsVisible', title:  '供应商是否可见',},
{  dataIndex:'note' , title: '备注',},];

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

