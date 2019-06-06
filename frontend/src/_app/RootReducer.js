import { combineReducers } from 'redux';

import Subscription from '../ducks/Subscription/Reducer';
import Customer from '../ducks/Customer/Reducer';
import RequestStatus from '../ducks/RequestStatus/Reducer';
import Service from '../ducks/Service/Reducer';

const RootReducer = combineReducers({
    Subscription,
    Customer,
    RequestStatus,
    Service
})

export default RootReducer;