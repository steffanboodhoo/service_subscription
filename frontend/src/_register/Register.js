import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Loading from '../common/Loading';
import Alert from '../common/Alert';
import * as app_actions from '../ducks/App/Actions';
import { status, names } from '../ducks/RequestStatus/Actions';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            error_message: ''
        }
    }
    render() {
        return (<div>
            <div className="row">
                <form className="col s12">
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="email" type="email" className="validate" />
                            <label htmlFor="email">Email</label>
                            <span className="helper-text" data-error="invalid email" data-success="valid email :)">e.g. joe@bad.com</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="password" type="password" className="validate" />
                            <label htmlFor="password">Password</label>
                            <span className="helper-text">Must be 8-50 characters</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="password_confirm" type="password" className="validate" />
                            <label htmlFor="password_confirm">Confirm Password</label>
                            <span className="helper-text">Must be 8-50 characters</span>
                        </div>
                    </div>
                    <div className='row'>
                        <a className="waves-effect waves-light btn width-fill" onClick={this.handle_register.bind(this)}>Register</a>
                    </div>
                </form>

                <Loading ref='loading_modal' />
                <Alert ref='failure_modal' cid='failure' type='alert-failure' header='Failure' message={this.props.request_status.message} />
                <Alert ref='success_modal' cid='success' type='alert-success' header='Success' message={this.props.request_status.message} />
            </div>
            <div className='row'>
                {this.display_error()}
            </div>
            </div>)
    }

    handle_register(ev) {
        const email = document.getElementById('email').value, password = document.getElementById('password').value, password_confirm = document.getElementById('password_confirm').value;
        let data = this.validate(email, password, password_confirm);
        if (data.status == 'failure') {
            console.log(data.message)
            this.setState({ error: true, error_message: data.message })
        } else {
            console.log('register')
            this.setState({ error: false, error_message: '' })
            const params = { email, password };
            this.props.app_actions.handle_register(params);
        }
    }
    validate(email, password, confirm_password) {
        const valid_email = (email => {
            const email_format = /\S+@\S+\.\S+/;
            return email_format.test(email);
        })(email)
        if (!valid_email)
            return { status: 'failure', message: 'please enter a valid email' }
        if (password != confirm_password)
            return { status: 'failure', message: 'passwords do not match' }
        if (password.length < 8)
            return { status: 'failure', message: 'passwords too short must be 8 characters' }
        if (password.length > 50)
            return { status: 'failure', message: 'passwords too long must be <=50 characters' }
        return { status: 'success' }
    }

    display_error() {
        if (this.state.error)
            return (<div className='alert-error center-content'>
                <h4>Input Error</h4>
                <p>{this.state.error_message}</p>
            </div>)
        else
            return ''
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.request_status.status != nextProps.request_status.status) {
            console.log(nextProps.request_status)
            if (nextProps.request_status.status == status.PENDING)
                this.refs.loading_modal.display()
            else
                this.refs.loading_modal.close()
            if(nextProps.request_status.status == status.SUCCESS)
                this.refs.success_modal.display()

            if(nextProps.request_status.status == status.FAILURE)
                this.refs.failure_modal.display()
        }
    }
}

const mapStateToProps = (state) => ({ app: state.App, request_status: state.RequestStatus });
const mapActionsToProps = (dispatch) => ({ app_actions: bindActionCreators(app_actions, dispatch) })
export default connect(mapStateToProps, mapActionsToProps)(Register);