import {types} from './Actions';

const initial_state = []

export default (state = initial_state, action) => {
    switch(action.type){
    case(types.RECEIVE_SUBSCRIPTIONS):{
        return action.payload.subscriptions; 
    }
    default:
        return state;
    }
}