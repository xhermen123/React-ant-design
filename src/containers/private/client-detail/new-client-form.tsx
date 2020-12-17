import React from 'react';
import { Steps, Button, message, Layout, Row, Card, Divider, Col, Input, Avatar, Progress, Icon, Badge, Drawer, Form, DatePicker, Select, List, Checkbox } from 'antd';
import Sider from 'antd/lib/layout/Sider';
import GoogleLogin from 'react-google-login';
import Grid from 'antd/lib/card/Grid';
import { Link } from 'react-router-dom';
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

class NewClientForm extends React.Component<CaseProps & any, any> {

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
    
    handleSearch = (value: any) => {
        fetch(value, (data: any) => this.setState({ data }));
    }

    handleChange = (value: any) => {
        this.setState({ value });
    }

    onCheckboxChange(e: any) {
        console.log(`checked = ${e.target.checked}`);
    }

    render() {

        const { onClose } = this.props;
        const { getFieldDecorator } = this.props.form;
        const options = this.state.data.map((d: any) => <Option key={d.value}>{d.text}</Option>);

        const { initLoading, loading, list } = this.state;

        return (
            <div>
                <Form layout="vertical">
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
                                <Form.Item label="Email">
                                    {
                                        getFieldDecorator('cast_title', {
                                            rules: [{ required: true, message: 'Please enter cast title' }],
                                        })(<Input size="large" placeholder="Enter Cast Title" />)
                                    }
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item label="Address">
                                    {
                                        getFieldDecorator('cast_title', {
                                            rules: [{ required: true, message: 'Please enter cast title' }],
                                        })(<Input size="large" placeholder="Enter Cast Title" />)
                                    }
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item label="Phone">
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
                                    <Button size="large" type="primary" style={{backgroundColor: 'blue'}}>
                                        Save
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Form>
            </div>
        );
    }
}

export default Form.create({ name: 'new-client-form' })(NewClientForm);