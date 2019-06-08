import React, { Component } from 'react';

class SubscriptionList extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (<div>
            {Object.entries(this.props.subscriptions).map(([i, el]) => {
                return this.create_item(el, i);
            })}
        </div>)
    }

    create_item(el, i) {
        console.log(el)
        return (<div key={i} className='hoverable'>
            <div className='row'>
                <h6>{this.props.services[el.service_id].name} - {el.status}</h6>
            </div>
            <div className='flex-row-container'>
                <div className='flex-service-action-item'>
                    <a disabled={el.status=='ACTIVE'} className="waves-effect waves-light btn width-fill" onClick={()=>this.activate_subscription(el)}>ACTIVATE</a>
                </div>
                <div className='flex-service-action-item'>
                    <a disabled={el.status=='SUSPENDED'} className="waves-effect waves-light grey lighten- btn width-fill" onClick={()=>this.suspend_subscription(el)}>SUSPEND</a>
                </div>
                <div className='flex-service-action-item'>
                    <a className="waves-effect waves-light red lighten-3 btn width-fill" onClick={()=>this.remove_subscription(el)}>REMOVE</a>
                </div>
            </div>

        </div>)
    }
    activate_subscription(el){
        this.props.handle_subscription_update(el.service_id, 'ACTIVE')
    }
    suspend_subscription(el){   
        this.props.handle_subscription_update(el.service_id, 'SUSPENDED')
    }
    remove_subscription(el){
        this.props.handle_subscription_delete(el.service_id)
    }
}



export default SubscriptionList;