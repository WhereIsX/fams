import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'

export default class JoinGroup extends Component {

  clickHandler = () => {
    this.props.history.replace("/")
  }

  render() {
    return (
      <div>
        <h1>This is where JoinGroup will go.</h1>
        <Button onClick={e => this.clickHandler(e)} content="Home Page" className="button" color="google plus"/> 
      </div>
    )
  }
}
