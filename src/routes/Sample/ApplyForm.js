import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import {
    Form, Input, DatePicker, Select, Button, Card, InputNumber, Radio, Icon, Tooltip,
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './style.less';
import { Upload, message } from 'antd';
import { Checkbox } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import { getColumns, getWidthSum, handleGetTime, getDateFromTime, getJudge, getMomentFromStr } from '../../utils/ajust';
import { SortableItem } from './werewre/Detail'
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;


class ApplyForm extends PureComponent {
    state = {
        fgText:undefined,
        plText:undefined,
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.submit(values);
                // this.props.dispatch({
                // 	type: 'form/submitRegularForm',
                // 	payload: values,
                // });
            }
        });
    }
    componentWillReceiveProps(nextprops) {
        if ( this.props.item && nextprops.item != this.props.item) {
            const { fgText, plText, xlText } = nextprops.item;
            this.setState({
                plText: plText,
                fgText: fgText,
            });
        }
    }
    render() {
        const { submitting } = this.props;
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const { fgText, plText } = this.state
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
            action: '../FileUpload/Upload',
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
                onCancel={() => this.props.cancel()}
            >
                <Form
                    onSubmit={this.handleSubmit}
                    hideRequiredMark
                    style={{ marginTop: 8 }}
                >
                    <FormItem
                        {...formItemLayout}
                        label="样衣图片"
                        className="Avatar-lable"
                    >
                        <PicturesWall />
                        <FileuploadWithDrag />
                        <span>建议尺寸：800*800PX，单张大小不超过2M，最多可上传3张</span>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="供应商编码"
                    >
                        {getFieldDecorator('supplierId', {
                            rules: [{
                                required: true, message: '请输入供应商编码',
                            }],
                        })(
                            <Input disabled placeholder="供应商编码" />
                            )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="供应商名称"
                    >
                        {getFieldDecorator('supplierName', {
                            rules: [{
                                required: true, message: '请输入供应商名称',
                            }],
                        })(
                            <Input disabled placeholder="供应商名称" />
                            )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="波段号"
                    >
                        {getFieldDecorator('bandname', {
                            rules: [{
                                required: true, message: '请输入波段号',
                            }],
                        })(
                            <Input disabled placeholder="波段号" />
                            )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="品类"
                    >
                        <Input value={plText} disabled placeholder="品类" />
                        {/* {getFieldDecorator('deptid', {
                            rules: [{
                                required: true, message: '请输入品类',
                            }],
                        })(
                           
                            )} */}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="风格"
                    >
                        <Input value={fgText} disabled placeholder="风格" />
                        {/* {getFieldDecorator('dlid', {
                            rules: [{
                                required: true, message: '请输入大类',
                            }],
                        })(
                            <Input disabled placeholder="大类" />
                            )} */}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="供应商货号"
                    >
                        {getFieldDecorator('pcode', {
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
                            <RadioGroup>
                                <Radio value={1}>是</Radio>
                                <Radio value={2}>否</Radio>
                            </RadioGroup>
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
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}

export const AForm = Form.create({
    onFieldsChange(props, changedFields) {
    },
    mapPropsToFields(props) {
        let {
      Id, sampleId, samplename, supplierId, supplierName, bandid, bandname, pcode, deptid,
            deptname, dlid, dlname, pic, ismain, jyfs, editor, editdate, checker, checkdate, status,
            flag, relflag, CompIsvisible, SupIsVisible, note, plid,fgText,plText,xlText
    } = props.item;
        const { name, userid } = props.currentUser;
        editdate = getMomentFromStr(editdate);
        checkdate = getMomentFromStr(checkdate);
        return {
            Id: Form.createFormField({ value: Id }),
            sampleId: Form.createFormField({ value: sampleId }),
            samplename: Form.createFormField({ value: samplename }),
            supplierId: Form.createFormField({ value: supplierId || userid }),
            supplierName: Form.createFormField({ value: supplierName || name }),
            bandid: Form.createFormField({ value: bandid }),
            bandname: Form.createFormField({ value: bandname }),
            pcode: Form.createFormField({ value: pcode }),
            deptid: Form.createFormField({ value: deptid || plid }),
            deptname: Form.createFormField({ value: deptname }),
            dlid: Form.createFormField({ value: dlid }),
            dlname: Form.createFormField({ value: dlname }),
            pic: Form.createFormField({ value: pic }),
            ismain: Form.createFormField({ value: ismain }),
            jyfs: Form.createFormField({ value: jyfs }),
            editor: Form.createFormField({ value: editor }),
            editdate: Form.createFormField({ value: editdate }),
            checker: Form.createFormField({ value: checker }),
            checkdate: Form.createFormField({ value: checkdate }),
            status: Form.createFormField({ value: status }),
            flag: Form.createFormField({ value: flag }),
            relflag: Form.createFormField({ value: relflag }),
            CompIsvisible: Form.createFormField({ value: CompIsvisible }),
            SupIsVisible: Form.createFormField({ value: SupIsVisible }),
            note: Form.createFormField({ value: note }),
        };
    },
})(ApplyForm);


export default connect(({ sampleApply, sysparames, user, loading }) => ({
    item: sampleApply.Edit.data,
    modal: sampleApply.Edit.modal,
    sysparames,
    currentUser: user.currentUser,
    submitting: loading.effects['sampleApply/itemHandle'],
}))(AForm);





/**
 * 文件上传
 */
class FileuploadWithDrag extends PureComponent {
    state = {
        items:[1,2],
    }
    onChange(info) {
        console.log(info)
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    }
    onSortItems = (items) => {
        this.setState({
          items: items
        });
      }
    
    render() {
        const props = {
            name: 'file',
            action: '//jsonplaceholder.typicode.com/posts/',
            multiple: true,
            headers: {
                authorization: 'authorization-text',
            },

        };
        const { items } = this.state;
        return (
            <div className="clearfix">
                {items.map((item, i) => {
                    return (
                        <SortableItem
                            key={i}
                            onSortItems={this.onSortItems}
                            items={items}
                            sortId={i}>
                        </SortableItem>
                    );
                })}
                {items.length>2?'':
                    <Upload onChange={this.onChange} {...props}>
                        <Button className={styles.uploadBtn}  icon="plus" type="dashed"  >
                        </Button>
                    </Upload>
                }
            </div>
        )
    }

}


class PicturesWall extends React.Component {
    state = {
      previewVisible: false,
      previewImage: '',
      fileList: [{
        uid: -1,
        name: 'xxx.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      }],
    };

    handleCancel = () => this.setState({ previewVisible: false })

    handlePreview = (file) => {
      this.setState({
        previewImage: file.url || file.thumbUrl,
        previewVisible: true,
      });
    }
    onDrag = (e) => {
      console.log(e);
    }

    handleChange = ({ fileList }) => {
        console.log(fileList)
        this.setState({ fileList })
    }

    render() {
      const { previewVisible, previewImage, fileList } = this.state;
      const uploadButton = (
        <div>
          <Icon type="plus" />
          <div className="ant-upload-text">Upload</div>
        </div>
      );
      return (
        <div className="clearfix">
          <Upload
            action="../FileUpload/Upload"
            listType="picture-card"
            fileList={fileList}
            onPreview={this.handlePreview}
            onChange={this.handleChange}
          >
            {fileList.length >= 3 ? null : uploadButton}
          </Upload>
          <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
          </Modal>
        </div>
      );
    }
}
