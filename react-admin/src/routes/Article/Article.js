import React, {Component} from 'react';
import {Table, Divider, Tag, Button} from 'antd';
import {_getArticleList} from '../../api/api.js'
import './Article.less'
const {Column} = Table;
export default class Article extends Component {
    constructor(props) {
        super(props);
    this.state = {
        tableData:[]
    };
}
componentDidMount() {
    this.getArtices()
}
async getArtices(){
    let res=await _getArticleList()
    this.setState({
        tableData:res
    })
}
    render() {
        return (
            <div id='Article'>
                <Button type="primary" onClick={this.start} className='add_btn'>
                    新增
                </Button>
                <Table dataSource={this.state.tableData} rowKey="id">
                    {/* <Column title="id" dataIndex="id" key="id"/> */}
                    <Column title="序号" dataIndex="num" key="num"/>
                    <Column title="标题" dataIndex="title" key="title"/>
                    <Column title="作者" dataIndex="author" key="author"/>
                    <Column title="分类" dataIndex="category" key="category" />
                    <Column title="标签" dataIndex="label" key="label" render={label => (
                        <span>
                            {label.join(',')}
                        </span>
                    )}/>/>
                    {/* <Column title="摘要" dataIndex="abstract" key="abstract"/> */}
                    {/* <Column title="内容" dataIndex="content" key="content"/> */}
                    {/* <Column
                        title="标签"
                        dataIndex="labels"
                        key="labels"
                        render={labels => (
                        <span>
                            {labels.map(tagss => <Tag color={tagss.color} key={tagss.tag}>{tagss.tag}</Tag>)}
                        </span>
                    )}/> */}
                    <Column
                        title="操作"
                        key="action"
                        render={(text, record) => (
                        <span>
                            <Button icon="edit"/>
                            <Divider type="vertical"/>
                            <Button icon="delete"/>
                        </span>
                    )}/>
                </Table>
            </div>

        )
    }
}