import React from 'react';
import { Steps, Button, message, Layout, Row, Card, Divider, Col, Input, Avatar, Progress, Icon, Badge, Drawer, Form, DatePicker, Select, List, Checkbox, Dropdown, Menu } from 'antd';
import Sider from 'antd/lib/layout/Sider';
import GoogleLogin from 'react-google-login';
import Grid from 'antd/lib/card/Grid';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const styles = require('./task-manager.scss');

const Step = Steps.Step;
const axios = require('axios');
const { Content, Header, Footer } = Layout;

interface CheckboxMenuState {
    checkboxArray: Object[];
}

interface CheckboxMenuProps {
    onDone: (type: string, data: any) => void;
}

class CreateNewTaskCheckboxMenu extends React.Component<CheckboxMenuProps & any, CheckboxMenuState & any> {

    constructor(props: any) {
        super(props);
        this.state = {
            checkboxArray : [
                {
                    value: false,
                    name: null
                },
                {
                    value: false,
                    name: null
                },
                {
                    value: false,
                    name: null
                },
                {
                    value: false,
                    name: null
                }
            ]
        };

        this.updateInputValue = this.updateInputValue.bind(this);
        this.updateCheckboxValue = this.updateCheckboxValue.bind(this);
    }
    
    componentDidMount() {
        
    }

    updateInputValue(e: any, index: number) {
        let checkboxArray = this.state.checkboxArray;

        checkboxArray[index].name = e.target.value;

        this.setState({
            checkboxArray: checkboxArray
        });

        console.log(this.state.checkboxArray);
    }

    updateCheckboxValue(e: any, index: number) {
        let checkboxArray = this.state.checkboxArray;

        checkboxArray[index].value = !checkboxArray[index].value;

        this.setState({
            checkboxArray: checkboxArray
        });

        console.log(this.state.checkboxArray);
    }

    addCheckboxInCheckboxMenu() {
        let checkboxArray = this.state.checkboxArray;

        checkboxArray.push({
            value: false,
            name: null
        })

        this.setState({
            checkboxArray: checkboxArray
        })
    }

    done() {
        let data = {
            type: 'checkbox',
            items: Array()
        };

        this.state.checkboxArray.map((item: any, index: number) => {
            if(item.name) {
                data.items.push(item.name);
            }
        })

        this.props.onDone('checkbox', data);
    }

    render() {

        
        return (
            <Menu 
                className="add-item-menu-for-new-task"
                onClick={e => {}}
                >
                {
                    this.state.checkboxArray.map((item: any, index: number) => {
                        return (
                            <Menu.Item key={index}>
                                <Checkbox className="checkbox-item" value={item.value} onClick={(e) => this.updateCheckboxValue(e, index)}></Checkbox>
                                <Input className="checkbox-input-item" value={item.name} placeholder="Basic usage" onChange={(e) => this.updateInputValue(e, index)}/>
                            </Menu.Item>
                        )
                    })
                }
                <Menu.Item key="4">
                    <div className="checkbox-menu-add-more-wrapper">
                        <span className="checkbox-menu-add-more-list" onClick={this.addCheckboxInCheckboxMenu.bind(this)}>Add more list</span>
                        <Button className="checkbox-menu-done" onClick={this.done.bind(this)}>Done</Button>
                    </div>
                </Menu.Item>
            </Menu>
        );
    }
}

export default CreateNewTaskCheckboxMenu;