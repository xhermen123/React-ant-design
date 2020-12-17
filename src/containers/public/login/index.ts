import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import Login from './login';
import { loginRequest } from './loginAction';


const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        login: bindActionCreators(loginRequest, dispatch),
    };
};

const mapStateToProps = (state: any) => {
    return {
        user: state.login.user
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);