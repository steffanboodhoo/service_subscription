import { types } from './Actions';
const initial_state = {
    selected: {
        customer_id: '',
        first_name: '',
        last_name: '',
        email: '',
        contact_number: ''
    },
    list: [],
    load_more: true
}

export default (state = initial_state, action) => {
    switch (action.type) {
        case (types.SET_CUSTOMER): {
            console.log(action)
            return {
                ...state,
                selected: action.payload.customer
            };
        }
        case (types.SET_MULTIPLE_CUSTOMERS): {
            console.log(action)
            return {
                ...state,
                list: action.payload.customers,
            }
        }
        case (types.ADD_MULTIPLE_CUSTOMERS): {
            return {
                ...state,
                list: state.list.concat(action.payload.customers),
            }
        }
        case (types.STOP_LOADING): {
            return {
                ...state,
                load_more: false
            }
        }
        default:
            return { ...state }
    }
}