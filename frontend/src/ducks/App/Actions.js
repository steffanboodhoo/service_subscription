import Axios from "axios";
Axios.defaults.withCredentials = true;
import { update, names, status } from '../RequestStatus/Actions';

const LOG_IN = 'APP/LOG_IN';
const LOGOUT = 'APP/LOGOUT';

export const types = { LOG_IN, LOGOUT };

export const handle_log_in = ({ email, password }) => {
    const params = { email, password };
    return dispatch => {
        dispatch(update(status.PENDING, names.LOG_IN));
        console.log(params)
        Axios.post('http://localhost:5000/authenticate', params, {}).then(resp => {
            const app_state = { logged_in: true, agent_email: resp.data.email }
            dispatch(log_in(app_state))
            dispatch(update(status.NONE, names.LOG_IN));
        }).catch(err => {
            // console.log(err.response.data)
            if (err.response.status == 401) {
                dispatch(update(status.FAILURE, names.LOG_IN, err.response.data.message));
            } else {
                dispatch(update(status.ERROR, names.LOG_IN));
            }
        })
    }
}

const log_in = (app_state) => {
    return {
        type: LOG_IN,
        payload: { app_state }
    }
}

export const handle_logout = () => {
    return dispatch => {
        // dispatch(logout())
        Axios.post('http://localhost:5000/logout', {}).then(resp => {
            dispatch(logout())
        }).catch( err =>{
            dispatch(update(status.ERROR, names.LOGOUT))
        })
    }
}
const logout = () => {
    return { type: LOGOUT }
}


export const handle_register = ({ email, password }) => {
    const params = { email, password };
    return dispatch => {
        dispatch(update(status.PENDING, names.REGISTER))
        Axios.post('http://localhost:5000/register', params, {}).then(resp => {

        }).catch( err => {

        })
    }
}