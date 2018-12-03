import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'

export default class CreateGroup extends Component {

  clickHandler = () => {
    this.props.history.replace("/")
  }
  render() {
    return (
      <div>
          <h1>This is where CreateGroup will go.</h1>
          <Button onClick={e => this.clickHandler(e)} content="Home Page" className="button" color="green"/> 
      </div>
    )
  }
}
