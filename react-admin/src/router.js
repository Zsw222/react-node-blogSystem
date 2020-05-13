import React, { Component } from 'react';
import DefaultLayout from './layouts/DefaultLayout/DefaultLayout';
import LoginUser from './layouts/LoginUser/LoginUser';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AuthRouter from './routes/AuthorizedRoute'
class RouterWrap extends Component {
    render() {
        return (
            <Router browserHistory>
                <Switch>
                <AuthRouter  name={'DefaultLayout'} path={'/main'}  component={DefaultLayout} />
                <Route  name={'LoginUser'} path={'/'} exact component={LoginUser} />
                <Route  name={'LoginUser'} path={'/LoginUser'} exact component={LoginUser} />
                </Switch>
            </Router>
        );
    }
}
export default RouterWrap;