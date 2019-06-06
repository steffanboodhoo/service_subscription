import React from 'react';
const CustomerDetails = (props) => {
    return (<div>
        <h4> {props.customer.first_name} {props.customer.last_name} </h4>

    </div>)
}
export default CustomerDetails;