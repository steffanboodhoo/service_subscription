import Axios from "axios";
import { update, names, status } from '../RequestStatus/Actions';


const RECEIVE_SUBSCRIPTIONS = 'SUBSCRIPTION/RECEIVE_SUBSCRIPTIONS';

export const types = { RECEIVE_SUBSCRIPTIONS };

export const get_subscriptions = (customer_id) => {
    update(status.PENDING, names.ADD_SUBSCRIPTION)
    return dispatch => {
        Axios.get('http://localhost:5000/subscription', {
            params: { customer_id }
        }).then(response => {
            if (response.status == 200) {
                update(status.SUCCESS, names.ADD_SUBSCRIPTION)
                recieve_subscriptions(dispatch, response.data)
            } else {
                update(status.FAILURE, names.ADD_SUBSCRIPTION)
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

export const add_subscription = (customer_id, service_id) => {
    const params = { customer_id, service_id };
    return dispatch => {
        Axios.post('http://localhost:5000/subscription', params, {}).then(response => {
            dispatch()
        })
    }
}

export const update_subscription = ({ service_id, status, customer_id }) => {
    let params = { service_id, status, customer_id };
    return dispatch => {
        update(status.PENDING, names.UPDATE_SUBSCRIPTION)
        Axios.put('http://localhost:5000/subscription', {
            params:params
        }).then( response => {
            if(response.status == 200){
                update(status.SUCCESS, names.UPDATE_SUBSCRIPTION)
            }else{
                update(status.FAILURE, names.UPDATE_SUBSCRIPTION)
            }
        })
    }
}