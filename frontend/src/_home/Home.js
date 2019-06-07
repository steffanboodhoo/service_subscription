import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as subscription_actions from '../ducks/Subscription/Actions';
import * as customer_actions from '../ducks/Customer/Actions';
import * as service_actions from '../ducks/Service/Actions';
import { status, names } from '../ducks/RequestStatus/Actions';

import CustomerSearch from '../_customer_search/CustomerSearch';
import CustomerSelect from '../_customer_search/CustomerSelect';

import SubscriptionAdd from '../_subscription/SubscriptionAdd';
import SubscriptionManage from '../_subscription/SubscriptionManage'

import CustomerDetails from '../_details/CustomerDetails';
import Loading from '../common/Loading';
import Alert from '../common/Alert';
import DefaultTextView from '../common/DefaultTextView';
import CustomerForm from '../common/CustomerForm';

class Home extends Component {

    render() {
        return (<div className=''>
            <div className='row card-panel hoverable center-align center-content'>
                <CustomerSearch handle_customer_id_search={this.handle_customer_id_search.bind(this)} handle_customer_name_search={this.handle_customer_name_search.bind(this)}/>
            </div>
            <div className='main-container'>
                {this.load_view()}
            </div>

            <CustomerSelect ref='select_customer_modal' customers={this.props.customer.list} load_more={this.props.customer.load_more} handle_load_more_customers={this.handle_load_more_customers.bind(this)} handle_select_customer={this.handle_select_customer.bind(this)}/>
            <CustomerForm ref='add_customer_modal' handle_add_customer={this.handle_add_customer.bind(this)}/>
            <Loading ref='loading_modal' />

            <Alert ref='success_modal' cid='success' type='alert-success' header='Success' message={this.props.request_status.message} />
            <Alert ref='failure_modal' cid='failure' type='alert-failure' header='Failure' message={this.props.request_status.message} />
            <Alert ref='empty_modal' cid='empty' type='alert-Empty' header='Empty' message={'No results that match your search :('} />
        </div>)
    }
    componentDidMount() {
        // let el = document.querySelectorAll(".tabs");
        // M.Tabs.init(el, {});
        this.props.service_actions.get_services();
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.customer.selected.customer_id != nextProps.customer.selected.customer_id) {
            this.props.subscription_actions.get_subscriptions(nextProps.customer.selected.customer_id);
        }
        //IF THE STATUS OF A REQUEST CHANGES e.g. a request is now *pending*, or the request has *succeeded* or *failed*
        if (this.props.request_status.status != nextProps.request_status.status) {
            if (nextProps.request_status.status == status.PENDING)
                this.refs.loading_modal.display()
            else
                this.refs.loading_modal.close()// even if the Loading Modal was not open close has no effect so this is fine

            //We want to show the request was successful
            if(nextProps.request_status.status == status.SUCCESS)
                this.refs.success_modal.display()
            
            if(nextProps.request_status.name == names.GET_CUSTOMERS && nextProps.request_status.status == status.NONE)
                this.refs.select_customer_modal.display()
        }
    }

    handle_customer_id_search(params) {
        this.props.customer_actions.get_customer(params);
    }
    handle_customer_name_search(name){
        this.props.customer_actions.get_customers_by_name({name});
    }
    handle_load_more_customers(name){
        const offset = this.props.customer.list.length;
        this.props.customer_actions.load_more_customers_by_name({name, offset})
    }
    handle_select_customer(customer){
        this.props.customer_actions.set_customer(customer);
        this.refs.select_customer_modal.close()
    }
    handle_add_customer(params){
        this.props.customer_actions.add_customer(params);
    }
    load_view() {
        if (this.props.customer.selected.customer_id != '') {
            return (
                <div>
                    <div className='row'>
                        <div className='col m2 s12 card-panel  column-container'>
                            <CustomerDetails customer={this.props.customer.selected} />
                        </div>
                        <div className='col m5 s12  hoverable column-container'>
                            <SubscriptionAdd customer={this.props.customer.selected} services={this.props.service} subscription={this.props.subscription}/>
                        </div>
                        <div className='col m5 s12 column-container'>
                            <SubscriptionManage customer={this.props.customer.selected} services={this.props.service} subscription={this.props.subscription}/>
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
            return (<DefaultTextView handle_click={ this.open_add_customer_form.bind(this) }/>)
    }
    open_add_customer_form(){
        this.refs.add_customer_modal.display()
    }
}
const mapStateToProps = (state) => ({ subscription: state.Subscription, customer: state.Customer, service: state.Service, request_status: state.RequestStatus })
const mapActionsToProps = (dispatch) => ({ subscription_actions: bindActionCreators(subscription_actions, dispatch), customer_actions: bindActionCreators(customer_actions, dispatch), service_actions: bindActionCreators(service_actions, dispatch) })

export default connect(mapStateToProps, mapActionsToProps)(Home);