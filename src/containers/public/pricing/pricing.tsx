import React from 'react';
import { Steps, Button, message, Layout, Row, Card, Divider, Col, Input, Icon } from 'antd';
import Sider from 'antd/lib/layout/Sider';
import Grid from 'antd/lib/card/Grid';
import { Link } from 'react-router-dom';
const styles = require('./pricing.scss');

const Step = Steps.Step;

const { Content, Header, Footer } = Layout;

class Pricing extends React.Component<any, any> {
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

    render() {
        const { current, venue } = this.state;
        const { options } = this.props;

        return (
            <div className="pricing-page">
                <div className="content">
                    <h1>Pricing</h1>
                    <h3>
                        Sign up in less than 30 seconds. Try out our 7 day risk free trial, upgrade and cancel at anytime, no questions, no hassle.
                    </h3>
                    <div className="card-wrapper">
                        <Row>
                            <Col span={6}>
                                <Card>
                                    <p className="team-text">1 - 3 Team</p>
                                    <p className="price-text-wrapper">
                                        <span className="dollar">$ </span>
                                        <span className="price-number">49</span>
                                        <span className="period-text"> /mo</span>
                                    </p>
                                    <div className="card-items-wrapper">
                                        <p>
                                            <Icon type="check-circle" />
                                            <span>
                                                Cras sodales lobortis erat
                                            </span>
                                        </p>
                                        <p>
                                            <Icon type="check-circle" />
                                            <span>
                                                Vitae pellentesque diam
                                            </span>
                                        </p>
                                        <p>
                                            <Icon type="check-circle" />
                                            <span>
                                                Consequat eted tempus
                                            </span>
                                        </p>
                                    </div>
                                    
                                    <Button>Sign up today</Button>
                                </Card>
                            </Col>
                            <Col span={6}>
                                <Card>
                                <p className="team-text">4 - 10 Team</p>
                                    <p className="price-text-wrapper">
                                        <span className="dollar">$ </span>
                                        <span className="price-number">99</span>
                                        <span className="period-text"> /mo</span>
                                    </p>
                                    <div className="card-items-wrapper">
                                        <p>
                                            <Icon type="check-circle" />
                                            <span>
                                                Aliquet diam gravida
                                            </span>
                                        </p>
                                        <p>
                                            <Icon type="check-circle" />
                                            <span>
                                                Phasellus eu condimentum
                                            </span>
                                        </p>
                                        <p>
                                            <Icon type="check-circle" />
                                            <span>
                                                Metus mon venenatis furpis
                                            </span>
                                        </p>
                                    </div>
                                    
                                    <Button>Sign up today</Button>
                                </Card>
                            </Col>
                            <Col span={6}>
                                <Card className="recommended">
                                    <span className="recommended-mark">Recommended</span>
                                    <p className="team-text">11 - 50 Team</p>
                                    <p className="price-text-wrapper">
                                        <span className="dollar">$ </span>
                                        <span className="price-number">219</span>
                                        <span className="period-text"> /mo</span>
                                    </p>
                                    <div className="card-items-wrapper">
                                        <p>
                                            <Icon type="check-circle" />
                                            <span>
                                                Donec enim nulla malesuada
                                            </span>
                                        </p>
                                        <p>
                                            <Icon type="check-circle" />
                                            <span>
                                                Sed venenatis vel, blandit vel
                                            </span>
                                        </p>
                                        <p>
                                            <Icon type="check-circle" />
                                            <span>
                                                Duis ultricies scelerisque
                                            </span>
                                        </p>
                                    </div>
                                    
                                    <Button>Sign up today</Button>
                                </Card>
                            </Col>
                            <Col span={6}>
                                <Card>
                                <p className="team-text">Unlimited</p>
                                    <p className="price-text-wrapper">
                                        <span className="dollar">$ </span>
                                        <span className="price-number">419</span>
                                        <span className="period-text"> /mo</span>
                                    </p>
                                    <div className="card-items-wrapper">
                                        <p>
                                            <Icon type="check-circle" />
                                            <span>
                                                Justo id molestie   
                                            </span>
                                        </p>
                                        <p>
                                            <Icon type="check-circle" />
                                            <span>
                                                Nullam sodales justo fringilla
                                            </span>
                                        </p>
                                        <p>
                                            <Icon type="check-circle" />
                                            <span>
                                                Donec molestie neque uma
                                            </span>
                                        </p>
                                    </div>
                                    
                                    <Button>Sign up today</Button>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        );
    }
}

export default Pricing;