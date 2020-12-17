import React from 'react';
import { Steps, Button, message, Layout, Row, Card, Divider, Col, Input, Avatar, Progress, Icon, Badge, Drawer, Form, DatePicker, Select, List, Checkbox, Dropdown, Menu, Radio, Upload } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CheckBoxSelection, Inject, MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';
import CreateNewTaskInputboxMenu from './create-new-task-inputbox-menu';
import CreateNewTaskCheckboxMenu from './create-new-task-checkbox-menu';
import CreateNewCategoryModal from './create-new-category.modal';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { createTask, updateTask } from './taskManagerAction';
import CreateNewTaskRadioboxMenu from './create-new-task-radiobox-menu';
import RadioGroup from 'antd/lib/radio/group';
const styles = require('./task-manager.scss');

const Step = Steps.Step;
const axios = require('axios');
const { Content, Header, Footer } = Layout;

interface CaseProps {
    onClose?: () => void;
    task?: any;
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

class CreateNewTask extends React.Component<CaseProps & any, any> {

    public static defaultProps: CaseProps = {
        onClose: () => {},
        task: null,
    };

    constructor(props: any) {
        super(props);
        this.state = {
            showCreateCasePanel: false,
            data: [],
            value: undefined,
            newButtonName:'',
            newTaskCategoryName: '',
            addItemMenu: null,
            addItemType: 0,
            addItemMenuVisible: false,
            addButtonMenuVisible: false,
            additionalItems: Array(),
            additionalButtons: Array(),
            taskCategories: [
                'first',
                'second'
            ],
            modalVisible: false,
            categoryDropdownVisible: false
        };

        this.updateButtonName = this.updateButtonName.bind(this);
        this.handleAddItemMainMenuClick = this.handleAddItemMainMenuClick.bind(this);
        this.onAddItemMenuDone = this.onAddItemMenuDone.bind(this);
        this.removeItemIconClick = this.removeItemIconClick.bind(this);
        this.handleAddButtonMenuVisibleChange = this.handleAddButtonMenuVisibleChange.bind(this);
        this.removeAdditionalButton = this.removeAdditionalButton.bind(this);
        this.updateTaskCategoryName = this.updateTaskCategoryName.bind(this);
        this.categoryDropdownChange = this.categoryDropdownChange.bind(this);
        this.selectCategory = this.selectCategory.bind(this);
        this.saveTask = this.saveTask.bind(this);
    }
    
    componentDidMount() {
        const { form: { setFieldsValue }, task } = this.props;

        if(task) {
            this.setState({
                additionalButtons: task.additional_buttons,
                additionalItems: task.additional_form_items
            });

            setFieldsValue({
                task_category: [task.category_id],
                title: task.title,
                sub_title: task.sub_title
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

    updateButtonName(ev: any) {
        ev.stopPropagation();
        this.setState({
            newButtonName: ev.target.value
        });
    }

    clickAddButtonMenuItem(e: any) {
        switch(e.key) {
            case "0":
                let additionalButtons0 = this.state.additionalButtons;

                additionalButtons0.push('Skip');

                this.setState({
                    additionalButtons: additionalButtons0,
                    addButtonMenuVisible: false
                })
                break;
            case "1":
                let additionalButtons1 = this.state.additionalButtons;

                additionalButtons1.push('I don\'t know');

                this.setState({
                    additionalButtons: additionalButtons1,
                    addButtonMenuVisible: false
                })
                break;
            case "2":
                let additionalButtons2 = this.state.additionalButtons;

                additionalButtons2.push('I don\'t have it');

                this.setState({
                    additionalButtons: additionalButtons2,
                    addButtonMenuVisible: false
                })
                break;
            case "3":
                
                break;
            default:
                break;
        }
    }

    addCustomButton() {
        let additionalButtons = this.state.additionalButtons;

        additionalButtons.push(this.state.newButtonName);

        this.setState({
            additionalButtons: additionalButtons,
            addButtonMenuVisible: false,
            newButtonName: ''
        })
    }

    removeAdditionalButton(index: number) {
        console.log(index);
        let additionalButtons = this.state.additionalButtons;

        additionalButtons.splice(index, 1);

        this.setState({
            additionalButtons: additionalButtons
        })
    }

    handleAddItemMenuVisibleChange(e: any) {
        this.setState({ addItemMenuVisible: e });
    }
    
    handleAddButtonMenuVisibleChange(e: any) {
        this.setState({ addButtonMenuVisible: e });
    }

    onAddItemMenuDone(type: string, data: any) {
        console.log(data);
        let additionalItems = this.state.additionalItems;

        additionalItems.push(data);

        this.setState({ 
            addItemMenuVisible: false,
            additionalItems: additionalItems
        });
    }

    handleAddItemMainMenuClick(e: any) {
        switch(e.key) {
            case "0":
                const menu0 = (
                    <CreateNewTaskInputboxMenu onDone={(type: string, data: any) => this.onAddItemMenuDone(type, data)}/>
                );
                this.setState({ addItemMenu: menu0});
                break;
            case "1":
                const menu1 = (
                    <CreateNewTaskCheckboxMenu onDone={(type: string, data: any) => this.onAddItemMenuDone(type, data)}/>
                );
                this.setState({ addItemMenu: menu1});
                break;
            case "2":
                const menu2 = (
                    <CreateNewTaskRadioboxMenu onDone={(type: string, data: any) => this.onAddItemMenuDone(type, data)}/>
                );
                this.setState({ addItemMenu: menu2});
                break;
            case "3":
                let additionalItems = this.state.additionalItems;

                additionalItems.push({
                    type: 'file_upload'
                });

                this.setState({ 
                    addItemMenuVisible: false,
                    additionalItems: additionalItems
                });
                break;
            default:
                break;
        }
    }

    addItemIconClick() {
        let that = this;
        const props = {
            onRemove: (file: any) => {
                // var data = that.state['task_' + p_item.task._id] ? that.state['task_' + p_item.task._id] : {};

                // if(data['file_upload_' + id] && data['file_upload_' + id].length) {
                //     const index = data['file_upload_' + id].indexOf(file);
                //     data['file_upload_' + id].splice(index, 1);
                // }
                
                // that.setState({
                //     ['task_' + p_item.task._id]: data,
                // });
                // this.setState({
                //     fileList: data['file_upload_' + id]
                // });
            },
            beforeUpload: (file: any) => {
                // var data = that.state['task_' + p_item.task._id] ? that.state['task_' + p_item.task._id] : {};

                // if(!data['file_upload_' + id]) {
                //     data['file_upload_' + id] = Array();
                // }
                // data['file_upload_' + id] = [...data['file_upload_' + id], file];
        
                // that.setState({
                //     ['task_' + p_item.task._id]: data,
                //     // fileList: data['fileupload_' + id]
                // })
                
                // this.setState((state: any) => ({
                //     fileList: data['file_upload_' + id]
                // }));
                let additionalItems = this.state.additionalItems;

                let data = {
                    type: 'file',
                    items: file
                };

                additionalItems.push(data);

                this.setState({ 
                    addItemMenuVisible: false,
                    additionalItems: additionalItems
                });
                return false;
            }
        };
        const menu = (
            <Menu 
                className="add-button-menu-for-new-task"
                onClick={e => this.handleAddItemMainMenuClick(e)}
                >
                <Menu.Item key="0">
                    <Icon type="edit" />
                    <span>Input box</span>
                </Menu.Item>
                <Menu.Item key="1">
                    <Icon type="check-square" />
                    <span>Check box</span>
                </Menu.Item>
                <Menu.Item key="2">
                    <FontAwesomeIcon icon="dot-circle" />
                    <span className="radio-span">Radio Button</span>
                </Menu.Item>
                <Menu.Item key="3">
                    <Icon type="upload" />
                    <span>File Upload Button</span>
                </Menu.Item>
                <Menu.Item key="4">
                    <Upload {...props} fileList={[]}>
                        <Icon type="folder" />
                        <span className="attach-file-span">Attached file for Client</span>
                    </Upload>
                </Menu.Item>
            </Menu>
        );
        this.setState({ addItemMenu: menu});
    }

    removeItemIconClick(id: number) {
        let additionalItems = this.state.additionalItems;

        additionalItems.splice(id, 1);

        this.setState({
            additionalItems: additionalItems
        })
    }

    updateTaskCategoryName(e: any) {
        this.setState({
            newTaskCategoryName: e.target.value
        })
    }

    addNewCategory() {
        let taskCategories = this.state.taskCategories;

        taskCategories.push(this.state.newTaskCategoryName);

        this.setState({
            taskCategories: taskCategories
        })
    }

    onRadioGroupChange(e: any, id: any) {
        this.setState({
            ['radioButtonValue' + id]: e.target.value
        })
    }

    renderAdditionalItem(item: any, id: number) {
        let renderedItem = null;

        switch(item.type) {
            case 'checkbox':

                renderedItem = (
                    <Col span={24} className="additional-item-row" key={id}>
                        {
                            item.items.map((it:any, index: number) => {
                                return (
                                    <div key={index}>
                                        <Checkbox>{it}</Checkbox>
                                    </div>
                                )
                            })
                        }
                        <Icon type="minus-circle" theme="filled" className="remove-item-btn" onClick={() => this.removeItemIconClick(id)}/>
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
                                        <Input size="large" placeholder="" />
                                    </div>
                                )
                            })
                        }
                        <Icon type="minus-circle" theme="filled" className="remove-item-btn" onClick={() => this.removeItemIconClick(id)}/>
                    </Col>
                );
                break;
            case 'radiobox':

                renderedItem = (
                    <Col span={24} className="additional-item-row" key={id}>
                        <RadioGroup onChange={(e) => this.onRadioGroupChange(e, id)} value={this.state['radioButtonValue' + id]}>
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
                        <Icon type="minus-circle" theme="filled" className="remove-item-btn" onClick={() => this.removeItemIconClick(id)}/>
                    </Col>
                );
                break;
            case 'file_upload':
                const props = {
                    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
                    onChange({ file, fileList }: any) {
                        if (file.status !== 'uploading') {
                            console.log(file, fileList);
                        }
                    }
                };
                renderedItem = (
                    <Col span={24} className="additional-item-row" key={id}>
                        <Upload {...props}>
                            <Button style={{backgroundColor: '#2dbdea', color: 'white'}}>
                                <Icon type="upload" /> Upload
                            </Button>
                        </Upload>
                        <Icon type="minus-circle" theme="filled" className="remove-item-btn" onClick={() => this.removeItemIconClick(id)}/>
                    </Col>
                );
                break;
            case 'file':
                renderedItem = (
                    <Col span={24} className="additional-item-row" key={id}>
                        <div>
                            <p>{item.items.name}</p>
                        </div>
                        <Icon type="minus-circle" theme="filled" className="remove-item-btn" onClick={() => this.removeItemIconClick(id)}/>
                    </Col>
                );
                break;
            default:
                break;
        }

        return renderedItem;
    }
    
    showModal() {
        console.log('click create modal button');
        this.setState({
            modalVisible: true,
        });
    }

    openCategoryDropdown() {
        console.log('click create modal button');
        this.setState({
            categoryDropdownVisible: true
        })
    }
    
    closeCategoryDropdown() {
        this.setState({
            categoryDropdownVisible: true
        })
    }

    categoryDropdownChange(e: any) {
        console.log(e);
        this.setState({
            categoryDropdownVisible: e
        })
    }

    selectCategory(e: any) {
        console.log('select category', e);
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

    saveTask(e: any) {
        const { createTask, updateTask } = this.props;
        const { setFieldsValue } = this.props.form;

        e.preventDefault();
        this.props.form.validateFields((err: any, values: any) => {
            if (!err) {
                console.log('Received values of form: ', values);

                var formdata = new FormData();

                if(this.props.task) {
                    formdata.append('id', this.props.task._id);
                    formdata.append('categories', values.task_category);
                    formdata.append('title', values.title);
                    formdata.append('sub_title', values.sub_title);
                    formdata.append('additionalFormItems', JSON.stringify(this.state.additionalItems));
                    formdata.append('additionalButtons', JSON.stringify(this.state.additionalButtons));
                    this.state.additionalItems.forEach((item: any, index: number) => {
                        if(item.type == 'file') {
                            formdata.append('file_' + index, item.items);
                        }
                    });
                    // var data1 = {
                    //     id: this.props.task._id,
                    //     categories: values.task_category,
                    //     title: values.title,
                    //     sub_title: values.sub_title,
                    //     additionalFormItems: this.state.additionalItems,
                    //     additionalButtons: this.state.additionalButtons
                    // }
                    updateTask(formdata);
                } else {
                    formdata.append('categories', values.task_category);
                    formdata.append('title', values.title);
                    formdata.append('sub_title', values.sub_title);
                    formdata.append('additionalFormItems', JSON.stringify(this.state.additionalItems));
                    formdata.append('additionalButtons', JSON.stringify(this.state.additionalButtons));
                    this.state.additionalItems.forEach((item: any, index: number) => {
                        if(item.type == 'file') {
                            formdata.append('file_' + index, item.items);
                        }
                    });
                    createTask(formdata);
                }
                
                this.setState({
                    additionalButtons: Array(),
                    additionalItems: Array()
                });

                setFieldsValue({
                    task_category: Array(),
                    title: '',
                    sub_title: ''
                });
            }
        });
    }

    render() {

        const { onClose, categories } = this.props;
        const { getFieldDecorator, getFieldsError, isFieldTouched, getFieldError } = this.props.form;

        const addButtonMenu = (
            <Menu 
                className="add-button-menu-for-new-task"
                onClick={(e) => this.clickAddButtonMenuItem(e)}
                >
                <Menu.Item key="0">
                    <span>Skip</span>
                </Menu.Item>
                <Menu.Item key="1">
                    <span>I don't know</span>
                </Menu.Item>
                <Menu.Item key="2">
                    <span>I don't have it</span>
                </Menu.Item>
                <Menu.Item key="3" disabled>
                    <Input className="add-custom-button-text" placeholder="Add Custom" value={this.state.newButtonName} onChange={ev => this.updateButtonName(ev)}/>
                    <Button className="add-custom-button-btn" onClick={this.addCustomButton.bind(this)}>Add</Button>
                </Menu.Item>
            </Menu>
        );

        const task_categoryError = isFieldTouched('task_category') && getFieldError('task_category');
        const titleError = isFieldTouched('title') && getFieldError('title');
        const sub_titleError = isFieldTouched('sub_title') && getFieldError('sub_title');

        return (
            <div>
                <Form layout="vertical" hideRequiredMark onSubmit={(e) => this.saveTask(e)}>
                    <Header className="create-case-header">
                        <div className="drawer-header-content">
                            Create New Task
                        </div>
                        <Icon type="close" className="drawer-close-icon" onClick={onClose}/>
                    </Header>
                    <div className="drawer-content-wrapper">
                        <Row>
                            <Col span={24}>
                                <Form.Item style={{width: 300}} validateStatus={task_categoryError ? 'error' : ''} help={task_categoryError || ''}>
                                    {getFieldDecorator('task_category', {
                                        rules: [{ required: true, message: 'Please select task' }],
                                    })(
                                        <Select 
                                            placeholder="Select task category" 
                                            size="large"
                                            mode="multiple"
                                            className="select-task-category"
                                            showSearch={false}
                                            showArrow={true}
                                            open={this.state.categoryDropdownVisible}
                                            onDropdownVisibleChange={e => this.categoryDropdownChange(e)}
                                            // dropdownRender={menu => (
                                            //     <div>
                                            //         {menu}
                                            //         <Divider style={{ margin: '4px 0' }} />
                                            //         <div style={{ padding: '8px', cursor: 'pointer' }} onClick={this.openCategoryDropdown.bind(this)}>
                                            //             <Input className="add-custom-task-text" placeholder="Add New Category" value={this.state.newTaskCategoryName} onChange={ev => this.updateTaskCategoryName(ev)}/>
                                            //             <Button className="add-custom-task-btn" onClick={this.addNewCategory.bind(this)}>Add</Button>
                                            //         </div>
                                            //     </div>
                                            // )}
                                            >
                                            {
                                                categories.map((item: any, index: number) => {
                                                    return (
                                                        <Option value={item._id} key={index}>{item.name}</Option>
                                                    )
                                                })
                                            }
                                            <Option key="add_new_category" disabled className="add-new-category-btn-select">
                                                <div onClick={this.showModal.bind(this)} className="add-new-category-btn">
                                                    + Add New Category
                                                </div>
                                            </Option>
                                        </Select>
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row style={{padding: '25px', border: '1px solid #d4d4d4'}}>
                            <Col span={24}>
                                <Form.Item style={{marginBottom: '0px'}} validateStatus={titleError ? 'error' : ''} help={titleError || ''}>
                                    {
                                        getFieldDecorator('title', {
                                            rules: [{ required: true, message: 'Please enter title' }],
                                        })(<Input size="large" placeholder="Enter Title" />)
                                    }
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item validateStatus={sub_titleError ? 'error' : ''} help={sub_titleError || ''}>
                                    {
                                        getFieldDecorator('sub_title', {
                                            rules: [{ required: true, message: 'Please enter sub title' }],
                                        })(<Input size="large" placeholder="Enter Sub Title" />)
                                    }
                                </Form.Item>
                            </Col>
                            {
                                this.state.additionalItems.map((item:any, index:number) => {
                                    return this.renderAdditionalItem(item, index)
                                })
                            }
                            <Col span={24} className="buttons-section">
                                <div style={{width: 'fit-content', marginLeft: 'auto'}}>
                                    <Dropdown 
                                        overlay={addButtonMenu} 
                                        onVisibleChange={e => this.handleAddButtonMenuVisibleChange(e)}
                                        visible={this.state.addButtonMenuVisible}
                                        trigger={['click']}
                                        >
                                        <Button size="large" className="add-button-button">
                                            Button
                                            <Icon type="plus-circle" theme="filled" className="add-button-btn"/>
                                        </Button>
                                    </Dropdown>
                                    {
                                        this.state.additionalButtons.map((item: any, index: number) => {
                                            return (
                                                <Button size="large" className="additional-button" key={index}>
                                                    {item}
                                                    <Icon type="minus-circle" theme="filled" className="remove-button-btn" onClick={() => this.removeAdditionalButton(index)}/>
                                                </Button>
                                            )
                                        })
                                    }
                                    <Button size="large" type="primary" style={{backgroundColor: '#2dbdea', marginLeft: '15px'}} className="done-button">
                                        Done
                                    </Button>
                                </div>
                                <Dropdown
                                    overlay={this.state.addItemMenu}
                                    onVisibleChange={e => this.handleAddItemMenuVisibleChange(e)}
                                    visible={this.state.addItemMenuVisible}
                                    trigger={['click']}
                                >
                                    <Icon type="plus-circle" theme="filled" className="add-item-btn" onClick={this.addItemIconClick.bind(this)}/>
                                </Dropdown>
                            </Col>
                        </Row>
                        <div style={{paddingTop: '20px'}}>
                            <Button size="large" className="create-task-btn" type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>Save</Button>
                        </div>
                    </div>
                </Form>

                <CreateNewCategoryModal 
                    visible={this.state.modalVisible}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}>
                </CreateNewCategoryModal>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        createTask: bindActionCreators(createTask, dispatch),
        updateTask: bindActionCreators(updateTask, dispatch)
    };
};

const mapStateToProps = (state: any) => {
    return {
        categories: state.taskManager.categories,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Form.create({ name: 'create-new-task' })(CreateNewTask));