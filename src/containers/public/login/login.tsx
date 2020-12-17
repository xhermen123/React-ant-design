import React from 'react';
import { Steps, Button, message, Layout, Row, Card, Divider, Col, Input, Form } from 'antd';
import Sider from 'antd/lib/layout/Sider';
import GoogleLogin from 'react-google-login';
import Grid from 'antd/lib/card/Grid';
import { Link, withRouter } from 'react-router-dom';
const styles = require('./login.scss');

const Step = Steps.Step;

const { Content, Header, Footer } = Layout;

function hasErrors(fieldsError: any) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class Login extends React.Component<any, any> {
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
            this.props.login(values);
            // this.props.onClose();
          }
        });
    }

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
                    <Card title="Sign in" bordered={false} style={{ width: 500, margin: 'auto', fontSize: '20px'}}>
                        <div className="google-button-wrapper">
                            <GoogleLogin
                                clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                                buttonText="Sign in with Google"
                                onSuccess={this.responseGoogle}
                                onFailure={this.responseGoogle}
                                cookiePolicy={'single_host_origin'}
                                className="google-login-button"
                            />
                        </div>
                        <Divider>Or</Divider>
                        <div>
                            <Form layout="vertical" onSubmit={this.handleSubmit}>
                                <Row>
                                    <Form.Item label="Email address">
                                        {getFieldDecorator('email', {
                                            rules: [{ required: true, message: 'Please enter email address' }],
                                        })(<Input placeholder="Email address" size="large"/>)}
                                    </Form.Item>
                                </Row>
                                <Row>
                                    <Form.Item label="Password">
                                        {getFieldDecorator('password', {
                                            rules: [{ required: true, message: 'Please enter password' }],
                                        })(<Input placeholder="Password" type="password" size="large"/>)}
                                    </Form.Item>
                                </Row>
                                <Row className="button-wrapper">
                                    <Col span={18}>
                                        <Link to="/signup">DON'T HAVE ACCOUNT? SIGN UP</Link>
                                    </Col>
                                    <Col span={6}>
                                        <Button type="primary" size="large" className="signup-btn" htmlType="submit" disabled={hasErrors(getFieldsError())}>Sign in</Button>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                    </Card>
                    <div className="bottom-text-wrapper">
                        <p>
                            <Link to="">FORGOT PASSWORD?</Link>
                        </p>
                        <span>By continuing, I agree to *****</span>
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

export default Form.create({ name: 'login-form' })(withRouter(Login));