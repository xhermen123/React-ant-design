import React from 'react';
import { Steps, Button, message, Layout, Row, Card, Divider, Col, Input, Avatar, Progress, Icon, Badge, Drawer, Form, DatePicker, Select, List, Checkbox } from 'antd';
import Sider from 'antd/lib/layout/Sider';
import GoogleLogin from 'react-google-login';
import Grid from 'antd/lib/card/Grid';
import { Link } from 'react-router-dom';
import { fetchClients } from '../clients/clientsAction';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CreateNewTask from '../task-manager/create-new-task';
import { createCase } from './dashboardAction';
import { fetchCategory } from '../task-manager/taskManagerAction';
const styles = require('./dashboard.scss');

const Step = Steps.Step;
const axios = require('axios');
const { Content, Header, Footer } = Layout;

interface CaseProps {
    onClose?: () => void;
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

class CreateNewCase extends React.Component<CaseProps & any, any> {

    public static defaultProps: CaseProps = {
        onClose: () => {}
    };

    constructor(props: any) {
        super(props);
        this.state = {
            showCreateTaskPanel: false,
            data: [],
            value: undefined,
            taskList: Array()
        };
        this.onCheckboxChange = this.onCheckboxChange.bind(this);
        this.selectAll = this.selectAll.bind(this);
    }
    
    componentWillMount() {
        this.props.fetchCategories();
        this.props.fetchClients();
    }

    componentDidMount() {
        this.props.form.validateFields();
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

    onCheckboxChange(e: any, item: any) {
        // console.log(`checked = ${e.target.checked}`);
        var taskList = this.state.taskList;
        if(taskList.includes(item._id)) {
            var index = taskList.indexOf(item._id);
            taskList.splice(index, 1);
        } else {
            taskList.push(item._id);
        }

        this.setState({
            taskList: taskList
        });
        // console.log(`checked = ${taskList}`);
    }

    selectAll(e: any, item: any) {
        var taskList = this.state.taskList;
        item.tasks.map((it: any, index: number) => {
            if(!taskList.includes(it._id)) {
                taskList.push(it._id);
            }
        });

        this.setState({
            taskList: taskList
        });
    }
    
    handleSubmit = (e: any) => {
        e.preventDefault();
        this.props.form.validateFields((err: any, values: any) => {
          if (!err) {
            console.log('Received values of form: ', values);
            var data = {
                client_id: values.client_id,
                cast_title: values.cast_title,
                tasks: this.state.taskList
            }
            this.props.createCase(data);
            this.props.onClose();
          }
        });
    };

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

        const { onClose, categories, clients } = this.props;
        const { getFieldDecorator, getFieldsError, isFieldTouched, getFieldError } = this.props.form;
        const options = clients.map((d: any) => <Option key={d._id}>{d.first_name + ' ' + d.last_name}</Option>);

        const clientIDError = isFieldTouched('client_id') && getFieldError('client_id');
        const castTitleError = isFieldTouched('cast_title') && getFieldError('cast_title');

        return (
            <div>
                <Form layout="vertical" onSubmit={this.handleSubmit}>
                    <Header className="create-case-header">
                        <div className="drawer-header-content">
                            Create New Case
                            <Button className="save-case-button" type="primary" size="large" htmlType="submit" disabled={hasErrors(getFieldsError())}>Save</Button>
                        </div>
                        <Icon type="close" className="drawer-close-icon" onClick={onClose}/>
                    </Header>
                    <div className="drawer-content-wrapper">
                        <Row gutter={16}>
                            <Col span={12}>
                                {/* <span className="drawer-item-title">Select Client</span> */}
                            </Col>
                            <Col span={12}>
                                <a className="drawer-clickable-link">Create New Client</a>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Form.Item label="Select Client" validateStatus={clientIDError ? 'error' : ''} help={clientIDError || ''}>
                                    {
                                        getFieldDecorator('client_id', {
                                            rules: [{ required: true, message: 'Please enter client name' }],
                                        })(
                                            <Select
                                                showSearch
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
                                <Form.Item label="Cast Title" validateStatus={castTitleError ? 'error' : ''} help={castTitleError || ''}>
                                    {
                                        getFieldDecorator('cast_title', {
                                            rules: [{ required: true, message: 'Please enter cast title' }],
                                        })(<Input size="large" placeholder="Enter Cast Title" />)
                                    }
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item style={{width: 300}}>
                                    {
                                        getFieldDecorator('search_for_case', {
                                            rules: [],
                                        })(<Input size="large" placeholder="Search Case" />)
                                    }
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Button className="primary create-new-task-button" size="large" onClick={this.openCreateTaskPanel.bind(this)}>Create New Task</Button>
                            </Col>
                        </Row>
                        {
                            categories.map((item: any, index: number) => {
                                return (
                                    <div key={index}>
                                        <Row gutter={16} style={{paddingBottom: '10px'}}>
                                            <Col span={12}>
                                                <span className="drawer-item-title">{item.name}</span>
                                            </Col>
                                            <Col span={12}>
                                                <a className="drawer-clickable-link" onClick={(e) => this.selectAll(e, item)}>Select All</a>
                                            </Col>
                                        </Row>
                                        <Row style={{marginBottom: '20px'}}>
                                            <Col span={24}>
                                                <List
                                                    size="small"
                                                    bordered
                                                    dataSource={item.tasks}
                                                    renderItem={(item: any) => (
                                                        <List.Item className="list-item" key={index}>
                                                            <Form.Item className="checkbox-item">
                                                                <Checkbox 
                                                                    onChange={(e) => this.onCheckboxChange(e, item)} 
                                                                    checked={this.state.taskList.includes(item._id)}>
                                                                    {item.title}
                                                                </Checkbox>
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
                                )
                            })
                        }
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

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        fetchCategories: bindActionCreators(fetchCategory, dispatch),
        createCase: bindActionCreators(createCase, dispatch),
        fetchClients: bindActionCreators(fetchClients, dispatch)
    };
};

const mapStateToProps = (state: any) => {
    return {
        clients: state.clients.clients,
        cases: state.workstation.cases,
        categories: state.taskManager.categories,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Form.create({ name: 'workstation-create' })(CreateNewCase));