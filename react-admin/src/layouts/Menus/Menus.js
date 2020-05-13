import React, {Component} from 'react';
import {Menu, Icon} from 'antd';
import {Link} from 'react-router-dom';
import './Menu.less'
export default class Menus extends Component {
    render() {
        console.log(window.location.pathname)
        // selectedKeys={[window.location.pathname]}
        return (
            <div id='Menu' className="menus">
                <div className="logo"/>
                <Menu theme="dark" mode="inline" selectedKeys={[window.location.pathname]}>
                    <Menu.Item key="/main/Home">
                        <Link to='/main/Home'>
                            <Icon type="user"/>
                            <span className="nav-text">
                                首页
                            </span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/main/Article">
                        <Link to='/main/Article'>
                            <Icon type="file-text"/>
                            <span className="nav-text">
                                文章
                            </span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/main/About">
                    <Link to='/main/About'>
                        <Icon type="user"/>
                            <span className="nav-text">
                                创作文章
                            </span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/main/Category">
                        <Link to='/main/Category'>
                            <Icon type="table"/>
                            <span className="nav-text">
                                分类
                            </span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/main/Label">
                        <Link to='/main/Label'>
                            <Icon type="tags"/>
                            <span className="nav-text">
                                标签
                            </span>
                        </Link>
                    </Menu.Item>
                   
                </Menu>
            </div>

        )
    }
}