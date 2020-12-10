import React from 'react';
import { Switch, Route } from 'react-router-dom';

import RegisterPage from './pages/Register/RegisterPage';
import LoginPage from './pages/Login/LoginPage';
import ProfilePage from './pages/Profile/ProfilePage';

function Routes() {
    return (
        <Switch>
            <Route path="/" exact component={RegisterPage} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/profile" component={ProfilePage} />
        </Switch>
    );
}

export default Routes;