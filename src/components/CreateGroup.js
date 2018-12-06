import React, { Component } from 'react'
import { Button, Form, Input } from 'semantic-ui-react'

export default class CreateGroup extends Component {
  state = {
    group: ""
  }

  clickHandler = () => {
    this.props.history.replace("/home")
  }

  changeHandler = (e) => {
    this.setState({ group: e.target.value})
  }

  submitHandler = (e) => {
    e.preventDefault()
    // console.log(this.state.group)

    fetch(`${this.props.apiUrl}/groups`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "accepts": "application/json",
        authorization: `${this.props.token}`
      },
      body: JSON.stringify({
        name: this.state.group,
        members: this.state.user
      })
    })
    .then(res => res.json())
    .then(data => {
      debugger
      this.props.history.push(`/groups/${data.id}`)
    })
  }

  render() {
    return (
      <div id="creategroup">
          <h1>Create New Group</h1>
          <Form onSubmit={e => this.submitHandler(e)}>
            <Form.Field>
              <Input label="Name:" placeholder="Group Name" value={this.state.group} onChange={this.changeHandler}/>
            </Form.Field>
            <Button type="submit" className="button" color="green">Create Group</Button>
            <Button onClick={e => this.clickHandler(e)} content="Go Home" className="button" color="instagram"/> 
          </Form>
      </div>
    )
  }
}
