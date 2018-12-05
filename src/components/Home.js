import React, { Component } from 'react'
import GroupTile from './GroupTile'
import { Button, Grid } from "semantic-ui-react"


class Home extends Component {
   state = {
       path: "",
       groups: []
   }

    clickHandler = (e) => {
        this.props.history.replace(e.target.name)
    }

    componentDidMount(){
    //   debugger
    //     fetch("http://localhost:3000/groups", {
    //       headers: {
    //         "content-type": "application/json",
    //         "accepts": "application/json",
    //         authorization: `${this.props.token}`
    //       }
    //     })
    //     .then(res => res.json())
    //     .then(data => {
    //       this.setState({ groups: data})
    //       console.log("got to home fetch", data)
    //     })
    }

    render(){
        console.log(this.props.token)
        let allGroups = this.state.groups.map(group => {
            return(<GroupTile
                    key={group.id}
                    group={group}
                    props={this.props}
                    token={this.props.token}
                    />)
        })
        return (<div>
                    <h1>You're Home</h1>
                    <Grid>
                        {allGroups}
                    </Grid>
                    <br></br>
                    <Button onClick={e => this.clickHandler(e)} name="groups" content="My Groups" className="button" color="green"/>
                    <Button onClick={e => this.clickHandler(e)} name="/groups/create" content="Create Group" className="button" color="green"/>
                </div>)

    }
}

export default Home
