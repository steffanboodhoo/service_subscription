import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Loading from '../common/Loading';
import Alert from '../common/Alert';
import * as app_actions from '../ducks/App/Actions';
import { status, names } from '../ducks/RequestStatus/Actions';

class Login extends Component {
    constructor(props) {
        super(props);
        console.log(this.props);
    }
    render() {
        return (
            <div className="row">
                <form className="col s12">
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="email" type="email" className="validate" />
                            <label htmlFor="email">Email</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="password" type="password" className="validate" />
                            <label htmlFor="password">Password</label>
                        </div>
                    </div>
                    <div className='row'>
                        <a className="waves-effect waves-light btn width-fill" onClick={this.handle_login.bind(this)}>Login</a>
                        <a className="waves-effect waves-light btn width-fill" onClick={()=>{this.props.history.push('/register')}}>Register</a>
                    </div>
                </form>
                <Loading ref='loading_modal' />
                <Alert ref='failure_modal' cid='failure' type='alert-failure' header='Failure' message={this.props.request_status.message} />
            </div>
        )
    }
    handle_login(ev) {
        const email = document.getElementById('email').value, password = document.getElementById('password').value;
        const params = { email, password };
        this.props.app_actions.handle_log_in(params)
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.request_status.status != nextProps.request_status.status) {
            console.log(nextProps.request_status)
            if (nextProps.request_status.status == status.PENDING)
                this.refs.loading_modal.display()
            else
                this.refs.loading_modal.close()

            if(nextProps.request_status.status == status.FAILURE)
                this.refs.failure_modal.display()
        }
    }
}

const mapStateToProps = (state) => ({ app: state.App, request_status:state.RequestStatus });
const mapActionsToProps = (dispatch) => ({ app_actions: bindActionCreators(app_actions, dispatch) })
export default connect(mapStateToProps, mapActionsToProps)(Login);