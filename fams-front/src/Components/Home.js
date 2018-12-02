import React, { Component } from 'react'
import { Button } from "semantic-ui-react"


class Home extends Component {
   state = {
       path: ""
   }

    clickHandler = (e) => {
        this.setState({path: e.target.innerText}, () => this.redirectHandler(this.state.path))
    }

    redirectHandler = (path) => {
        if (path === "Join Group") {
            this.props.history.replace("/groups/join")
        } else if (path === "Create Group") {
            this.props.history.replace("/groups/create")
        }
    }



    render(){
        return (<div>
                    <h1>You're Home</h1>
                {this.redirectHandler()}
                <Button onClick={e => this.clickHandler(e)} content="Join Group" className="button" color="google plus"/> 
                <Button onClick={e => this.clickHandler(e)} content="Create Group" className="button" color="google plus"/>
                </div>)

    }
}

export default Home