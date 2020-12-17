import AppAlert from './Alert';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { showSuccessAlert, showErrorAlert, closeAlert } from './alertAction';

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        showSuccessAlert: bindActionCreators(showSuccessAlert, dispatch),
        showErrorAlert: bindActionCreators(showErrorAlert, dispatch),
        closeAlert: bindActionCreators(closeAlert, dispatch)
    };
};

const mapStateToProps = (state: any) => {
    return {
        alert: state.alert
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppAlert);