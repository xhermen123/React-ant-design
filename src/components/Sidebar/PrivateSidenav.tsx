import React, { Component } from "react";
import Sider from "antd/lib/layout/Sider";
import { Menu, Icon, Divider, Row, Avatar, Col } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import { Link } from "react-router-dom";
import * as _ from 'lodash';

const menu = [
    {
      name: 'Workstation',
      path: '/workstation',
      icon: 'folder'
    },
    {
      name: 'Task Manager',
      path: '/task-manager',
      icon: 'database'
    },
    {
      name: 'Clients',
      path: '/clients',
      icon: 'usergroup-add'
    },
    {
      name: 'Settings',
      path: '/setting',
      icon: 'setting'
    }
];
  
interface SidebarProps {
    trigger?: any;
    collapsible?: boolean;
    collapsed?: boolean;
    path?: string;
}

class PrivateSidenav extends Component<SidebarProps> {

    public static defaultProps: SidebarProps = {
        trigger: null,
        collapsible: false,
        collapsed: false
    };

    render() {
        const { trigger, collapsible, collapsed, path } = this.props;
        let user = JSON.parse(localStorage.getItem('auth') || '{}');

        var selectedMenuID = '0';

        for(var i=0; i<menu.length; i++) {
          if(_.startsWith(path, menu[i].path))
            selectedMenuID = i.toString();
        }

        return (
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                style={{backgroundColor: 'white'}}
                className="side-menu"
            >
                <Row className="nav-avatar-wrapper">
                    <div className="avatar-img-wrapper">
                    <Avatar size="large" icon="user" />
                    </div>
                    <div className="avatar-desc-wrapper">
                    <div className="avatar-name">{user && user.first_name + ' ' + user.last_name}</div>
                    <div className="avatar-company">{user && user.company}</div>
                    </div>
                </Row>
                <Divider style={{marginTop: '10px', marginBottom: '10px'}}/>
                <Row className="nav-membership-wrapper">
                    <Col span={16} className="membership-text">
                    <span>Membership</span>
                    </Col>
                    <Col span={8} className="membership-type">
                    <span>Free</span>
                    </Col>
                </Row>
                <Divider style={{marginTop: '10px', marginBottom: '40px'}}/>
                <Menu mode="inline" defaultSelectedKeys={[selectedMenuID]}>
                    {
                    menu.map((item: any, index: number) => {
                        return (
                        <Menu.Item key={index.toString()}>
                            <Link to={item.path}>
                            <Icon type={item.icon} />
                            <span>{item.name}</span>
                            </Link>
                        </Menu.Item>
                        )
                    })
                    }
                </Menu>
            </Sider>
        )
    }
}

export default PrivateSidenav