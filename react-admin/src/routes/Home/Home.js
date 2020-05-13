import React, { Component } from 'react';
import { Form, Row, Col, Input, Button, Select, Divider, Tag, Tooltip, Icon } from 'antd';
import ProductIndustry from './ProductIndustry'
import CreativeKeywords from './CreativeKeywords'
import AdTable from './AdTable'

import './Home.less'
class Home extends Component {
    state = {
        expand: false,
        editBalckFlag: false,
       
    };
    // To generate mock Form.Item

    handleSearch = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log('Received values of form: ', values);
        });
    };

    handleReset = () => {
        this.props.form.resetFields();
    };
    editBlack = () => {
        this.setState({ editBalckFlag: true })
    };
  
    confirmBlack=()=>{
        this.setState({ editBalckFlag: false })
    };
    cancerBlack=()=>{
        this.setState({ editBalckFlag: false })
    };
    editBlackCom() {

        return (<Row>
            <Col span={8}>
            <CreativeKeywords></CreativeKeywords>
            </Col>
            <Col span={16}>
            <ProductIndustry></ProductIndustry>
            </Col>
             </Row>)
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        const { Option } = Select;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        return (
            <div id='Home'>
                <Form  {...formItemLayout} className="ant-advanced-search-form" onSubmit={this.handleSearch}>
                    <Row gutter={24}>
                        <Col span={6}>
                            <Form.Item label={`创意ID`}>
                                {getFieldDecorator(`creativeId`)(<Input placeholder="请输入创意ID" />)}
                            </Form.Item>
                        </Col>

                        <Col span={6}>
                            <Form.Item label={`dsp名称`}>
                                {getFieldDecorator(`dspName`)(<Input placeholder="请输入dsp名称" />)}
                            </Form.Item>
                        </Col>

                        <Col span={6}>
                            <Form.Item label={`创意名称`}>
                                {getFieldDecorator(`creativeName`)(<Input placeholder="请输入创意名称" />)}
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label={`品牌名称`}>
                                {getFieldDecorator(`brandName`)(<Input placeholder="请输入品牌名称" />)}

                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label={`产品所在行业`}>
                                {getFieldDecorator(`brandName`)(<Input placeholder="请输入品牌名称" />)}

                            </Form.Item>
                        </Col>

                        <Col span={6}>
                            <Form.Item label={`投放类型`}>
                                {getFieldDecorator(`contentType`)(<Select defaultValue="lucy"  >
                                    <Option value="jack">Jack</Option>
                                    <Option value="lucy">Lucy</Option>
                                    <Option value="Yiminghe">yiminghe</Option>
                                </Select>)}
                            </Form.Item>
                        </Col>

                        <Col span={6}>
                            <Form.Item label={`投放媒体`}>
                                {getFieldDecorator(`sspCode`)(<Select defaultValue="lucy"  >
                                    <Option value="jack">Jack</Option>
                                    <Option value="lucy">Lucy</Option>
                                    <Option value="Yiminghe">yiminghe</Option>
                                </Select>)}
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label={`投放位置`}>
                                <Row >
                                    <Col span={8}>
                                        {getFieldDecorator(`firstFormatId`)(<Select className="selects" defaultValue="lucy"  >
                                            <Option value="jack">Jack</Option>
                                            <Option value="lucy">Lucy</Option>
                                            <Option value="Yiminghe">yiminghe</Option>
                                        </Select>)}
                                    </Col>
                                    <Col span={8}>
                                        {getFieldDecorator(`secondFormatId`)(<Select className="selects" defaultValue="lucy"  >
                                            <Option value="jack">Jack</Option>
                                            <Option value="lucy">Lucy</Option>
                                            <Option value="Yiminghe">yiminghe</Option>
                                        </Select>)}
                                    </Col>
                                    <Col span={8}>
                                        {getFieldDecorator(`thirdFormatId`)(<Select className="selects" defaultValue="lucy"  >
                                            <Option value="jack">Jack</Option>
                                            <Option value="lucy">Lucy</Option>
                                            <Option value="Yiminghe">yiminghe</Option>
                                        </Select>)}
                                    </Col>

                                </Row>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label={`创意渠道`}>
                                {getFieldDecorator(`channleId`)(<Select defaultValue="lucy"  >
                                    <Option value="jack">Jack</Option>
                                    <Option value="lucy">Lucy</Option>
                                    <Option value="Yiminghe">yiminghe</Option>
                                </Select>)}
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label={`创意状态`}>
                                {getFieldDecorator(`auditStatus`)(<Select defaultValue="lucy"  >
                                    <Option value="jack">Jack</Option>
                                    <Option value="lucy">Lucy</Option>
                                    <Option value="Yiminghe">yiminghe</Option>
                                </Select>)}
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label={`创建时间`}>
                                {getFieldDecorator(`brandName`)(<Select defaultValue="lucy"  >
                                    <Option value="jack">Jack</Option>
                                    <Option value="lucy">Lucy</Option>
                                    <Option value="Yiminghe">yiminghe</Option>
                                </Select>)}
                            </Form.Item>
                        </Col>
                        <Col span={6}>

                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    查询
                            </Button>
                                <Button style={{ marginLeft: '10px' }} onClick={this.handleReset}>
                                    重置
                            </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Divider />
                    <div>
                        <Row>
                            <Col span={4}><span style={{fontSize:16,fontWeight:600}}>广告创意黑名单</span></Col>
                            <Col span={18}>
                                {!this.state.editBalckFlag ? (<div>
                                    <p>创意内容关键字：<Tag>VIVO</Tag><Tag>小米</Tag></p>
                                    <p>产品所在行业：<Tag>医疗保健</Tag><Tag>医疗整形</Tag></p>
                                </div>) : this.editBlackCom()}
                            </Col>
                                <Col span={2}>{
                                    !this.state.editBalckFlag ? 
                                    <Button onClick={this.editBlack} type="link">编辑</Button>:
                                    (<div>
                                        <Button onClick={this.confirmBlack} type="link">确定</Button>
                                        <Button onClick={this.cancerBlack} type="link">取消</Button>
                                    </div>)
                                }</Col>
                        
                        </Row>
                    </div>
                    <Divider />
                </Form >
                <AdTable></AdTable>
            </div>

        )
    }
}


const QUE = Form.create()(Home)
export default QUE