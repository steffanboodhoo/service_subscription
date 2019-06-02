import { types } from './Actions';
const initial_state = {

}

export default (state = initial_state, action) => {
    switch (action.type) {
        case (types.RECEIVE_CUSTOMER):{
            return action.payload.customer;
        }
        default:
            return {...state}
    }
}