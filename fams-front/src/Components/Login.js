import React, { Component } from 'react'

class Login extends Component {
    state = {
        username: "",
        password: ""
    }

    changeHandler = (e) => {
        console.log(e.target.placeholder)
        this.setState({ [e.target.id]: e.target.value})
    }

    submitHandler = (e) => {
        e.preventDefault()
        this.props.handleLogin()        
    }

    render() {
        return (<form onSubmit={e => this.submitHandler(e)}>
            Please Login:
            <br></br>
            Username: <input type="text" id="username" placeholder="username" value={this.state.username}onChange={e => this.changeHandler(e)}></input>
            Password: <input type="password" id="password" placeholder="password" value={this.state.password} onChange={e => this.changeHandler(e)}></input>
            <button>Login</button>
        </form>)
    }
}

export default Login