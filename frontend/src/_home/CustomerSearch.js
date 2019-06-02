import React, { Component } from 'react';
import 'materialize-css';

class CustomerSearch extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<div className='row'>
            <div className='col s8'>
                <div className="input-field col s6">
                    <input placeholder='Placeholder' id='input_search' type='text' className="validate" />
                    <a className="waves-effect waves-light btn">button</a>
                    {/* <label for="first_name">First Name</label> */}
                </div>
            </div>
        </div>)
    }
}

export default CustomerSearch;