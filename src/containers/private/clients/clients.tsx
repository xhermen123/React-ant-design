import React from 'react';
import { Steps, Button, message, Layout, Row, Card, Divider, Col, Input, Avatar, Progress, Icon, Badge, Drawer, Form, DatePicker, Select, List, Dropdown, Menu, Modal, Table, Tag } from 'antd';
import Sider from 'antd/lib/layout/Sider';
import GoogleLogin from 'react-google-login';
import Grid from 'antd/lib/card/Grid';
import { Link } from 'react-router-dom';
import CreateNewCase from '../dashboard/create-new-case';
import NewClientForm from './new-client-form';
const styles = require('./clients.scss');

const Step = Steps.Step;

const { Content, Header, Footer } = Layout;

const questionData = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
];


class Clients extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            currentCaseType: 0,
            searchText: '',
            showCreateCasePanel: false,
            modalVisible: false
        };

        this.openEditClientModal = this.openEditClientModal.bind(this);
    }

    componentWillMount() {
        this.props.fetchClients();
    }

    componentDidMount() {
        
    }

    next() {
        const current = this.state.current + 1;
        this.setState({ current });
    }

    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }

    changeCaseType(type: number) {
        this.setState({
            currentCaseType: type
        });
    }

    showDrawer(ev: any) {
        ev.stopPropagation();
        this.setState({
            showCreateCasePanel: true,
        });
    }
    
    onClose() {
        this.setState({
            showCreateCasePanel: false,
        });
    }
    
    onCopyTask(item: any) {

    }

    onCopyTaskToOtherCategory(item: any) {

    }
    
    onEditItem(item: any) {

    }

    onDeleteItem(item: any) {

    }

    showModal() {
        this.setState({
            modalVisible: true
        });
    }
    
    handleOk(e: any) {
        console.log(e);
        this.setState({
            modalVisible: false
        });
    }
    
    handleCancel(e: any) {
        console.log(e);
        this.setState({
            modalVisible: false
        });
    }

    openEditClientModal(ev: any, record: any) {
        this.setState({
            editModalVisible: true,
            record: record
        });
    }

    closeEditClientModal(e: any) {
        this.setState({
            editModalVisible: false
        });
    }

    render() {
        // const { current, venue } = this.state;
        const { clients } = this.props;
        const { initLoading, loading, list } = this.state;

                
        const renderStatusItem = (item: any) => {
            switch(item.status) {
                case 0:
                    return (
                        <Button type="primary" onClick={this.showDrawer.bind(this)}>Open New Case</Button>
                    );
                case 1:
                    return (
                        <span style={{color: 'blue'}}>In Progress</span>
                    );
                case 2:
                    return (
                        <span style={{color: 'green'}}>Completed</span>
                    )
                case 3:
                    return (
                        <span style={{color: 'red'}}>Cancelled</span>
                    )
                default:
                    return (
                        <Button type="primary" onClick={this.showDrawer.bind(this)}>Open New Case</Button>
                    );
            }
        }

        const columns = [{
            title: 'Name',
            key: 'name',
            render: (item: any) => (
                <span>
                    {item.first_name + ' ' + item.last_name}
                </span>
            ),
        }, {
            title: 'Company',
            dataIndex: 'company',
            key: 'company',
        }, {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        }, {
            title: 'Phone',
            key: 'phone',
            dataIndex: 'phone',
        }, {
            title: 'Address',
            key: 'address',
            dataIndex: 'address',
        }, {
            title: 'Case',
            key: 'case',
            dataIndex: 'case',
        }, {
            title: 'Status',
            key: 'status',
            className: 'status',
            render: (type: any) => (
            <span>
                {
                    renderStatusItem(type)
                }
            </span>
            ),
        }];
        
        return (
            <div className="clients-page">
                <div className="content">
                    <Header className="content-header">
                        <div className="header-content-wrapper">
                            <div className="header-left-menu-wrapper">
                                <div className="case-items-wrapper">
                                    <Input size="large" placeholder="Search" className="card-search-input"/>
                                </div>
                            </div>
                            <div className="header-right-btn-wrapper">
                                <Button type="primary" size="large"  onClick={this.showModal.bind(this)}>New Client</Button>
                            </div>
                        </div>
                    </Header>
                    <div className="clients-content">
                        <Table 
                            onRow={(record, rowIndex) => {
                                return {
                                onClick: (event: any) => {this.openEditClientModal(event, record)}, // click row
                                onDoubleClick: (event: any) => {}, // double click row
                                onContextMenu: (event: any) => {}, // right button click row
                                onMouseEnter: (event: any) => {}, // mouse enter row
                                onMouseLeave: (event: any) => {}, // mouse leave row
                                };
                            }}
                            columns={columns} 
                            dataSource={clients} 
                        />
                    </div>
                </div>
                <Drawer
                    width={'100%'}
                    closable={false}
                    // onClose={this.onClose.bind(this)}
                    visible={this.state.showCreateCasePanel}
                    className="create-case-drawer"
                    >
                    <div>
                        <CreateNewCase onClose={this.onClose.bind(this)}></CreateNewCase>
                    </div>
                </Drawer>
                <Modal
                    title="Add New Client"
                    visible={this.state.modalVisible}
                    // onOk={this.handleOk}
                    centered
                    onCancel={this.handleCancel.bind(this)}
                    className="new-client-modal"
                    footer={null}
                    >
                    <NewClientForm onClose={this.handleCancel.bind(this)}></NewClientForm>
                </Modal>
                {
                    this.state.editModalVisible ? (
                        <Modal
                            title="Edit Client"
                            visible={this.state.editModalVisible}
                            // onOk={this.handleOk}
                            centered
                            onCancel={this.closeEditClientModal.bind(this)}
                            className="new-client-modal"
                            footer={null}
                            >
                            <NewClientForm onClose={this.closeEditClientModal.bind(this)} record={this.state.record}></NewClientForm>
                        </Modal>
                    ) : ''
                }
            </div>
        );
    }
}

export default Clients;