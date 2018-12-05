import React, { Component } from 'react'
import { Form, Input, Button } from 'semantic-ui-react'

export default class MyGroups extends Component {
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

  clickHandler = (e) => {
    if (e.target.name === "create"){
    this.props.history.replace("/groups/create")
    } else {
      this.props.history.replace("/home")
    }
  }



  render() {
    return (
      <div>
        <h1>Groups I Made</h1>
        <Button name="create" content="Create Group" color="green" onClick={e => this.clickHandler(e)}/>
        <Button name="home" content="Go Home" color="instagram" onClick={e => this.clickHandler(e)} />
      </div>
    )
  }
}
