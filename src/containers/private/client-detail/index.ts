import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import ClientDetail from './client-detail';
import { fetchCaseDetail, updateCaseDetail, changeCaseTaskStatus } from './clientDetailAction';


const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        fetchCaseDetail: bindActionCreators(fetchCaseDetail, dispatch),
        updateCaseDetail: bindActionCreators(updateCaseDetail, dispatch),
        changeCaseTaskStatus: bindActionCreators(changeCaseTaskStatus, dispatch)
    };
};

const mapStateToProps = (state: any) => {
    return {
        data: state.caseDetail.case
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClientDetail);