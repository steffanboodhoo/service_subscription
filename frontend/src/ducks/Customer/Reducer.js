import { types } from './Actions';
const initial_state = {
    selected: {
        customer_id: '',
        first_name: '',
        last_name: '',
        email: '',
        contact_number: ''
    },
    list: []
}

export default (state = initial_state, action) => {
    switch (action.type) {
        case (types.SET_CUSTOMER): {
            console.log(action)
            return { ...state,
                selected:action.payload.customer};
        }
        case(types.RECEIVE_MULTIPLE_CUSTOMERS):{
            return {...state,
                list: state.list.concat(action.payload.customers),
            }
        }
        default:
            return { ...state }
    }
}