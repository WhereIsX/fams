import React, { Component } from 'react';
import './App.css';
import Login from "./Components/Login"
import Home from "./Components/Home"
import NoMatch from "./Components/NoMatch"
import { Route, Switch} from 'react-router-dom'
import JoinGroup from './Components/JoinGroup';

class App extends Component {
  state = {
    loggedIn: false
  }

  handleLogin = () => {
    this.setState({ loggedIn: true})
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" render={(props) => (
            this.state.loggedIn === true ? (
              <Home {...props} loggedIn={this.state.loggedIn}/>
            ) : (
            <Login handleLogin={this.handleLogin} />
            )
            )} />
          <Route exact path="/groups/join" component={JoinGroup} />
          <Route exact path="/groups/create" component={JoinGroup} />
          <Route component={NoMatch} />
          
        </Switch>
      </div>
    );
  }
}

export default App;
