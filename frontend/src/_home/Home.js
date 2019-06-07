import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as subscription_actions from '../ducks/Subscription/Actions';
import * as customer_actions from '../ducks/Customer/Actions';
import * as service_actions from '../ducks/Service/Actions';
import { status, names } from '../ducks/RequestStatus/Actions';

import CustomerSearch from './CustomerSearch';
import CustomerDetails from '../_details/CustomerDetails';
import SubscriptionManage from '../_subscription/subscription_mgt/SubscriptionManage';
import SubscriptionUpdate from '../_subscription/subscription_update/SubscriptionUpdate'

import Loading from '../common/Loading';
import DefaultTextView from '../common/DefaultTextView';

class Home extends Component {

    render() {
        return (<div>
            <div className='row'>
                <CustomerSearch handle_customer_search={this.handle_customer_search.bind(this)} />
            </div>
            <div>
                {this.load_view()}
            </div>

        </div>)
    }
    componentDidMount() {
        this.props.service_actions.get_services();
        // this.props.customer_actions.get_customer({ email: 'boodhoo100@gmail.com' })
        // this.props.subscription_actions.get_subscriptions(1);
    }
    componentWillReceiveProps(nextProps) {
        console.log(this.props.customer)
        console.log(nextProps.customer)
        if(this.props.customer.customer_id != nextProps.customer.customer_id){
            this.props.subscription_actions.get_subscriptions(nextProps.customer.customer_id);
        }
    }

    handle_customer_search(params) {
        this.props.customer_actions.get_customer(params);
    }

    load_view() {
        if (this.props.customer.customer_id != '') {
            return (<div className='row'>
                <div className='col m2'>
                    <CustomerDetails customer={this.props.customer} />
                </div>
                <div className='col m5'>
                    <SubscriptionManage services={this.props.service} subscription={this.props.subscription} customer={this.props.customer} />
                </div>
                <div className='col m5'>
                    <SubscriptionUpdate customer={this.props.customer} subscription={this.props.subscription}/>
                </div>
            </div>);
        }
        else if (this.props.request_status.name == names.GET_CUSTOMER && this.props.request_status.status == status.PENDING)
            return (<Loading />);
        else
            return (<DefaultTextView />)
    }
}
const mapStateToProps = (state) => ({ subscription: state.Subscription, customer: state.Customer, service: state.Service, request_status: state.RequestStatus })
const mapActionsToProps = (dispatch) => ({ subscription_actions: bindActionCreators(subscription_actions, dispatch), customer_actions: bindActionCreators(customer_actions, dispatch), service_actions: bindActionCreators(service_actions, dispatch) })

export default connect(mapStateToProps, mapActionsToProps)(Home);