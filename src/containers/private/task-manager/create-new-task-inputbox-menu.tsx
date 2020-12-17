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

interface InputboxMenuProps {
    onDone: (type: string, data: any) => void;
}

class CreateNewTaskInputboxMenu extends React.Component<InputboxMenuProps & any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
           name: null
        };

        this.updateInputboxName = this.updateInputboxName.bind(this);
    }
    
    componentDidMount() {
        
    }

    updateInputboxName(e: any) {
        this.setState({
            name: e.target.value
        })
    }

    done() {
        let data = {
            type: 'inputbox',
            items: [this.state.name]
        }

        this.props.onDone('inputbox', data);
    }

    render() {

        
        return (
            <Menu 
                className="add-item-menu-for-new-task"
                onClick={e => {}}
                >
                <Menu.Item key="0">
                    <Input className="inputbox-input-item" placeholder="Enter input box name" value={this.state.name} onChange={(e) => this.updateInputboxName(e)}/>
                </Menu.Item>
                <Menu.Item key="1">
                    <div className="checkbox-menu-add-more-wrapper">
                        <Button className="checkbox-menu-done" onClick={this.done.bind(this)}>Done</Button>
                    </div>
                </Menu.Item>
            </Menu>
        );
    }
}

export default CreateNewTaskInputboxMenu;