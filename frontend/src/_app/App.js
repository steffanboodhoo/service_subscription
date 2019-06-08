import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Home from '../_home/Home';
import Login from '../_login/Login';
import Register from '../_register/Register';

const PrivateRoute = ({ component: Component, app, ...props }) => {
    return (<Route {...props} render={props => {
        return (app.logged_in ? <Component {...props} /> : <Redirect to='/login' />)
    }} />)
}
const DefaultRoute = ({ component: Component, app, ...props }) => {
    return (<Route {...props} render={props => {
        return (app.logged_in ? <Redirect to='/home' /> : <Component {...props} />)
    }} />)
}

class App extends Component {
    render() {
        return (<BrowserRouter>
            <div>
                <Route exact={true} path='/' render={() => (this.props.app.logged_in ? (<Redirect to='/home'/>):(<Redirect to='/login'/>)) }/>
                <PrivateRoute path='/home' component={Home} app={this.props.app} />
                <DefaultRoute path='/login' component={Login} app={this.props.app} />
                <Route path='/register' render={() => (<Register/>)}/>
                    {/* <Route path='/home' render={() => (<Home />)} /> */}
                    {/* <Route path='/login' render={() => (<Login />)} /> */}
            </div>
        </BrowserRouter>)
            }
        }
        
const mapStateToProps = (state) => ({app: state.App });
const mapActionsToProps = (dispatch) => ({})
export default connect(mapStateToProps, mapActionsToProps)(App);