import React, { Component } from "react";
import Sider from "antd/lib/layout/Sider";
import { Menu, Icon } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import { Link } from "react-router-dom";


interface SidebarProps {
    trigger?: any;
    collapsible?: boolean;
    collapsed?: boolean;
}

class Sidebar extends Component<SidebarProps> {

    public static defaultProps: SidebarProps = {
        trigger: null,
        collapsible: false,
        collapsed: false
    };

    render() {
        const { trigger, collapsible, collapsed } = this.props;

        return (
            <Sider trigger={trigger} collapsible={collapsible} collapsed={collapsed} width={240} style={{
                overflow: 'auto', height: '100vh', position: 'fixed', left: 0,
            }}>
                <div className="logo" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
                    <Menu.Item key="01">
                        <Icon type="dashboard" />
                        <span>Dashboard</span>
                    </Menu.Item>
                    <Menu.Item key="02">
                        <Icon type="schedule" />
                        <span>Reservations</span>
                    </Menu.Item>
                    <SubMenu
                        key="1"
                        title={<span><Icon type="bank" /><span>Venues</span></span>}
                    >
                        <Menu.Item key="11"> 
                            <Link to="/venue/new">
                                Create
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="12">
                            <Link to="/venue">
                                All
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key="2"
                        title={<span><Icon type="user" /><span>Event Services</span></span>}
                    >
                        <Menu.Item key="21"> 
                            <Link to="/new">
                                Create
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="22">All</Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key="3"
                        title={<span><Icon type="user" /><span>Event Service Types</span></span>}
                    >
                        <Menu.Item key="31"> 
                            <Link to="/event-gallery/new">
                                Create
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="32">
                            <Link to="/event-galleries">
                                All
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key="5"
                        title={<span><Icon type="calendar" /><span>Event Gallery</span></span>}
                    >
                        <Menu.Item key="41">
                            <Link to="/event-gallery/new">
                                Create
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="42">
                            <Link to="/event-galleries">
                                All
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
        )
    }
}

export default Sidebar;