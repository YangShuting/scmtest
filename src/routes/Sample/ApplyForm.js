import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form, Input, DatePicker, Select, Button, Card, InputNumber, Radio, Icon, Tooltip,
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './style.less';
import { Upload, message } from 'antd';
import { Checkbox } from 'antd';
import Modal from 'antd/lib/modal/Modal';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

@connect(({ loading }) => ({
  submitting: loading.effects['form/submitRegularForm'],
}))
@Form.create()
export default class ApplyForm extends PureComponent {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'form/submitRegularForm',
          payload: values,
        });
      }
    });
  }
  render() {
    const { submitting } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };
    const props = {
        name: 'file',
        action: '//jsonplaceholder.typicode.com/posts/',
        headers: {
          authorization: 'authorization-text',
        },
        onChange(info) {
          if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
          if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
          } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
        },
      };
      
    return (
        <Modal
            title="编辑样衣申请"
            width="90%"
            footer={null}
            visible={this.props.modal}
            // onOk={this.props.dispatch({type:'closeEdit'})}
            onCancel={() => this.props.dispatch({ type: 'Sample/closeEdit' })}
        >
          <Form
            onSubmit={this.handleSubmit}
            hideRequiredMark
            style={{ marginTop: 8 }}
          >
            <FormItem
              {...formItemLayout}
              label="样衣图片" className="Avatar-lable"
            >
              <Upload {...props}>
                <Button>
                    <Icon type="upload" /> Click to Upload
                </Button>
            </Upload>
                <span>建议尺寸：800*800PX，单张大小不超过2M，最多可上传3张</span>
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="供应商编码"
            >
              {getFieldDecorator('title', {
                rules: [{
                  required: true, message: '请输入供应商编码',
                }],
              })(
                <Input placeholder="供应商编码" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="供应商名称"
            >
              {getFieldDecorator('title', {
                rules: [{
                  required: true, message: '请输入供应商名称',
                }],
              })(
                <Input placeholder="供应商名称" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="波段号"
            >
              {getFieldDecorator('title', {
                rules: [{
                  required: true, message: '请输入波段号',
                }],
              })(
                <Input placeholder="波段号" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="品类"
            >
              {getFieldDecorator('title', {
                rules: [{
                  required: true, message: '请输入品类',
                }],
              })(
                <Input placeholder="品类" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="大类"
            >
              {getFieldDecorator('title', {
                rules: [{
                  required: true, message: '请输入大类',
                }],
              })(
                <Input placeholder="大类" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="供应商货号"
            >
              {getFieldDecorator('title', {
                rules: [{
                  required: true, message: '请输入供应商货号',
                }],
              })(
                <Input placeholder="供应商货号" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="供应商主款"
            >
              {getFieldDecorator('title', {
                rules: [{
                  required: true, message: '请输入供应商主款',
                }],
              })(
                <Input placeholder="供应商主款" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="合作方式"
            >
              {getFieldDecorator('title', {
                rules: [{
                  required: true, message: '请输入供应商主款',
                }],
              })(
                <Checkbox >试销</Checkbox>

              )}
            </FormItem>
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                提交
              </Button>
              <Button style={{ marginLeft: 8 }}>保存</Button>
            </FormItem>
          </Form>
        </Modal>
    );
  }
}


