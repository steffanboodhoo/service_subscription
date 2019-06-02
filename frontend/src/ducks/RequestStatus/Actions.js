const UPDATE = 'REQUESTSTATUS/UPDATE';

export const types = {UPDATE};
export const update = (status, name, message = null) => {
    return {
        type: UPDATE,
        payload: {status, name, message}
    }
}
export const reset = () => {
    return update(status.NONE, '')
}

//Request STATUSES
const NONE = 'REQUESTSTATUS/NONE';
const PENDING = 'REQUESTSTATUS/PENDING';
const SUCCESS = 'REQUESTSTATUS/SUCCESS';
const FAILURE = 'REQUESTSTATUS/FAILURE';
const ERROR = 'REQUESTSTATUS/ERROR';
export const status = { NONE, PENDING, SUCCESS, FAILURE, ERROR };

//REQUEST NAMES
const LOG_IN = 'REQUESTSTATUS/LOG_IN';
const LOGOUT = 'REQUESTSTATUS/LOGOUT';
const ADD_SUBSCRIPTION = 'REQUESTSTATUS/ADD_SUBSCRIPTION';
const UPDATE_SUBSCRIPTION = 'REQUESTSTATUS/UPDATE_SUBSCRIPTION';
const DELETE_SUBSCRIPTION = 'REQUESTSTATUS/DELETE_SUBSCRIPTION';
export const names = { LOG_IN, LOGOUT, ADD_SUBSCRIPTION, UPDATE_SUBSCRIPTION, DELETE_SUBSCRIPTION };