import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Select, Icon, Button, Dropdown, Menu, InputNumber, DatePicker, Modal, message } from 'antd';
import SamplyApply from '../../components/SCMTable/SamplyApply';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import ApplyForm from './ApplyForm';
import ApplyDetail from './ApplyDetail';
import { handleFormReset, handleSearch, toggleForm, renderSimpleForm, renderAdvancedForm, renderForm } from '../Wave/DemandSearchFilter';


import styles from '../Wave/Demand.less';

const confirm = Modal.confirm;

const FormItem = Form.Item;
const { Option } = Select;
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');

@connect(({ sampleApply, loading, sysparames }) => ({
  sampleApply,
  sysparames,
  defaultType: sampleApply.defaultType,
  loading: loading.models.sampleApply,
}))
@Form.create()
export default class Demand extends PureComponent {
    state = {
      addInputValue: '',
      modalVisible: false,
      queryVisible: false,
      expandForm: false,
      selectedRows: [],
      formValues: {},
      item: {},
      editItem: {},
    };

    handleFormReset = handleFormReset.bind(this);
    handleSearch = handleSearch.bind(this);
    toggleForm = toggleForm.bind(this);
    renderSimpleForm = renderSimpleForm.bind(this);
    renderAdvancedForm = renderAdvancedForm.bind(this);
    renderForm = renderForm.bind(this);

    componentDidMount() {
      const { dispatch } = this.props;
      dispatch({
        type: 'sampleApply/fetch',
        payload: {
          start: 0,
          length: 9,
        },
      });
    }

    handleStandardTableChange = (pagination, filtersArg, sorter) => {
      const { dispatch } = this.props;
      const { formValues } = this.state;

      const filters = Object.keys(filtersArg).reduce((obj, key) => {
        const newObj = { ...obj };
        newObj[key] = getValue(filtersArg[key]);
        return newObj;
      }, {});

      const params = {
        start: pagination.current - 1,
        length: pagination.pageSize,
        ...formValues,
        ...filters,
      };
      if (sorter.field) {
        params.sorter = `${sorter.field}_${sorter.order}`;
      }

      dispatch({
        type: 'sampleApply/fetch',
        payload: params,
      });
    }

    handleModalVisible = (flag) => {
      this.setState({
        modalVisible: !!flag,
      });
    }

    handleQueryVisible = (flag) => {
      this.setState({
        queryVisible: !!flag,
      });
    }

    handleAddInput = (e) => {
      this.setState({
        addInputValue: e.target.value,
      });
    }

    handleAdd = () => {
      this.props.dispatch({
        type: 'sampleApply/add',
        payload: {
          description: this.state.addInputValue,
        },
      });

      message.success('添加成功');
      this.setState({
        modalVisible: false,
      });
    }
    hanldeDeleteData = item => () => {
      confirm({
        title: '你确定要这么操作',
        content: `波段号为${item.bandid}, 波段名称为${item.bandname}会在数据库中删除，请注意！`,
        onOk: () => {
          this.props.dispatch({
            type: 'sampleApply/itemHandle',
            payload: {
              type: 'Delete',
              data: { id: item.id },
            },
          });
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    }
    hanldeEditData = item => () => {
      this.props.dispatch({
        type: 'sampleApply/setEditData',
        payload: item,
      });
    }
    queryData = item => () => {
      this.props.dispatch({
        type: 'sampleApply/setQueryData',
        payload: item,
      });
    }

    render() {
      const { sampleApply: { data }, loading } = this.props;
      const { selectedRows, modalVisible, addInputValue, queryVisible, editItem } = this.state;
      const funs = {
        Create: this.handleAdd,
        Delete: this.hanldeDeleteData,
        Edit: this.hanldeEditData,
        Query: this.queryData,
      };

      return (
        <PageHeaderLayout title="样衣申请">
          <Card bordered={false}>
            <div className={styles.tableList}>
              <div className={styles.tableListForm}>
                {this.renderForm()}
              </div>
              <div className={styles.tableListOperator}>
                <Button icon="export" type="nomal" onClick={() => this.handleModalVisible(true)}>
                                导出
                </Button>
              </div>
              <SamplyApply
                funs={funs}
                loading={loading}
                data={data}
                onChange={this.handleStandardTableChange}
              />
            </div>
          </Card>
          <ApplyForm />
          <ApplyDetail />
        </PageHeaderLayout>
      );
    }
}

