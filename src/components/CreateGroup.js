import React, { Component } from 'react'
import { Button, Form, Input } from 'semantic-ui-react'

export default class CreateGroup extends Component {

  clickHandler = () => {
    this.props.history.replace("/")
  }
  render() {
    return (
      <div>
          <h1>Create New Group</h1>
          <Form>
            <Form.Field>
              <Input label="Name:" placeholder="Group Name" />
            </Form.Field>
          </Form>
          <Button onClick={e => this.clickHandler(e)} content="Home Page" className="button" color="green"/> 
      </div>
    )
  }
}
