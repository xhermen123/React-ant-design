import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import Workstation from './dashboard';
import { createCase, fetchCases, fetchClientCases } from './dashboardAction';
import { withRouter } from 'react-router-dom';

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        createCase: bindActionCreators(createCase, dispatch),
        fetchCases: bindActionCreators(fetchCases, dispatch),
        fetchClientCases: bindActionCreators(fetchClientCases, dispatch)
    };
};

const mapStateToProps = (state: any) => {
    return {
        cases: state.workstation.cases
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Workstation));