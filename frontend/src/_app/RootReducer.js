import { combineReducers } from 'redux';

import Subscription from '../ducks/Subscription/Reducer';
import Customer from '../ducks/Customer/Reducer';
import RequestStatus from '../ducks/RequestStatus/Reducer';

const RootReducer = combineReducers({
    Subscription,
    Customer,
    RequestStatus
})

export default RootReducer;