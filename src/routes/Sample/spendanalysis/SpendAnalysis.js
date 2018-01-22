import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Row, Col, Tabs, Input } from 'antd'
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import styles from './SpendAnalysis.less';
import { LazyLoadImg } from '../../../utils/ajust';
const { TabPane } = Tabs;
import Mater from './Mater';


@connect(({ sampleApply, loading, user, sysparames }) => ({
    sampleApply,
    sysparames,
    user,
    defaultType: sampleApply.defaultType,
    loading: loading.models.sampleApply,
}))
export default class SpendAnalysis extends PureComponent {
    state = {

    };

    componentDidMount() {

    }

    
    render() {return (
            <PageHeaderLayout title="样衣成本分解">
                <Card bordered={false}>
                    <Row>
                        <Col xs={24} sm={12} md={8} lg={6} xl={4}>
                            <LazyLoadImg style={{width:'100%'}}/>
                        </Col>
                        <Col className={styles.textblock} xs={24} sm={12} md={16} lg={18} xl={20}>
                            <Col className={styles.textline} xs={24}>
                                供应商编码：256
                            </Col>
                            <Col className={styles.textline} xs={24}>
                                供应商名称：福建省石狮市雪上鞋城工业区5号楼四套
                            </Col>
                            <Col className={styles.textline} xs={24}>
                                供应商货号：234556
                            </Col>
                            <Col className={styles.textline} xs={24}>
                                款号：123455
                            </Col>
                            <Col className={styles.textline} xs={24}>
                                品类：T恤
                            </Col>
                            <Col className={styles.textline} xs={24}>
                                风格：时尚休闲风格
                            </Col>
                            <Col className={styles.textline} xs={24}>
                                报价日期：2017
                            </Col>
                        </Col>
                    </Row>
                    <Row>
                        <Tabs size="large">
                            <TabPane tab="面料" key="1">
                                <Mater />
                            </TabPane>
                            <TabPane tab="辅助类" key="2">
                            </TabPane>
                            <TabPane tab="工艺类" key="3">
                            </TabPane>
                            <TabPane tab="费用" key="4">
                            </TabPane>
                        </Tabs>
                    </Row>
                    <Row>
                        <Col xs={24}>
                            报价总成本合计：0.00
                        </Col>
                        <Col xs={24}>
                            最终报价：<Input type="number"/>
                        </Col>
                    </Row>
                </Card>
            </PageHeaderLayout>
        );
    }
}

