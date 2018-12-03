import React, { Component } from 'react'
import { Button } from "semantic-ui-react"


class Home extends Component {
   state = {
       path: "",
       groups: []
   }

    clickHandler = (e) => {
        this.props.history.replace("/groups")
    }

    componentDidMount(){
        fetch("http://localhost:3003/groups")
        .then(res => res.json())
        .then(data => this.setState({ groups: data}))
    }

    render(){
        console.log(this.state.groups)
        return (<div>
                    <h1>You're Home</h1>
                <Button onClick={e => this.clickHandler(e)} content="See Groups" className="button" color="green"/> 
                <br></br>
                </div>)

    }
}

export default Home