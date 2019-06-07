import Axios from "axios";
import { names, status, update } from '../RequestStatus/Actions';

const SET_CUSTOMER = 'CUSTOMER/SET_CUSTOMER';
const RECEIVE_MULTIPLE_CUSTOMERS = 'CUSTOMER/RECEIVE_MULTIPLE_CUSTOMERS';

export const types = { SET_CUSTOMER, RECEIVE_MULTIPLE_CUSTOMERS };

export const get_customer = ({ email, contact_number }) => {
    let params = contact_number != undefined ? { contact_number } : { email };
    return dispatch => {
        dispatch(update(status.PENDING, names.GET_CUSTOMER));
        Axios.get('http://localhost:5000/customer', {
            params: params
        }).then(resp => {
            if (resp.status == 200) {
                dispatch(update(status.NONE, names.GET_CUSTOMER));
                set_customer(dispatch, resp.data);
            } else if (resp.status == 409) {
                let message = ('data' in resp && 'message' in resp.data) ? resp.data.message : '';
                dispatch(update(status.FAILURE, names.GET_CUSTOMER, message));
            }

        })
    }
}
const set_customer = (dispatch, customer) => {
    dispatch({
        type: SET_CUSTOMER,
        payload: { customer }
    })
}

export const get_customers_by_name = (name_str) => {
    return dispatch => {
        dispatch(update(status.SUCCESS, names.GET_CUSTOMERS))
        Axios.get('http://localhost:5000/customers', {
            params: params
        }).then(resp => {
            console.log(resp)
            if (resp.status == 200) {
                if (resp.data.length == 0)// if empty set
                    dispatch(update(status.SUCCESS, names.GET_CUSTOMERS, 'no results'));
                else{
                    recieve_multiple_customers(dispatch, resp.data)
                    dispatch(update(status.NONE, names.GET_CUSTOMERS));
                }

            } else {// there can't be a conflict(409) here so must be some unexpected error
                dispatch(update(status.ERROR, names.GET_CUSTOMERS));
            }
        })
    }
}
const recieve_multiple_customers = (dispatch, customers) => {
    dispatch({
        type:RECEIVE_MULTIPLE_CUSTOMERS,
        payload: { customers }
    })
}


export const add_customer = ({ first_name, last_name, email, contact_number }) => {
    let params = { first_name, last_name, email, contact_number };
    return dispatch => {
        dispatch(update(status.SUCCESS, names.ADD_CUSTOMER))
        Axios.post('http://localhost:5000/customer', params, {}).then(resp => {
            if (resp.status == 200) {
                dispatch(update(status.SUCCESS, names.ADD_CUSTOMER, 'Customer successfully created'))
            } else if (resp.status == 409) {
                dispatch(update(status.FAILURE, names.ADD_CUSTOMER))
            } else { // some server error we don't know what happened
                dispatch(update(status.ERROR, names.ADD_CUSTOMER))
            }
        })
    }
}

