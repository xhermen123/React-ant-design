import React from 'react';
import { Steps, Button, message, Layout, Row, Card, Divider, Col, Input } from 'antd';
import Sider from 'antd/lib/layout/Sider';
import Grid from 'antd/lib/card/Grid';
import { Link } from 'react-router-dom';
const styles = require('./forgot-password.scss');

const Step = Steps.Step;

const { Content, Header, Footer } = Layout;

class ForgotPassword extends React.Component<any, any> {
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

    render() {
        const { current, venue } = this.state;
        const { options } = this.props;
        const $title = (
            <div>
                <h1 className="form-title">Forgot your password?</h1>
                <p className="form-title-desc">Enter your email address and we'll send you an email containing a link to reset your password.</p>
            </div>
        );
        return (
            <div className="forgot-password-page">
                <div className="content">
                    <Card title={$title} bordered={false} style={{ width: 500, margin: 'auto', fontSize: '20px'}}>
                        <div>
                            <Row>
                                <label>Email address</label>
                                <Input size="large" />
                            </Row>
                            <Row className="button-wrapper">
                                <Col span={12}>
                                </Col>
                                <Col span={12}>
                                    <Button type="primary" size="large" className="signup-btn">Reset Password</Button>
                                </Col>
                            </Row>
                        </div>
                    </Card>
                    <div className="bottom-text-wrapper">
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

export default ForgotPassword;