import React, { Component } from 'react'
import { Form, Button, Input } from 'semantic-ui-react'

export default class componentName extends Component {
    state = {
        name: "",
        username: "",
        password: ""
    }



    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value})
    }

    submitHandler = (e) => {
       e.preventDefault()
       this.props.createUser(this.state)
    }

    clickBack = () => {
        
    }

  render() {

    return (
      <div>
          <h1>Sign Up!</h1>
            <Form onSubmit={e => this.submitHandler(e)}>
                <Form.Field className="center aligned column" control={Input} name="name" label='Name:' placeholder='name' value={this.state.email} onChange={e => this.handleChange(e)}/>
                <Form.Input className="center aligned column" control={Input} name="username" label="Username:" placeholder="username" value={this.state.username} onChange={e => this.handleChange(e)} />
                <Form.Input className="center aligned column" type="password" name="password" label='Password:' placeholder='password' value={this.state.password} onChange={e => this.handleChange(e)} />
            
                <Button type="submit" className="button" color="green">Sign Up</Button>
                <Button content="Go Back" color="instagram" onClick={this.props.resetState}/>
            </Form>
      </div>
    )
  }
}
