import Axios from "axios";
import { names, status, update } from '../RequestStatus/Actions';

const SET_CUSTOMER = 'CUSTOMER/SET_CUSTOMER';
const SET_MULTIPLE_CUSTOMERS = 'CUSTOMER/SET_MULTIPLE_CUSTOMERS';
const ADD_MULTIPLE_CUSTOMERS = 'CUSTOMER/ADD_MULTIPLE_CUSTOMERS';
const STOP_LOADING = 'CUSTOMER/STOP_LOADING';

export const types = { SET_CUSTOMER, SET_MULTIPLE_CUSTOMERS, ADD_MULTIPLE_CUSTOMERS, STOP_LOADING };

export const get_customer = ({ email, contact_number }) => {
    let params = contact_number != undefined ? { contact_number } : { email };
    return dispatch => {
        dispatch(update(status.PENDING, names.GET_CUSTOMER));
        Axios.get('http://localhost:5000/customer', {
            params: params
        }).then(resp => {
            dispatch(update(status.NONE, names.GET_CUSTOMER));
            dispatch(set_customer(resp.data));
        }).catch(err => {
            if (err.response.status == 409) {
                let message = ('data' in resp && 'message' in resp.data) ? resp.data.message : '';
                dispatch(update(status.FAILURE, names.GET_CUSTOMER, message));
            }
        })
    }
}

export const set_customer = (customer) => {
    return {
        type: SET_CUSTOMER,
        payload: { customer }
    }
}


export const get_customers_by_name = ({ name }) => {
    console.log(name)
    return dispatch => {
        dispatch(update(status.PENDING, names.GET_CUSTOMERS))
        Axios.get('http://localhost:5000/customer/multiple', {
            params: { name }
        }).then(resp => {
            console.log(resp)
            if (resp.data.length == 0) {// if empty set
                dispatch(update(status.SUCCESS, names.GET_CUSTOMERS, 'no results'));
            } else {
                set_multiple_customers(dispatch, resp.data)
                dispatch(update(status.NONE, names.GET_CUSTOMERS));
            }
        }).catch(err => {
            dispatch(update(status.ERROR, names.GET_CUSTOMERS));
        })
    }
}
const set_multiple_customers = (dispatch, customers) => {
    dispatch({
        type: SET_MULTIPLE_CUSTOMERS,
        payload: { customers }
    })
}

export const load_more_customers_by_name = ({ name, offset }) => {
    const params = { name, offset };
    return dispatch => {
        Axios.get('http://localhost:5000/customer/multiple', {
            params: params
        }).then(resp => {
            if (resp.data.length == 0) { //no more to load
                console.log('stop loading')
                dispatch(stop_loading());
            } else {
                dispatch(add_multiple_customers(resp.data))
            }
        }).catch(err => {
            dispatch(update(status.ERROR, names.GET_CUSTOMERS));
        })
    }
}
const stop_loading = () => {
    return {
        type: STOP_LOADING,
        payload: null
    };
}
const add_multiple_customers = (customers) => {
    return {
        type: ADD_MULTIPLE_CUSTOMERS,
        payload: { customers }
    }
}


export const add_customer = ({ first_name, last_name, email, contact_number }) => {
    let params = { first_name, last_name, email, contact_number };
    return dispatch => {
        dispatch(update(status.SUCCESS, names.ADD_CUSTOMER))
        Axios.post('http://localhost:5000/customer', params, {}).then(resp => {
            dispatch(update(status.SUCCESS, names.ADD_CUSTOMER, 'Customer successfully created'))
        }).catch(err => {
            if (err.response.status == 409) {
                dispatch(update(status.FAILURE, names.ADD_CUSTOMER, err.response.message))
            } else { // some server error we don't know what happened
                dispatch(update(status.ERROR, names.ADD_CUSTOMER))
            }
        })
    }
}

