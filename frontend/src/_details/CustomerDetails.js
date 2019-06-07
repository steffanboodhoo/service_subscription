import React from 'react';
const CustomerDetails = (props) => {
    return (<div>
        <div className='row'> <h5>Details</h5> </div>
        <div className='row'>
            <p>{props.customer.first_name} {props.customer.last_name} </p>
        </div>

    </div>)
}
export default CustomerDetails;