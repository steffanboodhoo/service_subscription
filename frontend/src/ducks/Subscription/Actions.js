import Axios from "axios";
import { update, names, status } from '../RequestStatus/Actions';


const RECEIVE_SUBSCRIPTIONS = 'SUBSCRIPTION/RECEIVE_SUBSCRIPTIONS';

export const types = { RECEIVE_SUBSCRIPTIONS };

export const get_subscriptions = (customer_id) => {
    return dispatch => {
        Axios.get('http://localhost:5000/subscription', {
            params: { customer_id }
        }).then(response => {
            if (response.status == 200) {
                let data = {}
                response.data.forEach(el => data[el.service_id] = el);
                recieve_subscriptions(dispatch, data);
            } 
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
        dispatch(update(status.PENDING, names.ADD_SUBSCRIPTION))
        Axios.post('http://localhost:5000/subscription', params, {}).then(response => {
            if(response.status==200){
                dispatch(update(status.SUCCESS, names.ADD_SUBSCRIPTION))
            }else{
                dispatch(update(status.FAILURE, names.ADD_SUBSCRIPTION))
            }
        })
    }
}

export const update_subscription = ({ service_id, status, customer_id }) => {
    let params = { service_id, status, customer_id };
    return dispatch => {
        dispatch(update(status.PENDING, names.UPDATE_SUBSCRIPTION))
        Axios.put('http://localhost:5000/subscription', {
            params: params
        }).then(response => {
            if (response.status == 200) {
                dispatch(update(status.SUCCESS, names.UPDATE_SUBSCRIPTION))
            } else {
                dispatch(update(status.FAILURE, names.UPDATE_SUBSCRIPTION))
            }
        })
    }
}

export const delete_subscription = ({ service_id, customer_id }) => {
    let params = { service_id, status, customer_id };
    return dispatch => {
        dispatch(update(status.PENDING, names.DELETE_SUBSCRIPTION))
        Axios.delete('http://localhost:5000/subscription', {
            params: params
        }).then(response => {
            if (response.status == 200) {
                update(status.SUCCESS, names.DELETE_SUBSCRIPTION)
            } else {
                update(status.FAILURE, names.DELETE_SUBSCRIPTION)
            }
        })
    }
}