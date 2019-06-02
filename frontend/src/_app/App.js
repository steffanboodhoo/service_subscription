import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from '../_home/Home';
import Login from '../_login/Login';

const PrivateRoute = ({ component: Component, app, ...props }) => {

}

class App extends Component {
    render() {
        return (<BrowserRouter>
            <div>
                <Route path='/home' render={() => (<Home/>)} />
                <Route path='/login' render={() => (<Login/>)} />
            </div>
        </BrowserRouter>)
    }
}
export default App;