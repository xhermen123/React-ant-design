import React, { Fragment } from 'react';
import { Steps, Button, message, Layout, Row, Card, Divider, Col, Input, Avatar, Progress, Icon, Badge, Drawer, Form, DatePicker, Select, List, Dropdown, Menu, Modal, Table, Tag, Empty, Collapse, Upload, Checkbox, Radio } from 'antd';
import Sider from 'antd/lib/layout/Sider';
import GoogleLogin from 'react-google-login';
import Grid from 'antd/lib/card/Grid';
import { Link } from 'react-router-dom';
import AddNewCase from './add-new-task';
import NewClientForm from './new-client-form';
import TextArea from 'antd/lib/input/TextArea';
const styles = require('./client-detail.scss');
// RCE CSS
import 'react-chat-elements/dist/main.css';
// MessageBox component
import { MessageBox } from 'react-chat-elements';
import Item from 'antd/lib/list/Item';
import RadioGroup from 'antd/lib/radio/group';
import task from '../../../services/task';

const Step = Steps.Step;

const { Content, Header, Footer } = Layout;

class ClientDetail extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            currentCaseType: 0,
            searchText: '',
            showCreateCasePanel: false,
            modalVisible: false
        };
        this.onRadioGroupChange = this.onRadioGroupChange.bind(this);
        this.submitTaskData = this.submitTaskData.bind(this);
        this.changeCheckboxValue = this.changeCheckboxValue.bind(this);
        this.changeInputValue = this.changeInputValue.bind(this);
        this.additionalButtonClick = this.additionalButtonClick.bind(this);
        this.moveToTodo = this.moveToTodo.bind(this);
        this.moveToDone = this.moveToDone.bind(this);
        this.renderDoneAdditionalItem = this.renderDoneAdditionalItem.bind(this);
    }

    componentWillMount() {
        // console.log(this.props.match.params);
        this.props.fetchCaseDetail(this.props.match.params.id);
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

    changeCheckboxValue(e: any, p_item: any, item: any, id: any, it: any, index: any) {
        var data = this.state['task_' + p_item._id] ? this.state['task_' + p_item._id] : {};
        if(!data['checkbox_' + id]) {
            data['checkbox_' + id] = Array();
        }

        data['checkbox_' + id][index] = e.target.checked;

        this.setState({
            ['task_' + p_item._id]: data
        })

        console.log(this.state);
    }
    
    changeInputValue(e: any, p_item: any, item: any, id: any, it: any, index: any) {
        var data = this.state['task_' + p_item._id] ? this.state['task_' + p_item._id] : {};
        data['inputbox_' + id] = e.target.value;

        this.setState({
            ['task_' + p_item._id]: data
        })
        console.log(this.state);
    }

    onRadioGroupChange(e: any, p_item: any, item: any, id: any) {
        var data = this.state['task_' + p_item._id] ? this.state['task_' + p_item._id] : {};
        data['radiobox_' + id] = e.target.value;

        this.setState({
            ['task_' + p_item._id]: data,
            ['radioButtonValue' + id]: e.target.value
        })
        console.log(this.state);
    }

    renderAdditionalItem(p_item: any, item: any, id: number, type: number) {
        let renderedItem = null;

        switch(item.type) {
            case 'checkbox':

                renderedItem = (
                    <Col span={24} className="additional-item-row" key={id}>
                        {
                            item.items.map((it:any, index: number) => {
                                return (
                                    <div key={index}>
                                        <Checkbox onChange={(e) => this.changeCheckboxValue(e, p_item.task, item, id, it, index)}>{it}</Checkbox>
                                    </div>
                                )
                            })
                        }
                    </Col>
                );
                break;
            case 'inputbox':
                
                renderedItem = (
                    <Col span={24} className="additional-item-row" key={id}>
                        {
                            item.items.map((it:any, index: number) => {
                                return (
                                    <div key={index}>
                                        <label>{it}</label>
                                        <Input size="large" placeholder="" onChange={(e) => this.changeInputValue(e, p_item.task, item, id, it, index)}/>
                                    </div>
                                )
                            })
                        }
                    </Col>
                );
                break;
            case 'radiobox':

                renderedItem = (
                    <Col span={24} className="additional-item-row" key={id}>
                        <RadioGroup onChange={(e) => this.onRadioGroupChange(e, p_item.task, item, id)} value={this.state['radioButtonValue' + id]}>
                        {
                            item.items.map((it:any, index: number) => {
                                return (
                                    <div key={index}>
                                        <Radio value={it}>{it}</Radio>
                                    </div>
                                )
                            })
                        }
                        </RadioGroup>
                    </Col>
                );
                break;
            case 'file_upload':
                let that = this;
                const props = {
                    onRemove: (file: any) => {
                        var data = that.state['task_' + p_item.task._id] ? that.state['task_' + p_item.task._id] : {};

                        if(data['file_upload_' + id] && data['file_upload_' + id].length) {
                            const index = data['file_upload_' + id].indexOf(file);
                            data['file_upload_' + id].splice(index, 1);
                        }
                        
                        that.setState({
                            ['task_' + p_item.task._id]: data,
                        });
                        this.setState({
                            fileList: data['file_upload_' + id]
                        });
                      },
                      beforeUpload: (file: any) => {
                        var data = that.state['task_' + p_item.task._id] ? that.state['task_' + p_item.task._id] : {};

                        if(!data['file_upload_' + id]) {
                            data['file_upload_' + id] = Array();
                        }
                        data['file_upload_' + id] = [...data['file_upload_' + id], file];
                
                        that.setState({
                            ['task_' + p_item.task._id]: data,
                            // fileList: data['fileupload_' + id]
                        })
                        this.setState((state: any) => ({
                          fileList: data['file_upload_' + id]
                        }));
                        return false;
                      }
                };
                renderedItem = (
                    <Col span={24} className="additional-item-row" key={id}>
                        <Upload {...props} fileList={this.state.fileList}>
                            <Button style={{backgroundColor: '#2dbdea', color: 'white'}}>
                                <Icon type="upload" /> Upload
                            </Button>
                        </Upload>
                    </Col>
                );
                break;
            case 'file':
                let ori_filename1 = item.items.split(/_(.+)/)[1];
                let filepath1 = "http://localhost:8765/" + item.items;

                renderedItem = (
                    <Col span={24} className="additional-item-row" key={id}>
                        <div className="uploaded_file_item">
                            <a href={filepath1} target="_blank">{ori_filename1}</a>
                        </div>
                    </Col>
                );
                break;
            default:
                break;
        }

        return renderedItem;
    }

    renderDoneAdditionalItem(data: any, item: any, id: number, type: number) {
        let renderedItem = null;

        switch(item.type) {
            case 'checkbox':

                renderedItem = (
                    <Col span={24} className="additional-item-row" key={id}>
                        {
                            item.items.map((it:any, index: number) => {
                                return (
                                    <div key={index}>
                                        <Checkbox checked={data.data['checkbox_' + id][index]} disabled>{it}</Checkbox>
                                    </div>
                                )
                            })
                        }
                    </Col>
                );
                break;
            case 'inputbox':
                
                renderedItem = (
                    <Col span={24} className="additional-item-row" key={id}>
                        {
                            item.items.map((it:any, index: number) => {
                                return (
                                    <div key={index}>
                                        <label>{it}</label>
                                        <p>{data.data['inputbox_' + id]}</p>
                                        {/* <Input size="large" placeholder="" onChange={(e) => this.changeInputValue(e, p_item.task, item, id, it, index)}/> */}
                                    </div>
                                )
                            })
                        }
                    </Col>
                );
                break;
            case 'radiobox':

                renderedItem = (
                    <Col span={24} className="additional-item-row" key={id}>
                        <RadioGroup value={data.data['radiobox_' + id]} disabled>
                        {
                            item.items.map((it:any, index: number) => {
                                return (
                                    <div key={index}>
                                        <Radio value={it}>{it}</Radio>
                                    </div>
                                )
                            })
                        }
                        </RadioGroup>
                    </Col>
                );
                break;
            case 'file_upload':
                let that = this;
                // const props = {
                //     onRemove: (file: any) => {
                //         var data = that.state['task_' + p_item.task._id] ? that.state['task_' + p_item.task._id] : {};

                //         if(data['file_upload_' + id] && data['file_upload_' + id].length) {
                //             const index = data['file_upload_' + id].indexOf(file);
                //             data['file_upload_' + id].splice(index, 1);
                //         }
                        
                //         that.setState({
                //             ['task_' + p_item.task._id]: data,
                //         });
                //         this.setState({
                //             fileList: data['file_upload_' + id]
                //         });
                //       },
                //       beforeUpload: (file: any) => {
                //         var data = that.state['task_' + p_item.task._id] ? that.state['task_' + p_item.task._id] : {};

                //         if(!data['file_upload_' + id]) {
                //             data['file_upload_' + id] = Array();
                //         }
                //         data['file_upload_' + id] = [...data['file_upload_' + id], file];
                
                //         that.setState({
                //             ['task_' + p_item.task._id]: data,
                //             // fileList: data['fileupload_' + id]
                //         })
                //         this.setState((state: any) => ({
                //           fileList: data['file_upload_' + id]
                //         }));
                //         return false;
                //       }
                // };
                let filename = '';

                for(var i=0; i<data.files.length; i++) {
                    if(data.files[i].field_name == "file_upload_" + id + "[]") {
                        filename = data.files[i].filename;
                    }
                }

                let ori_filename = filename.split(/_(.+)/)[1];
                let filepath = "http://localhost:8765/" + filename;

                renderedItem = (
                    <Col span={24} className="additional-item-row" key={id}>
                        {/* <Upload {...props} fileList={this.state.fileList}> */}
                            <div className="uploaded_file_item">
                                <a href={filepath} target="_blank">{ori_filename}</a>
                                <Icon type="delete" theme="filled" className="uploaded_file_delete_icon"/>
                            </div>
                            <Button style={{backgroundColor: '#2dbdea', color: 'white'}} disabled>
                                <Icon type="upload" /> Upload
                            </Button>
                        {/* </Upload> */}
                    </Col>
                );
                break;
            case 'file':
                let ori_filename1 = data.data['file_' + id].split(/_(.+)/)[1];
                let filepath1 = "http://localhost:8765/" + data.data['file_' + id];

                renderedItem = (
                    <Col span={24} className="additional-item-row" key={id}>
                        <div className="uploaded_file_item">
                            <a href={filepath1} target="_blank">{ori_filename1}</a>
                        </div>
                    </Col>
                );
                break;
            default:
                break;
        }

        return renderedItem;
    }

    makeTaskData(data: any) {
        var returnData = {
            todo: Array(),
            skipped: Array(),
            review: Array(),
            done: Array()
        }

        if(data.tasks) {
            data.tasks.map((item: any, index: any) => {
                switch(item.status) {
                    case 0:
                        returnData.todo.push(item);
                        break;
                    case 1:
                        returnData.skipped.push(item);
                        break;
                    case 2:
                        returnData.review.push(item);
                        break;
                    case 3:
                        returnData.done.push(item);
                        break;
                    default:
                        returnData.todo.push(item);
                        break;
                }
            });
        } 

        return returnData;
    }
    
    submitTaskData(e: any, data: any) {
        const formData = new FormData();
        let taskData = this.state['task_' + data._id];

        formData.append('task_id', data._id);
        formData.append('case_id', this.props.data._id);
        formData.append('clicked_button', 'done');

        data.additional_form_items.forEach((item: any, index: number) => {
            switch(item.type) {
                case 'inputbox':
                    formData.append('inputbox_' + index, taskData['inputbox_' + index]);
                    break;
                case 'radiobox':
                    formData.append('radiobox_' + index, taskData['radiobox_' + index]);
                    break;
                case 'checkbox':
                    formData.append('checkbox_' + index, taskData['checkbox_' + index]);
                    break;
                case 'file_upload':
                    taskData['file_upload_' + index].forEach((file: any) => {
                        formData.append('file_upload_' + index + '[]', file);
                    })
                    break;
                case 'file':
                    formData.append('file_' + index, item.items);
                default:
                    break;
            }
        });
        
        this.props.updateCaseDetail(formData);
    }

    moveToTodo(e: any, data: any) {
        var req = {
            task_id: data._id,
            case_id: this.props.data._id,
            status: 0
        }

        this.props.changeCaseTaskStatus(req);
    }
    
    moveToDone(e: any, data: any) {
        var req = {
            task_id: data._id,
            case_id: this.props.data._id,
            status: 3
        }

        this.props.changeCaseTaskStatus(req);
    }
    
    additionalButtonClick(it: string, data: any) {
        const formData = new FormData();
        let taskData = this.state['task_' + data._id];
        var btn_name = it.toLowerCase();
        formData.append('task_id', data._id);
        formData.append('case_id', this.props.data._id);
        formData.append('clicked_button', btn_name);

        if(taskData) {
            data.additional_form_items.forEach((item: any, index: number) => {
                switch(item.type) {
                    case 'inputbox':
                        formData.append('inputbox_' + index, taskData['inputbox_' + index]);
                        break;
                    case 'radiobox':
                        formData.append('radiobox_' + index, taskData['radiobox_' + index]);
                        break;
                    case 'checkbox':
                        formData.append('checkbox_' + index, taskData['checkbox_' + index]);
                        break;
                    case 'file_upload':
                        taskData['file_upload_' + index].forEach((file: any) => {
                            formData.append('file_upload_' + index + '[]', file);
                        })
                        break;
                    default:
                        break;
                }
            });
        }
        
        this.props.updateCaseDetail(formData);
    }

    checkFormValidation(data: any) {
        var item = this.state['task_' + data._id] ? this.state['task_' + data._id] : {};

        for(var i=0; i<data.additional_form_items.length; i++) {
            var it = data.additional_form_items[i];

            if(it.type == 'inputbox' || it.type == 'radiobox' || it.type == 'file_upload') {
                if(!item[it.type + '_' + i]) {
                    return true;
                }
            }
        }

        return false;
    }

    render() {
        // const { current, venue } = this.state;
        const { data } = this.props;
        const { initLoading, loading, list } = this.state;

        var role = Number(localStorage.getItem('role'));

        var taskData = this.makeTaskData(data);
        var percent = 0;
        if(data.tasks && data.tasks.length) {
            percent = Math.round((data.tasks.length - taskData.todo.length) / data.tasks.length * 100);
        }
        
        const Panel = Collapse.Panel;

        const Dragger = Upload.Dragger;

        const props = {
            name: 'file',
            multiple: true,
            action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
            onChange(info: any) {
                const status = info.file.status;
                if (status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (status === 'done') {
                    message.success(`${info.file.name} file uploaded successfully.`);
                } else if (status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
            },
        };

        const text = (
            <div className="client-task-detail-content">
                <div className="task-section">
                    <p>This is task description</p>
                    <div className="client-task-items-wrapper">
                        <Dragger {...props}>
                            <p className="ant-upload-drag-icon">
                            <Icon type="inbox" />
                            </p>
                            <p className="ant-upload-text">Click or drag file to this area to upload</p>
                            <p className="ant-upload-hint">
                            Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                            band files
                            </p>
                        </Dragger>
                    </div>
                    <div className="client-task-buttons-wrapper">
                        <Button size="large">
                            Button
                        </Button>
                        <Button size="large" type="primary" style={{backgroundColor: 'blue', marginLeft: '15px'}}>Done</Button>
                    </div>
                </div>
                {/* <div className="chat-section-wrapper">
                    <div className="chat-section">
                        <div className="chat-history">
                        <MessageBox
                            title=''
                            position={'left'}
                            type={'text'}
                            text={'react.svg'}
                            data={''}
                            />
                        <MessageBox
                            title=''
                            position={'right'}
                            type={'text'}
                            text={'react.svg'}
                            data={''}
                            />
                        </div>
                        <div>
                            <TextArea rows={4} />
                        </div>
                        <div>
                            <Button>Send</Button>
                        </div>
                    </div>
                </div> */}
            </div>
        );

        const clientDetailMenu = (
            <Menu>
              <Menu.Item key="0">
                <a href="http://www.alipay.com/">1st menu item</a>
              </Menu.Item>
              <Menu.Item key="1">
                <a href="http://www.taobao.com/">2nd menu item</a>
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item key="3">3rd menu item</Menu.Item>
            </Menu>
        );

        const genExtra = () => (
            <div className="extra-items">
                {/* <span>HELP: 1</span>
                <Dropdown overlay={clientDetailMenu} trigger={['click']}>
                    <Icon
                        type="more"
                        onClick={event => {
                            // If you don't want click extra trigger collapse, you can prevent this:
                            event.stopPropagation();

                        }}
                    />
                </Dropdown> */}
            </div>
        );

        var $renderedItems = (
            <div className="client-tasks-detail">
                <div className="todo-tasks">
                    <div className="task-list-title">
                        <span>Marvin't to-do list ({taskData.todo.length})</span>
                        <Icon type="caret-down" />
                    </div>
                    <Collapse bordered={false} defaultActiveKey={[]}>
                    {
                        taskData.todo.map((p_item: any, index: number) => {
                            let item = p_item.task;
                            return (
                                <Panel header={item.title} key={index.toString()} showArrow={false} extra={genExtra()}>
                                    <div className="client-task-detail-content">
                                        <div className="task-section">
                                            <p>{item.sub_title}</p>
                                            {
                                                item.additional_form_items.map((it:any, id:number) => {
                                                    return this.renderAdditionalItem(p_item, it, id, 0)
                                                })
                                            }
                                            <Col span={24} className="buttons-section">
                                                <div style={{width: 'fit-content', marginLeft: 'auto'}}>
                                                    {
                                                        item.additional_buttons.map((it: any, id: number) => {
                                                            return (
                                                                <Button size="large" className="additional-button" key={id} onClick={() => this.additionalButtonClick(it, item)}>
                                                                    {it}
                                                                </Button>
                                                            )
                                                        })
                                                    }
                                                    <Button size="large" type="primary" style={{backgroundColor: '#2dbdea', marginLeft: '15px'}} className="done-button" onClick={(e) => this.submitTaskData(e, item)} disabled={this.checkFormValidation(item)}>
                                                        Done
                                                    </Button>
                                                </div>
                                            </Col>
                                        </div>
                                    </div>
                                </Panel>
                            )
                        })
                    }
                    </Collapse>
                </div>
                <div className="skip-tasks">
                    <div className="task-list-title">
                        <span>Skipped ({taskData.skipped.length})</span>
                        <Icon type="caret-down" />
                    </div>
                    <Collapse bordered={false} defaultActiveKey={[]}>
                    {
                        taskData.skipped.map((p_item: any, index: number) => {
                            let item = p_item.task;
                            return (
                                <Panel header={item.title} key={index.toString()} showArrow={false} extra={genExtra()}>
                                    <div className="client-task-detail-content">
                                        <div className="task-section">
                                            <p>{item.sub_title}</p>
                                            {
                                                item.additional_form_items.map((it:any, id:number) => {
                                                    return this.renderAdditionalItem(p_item, it, id, 1)
                                                })
                                            }
                                            <Col span={24} className="buttons-section">
                                                <div style={{width: 'fit-content', marginLeft: 'auto'}}>
                                                    {/* {
                                                        item.additional_buttons.map((it: any, id: number) => {
                                                            return (
                                                                <Button size="large" className="additional-button" key={id}>
                                                                    {it}
                                                                </Button>
                                                            )
                                                        })
                                                    }
                                                    <Button size="large" type="primary" style={{backgroundColor: '#2dbdea', marginLeft: '15px'}} className="done-button" onClick={(e) => this.submitTaskData(e, item)}>
                                                        Done
                                                    </Button> */}
                                                    {
                                                        role ? (
                                                            <Fragment>
                                                                <Button size="large" className="additional-button" onClick={(e) => this.moveToTodo(e, item)}>
                                                                    Move to To Do
                                                                </Button> 
                                                                <Button size="large" type="primary" style={{backgroundColor: '#2dbdea', marginLeft: '15px'}} className="done-button" onClick={(e) => this.moveToDone(e, item)}>
                                                                    Move to Done
                                                                </Button> 
                                                            </Fragment>
                                                            
                                                        ) : (
                                                            <div></div>
                                                        )
                                                    }
                                                </div>
                                            </Col>
                                        </div>
                                    </div>
                                </Panel>
                            )
                        })
                    }
                    </Collapse>
                </div>
                <div className="review-tasks">
                    <div className="task-list-title">
                        <span>Your review list ({taskData.review.length})</span>
                        <Icon type="caret-down" />
                    </div>
                    <Collapse bordered={false} defaultActiveKey={[]}>
                    {
                        taskData.review.map((p_item: any, index: number) => {
                            let item = p_item.processed_task;
                            return (
                                <Panel header={item.title} key={index.toString()} showArrow={false} extra={genExtra()}>
                                    <div className="client-task-detail-content">
                                        <div className="task-section">
                                            <p>{item.sub_title}</p>
                                            {
                                                item.additional_form_items.map((it:any, id:number) => {
                                                    return this.renderDoneAdditionalItem(p_item.processed_data, it, id, 2)
                                                })
                                            }
                                            <Col span={24} className="buttons-section">
                                                <div style={{width: 'fit-content', marginLeft: 'auto'}}>
                                                    {/* {
                                                        item.additional_buttons.map((it: any, id: number) => {
                                                            return (
                                                                <Button size="large" className="additional-button" key={id}>
                                                                    {it}
                                                                </Button>
                                                            )
                                                        })
                                                    }
                                                    <Button size="large" type="primary" style={{backgroundColor: '#2dbdea', marginLeft: '15px'}} className="done-button" onClick={(e) => this.submitTaskData(e, item)}>
                                                        Done
                                                    </Button> */}
                                                    {
                                                        role ? (
                                                            <Fragment>
                                                                <Button size="large" className="additional-button" onClick={(e) => this.moveToTodo(e, item)}>
                                                                    Move to To Do
                                                                </Button> 
                                                                <Button size="large" type="primary" style={{backgroundColor: '#2dbdea', marginLeft: '15px'}} className="done-button" onClick={(e) => this.moveToDone(e, item)}>
                                                                    Move to Done
                                                                </Button> 
                                                            </Fragment>
                                                            
                                                        ) : (
                                                            <div></div>
                                                        )
                                                    }
                                                </div>
                                            </Col>
                                        </div>
                                    </div>
                                </Panel>
                            )
                        })
                    }
                    </Collapse>
                </div>
                <div className="done-tasks">
                    <div className="task-list-title">
                        <span>Done ({taskData.done.length})</span>
                        <Icon type="caret-down" />
                    </div>
                    <Collapse bordered={false} defaultActiveKey={[]}>
                    {
                        taskData.done.map((p_item: any, index: number) => {
                            let item = p_item.processed_task;
                            return (
                                <Panel header={item.title} key={index.toString()} showArrow={false} extra={genExtra()}>
                                    <div className="client-task-detail-content">
                                        <div className="task-section">
                                            <p>{item.sub_title}</p>
                                            {
                                                item.additional_form_items.map((it:any, id:number) => {
                                                    return this.renderDoneAdditionalItem(p_item.processed_data, it, id, 3)
                                                })
                                            }
                                            <Col span={24} className="buttons-section">
                                                <div style={{width: 'fit-content', marginLeft: 'auto'}}>
                                                    {/* {
                                                        item.additional_buttons.map((it: any, id: number) => {
                                                            return (
                                                                <Button size="large" className="additional-button" key={id}>
                                                                    {it}
                                                                </Button>
                                                            )
                                                        })
                                                    }
                                                    <Button size="large" type="primary" style={{backgroundColor: '#2dbdea', marginLeft: '15px'}} className="done-button" onClick={(e) => this.submitTaskData(e, item)}>
                                                        Done
                                                    </Button> */}
                                                </div>
                                            </Col>
                                        </div>
                                    </div>
                                </Panel>
                            )
                        })
                    }
                    </Collapse>
                </div>
            </div>
        );

        return (
            <div className="client-detail-page">
                <div className="content">
                    <Header className="content-header">
                        <div className="header-content-wrapper">
                            <div className="header-left-menu-wrapper">
                                <div className="case-items-wrapper">
                                    <span className="case-status">Case status : {percent}% Done</span>
                                    <Progress percent={percent} strokeColor="#37BCBA"/>
                                </div>
                            </div>
                            <div className="header-right-btn-wrapper">
                                <Button type="primary" size="large"  onClick={this.showModal.bind(this)}>Send to Client</Button>
                                <Button type="primary" size="large"  onClick={this.showDrawer.bind(this)}>Add Task</Button>
                            </div>
                        </div>
                    </Header>
                    <div className="client-detail-content">
                        {
                            false ? (
                                <div className="empty-content">
                                    <p style={{marginBottom: '0px'}}>
                                        This client has no task now.
                                    </p>
                                    <p>
                                        Please add task here.
                                    </p>
                                </div>
                            ) : $renderedItems
                        }
                    </div>
                </div>
                <Drawer
                    width={'100%'}
                    closable={false}
                    // onClose={this.onClose.bind(this)}
                    visible={this.state.showCreateCasePanel}
                    className="create-task-drawer"
                    >
                    <div>
                        <AddNewCase onClose={this.onClose.bind(this)}></AddNewCase>
                    </div>
                </Drawer>
                <Modal
                    title="Category Manager"
                    visible={this.state.modalVisible}
                    // onOk={this.handleOk}
                    centered
                    onCancel={this.handleCancel.bind(this)}
                    className="new-client-modal"
                    footer={null}
                    >
                    <NewClientForm></NewClientForm>
                </Modal>
            </div>
        );
    }
}
export default ClientDetail;