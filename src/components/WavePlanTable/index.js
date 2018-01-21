import React, { PureComponent, Fragment } from 'react';
import moment from 'moment';
import { Table, Alert, Badge, Divider } from 'antd';
import styles from './index.less';
import { getColumns, getWidthSum, handleGetTime, getDateFromTime, getJudge } from '../../utils/ajust';

const statusMap = ['default', 'processing', 'success', 'error'];
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
	    { dataIndex: 'id', title: '系统ID' },
	    { dataIndex: 'Year', title: '年份' },
	    { dataIndex: 'bandid', title: '波段号' },
	    { dataIndex: 'bandname', title: '波段名称' },
	    { dataIndex: 'fgid', title: '风格' },
	    { dataIndex: 'plid', title: '品类' },
	    { dataIndex: 'xlid', title: '小类' },
	    { dataIndex: 'supplyqty', title: '上货款数' },
	    { dataIndex: 'kindqty', title: '提供样版数' },
	    { dataIndex: 'uploaddate', title: '上传图片截止时间', render: getDateFromTime },
	    { dataIndex: 'maildate', title: '邮寄样衣时间', render: getDateFromTime },
	    { dataIndex: 'approvaldate', title: '审版时间', render: getDateFromTime },
	    { dataIndex: 'indate', title: '上市日期', render: getDateFromTime },
	    { dataIndex: 'Enclosure', title: '附件' },
	    { dataIndex: 'editor', title: '编辑人' },
	    { dataIndex: 'editdate', width: 200, title: '编辑时间', render: handleGetTime },
	    { dataIndex: 'checker', title: '审核人' },
	    { dataIndex: 'checkdate', width: 200, title: '审核时间', render: handleGetTime },
	    { dataIndex: 'operatorName', title: '业务员' },
	    { dataIndex: 'status', title: '状态', render: getJudge },
	    { dataIndex: 'remarks', title: '备注' },
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
	          // return (
	          // 	<span>
	          // 		{value.map((element, index) => {
	          // 			return (
	          // 				<Fragment>
	          // 					<a>
	          // 						{element.title}
	          // 					</a>
	          // 					{value.length > index + 1 ? <Divider type="vertical" /> : ''}
	          // 				</Fragment>
	          // 			)
	          // 		})}
	          // 	</span>
	          // )
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
