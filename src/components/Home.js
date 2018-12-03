import React, { Component } from 'react'
import { Button } from "semantic-ui-react"


class Home extends Component {
   state = {
       path: ""
   }

    clickHandler = (e) => {
        this.props.history.replace("/groups")
    }

    render(){
        return (<div>
                    <h1>You're Home</h1>
                <Button onClick={e => this.clickHandler(e)} content="See Groups" className="button" color="green"/> 
                <br></br>
                </div>)

    }
}

export default Home