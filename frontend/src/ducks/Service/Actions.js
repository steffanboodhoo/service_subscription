import Axios from "axios";
import {SERVER_URI} from '../../_app/App';
const RECEIVE_SERVICES = 'SERVICE/RECEIVE_SERVICES';
export const types = {RECEIVE_SERVICES};

export const get_services = () => {
    return dispatch => {
        Axios.get(SERVER_URI+'/service').then( response => {
            let data = {}
            response.data.forEach( el => data[el.service_id] = el);

            dispatch({
                type: RECEIVE_SERVICES,
                payload:{data}
            })
        })
    }
}