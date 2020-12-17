import React, { Component } from "react";
import Sider from "antd/lib/layout/Sider";
import { Menu, Icon, Alert } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import { Link } from "react-router-dom";
import './alert.scss';

class AppAlert extends Component<any> {

    handleClose() {
        this.props.closeAlert();
    }

    render() {
        const { alert } = this.props;

        return (
            <div className="alert-message">
                {
                    alert && alert.type && alert.message && (
                        <Alert message={alert.message} type={alert.type} closable afterClose={this.handleClose.bind(this)}/>
                    )
                }
            </div>
        )
    }
}

export default AppAlert;