import React, { Component } from 'react';
import Alert from '../common/Alert';
// import 'materialize-css';

class CustomerSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valid_email: false,
            valid_number: false,
            search_key: ''
        }
    }

    render() {
        return (<div className='row'>
            <div className='col m10 s12'>
                <div className="input-field">
                    <input placeholder='email address (joe@bad.com) or full contact number (8681234567)' id='input_search' onChange={this.handle_onchange.bind(this)} type='text' className="validate" />
                    <a className="waves-effect waves-light btn width-fill" onClick={this.handle_submit.bind(this)}>Search</a>
                </div>
            </div>
            <Alert ref='alert_modal' cid='search' type='alert-error' header='Invalid Search Information' message='Please enter a valid phone number 10 digits e.g. 8681234567 or a valid email address joe@bad.com' />
        </div>)
    }

    handle_onchange(ev) {
        const valid_number = (number => {
            const number_format = /868[0-9]{7}/;
            return number_format.test(number);
        })(ev.target.value)
        this.setState({ valid_number, search_key: ev.target.value })

        if (this.state.valid_number)// if the number is valid then the email CANNOT be valid and vice-versa, avoids unnecessary execution
            return;

        const valid_email = (email => {
            const email_format = /\S+@\S+\.\S+/;
            return email_format.test(email);
        })(ev.target.value)
        this.setState({ valid_email, search_key: ev.target.value })
    }

    handle_submit(ev) {
        if (!(this.state.valid_number || this.state.valid_email)) {
            this.refs.alert_modal.display();
            return;
        }
        let params = {}
        if (this.state.valid_number) // is it a valid number
            params = { contact_number: this.state.search_key };
        else // or a valid email
            params = { email: this.state.search_key };
        this.props.handle_customer_search(params);
    }

}

export default CustomerSearch;