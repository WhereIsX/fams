import React, { Component } from 'react'
import { Form, Button, Input } from 'semantic-ui-react'
import { app } from 'firebase';
import firebase, { auth, provider } from '../firebase.js';

export default class componentName extends Component {
    state = {
        email: "",
        password: ""
    }



    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value})
    }

    submitHandler = (e) => {
        e.preventDefault()
        

        const usersRef = firebase.database().ref('user')
        const user = {
            email: this.state.email,
            password: this.state.password
        }

        usersRef.push(user)

        this.props.props.history.replace("/groups/join")
        
        
    }

  render() {

    return (
      <div>
          <h1>Sign Up!</h1>
            <Form onSubmit={e => this.submitHandler(e)}>
                <Form.Field className="input" control={Input} name="email" label='email' placeholder='email' value={this.state.email} onChange={e => this.handleChange(e)}/>
    
                <Form.Input className="input" type="password" name="password" label='password:' placeholder='password' value={this.state.password} onChange={e => this.handleChange(e)} />
            
                <Button type="submit" className="button" color="google plus">Sign Up</Button>
            </Form>
    
      </div>
    )
  }
}
