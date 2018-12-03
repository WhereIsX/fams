import React, { Component } from 'react'
import { Button, Form, Input } from 'semantic-ui-react'
import firebase, { auth, provider } from '../firebase.js';
import Welcome from "./Welcome"
import { runInThisContext } from 'vm';

class Login extends Component {
    state = {
        email: "",
        password: "",
        user: null
    }

    changeHandler = (e) => {
        console.log(e.target.placeholder)
        this.setState({ [e.target.id]: e.target.value})
    }

    submitHandler = (e) => {
        e.preventDefault()
        console.log(provider)
        
    
        auth.signInWithPopup(provider)
        .then((result) => {
          const user = result.user;
          this.setState({
            user
          });
        }).then(this.props.handleLogin);
        
          
    }
    
    componentDidMount(){
        auth.onAuthStateChanged((user) => {
            if (user) {
            this.setState({ user });
            } 
        });
    }

    render() {
        // console.log(provider)

        return (<div className="form">
                <h1>Please Login</h1>
                <Form onSubmit={e => this.submitHandler(e)}>
                    <Form.Field className="input" control={Input} label='Username:' placeholder='username' />
        
                    <Form.Input className="input" type="password" label='Password:' placeholder='password' />
        
                        
            
                    
                    <Button type="submit" className="button" color="green">Login</Button>
                </Form>
                
                <Button content="Go Back" color="green" onClick={this.props.resetState}/>

            </div>
            )
    }
}

export default Login