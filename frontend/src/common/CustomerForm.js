
import React, { Component } from 'react';

class CustomerForm extends Component {
    constructor(props) {
        super(props);
        this.state = { error: false, }
    }
    render() {
        return (<div id="add_customer_modal" className="modal">
            <div className="modal-content">
                <div className="row">
                    <form className="col s12">
                        <div className="row">
                            <div className="input-field col s6">
                                <input id="first_name" type="text" className="validate" />
                                <label htmlFor="first_name">First Name</label>
                            </div>
                            <div className="input-field col s6">
                                <input id="last_name" type="text" className="validate" />
                                <label htmlFor="last_name">Last Name</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="contact_number" type="text" className="validate" />
                                <label htmlFor="contact_number">Contact Number</label>
                                <span className="helper-text">10 digits e.g. 8681234567</span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="email" type="email" className="validate" />
                                <label htmlFor="email">Email</label>
                                <span className="helper-text" data-error="invalid email" data-success="valid email :)">e.g. joe@bad.com</span>
                            </div>
                        </div>
                    </form>
                </div>
                <div className='row'>
                    {this.state.error ? this.error_view(this.state) : ''}
                </div>
            </div>
            <div className="modal-footer">
                <div className='flex-row-container'>
                    <a href="#!" className="flex-service-action-item modal-close waves-effect waves-green btn-flat width-fill">Cancel</a>
                    <a className="flex-service-action-item waves-effect waves-light btn width-fill" onClick={this.validate_form.bind(this)}>Add Customer</a>
                </div>
            </div>
        </div>)
    }
    componentDidMount() {
        let instance = document.getElementById('add_customer_modal');
        instance = M.Modal.init(instance, { dismissible: false });
        this.setState({ instance })
    }

    display() {
        this.state.instance.open();
    }
    close() {
        this.state.instance.close();
    }

    validate_form() {
        const first_name = document.getElementById('first_name').value, last_name = document.getElementById('last_name').value, contact_number = document.getElementById('contact_number').value, email = document.getElementById('email').value;
        const valid_first_name = (first_name != ''), valid_last_name = (last_name != '');
        const valid_number = (number => {
            const number_format = /868[0-9]{7}/;
            return number_format.test(number);
        })(contact_number)
        const valid_email = (email => {
            const email_format = /\S+@\S+\.\S+/;
            return email_format.test(email);
        })(email)
        const error = !(valid_first_name && valid_last_name && valid_number && valid_email)
        if (error)
            this.setState({ error, valid_first_name, valid_last_name, valid_number, valid_email })
        else {
            const params = { first_name, last_name, contact_number, email }
            this.props.handle_add_customer(params)
            this.close();
        }
    }
    error_view({ valid_first_name, valid_last_name, valid_number, valid_email }) {
        return (<div className='alert-error center-content'>
            <h6>You have the following errors</h6>
            <ol>
                {!valid_first_name ? (<li>Nothing entered for first name</li>) : ''}
                {!valid_last_name ? (<li>Nothing entered for last name</li>) : ''}
                {!valid_number ? (<li>Invalid number</li>) : ''}
                {!valid_email ? (<li>Invalid email</li>) : ''}
            </ol>
        </div>)
    }

}

export default (CustomerForm);