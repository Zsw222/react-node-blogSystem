import React, { Component } from 'react';

import { Table, Divider, Tag } from 'antd';
 class AdTable extends Component {
     
    render() {
        const columns = [
            {
              title: '创意ID',
              dataIndex: 'creativeId',
              key: 'creativeId',
            },
            {
              title: 'dsp名称',
              dataIndex: 'dspName',
              key: 'dspName',
            },
            {
              title: '创意名称',
              dataIndex: 'creativeName',
              key: 'creativeName',
            },
            {
                title: '创意状态',
                dataIndex: 'auditStatus',
                key: 'auditStatus',
              },
            {
                title: '品牌名称',
                dataIndex: 'brandName',
                key: 'brandName',
              },
              {
                title: '产品所在行业',
                dataIndex: 'thirdIndustryId',
                key: 'thirdIndustryId',
              },
              {
                title: '投放类型',
                dataIndex: 'contentType',
                key: 'contentType',
              },
              {
                title: '投放媒体',
                dataIndex: 'sspCode',
                key: 'sspCode',
              },
              {
                title: '投放位置',
                dataIndex: 'thirdFormatId',
                key: 'thirdFormatId',
              },
              {
                title: '创意详情',
                key: 'creative',
                render: (text, record) => (
                    <a>查看</a>
                  ),
              },
              {
                title: '创意渠道',
                dataIndex: 'channleId',
                key: 'channleId',
              },
            {
              title: '操作',
              key: 'action',
              render: (text, record) => (
                <span>
                  <a>通过</a>
                  <Divider type="vertical" />
                  <a>拒绝</a>
                </span>
              ),
            },
          ];
          
          const data = [
            {
              key: '1',
              name: 'John Brown',
              age: 32,
              address: 'New York No. 1 Lake Park',
              tags: ['nice', 'developer'],
            },
            {
              key: '2',
              name: 'Jim Green',
              age: 42,
              address: 'London No. 1 Lake Park',
              tags: ['loser'],
            },
            {
              key: '3',
              name: 'Joe Black',
              age: 32,
              address: 'Sidney No. 1 Lake Park',
              tags: ['cool', 'teacher'],
            },
          ];
        return (
            <Table columns={columns} dataSource={data} />
        )
    }
}
export default AdTable