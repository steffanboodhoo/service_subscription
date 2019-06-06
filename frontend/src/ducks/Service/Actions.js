import Axios from "axios";

const RECEIVE_SERVICES = 'SERVICE/RECEIVE_SERVICES';
export const types = {RECEIVE_SERVICES};

export const get_services = () => {
    return dispatch => {
        Axios.get('http://localhost:5000/service').then( response => {
            let data = {}
            response.data.forEach( el => data[el.service_id] = el);

            dispatch({
                type: RECEIVE_SERVICES,
                payload:{data}
            })
        })
    }
}