import React from 'react';
import {
    Table,
    Divider,
    Button,
    Input,
    Form,
    InputNumber,
    Popconfirm,
    Tag
} from 'antd';
import {message} from 'antd';
import {_getLabelList,_addLabelList,_deleteLabelList,_updateLabelList} from '../../api/api.js'
// import './Category.less'

const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({
    form,
    index,
    ...props
}) => (
    <EditableContext.Provider value={form}>
        <tr {...props}/>
    </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
    getInput = () => {
        if (this.props.inputType === 'number') {
            return <InputNumber/>;
        }
        return <Input/>;
    };

    render() {
        const {
            editing,
            dataIndex,
            title,
            inputType,
            record,
            index,
            ...restProps
        } = this.props;
        return (
            <EditableContext.Consumer>
                {(form) => {
                    const {getFieldDecorator} = form;
                    return (
                        <td {...restProps}>
                            {editing
                                ? (
                                    <FormItem
                                        style={{
                                        margin: 0
                                    }}>
                                        {getFieldDecorator(dataIndex, {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: `请输入 ${title}!`
                                                }
                                            ],
                                            initialValue: record[dataIndex]
                                        })(this.getInput())}
                                    </FormItem>
                                )
                                : restProps.children}
                        </td>
                    );
                }}
            </EditableContext.Consumer>
        );
    }
}

class EditableTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data:[],
            oldData:[],
            editingKey: '', //当前正在编辑的行的key
            lastEditingKey: ''
        };
        this.columns = [
            {
                title: '序号',
                dataIndex: 'key',
                width: '15%',
                editable: false
            },{
                title: '标签名',
                dataIndex: 'title',
                width: '15%',
                editable: true
            }, 
            {
                title: '标签颜色',
                dataIndex: 'color',
                width: '15%',
                render:(text,record)=>{
                    return(
                        <Tag color={record.color}>{record.color}</Tag>
                    )
                },
                editable: true
            }, {
                title: '备注',
                dataIndex: 'remark',
                width: '40%',
                editable: true
            }, {
                title: '操作',
                dataIndex: 'operation',
                render: (text, record) => {
                    const editable = this.isEditing(record);
                    return (
                        <div>

                            {editable
                                ? (
                                    <span>
                                        <EditableContext.Consumer>
                                            {form => (
                                                <a
                                                    href="javascript:;"
                                                    onClick={() => this.save(form, record._id)}
                                                   >
                                                    保存
                                                </a>
                                            )}
                                        </EditableContext.Consumer>
                                        <Divider type="vertical" />
                                        <Popconfirm title="Sure to cancel?" onConfirm={() => this.cancel(record)}>
                                            <a>取消</a>
                                        </Popconfirm>
                                    </span>
                                )
                                : (
                                    <span>
                                        <a href="javascript:;" onClick={() => this.edit(record.key)}>编辑</a> 
                                        <Divider type="vertical" />
                                        <Popconfirm title="确定要删除吗?" onConfirm={() => this.delete(record._id)}>
                                            <a>删除</a>
                                        </Popconfirm>
                                    </span>
                                )}
                        </div>
                    );
                }
            }
        ];
    }

    isEditing = record => record.key === this.state.editingKey;
    // 获取列表数据
    async getList(){
        let res=await _getLabelList()
        this.setState({data:res.data})
    }
    add = () => {
        let temp = new Array(...this.state.data);
        let newData = {
            _id:'',
            key:this.state.data.length+1,
            title: ``,
            color:``,
            remark: ` `
        }
        temp.push(newData)
        this.edit(newData.key)
        this.setState({data: temp});
    }
    cancel = (record) => {
        if (!record._id) {
            this.remove(record.key)
        }
        this.setState({editingKey: ''})

    };

    save(form, _id) {
        form.validateFields((error, row) => {
            if (error) {
                return;
            }
            const newData = [...this.state.data];
            const index = newData.findIndex(item => _id === item._id);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row
                });
                this.setState({data: newData, editingKey: ''});
                if(!_id){
                    _addLabelList(row).then((res)=>{//保存接口
                        if(!res.code===200) return;
                        message.success('新增成功');
                        
                        this.getList()
                    })
                    return
                    
                }
                let data=row
                data._id=_id
                _updateLabelList(data).then((res)=>{//保存接口
                    if(!res.code===200) return;
                    message.success('修改成功');
                    
                    this.getList()
                })
            } else {
                newData.push(row);
                this.setState({data: newData, editingKey: ''});
            }
        });
    }
    // 删除此行数据
    async delete(key) {
        if(key){
            let res=await _deleteLabelList({_id:key})
            if(!res.code===200) return;
            message.success('删除成功');
        }
        let temp = new Array(...this.state.data); //复制原数组
        temp.splice(temp.findIndex(item => item.key === key), 1)//删除数组中此条数据
        this.setState({data: temp});
       
    }
    remove(key) {
        let temp = new Array(...this.state.data); //复制原数组
        temp.splice(temp.findIndex(item => item.key === key), 1)//删除数组中此条数据
        this.setState({data: temp});
    }
    edit(key) {
        this.setState({lastEditingKey: this.state.editingKey});//将上一次操作的数据的key保存下来
        this.setState({editingKey: key});
        // 由于setState是异步的，所以会导致状态更新不及时，增加setTimeout解决此问题
        setTimeout(() => {
            if (this.state.lastEditingKey !== '') {
                let newKey = this
                    .state
                    .data
                    .findIndex(item => item.key === this.state.lastEditingKey)
                    // 如果是新增的数据没有保存的则删除
                    console.log(this.state.data[newKey])
                if (!this.state.data[newKey]._id) {
                    this.remove(this.state.lastEditingKey)
                }
            }
        }, 0)

    }
    componentDidMount() {
        this.getList()
        
    }
    render() {
        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell
            }
        };

        const columns = this
            .columns
            .map((col) => {
                if (!col.editable) {
                    return col;
                }
                return {
                    ...col,
                    onCell: record => ({
                        record,
                        inputType: col.dataIndex === 'age'
                            ? 'number'
                            : 'text',
                        dataIndex: col.dataIndex,
                        title: col.title,
                        editing: this.isEditing(record)
                    })
                };
            });

        return (
            <div id='Category' style={{textAligh:'left'}}>
                <Button type="primary" onClick={this.add} className='add_btn'>
                    新增
                </Button><Table
                rowKey="key"
                    components={components}
                    bordered
                    dataSource={this.state.data||[]}
                    columns={columns}
                    rowClassName="editable-row"/></div>
        );
    }
}

export default EditableTable
