import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Select, Icon, Button, Dropdown, Menu, InputNumber, DatePicker, Modal, message } from 'antd';
import WavePlanTable from '../../components/SCMTable/WavePlanTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import DemandForm from './DemandForm';
import DemandDetail from './DemandDetail';
import { handleFormReset, handleSearch, toggleForm, renderSimpleForm, renderAdvancedForm, renderForm } from './DemandSearchFilter';


import styles from './Demand.less';

const confirm = Modal.confirm;

const FormItem = Form.Item;
const { Option } = Select;
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');

@connect(({ waveDemand, sampleApply, loading, sysparames, user }) => ({
  waveDemand,
  sampleApply,
  sysparames,
  user,
  defaultType: waveDemand.defaultType,
  loading: loading.models.waveDemand,
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
        type: 'waveDemand/fetch',
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
        type: 'waveDemand/fetch',
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
        type: 'waveDemand/add',
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
            type: 'waveDemand/itemHandle',
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
        type: 'waveDemand/setEditData',
        payload: item,
      });
    }
    queryData = item => () => {
      this.props.dispatch({
        type: 'waveDemand/setQueryData',
        payload: item,
      });
    }

    render() {
      const { waveDemand: { data }, loading, user } = this.props;
      const { selectedRows, modalVisible, addInputValue, queryVisible, editItem } = this.state;
      const funs = {
        Create: this.handleAdd,
        Delete: this.hanldeDeleteData,
        Edit: this.hanldeEditData,
        Query: this.queryData,
        Dispatch: this.props.dispatch,
      };
      return (
        <PageHeaderLayout title="波段计划管理">
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
              <WavePlanTable
                funs={funs}
                loading={loading}
                data={data}
                user={user}
                onChange={this.handleStandardTableChange}
              />
            </div>
          </Card>
          <DemandForm />
          <DemandDetail />

        </PageHeaderLayout>
      );
    }
}
