import React from 'react';
import { Steps, Button, message, Layout, Row, Card, Divider, Col, Input, Avatar, Progress, Icon, Badge, Drawer, Form, DatePicker, Select, List, Checkbox } from 'antd';
import Sider from 'antd/lib/layout/Sider';
import GoogleLogin from 'react-google-login';
import Grid from 'antd/lib/card/Grid';
import { Link } from 'react-router-dom';
import CreateNewTask from '../task-manager/create-new-task';
const styles = require('./client-detail.scss');

const Step = Steps.Step;
const axios = require('axios');
const { Content, Header, Footer } = Layout;

interface CaseProps {
    onClose?: () => void;
}

const questionData = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
];

const Option = Select.Option;

let timeout: any;
let currentValue: any;

function fetch(value: any, callback: any) {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  currentValue = value;

  function fake() {
    axios(`https://suggest.taobao.com/sug?code=utf-8&q=` + value)
      .then((response: any) => response.json())
      .then((d: any) => {
        if (currentValue === value) {
          const result = d.result;
          const data: any = [];
          result.forEach((r: any) => {
            data.push({
              value: r[0],
              text: r[0],
            });
          });
          callback(data);
        }
      });
  }

  timeout = setTimeout(fake, 300);
}

class AddNewCase extends React.Component<CaseProps & any, any> {

    public static defaultProps: CaseProps = {
        onClose: () => {}
    };

    constructor(props: any) {
        super(props);
        this.state = {
            showCreateCasePanel: false,
            data: [],
            value: undefined,
        };
    }
    
    componentDidMount() {
        
    }
    
    onLoadMore = () => {
        this.setState({
          loading: true,
          list: this.state.data.concat([...new Array(3)].map(() => ({ loading: true, name: {} }))),
        });
        this.getData((res: any) => {
          const data = this.state.data.concat(res.results);
          this.setState({
            data,
            list: data,
            loading: false,
          }, () => {
            // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
            // In real scene, you can using public method of react-virtualized:
            // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
            window.dispatchEvent(new Event('resize'));
          });
        });
    }

    getData(callback: any) {
        axios(`https://randomuser.me/api/?results=sdf&inc=name,gender,email,nat&noinfo`)
          .then((res: any) => {
            callback(res);
          })
    }

    handleSearch = (value: any) => {
        fetch(value, (data: any) => this.setState({ data }));
    }

    handleChange = (value: any) => {
        this.setState({ value });
    }

    onCheckboxChange(e: any) {
        console.log(`checked = ${e.target.checked}`);
    }

    openCreateTaskPanel() {
        this.setState({
            showCreateTaskPanel: true,
        });
    }

    onTaskDrawerClose() {
        this.setState({
            showCreateTaskPanel: false,
        });
    }

    render() {

        const { onClose } = this.props;
        const { getFieldDecorator } = this.props.form;
        const options = this.state.data.map((d: any) => <Option key={d.value}>{d.text}</Option>);

        const { initLoading, loading, list } = this.state;
        const loadMore = !initLoading && !loading ? (
            <div style={{
                textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px',
            }}
            >
                <Button onClick={this.onLoadMore}>loading more</Button>
            </div>
        ) : null;

        return (
            <div>
                <Form layout="vertical" hideRequiredMark>
                    <Header className="create-case-header">
                        <div className="drawer-header-content">
                            Add New Task
                            <Button className="primary save-case-button" size="large">Save</Button>
                        </div>
                        <Icon type="close" className="drawer-close-icon" onClick={onClose}/>
                    </Header>
                    <div className="drawer-content-wrapper">
                        {/* <Row gutter={16}>
                            <Col span={12}>
                                <span className="drawer-item-title">Select Client</span>
                            </Col>
                            <Col span={12}>
                                <a className="drawer-clickable-link">Create New Client</a>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Form.Item>
                                    {
                                        getFieldDecorator('client_name', {
                                            rules: [{ required: true, message: 'Please enter client name' }],
                                        })(
                                            <Select
                                            showSearch
                                            value={this.state.value}
                                            placeholder="Search Client Name"
                                            style={this.props.style}
                                            defaultActiveFirstOption={false}
                                            showArrow={false}
                                            filterOption={false}
                                            onSearch={this.handleSearch}
                                            onChange={this.handleChange}
                                            notFoundContent={null}
                                            size="large"
                                          >
                                            {options}
                                          </Select>
                                        )
                                    }
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Form.Item label="Cast Title">
                                    {
                                        getFieldDecorator('cast_title', {
                                            rules: [{ required: true, message: 'Please enter cast title' }],
                                        })(<Input size="large" placeholder="Enter Cast Title" />)
                                    }
                                </Form.Item>
                            </Col>
                        </Row> */}
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item style={{width: 300}}>
                                    {
                                        getFieldDecorator('cast_title', {
                                            rules: [{ required: true, message: 'Please enter cast title' }],
                                        })(<Input size="large" placeholder="Search Case" />)
                                    }
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Button className="primary create-new-task-button" size="large" onClick={this.openCreateTaskPanel.bind(this)}>Create New Task</Button>
                            </Col>
                        </Row>
                        <Row gutter={16} style={{paddingBottom: '10px'}}>
                            <Col span={12}>
                                <span className="drawer-item-title">General questions</span>
                            </Col>
                            <Col span={12}>
                                <a className="drawer-clickable-link">Select All</a>
                            </Col>
                        </Row>
                        <Row style={{marginBottom: '20px'}}>
                            <Col span={24}>
                                <List
                                    size="small"
                                    bordered
                                    dataSource={questionData}
                                    renderItem={item => (
                                        <List.Item className="list-item">
                                            <Form.Item className="checkbox-item">
                                                {
                                                    getFieldDecorator('cast_title', {
                                                        rules: [{ required: true, message: 'Please enter cast title' }],
                                                    })(
                                                        <Checkbox onChange={this.onCheckboxChange}>{item}</Checkbox>
                                                    )
                                                }
                                            </Form.Item>    
                                        </List.Item>
                                        
                                    )}
                                    />
                                <div className="load-more-button">
                                    <span>
                                        Show More
                                    </span>
                                    <Icon type="caret-down" />
                                </div>
                            </Col>
                        </Row>
                        <Row gutter={16} style={{paddingBottom: '10px'}}>
                            <Col span={12}>
                                <span className="drawer-item-title">Tax return</span>
                            </Col>
                            <Col span={12}>
                                <a className="drawer-clickable-link">Select All</a>
                            </Col>
                        </Row>
                        <Row style={{marginBottom: '20px'}}>
                            <Col span={24}>
                                <List
                                    size="small"
                                    bordered
                                    loading={initLoading}
                                    itemLayout="horizontal"
                                    // loadMore={loadMore}
                                    dataSource={questionData}
                                    renderItem={item => (
                                        <List.Item className="list-item">
                                            <Form.Item className="checkbox-item">
                                                {
                                                    getFieldDecorator('cast_title', {
                                                        rules: [{ required: true, message: 'Please enter cast title' }],
                                                    })(<Checkbox onChange={this.onCheckboxChange}>{item}</Checkbox>)
                                                }
                                            </Form.Item>    
                                        </List.Item>
                                    )}
                                    />
                                <div className="load-more-button">
                                    <span>
                                        Show More
                                    </span>
                                    <Icon type="caret-down" />
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Form>
                {
                    this.state.showCreateTaskPanel ? (
                        <Drawer
                            width={'100%'}
                            closable={false}
                            // onClose={this.onClose.bind(this)}
                            visible={true}
                            className="create-task-drawer"
                            >
                            <div>
                                <CreateNewTask onClose={this.onTaskDrawerClose.bind(this)} task={this.state.selectedTask}></CreateNewTask>
                            </div>
                        </Drawer>
                    ) : ''
                }
            </div>
        );
    }
}

export default Form.create({ name: 'workstation-create' })(AddNewCase);