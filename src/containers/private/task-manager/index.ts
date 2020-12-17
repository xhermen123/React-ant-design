import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import TaskManager from './task-manager';
import { fetchCategory, fetchTasks, deleteTask } from './taskManagerAction';


const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        fetchCategories: bindActionCreators(fetchCategory, dispatch),
        fetchTasks: bindActionCreators(fetchTasks, dispatch),
        deleteTask: bindActionCreators(deleteTask, dispatch)
    };
};

const mapStateToProps = (state: any) => {
    return {
        categories: state.taskManager.categories,
        tasks: state.taskManager.tasks
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskManager);