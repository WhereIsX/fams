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
        this.setState({ login: ""})
    }

    loginRender = () => {
        if (this.state.login === "login") {
            return (<div id="logins">
                        <Login history={this.props.history} resetState={this.resetState}/>
                    </div>
            )} else if (this.state.login === "signup") {
                return (<div id="logins">
                            <SignUp history={this.props.history} resetState={this.resetState}/>
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
            {this.loginRender()}
            <div id="welcome">
                <img src={welcome} alt="welcome" />
            </div>
        </div>
        )
    }
}
