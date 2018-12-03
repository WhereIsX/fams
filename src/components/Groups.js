import React, { Component } from 'react'
import { Button } from "semantic-ui-react"

export default class Groups extends Component {
    state = {
        path: ""
    }

    clickHandler = (e) => {
        this.setState({ path: e.target.name}, () => console.log(this.state.path))
    }

    redirectHandler = (path) => {
        if (this.state.path === "join") {
            this.props.history.replace("/groups/join")
        } else if (this.state.path === "create") {
            this.props.history.replace("/groups/create")
        }
    }

  render() {
    return (
      <div>
        {this.redirectHandler()}
        <h1>Your Groups!</h1>
        <Button onClick={e => this.clickHandler(e)} name="join" content="Join Group" className="button" color="green" />
        <Button onClick={e => this.clickHandler(e)} name="create" content="Create Group" className="button" color="green" />
      </div>
    )
  }
}
