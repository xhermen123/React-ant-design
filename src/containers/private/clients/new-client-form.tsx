import React from 'react';
import { Steps, Button, message, Layout, Row, Card, Divider, Col, Input, Avatar, Progress, Icon, Badge, Drawer, Form, DatePicker, Select, List, Checkbox } from 'antd';
import Sider from 'antd/lib/layout/Sider';
import GoogleLogin from 'react-google-login';
import Grid from 'antd/lib/card/Grid';
import { Link } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';
import { createClient, fetchClients } from './clientsAction';
import { connect } from 'react-redux';
const styles = require('./clients.scss');

const Step = Steps.Step;
const axios = require('axios');
const { Content, Header, Footer } = Layout;

interface CaseProps {
    onClose?: (e: any) => void;
    record?: any;
}

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

function hasErrors(fieldsError: any) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class NewClientForm extends React.Component<CaseProps & any, any> {

    public static defaultProps: CaseProps = {
        onClose: (e: any) => {}
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
        const { record } = this.props;

        this.props.form.validateFields();
        if(record) {
            this.props.form.setFieldsValue({
                first_name: record.first_name,
                last_name: record.last_name,
                email: record.email,
                address: record.address,
                phone: record.phone
            });
        }
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

    handleSubmit = (e: any) => {
        e.preventDefault();
        this.props.form.validateFields((err: any, values: any) => {
          if (!err) {
            console.log('Received values of form: ', values);
            this.props.createClient(values);
            this.props.onClose();
          }
        });
    };

    render() {

        const { onClose } = this.props;
        const { getFieldDecorator, isFieldTouched, getFieldError, getFieldsError } = this.props.form;
        const options = this.state.data.map((d: any) => <Option key={d.value}>{d.text}</Option>);

        const { initLoading, loading, list } = this.state;

        const firstnameError = isFieldTouched('first_name') && getFieldError('first_name');
        const lastnameError = isFieldTouched('last_name') && getFieldError('last_name');
        const emailError = isFieldTouched('email') && getFieldError('email');
        const addressError = isFieldTouched('address') && getFieldError('address');
        const phoneError = isFieldTouched('phone') && getFieldError('phone');

        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
          })(
            <Select style={{ width: 70 }}>
              <Option value="86">+86</Option>
              <Option value="87">+87</Option>
            </Select>,
          );
          
        return (
            <div>
                <Form layout="vertical" onSubmit={this.handleSubmit}>
                    <div className="drawer-content-wrapper">
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="First Name" validateStatus={firstnameError ? 'error' : ''} help={firstnameError || ''}>
                                {getFieldDecorator('first_name', {
                                    rules: [{ required: true, message: 'Please enter first name' }],
                                })(<Input placeholder="First Name" size="large"/>)}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Last Name" validateStatus={lastnameError ? 'error' : ''} help={lastnameError || ''}>
                                    {getFieldDecorator('last_name', {
                                        rules: [{ required: true, message: 'Please enter last name' }],
                                    })(<Input placeholder="Last Name" size="large"/>)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Form.Item label="Email" validateStatus={emailError ? 'error' : ''} help={emailError || ''}>
                                    {
                                        getFieldDecorator('email', {
                                            rules: [{
                                                    type: 'email',
                                                    message: 'The input is not valid E-mail!',
                                                },
                                                { 
                                                    required: true, 
                                                    message: 'Please enter email' 
                                                }
                                            ],
                                        })(<Input size="large" placeholder="Email" />)
                                    }
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item label="Address" validateStatus={addressError ? 'error' : ''} help={addressError || ''}>
                                    {
                                        getFieldDecorator('address', {
                                            rules: [{ required: true, message: 'Please enter adress' }],
                                        })(<Input size="large" placeholder="Address" />)
                                    }
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item label="Phone" validateStatus={phoneError ? 'error' : ''} help={phoneError || ''}>
                                    {
                                        getFieldDecorator('phone', {
                                            rules: [{ required: true, message: 'Please enter phone number' }],
                                        })(<Input addonBefore={prefixSelector} size="large" placeholder="Phone Number" />)
                                    }
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <div style={{width: 'fit-content', marginLeft: 'auto'}}>
                                    <Button size="large" type="primary" style={{backgroundColor: 'blue'}} htmlType="submit" disabled={hasErrors(getFieldsError())}>
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

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        createClient: bindActionCreators(createClient, dispatch),
        fetchClients: bindActionCreators(fetchClients, dispatch)
    };
};

const mapStateToProps = (state: any) => {
    return {
        clients: state.clients.clients,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Form.create({ name: 'new-client-form' })(NewClientForm));