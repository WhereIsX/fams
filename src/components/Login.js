import React, { Component } from 'react'
import { Button, Form, Input } from 'semantic-ui-react'


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
                    <Form.Field className="center aligned column" name="username" control={Input} label='Username:' placeholder='username' onChange={e => this.changeHandler(e)}/>
        
                    <Form.Input className="center aligned column" name="password" type="password" label='Password:' placeholder='password' onChange={e => this.changeHandler(e)}/>
        
                        
            
                    
                    <Button type="submit" className="button" color="green">Login</Button>
                    <Button content="Go Back" color="instagram" onClick={this.props.resetState}/>
                </Form>

            </div>
            )
    }
}

export default Login