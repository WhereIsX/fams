import React, { Component } from 'react';
import {Button, Form, Input} from 'semantic-ui-react'

export default class GroupView extends Component {
    state = {
        group: {}
    }

    componentDidMount() {
        let groupNumber = Number(this.props.match.params.id)
        fetch(`http://localhost:3003/groups/${groupNumber}`)
        .then(res => res.json())
        .then(data => this.setState({ group: data}))
    }

    submitHandler = (e) => {
        console.log("Clicked!")
    }

  render() {
      console.log(this.state.group)

    return (
      <div>
          <div>
            <h1>{this.state.group.name}</h1>
            <h3>{(this.state.group.media > 0 ? `Here Are ${this.state.group.name}'s Photos!` : "Add a Photo!")}</h3>
          </div>
          <div>
          <Form onSubmit={e => this.submitHandler(e)}>
              <Input type="file"/>
            <Button type="submit" content="Add Photos" color="green" onClick={e => this.clickHandler(e)}/>
          </Form>
          </div>
          <Button content="Delete Group" color="red" onClick={e => this.deleteHandler(e)} />
      </div>
    )
  }
}
