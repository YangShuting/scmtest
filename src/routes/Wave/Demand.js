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

    // handleFormReset = () => {
    //   const { form, dispatch } = this.props;
    //   form.resetFields();
    //   this.setState({
    //     formValues: {},
    //   });
    //   dispatch({
    //     type: 'waveDemand/fetch',
    //     payload: {},
    //   });
    // }

    // toggleForm = () => {
    //   this.setState({
    //     expandForm: !this.state.expandForm,
    //   });
    // }

    // handleSearch = (e) => {
    //   e.preventDefault();

    //   const { dispatch, form, data } = this.props;

    //   form.validateFields((err, fieldsValue) => {
    //     if (err) return;

    //     const values = {
    //       ...fieldsValue,
    //     };
    //     const realValue = {};
    //     Object.keys(values).forEach((item) => {
    //       if (values[item]) {
    //         realValue[item] = values[item];
    //       }
    //     });
    //     console.log(realValue);
    //     this.setState({
    //       formValues: realValue,
    //     });

    //     dispatch({
    //       type: 'waveDemand/fetch',
    //       payload: {
    //         ...realValue,
    //         start: 0,
    //         length: 9,
    //       },
    //     });
    //   });
    // }

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

    // renderSimpleForm() {
    //   const { getFieldDecorator } = this.props.form;
    //   const { sysparames: { band, category } } = this.props;
    //   const realCategory = getTreeByLevel(category, 2);

    //   return (
    //     <Form onSubmit={this.handleSearch} layout="inline">
    //       <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
    //         <Col md={8} sm={24}>
    //           <FormItem label="波段(多选)">
    //             {getFieldDecorator('brand')(
    //               <Select optionFilterProp="children" mode="multiple" placeholder="请选择" style={{ width: '100%' }}>
    //                 {band.map(item => <Option key={item.Key} value={item.Key}>{item.Value}</Option>)}
    //               </Select>
    //                         )}
    //           </FormItem>
    //         </Col>
    //         <Col md={8} sm={24}>
    //           <FormItem label="风格(多选)">
    //             {getFieldDecorator('fgid')(
    //               <Select optionFilterProp="children" mode="multiple" placeholder="请选择" style={{ width: '100%' }}>
    //                 {realCategory.map(item => <Option key={item.categoryid} value={item.categoryid}>{item.categoryname}</Option>)}
    //               </Select>
    //                         )}
    //           </FormItem>
    //         </Col>
    //         <Col md={8} sm={24}>
    //           <span className={styles.submitButtons}>
    //             <Button type="primary" htmlType="submit">查询</Button>
    //             <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
    //             <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
    //                             展开 <Icon type="down" />
    //             </a>
    //           </span>
    //         </Col>
    //       </Row>
    //     </Form>
    //   );
    // }

    // renderAdvancedForm() {
    //   const { getFieldDecorator } = this.props.form;
    //   const { sysparames: { band, category, bandYear } } = this.props;
    //   const realCategory = getTreeByLevel(category, 2);

    //   return (
    //     <Form onSubmit={this.handleSearch} layout="inline">
    //       <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
    //         <Col md={8} sm={24}>
    //           <FormItem label="波段(多选)">
    //             {getFieldDecorator('brand')(
    //               <Select optionFilterProp="children" mode="multiple" placeholder="请选择" style={{ width: '100%' }}>
    //                 {band.map(item => <Option value={item.Key} key={item.Key}>{item.Value}</Option>)}
    //               </Select>
    //                         )}
    //           </FormItem>
    //         </Col>
    //         <Col md={8} sm={24}>
    //           <FormItem label="风格(多选)">
    //             {getFieldDecorator('fgid')(
    //               <Select optionFilterProp="children" mode="multiple" placeholder="请选择" style={{ width: '100%' }}>
    //                 {realCategory.map(item => <Option value={item.categoryid}>{item.categoryname}</Option>)}
    //               </Select>
    //                         )}
    //           </FormItem>
    //         </Col>
    //         <Col md={8} sm={24}>
    //           <FormItem label="年份(多选)">
    //             {getFieldDecorator('Year')(
    //               <Select optionFilterProp="children" mode="multiple" placeholder="请选择" style={{ width: '100%' }}>
    //                 {bandYear.map(item => <Option key={item.Key} value={item.Key}>{item.Value}</Option>)}
    //               </Select>
    //                         )}
    //           </FormItem>
    //         </Col>
    //       </Row>
    //       <div style={{ overflow: 'hidden' }}>
    //         <span style={{ float: 'right', marginBottom: 24 }}>
    //           <Button type="primary" htmlType="submit">查询</Button>
    //           <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
    //           <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
    //                         收起 <Icon type="up" />
    //           </a>
    //         </span>
    //       </div>
    //     </Form>
    //   );
    // }

    // renderForm() {
    //   return this.state.expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
    // }

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

        // const menu = (
        //     <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        //         <Menu.Item key="remove">删除</Menu.Item>
        //         <Menu.Item key="approval">批量审批</Menu.Item>
        //     </Menu>
        // );

      return (
        <PageHeaderLayout title="波段计划管理">
          <Card bordered={false}>
            <div className={styles.tableList}>
              <div className={styles.tableListForm}>
                {this.renderForm()}
              </div>
              <div className={styles.tableListOperator}>
                <Button icon="plus" type="primary" onClick={() => this.props.dispatch({ type: 'waveDemand/setEditData', payload: {} })}>
                                新建
                </Button>
                <Button icon="export" type="nomal" onClick={() => this.handleModalVisible(true)}>
                                导出
                </Button>
                {/* {
                                selectedRows.length > 0 && (
                                    <span>
                                        <Button>批量操作</Button>
                                        <Dropdown overlay={menu}>
                                            <Button>
                                                更多操作 <Icon type="down" />
                                            </Button>
                                        </Dropdown>
                                    </span>
                                )
                            } */}
              </div>
              <WavePlanTable
                funs={funs}
                            // selectedRows={selectedRows}
                loading={loading}
                data={data}
                user={user}
                onChange={this.handleStandardTableChange}
              />
            </div>
          </Card>
          <DemandForm />
          <DemandDetail />
          {/* <Modal
                    title="编辑波段数据"
                    width="90%"
                    footer={null}
                    visible={modalVisible}
                    onOk={this.handleAdd}
                    onCancel={() => this.handleModalVisible()}
                >
                    <DemandForm item={editItem} onCancel={() => this.handleModalVisible()} />
                </Modal> */}
          {/* <Modal
                    title={null}
                    width="90%"
                    footer={null}
                    visible={queryVisible}
                    onCancel={() => this.handleQueryVisible()}
                >
                    <DemandDetail item={this.state.item} queryVisible={queryVisible} />
                </Modal> */}
        </PageHeaderLayout>
      );
    }
}


// @connect(({ sysparames, loading }) => ({
//     band: sysparames.band
//   }))
// export class BandChosen extends PureComponent{
//     render(){
//         const { band } = this.props
//         return (
//             <Select placeholder="请选择" style={{ width: '100%' }}>
//                 {band.map(item=><Option value={item.Key}>{item.Value}</Option>
//                 )}
//                 {/* <Option value="0">关闭</Option>
//                 <Option value="1">运行中</Option> */}
//             </Select>
//         )
//     }
// }

