import React, { Component } from 'react'
import { Form, Input, Button } from 'semantic-ui-react'

export default class JoinGroup extends Component {
  state = {
    group: ""
  }

  // Group Fetch Request

  changeHandler = (e) => {
    this.setState({ group: e.target.value}, () => console.log(this.state.group))
  }

  submitHandler = (e) => {
    console.log(e.target.value)
    e.preventDefault()
  }

  clickHandler = () => {
    this.props.history.replace("/")
  }

  render() {
    return (
      <div>
        <h1>This is where JoinGroup will go.</h1>
        <Form onSubmit={e => this.submitHandler(e)} >
        <Input className="input" type="group" label='Find Your People:' placeholder='Find a Group' value={this.state.group} onChange={e => this.changeHandler(e)}/>
         
        <Button onClick={e => this.clickHandler(e)} content="Home Page" className="button" color="green"/> 
        </Form>
      </div>
    )
  }
}
