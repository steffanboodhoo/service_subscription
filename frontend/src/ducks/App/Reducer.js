import { types } from './Actions'
import Cookies from 'js-cookie';

let initial_state = (() => {
    let cookie_state = Cookies.getJSON('app');
    console.log(cookie_state);
    let default_state = {
        logged_in: false,
        agent_email: ''
    }
    return cookie_state != undefined ? cookie_state : default_state;
})()

export default (state = initial_state, action) => {
    switch (action.type) {
        case (types.LOG_IN): {
            Cookies.set('app', action.payload.app_state)
            return { ...action.payload.app_state };
        }
        case (types.LOGOUT): {
            Cookies.remove('app')
            return { logged_in: false, agent_email: '' }
        }
        default:
            return {...state}
    }
}