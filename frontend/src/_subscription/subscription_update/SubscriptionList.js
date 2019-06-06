import React, { Component } from 'react';

class SubscriptionList extends Component {
    constructor(props) {
        super(props);
        console.log(props)
    }
    render() {
        return (<div>
            {this.props.subscriptions.map((el, i) => {
                return this.create_item(el, i);
            })}
        </div>)
    }

    create_item(el, i) {
        return (<div key={i}>
            {el.service_id}
        </div>)
    }
}



export default SubscriptionList;