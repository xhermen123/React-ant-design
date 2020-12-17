import React from 'react';
import { Steps, Button, message, Layout, Row, Card, Divider, Col, Input, Avatar, Progress, Icon, Badge, Drawer, Form, DatePicker, Select } from 'antd';
import Sider from 'antd/lib/layout/Sider';
import GoogleLogin from 'react-google-login';
import Grid from 'antd/lib/card/Grid';
import { Link } from 'react-router-dom';
import CreateNewCase from './create-new-case';
const styles = require('./dashboard.scss');

const Step = Steps.Step;

const { Content, Header, Footer } = Layout;

class Workstation extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            currentCaseType: 0,
            searchText: '',
            showCreateCasePanel: false
        };

        this.goClientDetail = this.goClientDetail.bind(this);
    }

    componentWillMount() {
        let user = JSON.parse(localStorage.getItem('auth') || '{}');

        if(user && user.token && user.role) {
            if(user.role == "1") {
                this.props.fetchCases();
            } else {
                this.props.fetchClientCases();
            }
        } else {
            this.props.history.push('/');
        }
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

    goClientDetail(item: any) {
        console.log(this.props.history);
        this.props.history.push(`/case/${item._id}/detail`)
    }
    
    render() {
        const { current } = this.state;
        const { options, cases } = this.props;

        return (
            <div className="dashboard-page">
                <div className="content">
                    <Header className="content-header">
                        <div className="header-content-wrapper">
                            <div className="header-left-menu-wrapper">
                                <div className="case-items-wrapper">
                                    <span className={"case-link " + (this.state.currentCaseType == 0 ? "active" : "")} onClick={() => this.changeCaseType(0)}>
                                        All Cases
                                    </span>
                                    <span className={"case-link " + (this.state.currentCaseType == 1 ? "active" : "")} onClick={() => this.changeCaseType(1)}>
                                        Processing only
                                    </span>
                                    <span className={"case-link " + (this.state.currentCaseType == 2 ? "active" : "")} onClick={() => this.changeCaseType(2)}>
                                        Finished only
                                    </span>
                                    <Input size="large" placeholder="Search" className="card-search-input"/>
                                </div>
                            </div>
                            <div className="header-right-btn-wrapper">
                                <Button type="primary" size="large" onClick={this.showDrawer.bind(this)}>New Case</Button>
                            </div>
                        </div>
                    </Header>
                    <div className="cards-wrapper">
                        <Row gutter={40}>
                            {
                                cases.map((item: any, index: number) => {
                                                            
                                    var totalCount = 0, todoCount = 0, skippedCount = 0, reviewsCount = 0, finishedCount = 0;
                                    
                                    item.tasks.map((item: any, index: number) => {
                                        totalCount ++;
                                        switch(item.status) {
                                            case 0:
                                                todoCount ++;
                                                break;
                                            case 1:
                                                skippedCount ++;
                                                break;
                                            case 2:
                                                reviewsCount ++;
                                                break;
                                            case 3:
                                                finishedCount ++;
                                                break;
                                            default:
                                                break;
                                        }
                                    })

                                    if(item.client_id) {
                                        var data = {
                                            name: item.client_id.first_name + ' ' + item.client_id.last_name,
                                            image: '',
                                            processing: item.title + " Processing",
                                            badge: null,
                                            items: [
                                                {
                                                    name: 'To-do\'s',
                                                    value: todoCount
                                                },
                                                {
                                                    name: 'Skiped',
                                                    value: skippedCount
                                                },
                                                {
                                                    name: 'Reviews',
                                                    value: reviewsCount
                                                },
                                                {
                                                    name: 'Finished',
                                                    value: finishedCount
                                                }
                                            ]
                                        }
    
                                        switch(this.state.currentCaseType) {
                                            case 0: 
                                                return (
                                                    <Col xs={24} sm={12} md={8} lg={6} xl={6} key={'card-' + index} className="work-card-wrapper">
                                                        <Card className="work-card" onClick={() => this.goClientDetail(item)}>
                                                            {/* <Icon type="more" className="card-more-icon"/> */}
                                                            <div className="card-avatar">
                                                                {
                                                                    data.badge ? (
                                                                        <Badge count={data.badge}>
                                                                            <a href="#" className="head-example" />
                                                                        </Badge>
                                                                    ) : ''
                                                                }
                                                                <Avatar size={80} icon="user" className="user-avatar"/>
                                                                <Progress strokeLinecap="square" strokeWidth={4} width={95} strokeColor="#37BCBA" showInfo={false} type="circle" percent={totalCount ? (totalCount - todoCount) / totalCount * 100 : 0} className="user-progress"/>
                                                            </div>
                                                            <div className="card-text-wrapper">
                                                                <p className="card-name">{data.name}</p>
                                                                <p className="card-desc">{data.processing}</p>
                                                            </div>
                                                            <div className="card-items-wrapper">
                                                                {
                                                                    data.items.map((it: any, ind: number) => {
                                                                        return (
                                                                            <div className="card-item" key={'item-' + ind}>
                                                                                <div className="card-item-name">
                                                                                    <span>{it.name}</span>
                                                                                </div>
                                                                                <div className="card-item-value">
                                                                                    <span>{it.value}</span>
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    })
                                                                }
                                                            </div>
                                                        </Card>
                                                    </Col>
                                                );
                                            case 1:
                                                if(todoCount != 0) {
                                                    return (
                                                        <Col xs={24} sm={12} md={8} lg={6} xl={6} key={'card-' + index} className="work-card-wrapper">
                                                            <Card className="work-card" onClick={() => this.goClientDetail(item)}>
                                                                {/* <Icon type="more" className="card-more-icon"/> */}
                                                                <div className="card-avatar">
                                                                    {
                                                                        data.badge ? (
                                                                            <Badge count={data.badge}>
                                                                                <a href="#" className="head-example" />
                                                                            </Badge>
                                                                        ) : ''
                                                                    }
                                                                    <Avatar size={80} icon="user" className="user-avatar"/>
                                                                    <Progress strokeLinecap="square" strokeWidth={4} width={95} strokeColor="#37BCBA" showInfo={false} type="circle" percent={totalCount ? (totalCount - todoCount) / totalCount * 100 : 0} className="user-progress"/>
                                                                </div>
                                                                <div className="card-text-wrapper">
                                                                    <p className="card-name">{data.name}</p>
                                                                    <p className="card-desc">{data.processing}</p>
                                                                </div>
                                                                <div className="card-items-wrapper">
                                                                    {
                                                                        data.items.map((it: any, ind: number) => {
                                                                            return (
                                                                                <div className="card-item" key={'item-' + ind}>
                                                                                    <div className="card-item-name">
                                                                                        <span>{it.name}</span>
                                                                                    </div>
                                                                                    <div className="card-item-value">
                                                                                        <span>{it.value}</span>
                                                                                    </div>
                                                                                </div>
                                                                            )
                                                                        })
                                                                    }
                                                                </div>
                                                            </Card>
                                                        </Col>
                                                    );
                                                } else {
                                                    return (
                                                        ''
                                                    );
                                                }
                                            case 2:
                                                if(todoCount == 0) {
                                                    return (
                                                        <Col xs={24} sm={12} md={8} lg={6} xl={6} key={'card-' + index} className="work-card-wrapper">
                                                            <Card className="work-card" onClick={() => this.goClientDetail(item)}>
                                                                {/* <Icon type="more" className="card-more-icon"/> */}
                                                                <div className="card-avatar">
                                                                    {
                                                                        data.badge ? (
                                                                            <Badge count={data.badge}>
                                                                                <a href="#" className="head-example" />
                                                                            </Badge>
                                                                        ) : ''
                                                                    }
                                                                    <Avatar size={80} icon="user" className="user-avatar"/>
                                                                    <Progress strokeLinecap="square" strokeWidth={4} width={95} strokeColor="#37BCBA" showInfo={false} type="circle" percent={totalCount ? (totalCount - todoCount) / totalCount * 100 : 0} className="user-progress"/>
                                                                </div>
                                                                <div className="card-text-wrapper">
                                                                    <p className="card-name">{data.name}</p>
                                                                    <p className="card-desc">{data.processing}</p>
                                                                </div>
                                                                <div className="card-items-wrapper">
                                                                    {
                                                                        data.items.map((it: any, ind: number) => {
                                                                            return (
                                                                                <div className="card-item" key={'item-' + ind}>
                                                                                    <div className="card-item-name">
                                                                                        <span>{it.name}</span>
                                                                                    </div>
                                                                                    <div className="card-item-value">
                                                                                        <span>{it.value}</span>
                                                                                    </div>
                                                                                </div>
                                                                            )
                                                                        })
                                                                    }
                                                                </div>
                                                            </Card>
                                                        </Col>
                                                    );
                                                } else {
                                                    return (
                                                        ''
                                                    );
                                                }
                                            default:
                                                break;
                                        }
                                    }
                                })
                            }
                        </Row>
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
            </div>
        );
    }
}
export default Workstation;