import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import Setting from './setting';


const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        // actions: bindActionCreators(venueActions, dispatch),
    };
};

const mapStateToProps = (state: any) => {
    return {
        // amenities: state.venue.amenities,
        // options: state.venue.options
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Setting);