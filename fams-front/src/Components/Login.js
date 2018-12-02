import React, { Component } from 'react'

import { Button, Form, Input } from 'semantic-ui-react'
import SignUp from './SignUp'

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
        return (<div className="form">
            <h1>Please Login</h1>
            <Form onSubmit={e => this.submitHandler(e)}>
                <Form.Field className="input" control={Input} label='Username:' placeholder='username' />
    
                <Form.Input className="input" type="password" label='Password:' placeholder='password' />
    
                    
        
                
                <Button type="submit" className="button" color="google plus">Login</Button>
            </Form>
            <SignUp />
            </div>
            )
    }
}

export default Login