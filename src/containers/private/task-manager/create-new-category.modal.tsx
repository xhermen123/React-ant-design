import React from 'react';
import { Steps, Button, message, Layout, Row, Card, Divider, Col, Input, Avatar, Progress, Icon, Badge, Drawer, Form, DatePicker, Select, List, Dropdown, Menu, Modal } from 'antd';
import { Dispatch, bindActionCreators } from 'redux';
import { deleteCategory, createCategory } from './taskManagerAction';
import { connect } from 'react-redux';
const styles = require('./task-manager.scss');
const confirm = Modal.confirm;

class CreateNewCategoryModal extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            categoryName: '',
            modalVisible: false
        };

        this.updateCategoryName = this.updateCategoryName.bind(this);
        this.deleteCategory = this.deleteCategory.bind(this);
    }

    componentDidMount() {
        
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

    updateCategoryName(e: any) {
        this.setState({
            categoryName: e.target.value
        })
    }

    saveCategory() {
        const { createCategory } = this.props;

        createCategory(this.state.categoryName);

        this.setState({
            categoryName: ''
        })
    }

    deleteCategory(item: any) {
        const { deleteCategory } = this.props;
        
        confirm({
            title: 'Are you sure delete this task?',
            content: '',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                deleteCategory(item._id);
                console.log('OK');
            },
            onCancel() {
                console.log('Cancel');
            },
        });

    }

    render() {
        // const { current, venue } = this.state;
        const { onCancel, visible, onOk, categories } = this.props;
        const { initLoading, loading, list } = this.state;

        return (
            <Modal
                title="Category Manager"
                visible={visible}
                // onOk={this.handleOk}
                centered
                onCancel={onCancel}
                className="create-category-modal"
                footer={null}
                >
                <label className="create-category-name-label">Create New Category</label>
                <Input size="large" placeholder="Enter Category Name" className="create-category-input" value={this.state.categoryName} onChange={(e) => this.updateCategoryName(e)}/>
                <List
                    size="small"
                    // bordered
                    loading={initLoading}
                    itemLayout="horizontal"
                    // loadMore={loadMore}
                    dataSource={categories}
                    renderItem={(item: any) => (
                        <List.Item className="category-item">
                            <span>{item.name}</span>
                            <Icon type="delete" theme="filled" className="category-delete-icon" onClick={() => this.deleteCategory(item)}/>
                        </List.Item>
                    )}
                />
                <Button key="submit" size="large" type="primary" className="category-save-button" disabled={!this.state.categoryName} loading={loading} onClick={this.saveCategory.bind(this)}>
                    Save
                </Button>
            </Modal>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        createCategory: bindActionCreators(createCategory, dispatch),
        deleteCategory: bindActionCreators(deleteCategory, dispatch)
    };
};

const mapStateToProps = (state: any) => {
    return {
        categories: state.taskManager.categories,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewCategoryModal);