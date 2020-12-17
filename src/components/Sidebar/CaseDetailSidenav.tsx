import React, { Component } from "react";
import Sider from "antd/lib/layout/Sider";
import { Menu, Icon, Divider, Row, Avatar } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { Dispatch } from "redux";
import { withRouter } from 'react-router-dom';

let moment = require("moment");

interface SidebarProps {
    trigger?: any;
    collapsible?: boolean;
    collapsed?: boolean;
    data?: any;
}

class CaseDetailSidenav extends Component<SidebarProps & any, any> {

    public static defaultProps: SidebarProps = {
        trigger: null,
        collapsible: false,
        collapsed: false
    };

    
    goPrev() {
        let user = JSON.parse(localStorage.getItem('auth') || '{}');

        if(user && user.token) {
            if(user.role == "1") {
                this.props.history.push('/workstation');
            } else {
                this.props.history.push('/client-workstation');
            }
        }
        // this.props.history.push('/workstation');
    }

    render() {
        const { trigger, collapsible, collapsed, data } = this.props;

        let user = JSON.parse(localStorage.getItem('auth') || '{}');

        console.log(data);

        return (
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                style={{backgroundColor: 'white'}}
                className="side-menu"
            >
                <Row className="back-button-wrapper" onClick={this.goPrev.bind(this)}>
                    <div>
                    <Icon type="arrow-left" />
                    <span>Back</span>
                    </div>
                </Row>
                <Divider style={{marginTop: '10px', marginBottom: '10px'}}/>
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
                    <div className="profile-item-wrapper">
                    <div className="profile-item-name">
                        Email: 
                    </div>
                    <div className="profile-item-value">
                        {user && user.email}
                    </div>
                    </div>
                    
                    <div className="profile-item-wrapper">
                    <div className="profile-item-name">
                        Phone: 
                    </div>
                    <div className="profile-item-value">
                        {user && user.phone}
                    </div>
                    </div>
                    <div className="profile-item-wrapper">
                    <div className="profile-item-name">
                        Company: 
                    </div>
                    <div className="profile-item-value">
                        {user && user.company}
                    </div>
                    </div>
                    <div className="profile-item-wrapper">
                    <div className="profile-item-name">
                        Case started: 
                    </div>
                    <div className="profile-item-value">
                        {data && data.create_date && moment(data.create_date).format('DD/mm/YYYY')}
                    </div>
                    </div>
                </Row>
                <Divider style={{marginTop: '10px', marginBottom: '40px'}}/>
            </Sider>
        )
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        // fetchClients: bindActionCreators(fetchClients, dispatch),
    };
};

const mapStateToProps = (state: any) => {
    return {
        data: state.caseDetail.case
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CaseDetailSidenav));