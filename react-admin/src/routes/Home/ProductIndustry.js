import React, { Component } from 'react';
import { Cascader, Col, Row, Card, Tag, Empty } from 'antd';
import { TweenOneGroup } from 'rc-tween-one';

class ProductIndustry extends Component {
    state = {
        tags: ['Tag 1', 'Tag 2', 'Tag 3'],
    }
    handleClose = removedTag => {
        const tags = this.state.tags.filter(tag => tag !== removedTag);
        console.log(tags);
        this.setState({ tags });
    };
    forMap = tag => {
        const tagElem = (
            <Tag
                closable
                onClose={e => {
                    e.preventDefault();
                    this.handleClose(tag);
                }}
            >
                {tag}
            </Tag>
        );
        return (
            <span key={tag} style={{ display: 'inline-block' }}>
                {tagElem}
            </span>
        );
    };
    onChange = (value) => {
        this.handleInputConfirm(value[value.length - 1])
    }
    handleInputConfirm = (value) => {
        let { tags } = this.state;
        if (value && tags.indexOf(value) === -1) {
            tags = [...tags, value];
        }
        console.log(tags);
        this.setState({
            tags,
        });
    };


    render() {
        const options = [
            {
                value: 'zhejiang',
                label: 'Zhejiang',
                children: [
                    {
                        value: 'hangzhou',
                        label: 'Hangzhou',
                        children: [
                            {
                                value: 'xihu',
                                label: 'West Lake',
                            },
                        ],
                    },
                ],
            },
            {
                value: 'jiangsu',
                label: 'Jiangsu',
                children: [
                    {
                        value: 'nanjing',
                        label: 'Nanjing',
                        children: [
                            {
                                value: 'zhonghuamen',
                                label: 'Zhong Hua Men',
                            },
                        ],
                    },
                ],
            },
        ];
        const { tags } = this.state;
        const tagChild = tags.map(this.forMap);

        // Just show the latest item.
        function displayRender(label) {
            return label[label.length - 1];
        }
        return (
            <div>
                <p>产品所在行业：</p>

                <Row>
                    <Col span={6}>
                        <Cascader expandTrigger="hover" displayRender={displayRender} options={options} onChange={this.onChange} placeholder="请选择" />
                    </Col>
                    <Col span={8}>
                        <Card size="small" title="已屏蔽" style={{ width: 300, marginLeft: 20 }}>
                            {tagChild.length > 0 ? <TweenOneGroup
                                enter={{
                                    scale: 0.8,
                                    opacity: 0,
                                    type: 'from',
                                    duration: 100,
                                    onComplete: e => {
                                        e.target.style = '';
                                    },
                                }}
                                leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
                                appear={false}
                            >
                                {tagChild}
                            </TweenOneGroup> : <Empty description={'暂无数据'} />}
                        </Card>
                    </Col>
                </Row>

            </div>
        )
    }
}
export default ProductIndustry