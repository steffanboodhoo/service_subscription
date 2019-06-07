import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as subscription_actions from '../ducks/Subscription/Actions';
import * as customer_actions from '../ducks/Customer/Actions';
import * as service_actions from '../ducks/Service/Actions';
import { status, names } from '../ducks/RequestStatus/Actions';

import CustomerSearch from './CustomerSearch';
import CustomerDetails from '../_details/CustomerDetails';
import SubscriptionAdd from '../_subscription/SubscriptionAdd';
import SubscriptionManage from '../_subscription/SubscriptionManage'

import Loading from '../common/Loading';
import Alert from '../common/Alert';
import DefaultTextView from '../common/DefaultTextView';

class Home extends Component {

    render() {
        return (<div className=''>
            <div className='row card-panel hoverable center-align center-content'>
                <CustomerSearch handle_customer_search={this.handle_customer_search.bind(this)} />
            </div>
            <div className='main-container'>
                {this.load_view()}
            </div>
            <Loading ref='loading_modal' />
            <Alert ref='alert_modal_success' type='alert-success' header='Success' message={this.props.request_status.message} />
        </div>)
    }
    componentDidMount() {
        let el = document.querySelectorAll(".tabs");
        M.Tabs.init(el, {});
        this.props.service_actions.get_services();
        // this.props.customer_actions.get_customer({ email: 'boodhoo100@gmail.com' })
        // this.props.subscription_actions.get_subscriptions(1);
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.customer.customer_id != nextProps.customer.customer_id) {
            this.props.subscription_actions.get_subscriptions(nextProps.customer.customer_id);
        }
        if (this.props.request_status.status != nextProps.request_status.status) {
            if (nextProps.request_status.status == status.PENDING)
                this.refs.loading_modal.display()
            else
                this.refs.loading_modal.close()
        }
    }

    handle_customer_search(params) {
        this.props.customer_actions.get_customer(params);
    }

    load_view() {
        if (this.props.customer.customer_id != '') {
            return (
                <div>
                    <div className='row'>
                        <div className='col m2 s12 card-panel  column-container'>
                            <CustomerDetails customer={this.props.customer} />
                        </div>
                        <div className='col m5 s12  hoverable column-container'>
                            <SubscriptionAdd services={this.props.service} subscription={this.props.subscription} customer={this.props.customer} />
                        </div>
                        <div className='col m5 s12 column-container'>
                            <SubscriptionManage services={this.props.service} subscription={this.props.subscription} customer={this.props.customer} />
                        </div>
                    </div>
                    {/* <div className='row' id='device_tabs'>
                        <div className='col s12' >
                            <ul className="tabs">
                                <li className="tab col s3"><a className="active" href="#tab1">Test 1</a></li>
                                <li className="tab col s3"><a href="#tab3">Test 2</a></li>
                                <li className="tab col s3"><a href="#tab2">Disabled Tab</a></li>
                            </ul>
                        </div>
                        <div id='tab1' className='col s12'>
                            <CustomerDetails customer={this.props.customer} />
                        </div>
                        <div id='tab2' className='col s12'>
                            <SubscriptionAdd services={this.props.service} subscription={this.props.subscription} customer={this.props.customer} />
                        </div>
                        <div id='tab3' className='col s12'>
                            <SubscriptionUpdate services={this.props.service} subscription={this.props.subscription} customer={this.props.customer} />
                        </div>
                    </div> */}
                </div>

            );
        }
        // else if (this.props.request_status.name == names.GET_CUSTOMER && this.props.request_status.status == status.PENDING)
        //     return (<Loading />);
        else
            return (<DefaultTextView />)
    }
}
const mapStateToProps = (state) => ({ subscription: state.Subscription, customer: state.Customer, service: state.Service, request_status: state.RequestStatus })
const mapActionsToProps = (dispatch) => ({ subscription_actions: bindActionCreators(subscription_actions, dispatch), customer_actions: bindActionCreators(customer_actions, dispatch), service_actions: bindActionCreators(service_actions, dispatch) })

export default connect(mapStateToProps, mapActionsToProps)(Home);