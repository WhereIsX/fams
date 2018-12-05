import React, { Component } from 'react';
import './App.css';
import Login from "./components/Login"
import Home from "./components/Home"
import NoMatch from "./components/NoMatch"
import { Route, Switch, withRouter } from 'react-router-dom'
import CreateGroup from "./components/CreateGroup"
import NavBar from "./components/NavBar"
import Welcome from "./components/Welcome"
import GroupView from "./components/GroupView"

class App extends Component {
  state = {
    user: null,
    token: null,
  }

  componentDidMount = () => {
    let userToken = localStorage.getItem("token");
    if (userToken) {
      fetch(`${this.props.apiUrl}/users/profile`, {
        headers: {
          "Content-Type": "application/json",
          "Accepts": "application/json",
          Authorization: `${userToken}`
        }
      })
      .then(res => res.json())
      .then(data => {
        this.setState({ user: data, token: userToken })
        this.props.history.push("/home")
      })
    } else {
      this.props.history.push("/")
    }
  }

  login = (userInfo) => {
    fetch(`${this.props.apiUrl}/login`, {
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
    .then(data => {
        localStorage.setItem("token", data.jwt)
        this.setState({ user: data.user, token: data.jwt})
        this.props.history.replace("/home")
    })
}

  logout = () => {
    localStorage.clear()
    this.setState({ user: null, token: null})
    this.props.history.replace("/")
  }

  createUser = (obj) => {
    // console.log(obj)
    localStorage.clear()

    fetch(`${this.props.apiUrl}/users`, {
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
      localStorage.setItem("token", data.jwt)
      this.setState({ user: data.user, token: data.jwt})
      console.log('createuser set state', this.state)
      this.props.history.replace("/home")
    })
  }

  render() {
    console.log(this.state.token)
    return (
      <div className="App">
        <NavBar props={this.state} logout={this.logout}/>
        <Switch>
          <Route exact path="/" render={(props) => (
            <Welcome {...props} createUser={this.createUser} login={this.login} />
          )}/>
          <Route exact path="/login" render={(props) => (
            <Login handleLogin={this.login} />
            )} />
          <Route exact path="/home" render={(props) => (
            <Home {...props} user={this.state.user} token={this.state.token} apiUrl={this.props.apiUrl}/>
          )} />
          <Route exact path="/groups/create" render={(props) => (
            <CreateGroup {...props} apiUrl={this.props.apiUrl} token={this.state.token} />)} />
          <Route path='/groups/:id' render={(props) => (
            <GroupView {...props} apiUrl={this.props.apiUrl} token={this.state.token}/>)} />
          <Route component={NoMatch} />

        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
