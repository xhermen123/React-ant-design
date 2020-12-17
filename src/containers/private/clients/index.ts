import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import Clients from './clients';
import { fetchClients } from './clientsAction';


const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        fetchClients: bindActionCreators(fetchClients, dispatch),
    };
};

const mapStateToProps = (state: any) => {
    return {
        clients: state.clients.clients
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Clients);