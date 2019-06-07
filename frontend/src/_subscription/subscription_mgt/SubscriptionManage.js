import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as subscription_actions from '../../ducks/Subscription/Actions';
import { filter } from 'minimatch';

class SubscriptionMange extends Component {
    constructor(props) {
        super(props);
        this.state = { selected_service_id: '' }
    }
    render() {
        return (<div>
            <div className='input-field col s12'>
                <select id='select_service' onChange={this.handle_on_select.bind(this)} defaultValue={'-1'}>
                    <option value='-1' disabled={true} >Choose your option</option>
                    {this.filter_list(this.props.services, this.props.subscription).map((el, i) => {
                        return (<option key={i} value={el.service_id} disabled={el.remove}>{el.name}</option>)
                    })}
                </select>
            </div>
            <div>
                {this.selected_service()}
            </div>
            <div>
                <a className="waves-effect waves-light btn" onClick={this.handle_add_service.bind(this)} disabled={this.state.selected_service_id==''}>Add Service</a>
            </div>
        </div>)
    }

    componentDidMount() {
        M.FormSelect.init(document.getElementById('select_service'))
    }

    componentDidUpdate(){
        M.FormSelect.init(document.getElementById('select_service'))
    }
    filter_list(services, subscriptions) {
        let local_list = Object.entries(services).map(([i, el]) => {
            el.remove = el.service_id in subscriptions;
            return el;
        });
        return local_list;
    }
    handle_on_select(ev) {
        this.setState({ selected_service_id: ev.target.value })
    }
    selected_service() {
        if (this.state.selected_service_id == '')
            return (<h4>Nothing Selected</h4>)
        else {
            const service = this.props.services[this.state.selected_service_id]
            return (<div>
                <h4>{service.name}</h4>
                <h6>{service.description}</h6>
            </div>)
        }
    }
    handle_add_service(){
        const customer_id = this.props.customer.customer_id, service_id = this.state.selected_service_id;
        const params = {customer_id, service_id};
        console.log(params)
    }
}
const mapStateToProps = (state) => ({ request_status: state.RequestStatus });
const mapActionsToProps = (dispatch) => ({ subscription_actions: bindActionCreators(subscription_actions, dispatch) })

export default connect(mapStateToProps, mapActionsToProps)(SubscriptionMange);