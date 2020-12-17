import React from 'react';
import { Steps, Button, message, Layout, Row, Card, Divider, Col, Input, Avatar, Progress, Icon, Badge, Drawer, Form, DatePicker, Select, List, Dropdown, Menu, Modal, Collapse, Upload, Radio, Checkbox } from 'antd';
import Sider from 'antd/lib/layout/Sider';
import GoogleLogin from 'react-google-login';
import Grid from 'antd/lib/card/Grid';
import { Link } from 'react-router-dom';
import CreateNewCase from './create-new-task';
import CreateNewCategoryModal from './create-new-category.modal';
import RadioGroup from 'antd/lib/radio/group';
import { DragDropList, arrayMove } from '../../../components/ReactDragDrop';
const styles = require('./task-manager.scss');

const Step = Steps.Step;

const { Content, Header, Footer } = Layout;
const confirm = Modal.confirm;

const questionData = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
];

class TaskManager extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            currentCaseType: 0,
            searchText: '',
            showCreateCasePanel: false,
            modalVisible: false,
            selectedTask: null,
            categories: {}
        };

        this.onRadioGroupChange = this.onRadioGroupChange.bind(this);
    }

    componentWillMount() {
        const { fetchCategories, fetchTasks } = this.props;

        fetchCategories();
        fetchTasks();
    }

    componentDidMount() {
        this.setState({
            categories: this.props.categories
        });
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
            selectedTask: null
        });
    }
    
    onClose() {
        this.setState({
            showCreateCasePanel: false,
        });
    }
    
    onCopyTask(item: any) {

    }

    onCopyTaskToOtherCategory(event: any, item: any) {
        event.domEvent.stopPropagation();
        this.setState({
            showCreateCasePanel: true,
            selectedTask: item,
            copyTask: true
        })
    }
    
    onEditItem(event: any, item: any) {
        event.domEvent.stopPropagation();
        this.setState({
            showCreateCasePanel: true,
            selectedTask: item
        })
    }

    onDeleteItem(event: any, item: any) {
        event.domEvent.stopPropagation();
        const { deleteTask } = this.props;

        confirm({
            title: 'Are you sure delete this task?',
            content: '',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                deleteTask(item);
                console.log('OK');
            },
            onCancel() {
                console.log('Cancel');
            },
        });
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
                    </Col>
                );
                break;
            case 'file':
                let filepath = "http://localhost:8765/" + item.items;
                let ori_filename = item.items.split(/_(.+)/)[1];
                renderedItem = (
                    <Col span={24} className="additional-item-row" key={id}>
                        <a href={filepath} target="_blank">
                            {ori_filename}
                        </a>
                    </Col>
                );
                break;
            default:
                break;
        }

        return renderedItem;
    }
    
    render() {
        // const { current, venue } = this.state;
        const { options, categories, tasks } = this.props;
        const { initLoading, loading, list } = this.state;

        const Panel = Collapse.Panel;
        
        const text = (
            <div className="client-task-detail-content">
                <div className="task-section">
                    <p>This is task description</p>
                    <div className="client-task-items-wrapper">
                      
                    </div>
                    <div className="client-task-buttons-wrapper">
                        <Button size="large">
                            Button
                        </Button>
                        <Button size="large" type="primary" style={{backgroundColor: 'blue', marginLeft: '15px'}}>Done</Button>
                    </div>
                </div>
            </div>
        );

        const genCollapsHeader = (item: any) => (
            <div className="list-item">
                <Icon
                    type="bars"
                    onClick={event => {
                        // If you don't want click extra trigger collapse, you can prevent this:
                        event.stopPropagation();

                    }}
                />
                <span>{item.title}</span>
                <Dropdown overlay={() => {
                        return (
                            <Menu className="task-manager-dropdown-menu">
                                {/* <Menu.Item key="0" onClick={() => this.onCopyTask(item)}>
                                    <span>Copy task</span>
                                </Menu.Item> */}
                                <Menu.Item key="1" onClick={(event) => this.onCopyTaskToOtherCategory(event, item)}>
                                    <span>Copy task to other category</span>
                                </Menu.Item>
                                <Menu.Item key="2" onClick={(event) => this.onEditItem(event, item)}>
                                    <span>Edit</span>
                                </Menu.Item>
                                <Menu.Item key="3" className="delete-menu-item" onClick={(event) => this.onDeleteItem(event, item)}>
                                    <span>Delete</span>
                                </Menu.Item>
                            </Menu>
                        )
                    }} trigger={['click']}>
                    <Icon
                        className="more-btn"
                        type="more"
                        onClick={event => {
                            // If you don't want click extra trigger collapse, you can prevent this:
                            event.stopPropagation();

                        }}
                    />
                </Dropdown>
            </div>
        );

        return (
            <div className="task-manager-page">
                <div className="content">
                    <Header className="content-header">
                        <div className="header-content-wrapper">
                            <div className="header-left-menu-wrapper">
                                <div className="case-items-wrapper">
                                    <Input size="large" placeholder="Search" className="card-search-input"/>
                                </div>
                            </div>
                            <div className="header-right-btn-wrapper">
                                <Button type="primary" size="large"  onClick={this.showModal.bind(this)}>Category Manager</Button>
                                <Button type="primary" size="large" onClick={this.showDrawer.bind(this)}>Create New Task</Button>
                            </div>
                        </div>
                    </Header>
                    <div className="task-manager-content">
                    {
                        categories.map((item: any, index: any) => {
                            return (
                                <div key={index}>
                                    <Row style={{paddingBottom: '10px'}}>
                                        <Col span={24}>
                                            <span className="drawer-item-title">{item.name}</span>
                                        </Col>
                                    </Row>
                                    <Row style={{marginBottom: '20px'}}>
                                        <Col span={24}>
                                            <Collapse bordered={false} defaultActiveKey={[]}>
                                            {/* <DragDropList
                                                values={item.tasks}
                                                onChange={({ oldIndex, newIndex }: any) =>
                                                    item.tasks =  arrayMove(item.tasks, oldIndex, newIndex)
                                                }
                                                renderList={({ children, props, isDragged }: any) => (
                                                    <ul
                                                    {...props}
                                                    style={{ padding: 0, cursor: isDragged ? 'grabbing' : undefined }}
                                                    >
                                                    {children}
                                                    </ul>
                                                )}
                                                renderItem={({ value, props, isDragged, isSelected }: any) => (
                                                    <li
                                                    {...props}
                                                    style={{
                                                        ...props.style,
                                                        padding: '1.5em',
                                                        margin: '0.5em 0em',
                                                        listStyleType: 'none',
                                                        cursor: isDragged ? 'grabbing' : 'grab',
                                                        border: '2px solid #CCC',
                                                        boxShadow: '3px 3px #AAA',
                                                        color: '#333',
                                                        borderRadius: '5px',
                                                        fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
                                                        backgroundColor: isDragged || isSelected ? '#EEE' : '#FFF'
                                                    }}
                                                    >
                                                        <Panel header={genCollapsHeader(value)} key="key" showArrow={false}>
                                                            <span>{value.sub_title}</span>
                                                            {
                                                                value.additional_form_items.map((item:any, index:number) => {
                                                                    return this.renderAdditionalItem(item, index)
                                                                })
                                                            }
                                                            <Col span={24} className="buttons-section">
                                                                <div style={{width: 'fit-content', marginLeft: 'auto'}}>
                                                                    {
                                                                        value.additional_buttons.map((item: any, index: number) => {
                                                                            return (
                                                                                <Button size="large" className="additional-button" key={index}>
                                                                                    {item}
                                                                                </Button>
                                                                            )
                                                                        })
                                                                    }
                                                                    <Button size="large" type="primary" style={{backgroundColor: '#2dbdea', marginLeft: '15px'}} className="done-button">
                                                                        Done
                                                                    </Button>
                                                                </div>
                                                            </Col>
                                                        </Panel>
                                                    </li>
                                                )}
                                                /> */}
                                            {
                                                item.tasks && item.tasks.length && item.tasks.map((item: any, index: number) => {
                                                    return (
                                                        <Panel header={genCollapsHeader(item)} key={index.toString()} showArrow={false}>
                                                            <span>{item.sub_title}</span>
                                                            {
                                                                item.additional_form_items.map((item:any, index:number) => {
                                                                    return this.renderAdditionalItem(item, index)
                                                                })
                                                            }
                                                            <Col span={24} className="buttons-section">
                                                                <div style={{width: 'fit-content', marginLeft: 'auto'}}>
                                                                    {
                                                                        item.additional_buttons.map((item: any, index: number) => {
                                                                            return (
                                                                                <Button size="large" className="additional-button" key={index}>
                                                                                    {item}
                                                                                </Button>
                                                                            )
                                                                        })
                                                                    }
                                                                    <Button size="large" type="primary" style={{backgroundColor: '#2dbdea', marginLeft: '15px'}} className="done-button">
                                                                        Done
                                                                    </Button>
                                                                </div>
                                                            </Col>
                                                        </Panel>
                                                    )
                                                })
                                            }
                                            </Collapse>
                                        </Col>
                                    </Row>
                                </div>
                            )
                        })
                    }
                    </div>
                </div>
                {
                    this.state.showCreateCasePanel ? (
                        <Drawer
                            width={'100%'}
                            closable={false}
                            // onClose={this.onClose.bind(this)}
                            visible={true}
                            className="create-task-drawer"
                            >
                            <div>
                                <CreateNewCase onClose={this.onClose.bind(this)} task={this.state.selectedTask}></CreateNewCase>
                            </div>
                        </Drawer>
                    ) : ''
                }
                
                <CreateNewCategoryModal 
                    visible={this.state.modalVisible}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}>
                </CreateNewCategoryModal>
            </div>
        );
    }
}
export default TaskManager;