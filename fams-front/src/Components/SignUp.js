import React, { Component } from 'react'
import { Form, Button, Input } from 'semantic-ui-react'
import { app } from 'firebase';

export default class componentName extends Component {
    state = {
        email: "",
        password: ""
    }



    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value})
    }

    submitHandler = async event => {
        event.preventDefault()

        let email = this.state.email
        let password = this.state.password
        
        try {
            const user = await app
            .auth()
            .createUserWithEmailAndPassword(email, password)
            this.props.history.push("/groups/join")
        } catch (error) {
            alert(error)
        }
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
