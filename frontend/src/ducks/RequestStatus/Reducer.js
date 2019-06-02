import { status, types } from './Actions';

const initial_state = {
    name: '',
    status: status.NONE,
    message: ''
}

export default (state = initial_state, action) => {
    switch (action.type) {
        case (types.UPDATE): {
            return {
                name: action.payload.name,
                status: action.payload.status,
                message: action.payload.message
            };
        }
        default:
            return {...state};
    }
}