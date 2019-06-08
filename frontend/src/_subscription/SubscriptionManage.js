import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as subscription_actions from '../ducks/Subscription/Actions';
import SubscriptionList from './SubscriptionList';

class SubscriptionManage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<div>
            <h5>Manage Subscriptions</h5>
            <SubscriptionList subscriptions={this.props.subscription} services={this.props.services} handle_subscription_update={this.handle_subscription_update.bind(this)} handle_subscription_delete={this.handle_subscription_delete.bind(this)}/>
        </div>)
    }

    handle_subscription_update(service_id, new_status){
        const params = { service_id, new_status, customer_id:this.props.customer.customer_id}

        this.props.subscription_actions.update_subscription(params);
    }
    handle_subscription_delete(service_id){
        const params = { service_id, customer_id:this.props.customer.customer_id}
        this.props.subscription_actions.delete_subscription(params)
    }
}
const mapStateToProps = (state) => ({ request_status: state.RequestStatus, });
const mapActionsToProps = (dispatch) => ({ subscription_actions: bindActionCreators(subscription_actions, dispatch) })

export default connect(mapStateToProps, mapActionsToProps)(SubscriptionManage);