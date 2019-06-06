import Axios from "axios";
import { names, status, update } from '../RequestStatus/Actions';

const RECEIVE_CUSTOMER = 'CUSTOMER/RECEIVE_CUSTOMER';

export const types = { RECEIVE_CUSTOMER };

export const get_customer = ({ email, contact_number }) => {
    let params = contact_number != undefined ? { contact_number } : { email };
    update(status.PENDING, names.GET_CUSTOMER);
    return dispatch => {
        Axios.get('http://localhost:5000/customer', {
            params: params
        }).then(resp => {
            if (resp.status == 200) {
                update(status.SUCCESS, names.GET_CUSTOMER);
                receive_customer(dispatch, resp.data);
            } else {
                update(status.FAILURE, names.GET_CUSTOMER);
            }

        })
    }
}

const receive_customer = (dispatch, customer) => {
    dispatch({
        type: RECEIVE_CUSTOMER,
        payload: { customer }
    })
}