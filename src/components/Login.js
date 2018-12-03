import React, { Component } from 'react'
import { Button, Form, Input } from 'semantic-ui-react'
import Welcome from "./Welcome"
import { runInThisContext } from 'vm';

class Login extends Component {
    state = {
        username: "",
        password: "",
    }

    changeHandler = (e) => {
        console.log(e.target.name)
        this.setState({ [e.target.name]: e.target.value})
    }

    submitHandler = (e) => {
        e.preventDefault()
        
        this.props.handleLogin(this.state)      
    }
    

    render() {
        // console.log(provider)

        return (<div className="form">
                <h1>Please Login</h1>
                <Form onSubmit={e => this.submitHandler(e)}>
                    <Form.Field className="input" name="username" control={Input} label='Username:' placeholder='username' onChange={e => this.changeHandler(e)}/>
        
                    <Form.Input className="input" name="password" type="password" label='Password:' placeholder='password' onChange={e => this.changeHandler(e)}/>
        
                        
            
                    
                    <Button type="submit" className="button" color="green">Login</Button>
                </Form>
                
                <Button content="Go Back" color="green" onClick={this.props.resetState}/>

            </div>
            )
    }
}

export default Login