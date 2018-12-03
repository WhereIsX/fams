import React, { Component } from 'react'
import { Button } from "semantic-ui-react"

export default class GroupTile extends Component {

    renderCardView = () => {
        this.props.props.history.push(`/groups/${this.props.group.id}`)
    }
    
  render() {
    console.log(this.props.group.id)
    return (
      <div className="ui card three wide column" onClick={this.renderCardView}>
        <div className="content">
            {this.props.group.name}
        </div>
      </div>
    )
  }
}
