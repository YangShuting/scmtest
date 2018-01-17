import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Modal, Card, Badge, Table, Divider } from 'antd';
import DescriptionList from '../../components/DescriptionList';

const { Description } = DescriptionList;
import { getColumns, getWidthSum, handleGetTime, getDateFromTime, getJudge } from '../../utils/ajust';

@connect(({ sampleApply, loading }) => ({
  item: sampleApply.Query,
}))
export default class DemandDetail extends PureComponent {
    close = () => {
      dispatch({ type: 'sampleApply/closeQuery' });
    }
    render() {
      return (
        <Detail data={this.props.item.data} close={this.close} modal={this.props.item.modal} />
      );
    }
}

export class Detail extends PureComponent {
  render() {
    const {
      Id, sampleId, samplename, supplierId, supplierName, bandid, bandname, pcode, deptid,
      deptname, dlid, dlname, pic, ismain, jyfs, editor, editdate, checker, checkdate, status,
      flag, relflag, CompIsvisible, SupIsVisible, note, plid,
    } = this.props.data;
    const { modal } = this.props;
    return (
      <Modal
        title={null}
        width="90%"
        footer={null}
        visible={modal}
        onCancel={() => this.props.close()}
      >
        <Card bordered={false}>
          <DescriptionList size="large" title="样衣申请明细" style={{ marginBottom: 32 }}>
            <Description term="样衣编码">{sampleId}</Description>
            <Description term="样衣名称">{samplename}</Description>
            <Description term="供应商编码">{supplierId}</Description>
            <Description term="供应商名称">{supplierName}</Description>
            <Description term="波段ID">{bandid}</Description>
            <Description term="波段名称">{bandname}</Description>
            <Description term="供应商货号">{pcode}</Description>
            <Description term="品类">{deptid}</Description>
            <Description term="品类名称">{deptname}</Description>
            <Description term="大类">{dlid}</Description>
            <Description term="大类名称">{dlname}</Description>
            <Description term="图片">{pic}</Description>
            <Description term="是否主款">{ismain}</Description>
            <Description term="合作方式 1-试销">{jyfs}</Description>
            <Description term="编辑人">{editor}</Description>
            <Description term="编辑时间">{getDateFromTime(editdate)}</Description>
            <Description term="审核人">{checker}</Description>
            <Description term="审核时间">{getDateFromTime(checkdate)}</Description>
            <Description term="状态">{status}</Description>
            <Description term="审批状态">{flag}</Description>
            <Description term="发布状态">{relflag}</Description>
            <Description term="天天惠是否可见">{CompIsvisible}</Description>
            <Description term="供应商是否可见">{SupIsVisible}</Description>
            <Description term="备注">{note}</Description>
          </DescriptionList>
        </Card>
      </Modal>
    );
  }
}

