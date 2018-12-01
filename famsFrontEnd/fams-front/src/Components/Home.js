import React, { Component } from 'react'
import CreateGroup from "./CreateGroup"
import JoinGroup from "./JoinGroup"
import { Redirect } from "react-router-dom"

class Home extends Component {
   state = {
       path: ""
   }

    clickHandler = (e) => {
        this.setState({path: e.target.innerText}, () => this.redirectHandler(this.state.path))
    }

    redirectHandler = (path) => {
        if (path === "Join Group") {
            // debugger
            this.props.history.replace("/groups/join")
        } else if (path === "Create Group") {
            return <CreateGroup to="/groups/create" component={CreateGroup} />
        }
    }



    render(){
        return (<div>
                    <h1>You're home</h1>
                {this.redirectHandler()}
                <button onClick={e => this.clickHandler(e)}>Join Group</button>
                <button onClick={e => this.clickHandler(e)}>Create Group</button>
                </div>)

    }
}

export default Home