import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Checkbox, Card, Form, Input, Select, Icon, Button, Dropdown, Menu, InputNumber, DatePicker, Modal, message } from 'antd';
import SamplyApply from '../../components/SCMTable/SamplyApply';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import ApplyForm from './ApplyForm';
import ApplyDetail from './ApplyDetail';
import InfiniteScroller from './werewre/Infinite';
import { handleFormReset, handleSearch, toggleForm, renderSimpleForm, renderAdvancedForm, renderForm } from '../Wave/DemandSearchFilter';
const { TextArea } = Input;


import styles from '../Wave/Demand.less';

const confirm = Modal.confirm;

const FormItem = Form.Item;
const { Option } = Select;
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');

@connect(({ sampleWerewre, loading, user, sysparames }) => ({
    sampleWerewre,
    sysparames,
    user,
    loading: loading.models.werewre,
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
        mask: '',
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
            type: 'sampleWerewre/fetch',
            payload: {
                start: 0,
                length: 9,
            },
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
    handleTxt = (e) => {
        this.setState({
            mask: e.target.value,
        });
    }
  
    render() {
        const { sampleWerewre: { data: { list } }, user, loading } = this.props;
        const { selectedRows, modalVisible, addInputValue, queryVisible, editItem } = this.state;
        const funs = {
        };

        return (
            <PageHeaderLayout title="样衣海选">
                <Card bordered={false}>
                    <div className={styles.tableList}>
                        <div className={styles.tableListForm}>
                            {this.renderForm()}
                        </div>
                        <InfiniteScroller user={user} funs={funs} data={list} loading={loading} />
                    </div>
                </Card>
            </PageHeaderLayout>
        );
    }
}






