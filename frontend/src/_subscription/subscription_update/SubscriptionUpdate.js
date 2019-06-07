import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as subscription_actions from '../../ducks/Subscription/Actions';
import SubscriptionList from './SubscriptionList';
import Modal from '../../common/Modal';

class SubscriptionUpdate extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<div>
            <SubscriptionList subscriptions={this.props.subscription}/>
        </div>)
    }

    handle_subscription_update(service_id, status){
        const params = { service_id, status, customer_id:this.props.customer.customer_id}
        this.props.subscription_actions.update_subscription(params);
    }
}
const mapStateToProps = (state) => ({ request_status: state.RequestStatus, });
const mapActionsToProps = (dispatch) => ({ subscription_actions: bindActionCreators(subscription_actions, dispatch) })

export default connect(mapStateToProps, mapActionsToProps)(SubscriptionUpdate);