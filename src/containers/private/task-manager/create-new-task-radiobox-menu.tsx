import React from 'react';
import { Steps, Button, message, Layout, Row, Card, Divider, Col, Input, Avatar, Progress, Icon, Badge, Drawer, Form, DatePicker, Select, List, Checkbox, Dropdown, Menu, Radio } from 'antd';
import Sider from 'antd/lib/layout/Sider';
import GoogleLogin from 'react-google-login';
import Grid from 'antd/lib/card/Grid';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const styles = require('./task-manager.scss');

const Step = Steps.Step;
const axios = require('axios');
const { Content, Header, Footer } = Layout;

interface RadioboxMenuState {
    radioboxArray: Object[];
}

interface RadioboxMenuProps {
    onDone: (type: string, data: any) => void;
}

class CreateNewTaskRadioboxMenu extends React.Component<RadioboxMenuProps & any, RadioboxMenuState & any> {

    constructor(props: any) {
        super(props);
        this.state = {
            radioboxArray : [
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
        this.updateRadioboxValue = this.updateRadioboxValue.bind(this);
    }
    
    componentDidMount() {
        
    }

    updateInputValue(e: any, index: number) {
        let radioboxArray = this.state.radioboxArray;

        radioboxArray[index].name = e.target.value;

        this.setState({
            radioboxArray: radioboxArray
        });

        console.log(this.state.radioboxArray);
    }

    updateRadioboxValue(e: any, index: number) {
        let radioboxArray = this.state.radioboxArray;

        radioboxArray[index].value = !radioboxArray[index].value;

        this.setState({
            radioboxArray: radioboxArray
        });

        console.log(this.state.radioboxArray);
    }

    addRaioboxInRadioboxMenu() {
        let radioboxArray = this.state.radioboxArray;

        radioboxArray.push({
            value: false,
            name: null
        })

        this.setState({
            radioboxArray: radioboxArray
        })
    }

    done() {
        let data = {
            type: 'radiobox',
            items: Array()
        };

        this.state.radioboxArray.map((item: any, index: number) => {
            if(item.name) {
                data.items.push(item.name);
            }
        })

        this.props.onDone('radiobox', data);
    }

    render() {
        return (
            <Menu 
                className="add-item-menu-for-new-task"
                onClick={e => {}}
                >
                {
                    this.state.radioboxArray.map((item: any, index: number) => {
                        return (
                            <Menu.Item key={index}>
                                <Radio className="radiobox-item" value={item.value} onClick={(e) => this.updateRadioboxValue(e, index)}></Radio>
                                <Input className="radiobox-input-item" value={item.name} placeholder="Basic usage" onChange={(e) => this.updateInputValue(e, index)}/>
                            </Menu.Item>
                        )
                    })
                }
                <Menu.Item key="4">
                    <div className="radiobox-menu-add-more-wrapper">
                        <span className="radiobox-menu-add-more-list" onClick={this.addRaioboxInRadioboxMenu.bind(this)}>Add more list</span>
                        <Button className="radiobox-menu-done" onClick={this.done.bind(this)}>Done</Button>
                    </div>
                </Menu.Item>
            </Menu>
        );
    }
}

export default CreateNewTaskRadioboxMenu;