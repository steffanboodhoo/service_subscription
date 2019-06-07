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
        return (<div key={i} className='hoverable'>
            <div className='row'>
                <h6>{this.props.services[el.service_id].name}</h6>
            </div>
            <div className='flex-row-container'>
                <div className='flex-service-action-item'>
                    <a className="waves-effect waves-light btn width-fill">ACTIVATE</a>
                </div>
                <div className='flex-service-action-item'>
                    <a className="waves-effect waves-light grey lighten- btn width-fill">SUSPEND</a>
                </div>
                <div className='flex-service-action-item'>
                    <a className="waves-effect waves-light red lighten-3 btn width-fill">DELETE</a>
                </div>
            </div>

        </div>)
    }
}



export default SubscriptionList;