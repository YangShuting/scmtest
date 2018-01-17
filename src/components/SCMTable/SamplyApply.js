import React, { PureComponent, Fragment } from 'react';
import moment from 'moment';
import { Table, Alert, Badge, Divider } from 'antd';
import styles from './index.less';
import { getColumns, getWidthSum, handleGetTime, getDateFromTime, getJudge } from '../../utils/ajust';

class StandardTable extends PureComponent {
	state = {
	  totalCallNo: 0,
	};

	componentWillReceiveProps(nextProps) {
	  // clean state
	  // if (nextProps.selectedRows.length === 0) {
	  // 	this.setState({
	  // 		totalCallNo: 0,
	  // 	});
	  // }
	}

	handleTableChange = (pagination, filters, sorter) => {
	  this.props.onChange(pagination, filters, sorter);
	}

	checkData = item => () => {
	  this.props.checkData(item);
	}


	render() {
	  const { totalCallNo } = this.state;
	  const { data: { list, recordsTotal, pagination }, loading } = this.props;


	  const columns = getColumns([
	    { dataIndex: 'Id', title: '主键ID' },
	    { dataIndex: 'sampleId', title: '样衣编码' },
	    { dataIndex: 'samplename', title: '样衣名称' },
	    { dataIndex: 'supplierId', title: '供应商编码' },
	    { dataIndex: 'supplierName', title: '供应商名称' },
	    { dataIndex: 'bandid', title: '波段ID' },
	    { dataIndex: 'bandname', title: '波段名称' },
	    { dataIndex: 'pcode', title: '供应商货号' },
	    { dataIndex: 'deptid', title: '品类' },
	    { dataIndex: 'deptname', title: '品类名称' },
	    { dataIndex: 'dlid', title: '大类' },
	    { dataIndex: 'dlname', title: '大类名称' },
	    { dataIndex: 'pic', title: '图片' },
	    { dataIndex: 'ismain', title: '是否主款' },
	    { dataIndex: 'jyfs', title: '合作方式 1-试销' },
	    { dataIndex: 'editor', title: '编辑人' },
	    { dataIndex: 'editdate', title: '编辑时间', render: getDateFromTime },
	    { dataIndex: 'checker', title: '审核人' },
	    { dataIndex: 'checkdate', title: '审核时间', render: getDateFromTime },
	    { dataIndex: 'status', title: '状态' },
	    { dataIndex: 'flag', title: '审批状态' },
	    { dataIndex: 'relflag', title: '发布状态' },
	    { dataIndex: 'CompIsvisible', title: '天天惠是否可见' },
	    { dataIndex: 'SupIsVisible', title: '供应商是否可见' },
	    { dataIndex: 'note', title: '备注' },
	    {
	      title: '操作',
	      dataIndex: 'operation',
	      width: 200,
	      fixed: 'right',
	      render: (value, row, index) => {
	        if (row.status == 1) {
	          return (
  <a onClick={this.props.funs.Query(row)}>
								查看
  </a>
	          );
	        } else {
	          return getOperationHandle(value, row, this.props.funs);
	        }
	      },
	    },
	  ]);
	  const width = getWidthSum(columns);
	  const paginationProps = {
	    showSizeChanger: true,
	    showQuickJumper: true,
	    ...pagination,
	    total: recordsTotal + 1,
	  };

	  return (
  <div className={styles.standardTable}>
    <Table
      className="xw-table"
      rowKey="id"
      bordered
      loading={loading}
					// rowKey={record => record.key}
      dataSource={list}
      columns={columns}
      pagination={paginationProps}
      onChange={this.handleTableChange}
      scroll={{ x: width }}
    />
  </div>
	  );
	}
}

export default StandardTable;


const getOperationHandle = (value, row, fns) => {
  let divi = 0;
  const sum = value.filter(element => element.action != 'Save' && element.action != 'Create' && fns[element.action]).length;
  return (
    <Fragment>
      {value.map((element, index) => {
				if (element.action != 'Save' && element.action != 'Create' && fns[element.action]) {
					divi++;
					return (
  <Fragment key={index}>
    <a onClick={fns[element.action](row)}>
      {element.title}
    </a>
    { divi < sum ? <Divider type="vertical" /> : ''}
  </Fragment>
					);
				}
			})}
    </Fragment>
  );
};
