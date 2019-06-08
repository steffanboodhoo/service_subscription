import Axios from "axios";
import { names, status, update } from '../RequestStatus/Actions';
// import {SERVER_URI} from '../../_app/App';

const RECEIVE_SUBSCRIPTIONS = 'SUBSCRIPTION/RECEIVE_SUBSCRIPTIONS';

export const types = { RECEIVE_SUBSCRIPTIONS };

export const get_subscriptions = (customer_id) => {
    return dispatch => {
        Axios.get('/subscription', {
            params: { customer_id }
        }).then(response => {
            let data = {}
            response.data.forEach(el => data[el.service_id] = el);
            recieve_subscriptions(dispatch, data);
        })
    }
}
const recieve_subscriptions = (dispatch, subscriptions) => {
    dispatch({
        type: RECEIVE_SUBSCRIPTIONS,
        payload: { subscriptions }
    })
}

export const add_subscription = ({ customer_id, service_id }) => {
    const params = { customer_id, service_id };
    return dispatch => {
        console.log(params)
        dispatch(update(status.PENDING, names.ADD_SUBSCRIPTION))
        Axios.post('/subscription', params, {}).then(response => {
            dispatch(update(status.SUCCESS, names.ADD_SUBSCRIPTION))
        }).catch(err => {
            dispatch(update(status.FAILURE, names.ADD_SUBSCRIPTION))
        })
    }
}

export const update_subscription = ({ service_id, new_status, customer_id }) => {
    let params = { status: new_status, service_id, customer_id };
    return dispatch => {
        dispatch(update(status.PENDING, names.UPDATE_SUBSCRIPTION))
        Axios.put('/subscription', params).then(response => {
            dispatch(update(status.SUCCESS, names.UPDATE_SUBSCRIPTION))
        }).catch(err => {
            dispatch(update(status.FAILURE, names.UPDATE_SUBSCRIPTION))
        })
    }
}

export const delete_subscription = ({ service_id, customer_id }) => {
    let params = { service_id, customer_id };
    return dispatch => {
        dispatch(update(status.PENDING, names.DELETE_SUBSCRIPTION))
        Axios.delete('/subscription', {
            data: params
        }).then(response => {
            dispatch(update(status.SUCCESS, names.DELETE_SUBSCRIPTION))
        }).catch(err => {
            dispatch(update(status.FAILURE, names.DELETE_SUBSCRIPTION))
        })
    }
}