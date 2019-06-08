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
                    <input placeholder='email address (joe@bad.com) or full contact number (8681234567)' id='input_id_search' onChange={this.handle_onchange.bind(this)} type='text' className="validate" />
                    <a className="waves-effect waves-light btn width-fill" onClick={this.handle_id_search_submit.bind(this)}>Search using email or contact number</a>
                    <h2>OR</h2>
                    <input placeholder='Any part of the name e.g."Steffan Boodhoo", "Boodhoo","stef"' id='input_name_search' type='text' className="validate" />
                    <a className="waves-effect waves-light btn width-fill" onClick={this.handle_name_search_submit.bind(this)}>Search using name</a>
                </div>
            </div>
            <Alert ref='alert_modal' cid='id_search' type='alert-error' header='Invalid Search Information' message='Please enter a valid phone number 10 digits e.g. 8681234567 or a valid email address joe@bad.com' />
            <Alert ref='alert_modal' cid='name_search' type='alert-error' header='Invalid Search Information' message='Please enter a valid name longer than 2 characters' />
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

    handle_id_search_submit(ev) {
        if (!(this.state.valid_number || this.state.valid_email)) {
            this.refs.alert_modal.display();
            return;
        }
        let params = {}
        if (this.state.valid_number) // is it a valid number
            params = { contact_number: this.state.search_key };
        else // or a valid email
            params = { email: this.state.search_key };
        this.props.handle_customer_id_search(params);
    }

    handle_name_search_submit(ev){
        const name = document.getElementById('input_name_search').value;
        this.props.handle_customer_name_search(name);
    }

}

export default CustomerSearch;