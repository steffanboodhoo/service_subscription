import React from 'react';

const DefaultTextView = (props) => {
    return (<div>
        <h5>Please search for a customer or click <a className="waves-effect waves-light btn" onClick={props.handle_click}>here</a> to add a customer</h5>
    </div>)
}
export default DefaultTextView;