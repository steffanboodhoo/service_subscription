import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as app_actions from '../ducks/App/Actions';

class Register extends Component{
    constructor(props){
        super(props);
        this.state ={
            error:false,
            error_message:''
        }
    }
    render() {
        return (
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
            </div>
        )
    }
    handle_register(ev){
        const email = document.getElementById('email'),  password = document.getElementById('password'), password_confirm = document.getElementById('password_confirm');
        let data = this.validate_password(password, password_confirm);
        if(data.status =='failure'){
            this.setState({ error:true, error_message:data.message})
        }else{
            const params = {email, password};
            this.props.app_actions.register(params);
        }
        
    }
    validate_password(password, confirm_password){
        if( password != confirm_password)
            return {status:'failure', message:'passwords do not match'}
        if( password.lenght < 8 )
            return {status:'failure', message:'passwords too short must be 8 characters'}
        if( password.lenght > 50)
            return {status:'failure', message:'passwords too long must be <=50 characters'}
        return {status:'success'}
    }
}

const mapStateToProps = (state) => ({app: state.App, request_status:state.RequestStatus });
const mapActionsToProps = (dispatch) => ({})
export default connect(mapStateToProps, mapActionsToProps)(Register);