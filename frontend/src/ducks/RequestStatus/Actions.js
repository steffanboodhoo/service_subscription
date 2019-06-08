const UPDATE = 'REQUESTSTATUS/UPDATE';

export const types = {UPDATE};
export const update = (status, name, message = null) => {
    return {
        type: UPDATE,
        payload: {status, name, message}
    }
}
export const reset = () => {
    return update(status.NONE, names.NONE)
}



const NONE = 'REQUESTSTATUS/NONE';//Used both as status and name

//Request STATUSES
const PENDING = 'REQUESTSTATUS/PENDING';
const SUCCESS = 'REQUESTSTATUS/SUCCESS';
const FAILURE = 'REQUESTSTATUS/FAILURE';
const ERROR = 'REQUESTSTATUS/ERROR';
export const status = { NONE, PENDING, SUCCESS, FAILURE, ERROR };

//REQUEST NAMES
const REGISTER = 'REQUESTSTATUS/REGISTER';
const LOG_IN = 'REQUESTSTATUS/LOG_IN';
const LOGOUT = 'REQUESTSTATUS/LOGOUT';
const ADD_CUSTOMER = 'REQUESTSTATUS/ADD_CUSTOMER'
const GET_CUSTOMER = 'REQUESTSTATUS/GET_CUSTOMER';
const GET_CUSTOMERS = 'REQUESTSTATUS/GET_CUSTOMERS';
const ADD_SUBSCRIPTION = 'REQUESTSTATUS/ADD_SUBSCRIPTION';
const UPDATE_SUBSCRIPTION = 'REQUESTSTATUS/UPDATE_SUBSCRIPTION';
const DELETE_SUBSCRIPTION = 'REQUESTSTATUS/DELETE_SUBSCRIPTION';
export const names = { NONE, LOG_IN, LOGOUT, ADD_SUBSCRIPTION, UPDATE_SUBSCRIPTION, DELETE_SUBSCRIPTION, GET_CUSTOMER, ADD_CUSTOMER, GET_CUSTOMERS, REGISTER };