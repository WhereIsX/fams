import React, { Component } from 'react';
import './App.css';
import Login from "./components/Login"
import Home from "./components/Home"
import NoMatch from "./components/NoMatch"
import { Route, Switch, withRouter } from 'react-router-dom'
import CreateGroup from "./components/CreateGroup"
import MyGroups from "./components/MyGroups"
import NavBar from "./components/NavBar"
import Welcome from "./components/Welcome"
import GroupView from "./components/GroupView"

class App extends Component {
  state = {
    user: {}
  }

  login = (userInfo) => {
    console.log(userInfo)
    fetch("http://localhost:3003/api/v1/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accepts": "application/json",
        },
        body: JSON.stringify({
            user: userInfo
        })
    })
    .then(res => res.json())
    .then(res => {
        localStorage.setItem("token")
        this.setState({ user: res.user})
    })
}

  createUser = (obj) => {
    console.log(obj)
    fetch("http://localhost:3003/users", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        user: {
          name: obj.name,
          username: obj.username,
          password: obj.password 
        }
      })
    })
    .then(res => res.json())
    .then(data => {
      this.setState({ user: data })
      console.log(data)
    })
  }

  render() {
    // console.log(this.props)
    return (  
      <div className="App">
        <NavBar props={this.state}/>
        <Switch>
          <Route exact path="/" render={(props) => (
            <Welcome {...props} createUser={this.createUser} login={this.login}/>
          )}/>
          <Route exact path="/login" render={(props) => (
            <Login handleLogin={this.login} />
            )} />
          <Route exact path="/home" render={(props) => (
            <Home {...props} user={this.state.user} /> 
          )} />
          <Route exact path="/groups" render={(props) => (
            <MyGroups {...props} user={this.state.user} />
          )} />
          <Route exact path="/groups/create" component={CreateGroup} />
          <Route path='/groups/:id' render={(props) => (
            <GroupView {...props} />)} />
          <Route component={NoMatch} />
          
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
