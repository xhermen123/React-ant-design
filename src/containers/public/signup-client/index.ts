import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import SignupClient from './signup';
import { clientSignup, getClientData } from './signupAction';
import { showSuccessAlert, showErrorAlert, closeAlert } from '../../../components/Alert/alertAction';


const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        clientSignup: bindActionCreators(clientSignup, dispatch),
        getClientData: bindActionCreators(getClientData, dispatch)
    };
};

const mapStateToProps = (state: any) => {
    return {
        user: state.clientSignup.user,
        clientData: state.clientSignup.clientData
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupClient);