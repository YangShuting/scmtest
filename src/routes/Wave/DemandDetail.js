import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Modal, Card, Badge, Table, Divider } from 'antd';
import DescriptionList from '../../components/DescriptionList';

const { Description } = DescriptionList;
import { getColumns, getWidthSum, handleGetTime, getDateFromTime, getJudge } from '../../utils/ajust';

@connect(({ waveDemand, loading }) => ({
  item: waveDemand.Query,
}))
export default class DemandDetail extends PureComponent {
  render() {
    const {
      id, Year, bandid, bandname, fgid, plid, xlid, supplyqty, kindqty, uploaddate,
      maildate, approvaldate, indate, Enclosure, editor, editdate, checker, checkdate,
      operatorName, status, remarks,fgText,plText,xlText
    } = this.props.item.data;
    return (
      <Modal
        title={null}
        width="90%"
        footer={null}
        visible={this.props.item.modal}
        onCancel={() => this.props.dispatch({ type: 'waveDemand/closeQuery' })}
      >
        <Card bordered={false}>
          <DescriptionList size="large" title="波段数据明细" style={{ marginBottom: 32 }}>
            <Description term="系统ID">{id}</Description>
            <Description term="年份">{Year}</Description>
            <Description term="波段号">{bandid}</Description>
            <Description term="波段名称">{bandname}</Description>
            <Description term="风格">{fgText}</Description>
            <Description term="品类">{plText}</Description>
            <Description term="小类">{xlText}</Description>
            <Description term="上货款数">{supplyqty}</Description>
            <Description term="提供样版数">{kindqty}</Description>
            <Description term="上传图片截止时间">{getDateFromTime(uploaddate)}</Description>
            <Description term="邮寄样衣时间">{getDateFromTime(maildate)}</Description>
            <Description term="审版时间">{getDateFromTime(approvaldate)}</Description>
            <Description term="上市日期">{getDateFromTime(indate)}</Description>
            <Description term="附件">{Enclosure}</Description>
            <Description term="编辑人">{editor}</Description>
            <Description term="编辑时间">{handleGetTime(editdate)}</Description>
            <Description term="审核人">{checker}</Description>
            <Description term="审核时间">{handleGetTime(checkdate)}</Description>
            <Description term="业务员">{operatorName}</Description>
            <Description term="状态">{getJudge(status)}</Description>
            <Description term="备注">{remarks}</Description>
          </DescriptionList>
        </Card>
      </Modal>
    );
  }
}

