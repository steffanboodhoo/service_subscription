import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as subscription_actions from '../ducks/Subscription/Actions';
import * as customer_actions from '../ducks/Customer/Actions';
import CustomerSearch from './CustomerSearch';
class Home extends Component {

    render() {
        return (
            <CustomerSearch/>
            // <div>{this.props.subscription.map((el, i) => {
            //     return (<div key={i}>{el.service_id}</div>)
            // })}
            // {this.props.customer.first_name}
            // </div>
        )
    }
    componentDidMount() {
        this.props.subscription_actions.get_subscriptions(1);
        this.props.customer_actions.get_customer({ email: 'boodhoo100@gmail.com' })
    }
}
const mapStateToProps = (state) => ({ subscription: state.Subscription, customer: state.Customer })
const mapActionsToProps = (dispatch) => ({ subscription_actions: bindActionCreators(subscription_actions, dispatch), customer_actions: bindActionCreators(customer_actions, dispatch) })
export default connect(mapStateToProps, mapActionsToProps)(Home);