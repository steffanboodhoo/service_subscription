import React, { Component } from 'react';

class SubscriptionList extends Component {
    constructor(props) {
        super(props);
        console.log(props)
    }
    render() {
        return (<div>
            {Object.entries(this.props.subscriptions).map(([i, el]) => {
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