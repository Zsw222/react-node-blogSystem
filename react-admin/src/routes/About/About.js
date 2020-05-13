import React, {Component} from 'react';

import SimpleMDE from 'simplemde'
import marked from 'marked';
import highlight from 'highlight.js';
import 'simplemde/dist/simplemde.min.css'
import {Form, Icon, Input, Button, Select,Col,Tag} from 'antd';
import {_getCategoryList,_getLabelList,_addArticleList} from '../../api/api.js'
// import 'highlight.js/styles/github.css';
import './About.less'
const {TextArea} = Input;
const Option = Select.Option;
class About extends Component {
    constructor(props) {
        super(props);
    this.state = {
        categoryData:[],
        labelData:[],
        editingKey: '', //当前正在编辑的行的key
        lastEditingKey: ''
    };
}

    componentDidMount() {
        // 初始化编辑器
        this.smde = new SimpleMDE({
            element: document
                .getElementById('editor')
                .childElementCount,
            autofocus: true,
            autosave: true,
            previewRender: function (plainText) {
                return marked(plainText, {
                    renderer: new marked.Renderer(),
                    gfm: true,
                    pedantic: false,
                    sanitize: false,
                    tables: true,
                    breaks: true,
                    smartLists: true,
                    smartypants: true,
                    highlight: function (code) {
                        return highlight
                            .highlightAuto(code)
                            .value;
                    }
                });
            }
        })
    }
// 获取列表数据
async getCategoryList(){
    let res=await _getCategoryList()
    this.setState({categoryData:res})
}
async getlabelList(){
    let res=await _getLabelList()
    this.setState({labelData:res})
}
handleSubmit= (e) =>{
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
          values.article=this.smde.value()
          _addArticleList(values).then((res)=>{
            console.log(res)
          })
      }
    });
}
    componentWillMount() {
        this.getCategoryList()
        this.getlabelList()
    }
    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div id='editArticle'>
                <div>
                <Form onSubmit={this.handleSubmit} layout='horizontal'  className='article_form'>
                <Col span={24}>
                    <Form.Item label="标题" >
                        {getFieldDecorator('title', {
                            rules: [
                                {
                                    required: true,
                                    message: '标题'
                                }
                            ]
                        })(<Input type="input" placeholder="Username"/>)}
                    </Form.Item>
                    </Col>
                    <Col span={12}>
                    <Form.Item label="作者" >
                        {getFieldDecorator('author', {
                            rules: [
                                {
                                    required: true,
                                    message: '作者'
                                }
                            ]
                        })(<Input type="input" placeholder="请输入作者!"/>)}
                    </Form.Item>
                    </Col>
                    <Col span={12}>
                    <Form.Item label="封面链接" >
                        {getFieldDecorator('link', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入封面链接!'
                                }
                            ]
                        })(<Input type="input"  placeholder="封面链接"/>)}
                    </Form.Item>
                    </Col>
                    <Col span={24}>
                    <Form.Item label="描述" >
                        {getFieldDecorator('remark', {
                            
                        })(<Input
                            style={{
                            width: '100%'
                        }}
                            type="input"
                            placeholder="描述"/>)}
                    </Form.Item>
                    </Col>
                    <Col span={8}>
                    <Form.Item label="分类" >
                        {getFieldDecorator('category', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入封面链接!'
                                }
                            ]
                        })(
                            <Select
                                // defaultValue="lucy"
                                style={{
                                width: 200
                            }}>
                            {
                                this.state.categoryData.map(item=>{
                                    return <Option value={item._id}>{item.title}</Option>
                                })
                            }
                            </Select>
                        )}
                    </Form.Item>
                    </Col>
                    <Col span={8}>
                    <Form.Item label="标签" >
                        {getFieldDecorator('label', {})(
                            <Select
                            mode="multiple"
                                // defaultValue="lucy"
                                style={{
                                width: 400
                            }}>
                               {
                                // this.state.labelData.map(item=>{
                                //     return <Option value={item._id}><Tag color={item.color}>{item.title}</Tag></Option>
                                // })
                            }
                            </Select>
                        )}
                    </Form.Item>
                    </Col>
                    
                </Form>
                </div>
                <textarea id="editor"></textarea>
                <Button type="primary" onClick={this.handleSubmit} htmlType="submit" className="login-form-button" style={{width: 200}}>
                            保存
                        </Button>
            </div>

        )
    }
    
}

const QUE = Form.create()(About)
export default QUE