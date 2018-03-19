import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Registration from './Registration.js';
import Login from './Login.js';
import Dashboard from './dashboard.js';



class App extends Component {
    render() {
        return (

            <BrowserRouter>
                <Switch>
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/Registration' component={Registration} />
                    <Route exact path='/dashboard' component={Dashboard} />

                </Switch>
            </BrowserRouter>

        );
    }
}

export default App;