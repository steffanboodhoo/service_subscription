import {types} from './Actions';
let initial_state = {

}

export default (state = initial_state, action) => {
    switch(action.type){
        case(types.RECEIVE_SERVICES):{
            return action.payload.data;
        }
        default:
            return {...state};
    }
}