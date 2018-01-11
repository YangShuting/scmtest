import React, { PureComponent, Fragment } from 'react';
import moment from 'moment';
import { Table, Alert, Badge, Divider } from 'antd';
import styles from './index.less';

const statusMap = ['default', 'processing', 'success', 'error'];
class StandardTable extends PureComponent {
  state = {
    totalCallNo: 0,
  };

  componentWillReceiveProps(nextProps) {
    // clean state
    if (nextProps.selectedRows.length === 0) {
      this.setState({
        totalCallNo: 0,
      });
    }
  }

  handleTableChange = (pagination, filters, sorter) => {
    this.props.onChange(pagination, filters, sorter);
  }


  render() {
    const { totalCallNo } = this.state;
    const { data: { list, pagination }, loading } = this.props;

    const columns = [
      {title:'年份', dataIndex: 'no',},
      {title:'波段号', dataIndex: 'no',},
      {title:'波段', dataIndex: 'no',},
      {title:'风格', dataIndex: 'no',},
      {title:'品类', dataIndex: 'no',},
      {title:'小类', dataIndex: 'no',},
      {title:'上货款数', dataIndex: 'no',},
      {title:'提供样版款数', dataIndex: 'no',},
      {title:'上传图片截止时间', dataIndex: 'no',},
      {title:'寄样版截止时间', dataIndex: 'no',},
      {title:'审版时间', dataIndex: 'no',},
      {title:'上市日期', dataIndex: 'no',},
      {title:'款式参考资料', dataIndex: 'no',},
      {title:'备注', dataIndex: 'no',},
      {title:'状态', dataIndex: 'no',},
      {title:'操作', dataIndex: 'no',}
    ];

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination,
    };

    return (
      <div className={styles.standardTable}>
        <Table
          loading={loading}
          rowKey={record => record.key}
          dataSource={list}
          columns={columns}
          pagination={paginationProps}
          onChange={this.handleTableChange}
        />
      </div>
    );
  }
}

export default StandardTable;
