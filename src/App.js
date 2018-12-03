import React, { Component } from 'react';
import './App.css';
import Login from "./components/Login"
import Home from "./components/Home"
import NoMatch from "./components/NoMatch"
import { Route, Switch} from 'react-router-dom'
import JoinGroup from './components/JoinGroup';
import CreateGroup from "./components/CreateGroup"
import Groups from "./components/Groups"
import NavBar from "./components/NavBar"
import Welcome from "./components/Welcome"

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
        <NavBar props={this.state}/>
        <Switch>
          <Route exact path="/" render={(props) => (
            <Welcome {...props} />
          )}/>
          <Route exact path="/login" render={(props) => (
            this.state.loggedIn === true ? (
              <Home {...props} loggedIn={this.state.loggedIn}/>
            ) : (
            <Login {...props} handleLogin={this.handleLogin} />
            )
            )} />
          <Route exact path="/groups" render={(props) => (
            <Groups {...props} />
          )}/>
          
          <Route exact path="/home" component={Home} />
          <Route exact path="/groups/join" component={JoinGroup} />
          <Route exact path="/groups/create" component={CreateGroup} />
          <Route component={NoMatch} />
          
        </Switch>
      </div>
    );
  }
}

export default App;
