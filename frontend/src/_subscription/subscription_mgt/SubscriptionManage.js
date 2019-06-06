import React, { Component } from 'react';

class SubscriptionMange extends Component {
    constructor(props) {
        super(props);
        this.state = {
            local_list: [],
            selected_service_id: ''
        }
    }
    render() {
        return (<div>
            <div className='input-field col s12'>
                <select id='select_service' onSelect={self.handle_on_select}>
                    <option value="" disabled selected>Choose your option</option>
                    {this.state.local_list.map((el, i) => {
                        return (<option value={el.service_id}>{el.name}</option>)
                    })}
                </select>

            </div>
        </div>)
    }
    handle_on_select(ev){
        console.log(ev);
    }
}
const mapStateToProps = (state) => ({ request_status: state.RequestStatus, subscription: state.Subscription });
const mapActionsToProps = (dispatch) => ({ subscription_actions: bindActionCreators(subscription_actions, dispatch) })

export default connect(mapStateToProps, mapActionsToProps)(SubscriptionMange);