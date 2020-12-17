import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import Signup from './signup';
import { enterpriseSignup } from './signupAction';

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        enterpriseSignup: bindActionCreators(enterpriseSignup, dispatch),
    };
};

const mapStateToProps = (state: any) => {
    return {
        user: state.enterpriseSignup.user
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);