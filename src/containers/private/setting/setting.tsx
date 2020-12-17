import React from 'react';
import { Steps, Button, message, Layout, Row, Card, Divider, Col, Input, Avatar, Progress, Icon, Badge, Drawer, Form, DatePicker, Select, List, Dropdown, Menu, Modal } from 'antd';
import Sider from 'antd/lib/layout/Sider';
import GoogleLogin from 'react-google-login';
import Grid from 'antd/lib/card/Grid';
import { Link } from 'react-router-dom';
const styles = require('./setting.scss');

const Step = Steps.Step;

const { Content, Header, Footer } = Layout;

const questionData = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
];

class Setting extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            currentCaseType: 0,
            searchText: '',
            showCreateCasePanel: false,
            modalVisible: false
        };
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

    showDrawer() {
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
            modalVisible: true,
        });
    }
    
    handleOk(e: any) {
        console.log(e);
        this.setState({
            modalVisible: false,
        });
    }
    
    handleCancel(e: any) {
        console.log(e);
        this.setState({
            modalVisible: false,
        });
    }

    render() {
        // const { current, venue } = this.state;
        const { options } = this.props;
        const { getFieldDecorator } = this.props.form;
        const { initLoading, loading, list } = this.state;

        return (
            <div className="setting-page">
                <div className="content">
                    <div className="setting-content">
                        <Form layout="vertical">
                            <div style={{width: 'fit-content'}}>
                                <div style={{textAlign: 'center', marginBottom: '15px', position: 'relative'}}>
                                    <Avatar size={100} icon="user"/>
                                    <Icon type="close-circle" className="avatar-close-icon"/>
                                </div>
                                <div style={{marginBottom: '30px'}}>
                                    <Button type="primary" size="large" style={{backgroundColor: 'blue', paddingLeft: '50px', paddingRight: '50px'}}>Upload</Button>
                                </div>
                            </div>
                            <div className="drawer-content-wrapper">
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item label="First Name">
                                        {getFieldDecorator('first_name', {
                                            rules: [{ required: true, message: 'Please enter first name' }],
                                        })(<Input placeholder="First Name" size="large"/>)}
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label="Last Name">
                                            {getFieldDecorator('last_name', {
                                                rules: [{ required: true, message: 'Please enter last name' }],
                                            })(<Input placeholder="Last Name" size="large"/>)}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={24}>
                                        <Form.Item label="Company">
                                            {
                                                getFieldDecorator('cast_title', {
                                                    rules: [{ required: true, message: 'Please enter cast title' }],
                                                })(<Input size="large" placeholder="Enter Cast Title" />)
                                            }
                                        </Form.Item>
                                    </Col>
                                    <Col span={24}>
                                        <Form.Item label="Title">
                                            {
                                                getFieldDecorator('cast_title', {
                                                    rules: [{ required: true, message: 'Please enter cast title' }],
                                                })(<Input size="large" placeholder="Enter Cast Title" />)
                                            }
                                        </Form.Item>
                                    </Col>
                                    <Col span={24}>
                                        <Form.Item label="Email address">
                                            {
                                                getFieldDecorator('cast_title', {
                                                    rules: [{ required: true, message: 'Please enter cast title' }],
                                                })(<Input size="large" placeholder="Enter Cast Title" />)
                                            }
                                        </Form.Item>
                                    </Col>
                                    <Col span={24}>
                                        <Form.Item label="Phone number">
                                            {
                                                getFieldDecorator('cast_title', {
                                                    rules: [{ required: true, message: 'Please enter cast title' }],
                                                })(<Input size="large" placeholder="Enter Cast Title" />)
                                            }
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={24}>
                                        <div style={{width: 'fit-content', marginLeft: 'auto'}}>
                                            <Button size="large" type="primary" style={{backgroundColor: 'blue', paddingLeft: '50px', paddingRight: '50px'}}>
                                                Save
                                            </Button>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Form.create({ name: 'setting-form' })(Setting);