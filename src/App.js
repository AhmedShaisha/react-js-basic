import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './component/Home';
import Login from './component/Login';
import Details from './component/Details';
import signUp from './component/SignUp';

class App extends Component {
  render() {
    return (
        <Router>
              <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/login' component={Login} />
                <Route path='/signUp' component={signUp} />
                <Route path='/details' component={Details} />
              </Switch>
        </Router>
    );
  }
}

export default App;

