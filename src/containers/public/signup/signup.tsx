import React from 'react';
import { Steps, Button, message, Layout, Row, Card, Divider, Col, Input, Form } from 'antd';
import Sider from 'antd/lib/layout/Sider';
import GoogleLogin from 'react-google-login';
import Grid from 'antd/lib/card/Grid';
import { Link, withRouter } from 'react-router-dom';
const styles = require('./signup.scss');

const Step = Steps.Step;

const { Content, Header, Footer } = Layout;

function hasErrors(fieldsError: any) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class Signup extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            current: 0,
            venue: {}
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

    responseGoogle (googleUser: any) {
        var id_token = googleUser.getAuthResponse().id_token;
        var googleId = googleUser.getId();
        
        console.log({ googleId });
        console.log({accessToken: id_token});
        //anything else you want to do(save to localStorage)...
    }

    
    handleSubmit = (e: any) => {
        e.preventDefault();
        this.props.form.validateFields((err: any, values: any) => {
          if (!err) {
            console.log('Received values of form: ', values);
            values.role = "1";
            values.password2 = values.confirm_password;
            this.props.enterpriseSignup(values);
            // this.props.onClose();
          }
        });
    };

    // signUp (data: any) {

    // }

    render() {
        const { current, venue } = this.state;
        const { options } = this.props;
        const { getFieldDecorator, isFieldTouched, getFieldError, getFieldsError } = this.props.form;

        let user = JSON.parse(localStorage.getItem('auth') || '{}');

        if(user && user.token) {
            if(user.role == "1") {
                this.props.history.push('/workstation');
            } else {
                this.props.history.push('/client-workstation');
            }
        }

        return (
            <div className="login-page">
                <div className="content">
                    <Card title="Enterprise sign up" bordered={false} style={{ width: 500, margin: 'auto', fontSize: '20px'}}>
                        <div className="google-button-wrapper">
                            <GoogleLogin
                                clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                                buttonText="Sign up with Google"
                                onSuccess={this.responseGoogle}
                                onFailure={this.responseGoogle}
                                cookiePolicy={'single_host_origin'}
                                className="google-login-button"
                            />
                        </div>
                        <Divider>Or</Divider>
                        <div>
                            <Form layout="vertical" onSubmit={this.handleSubmit}>
                                <Row gutter={10}>
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
                                    <Form.Item label="Company">
                                        {getFieldDecorator('company', {
                                            rules: [{ required: true, message: 'Please enter company' }],
                                        })(<Input placeholder="Company" size="large"/>)}
                                    </Form.Item>
                                </Row>
                                <Row>
                                    <Form.Item label="Email Address">
                                        {getFieldDecorator('email', {
                                            rules: [{ required: true, message: 'Please enter email address' }],
                                        })(<Input placeholder="Email Address" size="large"/>)}
                                    </Form.Item>
                                </Row>
                                <Row>
                                    <Form.Item label="Phone Number">
                                        {getFieldDecorator('phone', {
                                            rules: [{ required: true, message: 'Please enter phone number' }],
                                        })(<Input placeholder="Phone Number" size="large"/>)}
                                    </Form.Item>
                                </Row>
                                <Row>
                                    <Form.Item label="Password">
                                        {getFieldDecorator('password', {
                                            rules: [{ required: true, message: 'Please enter password' }],
                                        })(<Input placeholder="Password" type="password" size="large"/>)}
                                    </Form.Item>
                                </Row>
                                <Row>
                                    <Form.Item label="Confirm Password">
                                        {getFieldDecorator('confirm_password', {
                                            rules: [{ required: true, message: 'Please enter confirm password' }],
                                        })(<Input placeholder="Confirm Password" type="password" size="large"/>)}
                                    </Form.Item>
                                </Row>
                                <Row className="button-wrapper">
                                    <Col span={18}>
                                        <Link to="/">ALREADY HAVE ACCOUNT? SIGN IN</Link>
                                    </Col>
                                    <Col span={6}>
                                        <Button type="primary" size="large" className="signup-btn" htmlType="submit" disabled={hasErrors(getFieldsError())}>Sign Up</Button>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                    </Card>
                    <div className="bottom-text-wrapper">
                        <p>By continuing, I agree to *****</p>
                        <div>
                            <Link to="">PRIVACY POLICY</Link>
                            <span> and </span>
                            <Link to=""> TERMS OF SERVICE</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Form.create({ name: 'enterprise-signup-form' })(withRouter(Signup));