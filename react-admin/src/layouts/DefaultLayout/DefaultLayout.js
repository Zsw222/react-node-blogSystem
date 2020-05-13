
import './DefaultLayout.less'
import React, { Component } from 'react';
import { Layout } from 'antd';

import HeadMenu from '../HeadMenu/HeadMenu'
import Home from '../../routes/Home/Home';
import Menus from '../Menus/Menus';
import Category from '../../routes/Category/Category';
import Label from '../../routes/Label/Label';
import Article from '../../routes/Article/Article';
import About from '../../routes/About/About';

import { Route, Switch, } from 'react-router-dom';


const {
    Header, Footer, Sider, Content,
} = Layout;


export default class DefaultLayout extends Component {
    render() {

        return (
            <div id='DefaultLayout'>
                <Layout>
                    <Sider breakpoint="lg"
                        collapsedWidth="0">
                        
                        <Menus></Menus>
                    </Sider>
                    <Layout>
                        <Header><HeadMenu></HeadMenu></Header>
                        <Content style={{ margin: '24px 16px 0' , background: '#fff'}}>
                            <div style={{ padding: 24, minHeight: 360 }}>
                                <Switch>
                                    <Route path="/main" exact component={Home} />
                                    <Route path="/main/Home" component={Home} />
                                    <Route path="/main/Category" component={Category} />
                                    <Route path="/main/Label" component={Label} />
                                    <Route path="/main/Article" component={Article} />.
                                    <Route path="/main/About" component={About} />
                                </Switch>
                            </div>
                        </Content>
                        <Footer>zsw</Footer>
                    </Layout>

                </Layout>
            </div>
        )
    }
}