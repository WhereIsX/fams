import React, { Component } from 'react'
import yikes from "../imgs/noMatch.jpg"

export default class NoMatch extends Component {
  render() {
    return (
      <div>
        <h1 id="yikes">Oops! There's Nothing Here!</h1>
        <img id="dogImg" src={yikes} alt="no match"></img>
      </div>
    )
  }
}
