import Axios from "axios";

const RECEIVE_CUSTOMER = 'CUSTOMER/RECEIVE_CUSTOMER';

export const types = { RECEIVE_CUSTOMER };

export const get_customer = ({ email, contact_number }) => {
    let params = contact_number != undefined ? { contact_number } : { email };
    return dispatch => {
        Axios.get('http://localhost:5000/customer', {
            params: params
        }).then( resp => {
            receive_customer(dispatch, resp.data);
        })
    }
}

const receive_customer = (dispatch, customer) => {
    dispatch({
        type: RECEIVE_CUSTOMER,
        payload: {customer}
    })
}