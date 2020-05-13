import React, { Component } from 'react';
import './HeadMenu.less'
import { Row, Col } from 'antd';

export default class HeadMenu extends Component {
    render() {
        return (
            <div id='HeadMenu'>
                <ul className={'menu'}>
                    <Row>
                        <Col span={4} offset={4}>
                            <div className={'is-animate style3'}>
                                <div>Z</div>
                                <div>s</div>
                                <div>w</div>
                            </div>
                        </Col>
                       
                    </Row>
                </ul>
            </div>
        )
    }
}