import React, { Component } from 'react'
import Login from "./Login"
import SignUp from "./SignUp"
import welcome from "../imgs/welcomeImg.jpg"
import {Button} from "semantic-ui-react"

export default class componentName extends Component {
    state = {
        login: ""
    }

    clickHandler = (e) => {
       this.setState({ login: e.target.name})
    }

    resetState = () => {
        this.setState({ login: "" })
    }

    collect = (obj) => {
        this.props.createUser(obj)
    }

    loginRender = () => {
        if (this.state.login === "login") {
            return (<div id="sing-in">
                        <Login history={this.props.history} resetState={this.resetState} handleLogin={this.props.login}/>
                    </div>
            )} else if (this.state.login === "signup") {
                return (<div id="sign-in">
                            <SignUp history={this.props.history} resetState={this.resetState} createUser={this.collect}/>
                        </div>)
            } else {
                return (<div>
                            <Button name="login"  content="Log In"  color="green" onClick={e => this.clickHandler(e)}/>
                            <Button name="signup" content="Sign Up" color="green" onClick={e => this.clickHandler(e)}/>
                        </div>)
            }
    }

    render() {
        return (
        <div>
            <h1 className="header"> Welcome to FAMS!</h1>
            <br></br>
            <div id="logins">
                {this.loginRender()}
            </div>
            <div id="welcome">
                <img src={welcome} alt="welcome" />
            </div>
        </div>
        )
    }
}
