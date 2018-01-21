import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Modal, Card, Badge, Table, Button, Divider, Row, Col, Layout, Input } from 'antd';
import DescriptionList from '../../../components/DescriptionList';
import { sortable } from 'react-sortable';
import { LazyLoadImg } from '../../../utils/ajust';
import style from '../style.less';
const { TextArea } = Input;

const { Description } = DescriptionList;
import { getColumns, getWidthSum, handleGetTime, getDateFromTime, getJudge, ifNotJudge } from '../../../utils/ajust';
// import { Button } from 'antd/lib/radio';

@connect(({ sampleApply, loading }) => ({
    item: sampleApply.Query,
}))
export default class DemandDetail extends PureComponent {
    close = () => {
        dispatch({ type: 'sampleApply/closeQuery' });
    }
    render() {
        return (
            <Detail data={this.props.item.data} close={this.close} modal={this.props.item.modal} />
        );
    }
}

class Item extends React.Component {
    render() {
        return (
            <div className={style.img}>
                <LazyLoadImg {...this.props} />
            </div>
        )
    }
}

export const SortableItem = sortable(Item);


@connect(({ sampleApply, loading }) => ({
    item: sampleApply.Audit,
}))
export class Detail extends PureComponent {
    state = {
        mask:undefined,
    }
    handleNotOk = () =>{
        const { Id } = this.props.item.data;
        const { mask } = this.state;
        const payload = {
            data: {
                ids:Id,
                mask
            },
            type: 'No'
        };
        this.props.dispatch({
            type:'sampleApply/audit',
            payload
        })
    }
    handleOk = () =>{
        const { Id } = this.props.item.data;
        const { mask } = this.state;
        const payload = {
            data: {
                ids:Id,
                mask
            },
            type: 'Yes'
        };
        this.props.dispatch({
            type:'sampleApply/audit',
            payload
        })
    }
    maskChange = (e)=>{
        this.setState({
            mask:e.target.value
        })
    }
    close = ()=>{
        this.props.dispatch({
            type:'sampleApply/setAudit',
            payload:{
                modal:false,
                data:{},
            }
        })
    }
    render() {
        console.log(this.props)
        const {
                Id, sampleId, samplename, supplierId, supplierName, bandid, bandname, pcode, deptid,
                deptname, dlid, dlname, pic, ismain, jyfs, editor, editdate, checker, checkdate, status,
                flag, relflag, CompIsvisible, SupIsVisible, note, plid, ImageIdPath1, ImageIdPath2, ImageIdPath3,
                ImageId1, ImageId2, ImageId3
    } = this.props.item.data;
        let items = [ImageIdPath1, ImageIdPath2, ImageIdPath3];
        const { modal } = this.props.item;
        const { mask } = this.state;
        // const { name, userid } = currentUser;

        // console.log(user)
        return (
            <Modal
                title="样衣资料"
                footer={null}
                width={980}
                visible={modal}
                onCancel={() => this.close()}
            >

                <Row className={style.row}>
                    <Col className={style.lable} xs={24}
                                sm={7}>
                                样衣图片：
                    </Col>
                    <Col xs={24}
                        sm={12}
                        md={10}>
                        {items.map((item, i) => {
                            return (
                                <SortableItem
                                    key={i}
                                    onSortItems={this.onSortItems}
                                    items={items}
                                    sortId={i}>
                                    {/* {item} */}
                                </SortableItem>
                            );
                        })}
                    </Col>
                </Row>
                <Row className={style.row}>
                    <Col className={style.lable} xs={24}
                                sm={7}>
                    </Col>
                    <Col xs={24}
                        sm={12}
                        md={10}>
                        提示：拖动更换照片顺序，排在第一个的为主图
                    </Col>
                </Row>
                <Row className={style.row}>
                    <Col className={style.lable} xs={24}
                        sm={7}>
                        供应商编码：
              </Col>
                    <Col xs={24}
                        sm={12}
                        md={10}>
                        {supplierId}
                    </Col>
                </Row>
                <Row className={style.row}>
                    <Col className={style.lable} xs={24}
                        sm={7}>
                        供应商名称：
              </Col>
                    <Col xs={24}
                        sm={12}
                        md={10}>
                        {supplierName}
                    </Col>
                </Row>
                <Row className={style.row}>
                    <Col className={style.lable} xs={24}
                        sm={7}>
                        波段号：
              </Col>
                    <Col xs={24}
                        sm={12}
                        md={10}>
                        {bandname}
                    </Col>
                </Row>
                <Row className={style.row}>
                    <Col className={style.lable} xs={24}
                        sm={7}>
                        品类：
              </Col>
                    <Col xs={24}
                        sm={12}
                        md={10}>
                        {plid}
                    </Col>
                </Row>
                <Row className={style.row}>
                    <Col className={style.lable} xs={24}
                        sm={7}>
                        大类：
              </Col>
                    <Col xs={24}
                        sm={12}
                        md={10}>
                        {dlid}
                    </Col>
                </Row>
                <Row className={style.row}>
                    <Col className={style.lable} xs={24}
                        sm={7}>
                        供应商货号：
              </Col>
                    <Col xs={24}
                        sm={12}
                        md={10}>
                        {pcode}
                    </Col>
                </Row>
                <Row className={style.row}>
                    <Col className={style.lable} xs={24}
                        sm={7}>
                        主荐款：
              </Col>
                    <Col xs={24}
                        sm={12}
                        md={10}>
                        {ifNotJudge(ismain)}
                    </Col>
                </Row>
                <Row className={style.row}>
                    <Col className={style.lable} xs={24}
                        sm={7}>
                        合作方式：
              </Col>
                    <Col xs={24}
                        sm={12}
                        md={10}>
                        {jyfs==1?'试销':'其他'}
                    </Col>
                </Row>
                <Row className={style.row}>
                    <Col className={style.lable} xs={24}
                        sm={7}>
                        备注：
              </Col>
                    <Col xs={24}
                        sm={12}
                        md={10}>
                        <TextArea value = {mask?mask:note} onChange={this.maskChange}/>
                    </Col>
                </Row>


            </Modal>
        );
    }
}


