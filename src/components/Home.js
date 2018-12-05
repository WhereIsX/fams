import React, { Component } from 'react'
import GroupTile from './GroupTile'
import { Button, Grid } from "semantic-ui-react"


class Home extends Component {
   state = {
       path: "",
       groups: [],
       filteredGroups: [],
       myGroupsClicked: false,
   }

    componentDidMount(){
        console.log(this.props.apiUrl, this.props.token)
        fetch(`${this.props.apiUrl}/groups`, {
          headers: {
            "content-type": "application/json",
            "accepts": "application/json",
            Authorization: `${this.props.token}`
          }
        })
        .then(res => res.json())
        .then(data => {
          this.setState({ groups: data, filteredGroups: data})
          console.log("got to home fetch", data)
        })
    }

    clickHandler = (e) => {
        this.props.history.replace(e.target.name)
    }

    filterGroups = () => {
        console.log(this.props.user.user.id)
        this.setState({ 
            filteredGroups: [...this.state.groups].filter(group => {
            return group.members.length > 0 && this.props.user.user.id === group.members[0].user_id
        }),
            myGroupsClicked: !this.state.myGroupsClicked
        }, () => console.log(this.state.filteredGroups))
        
    }

    resetGroups = () => {
        this.setState({ filteredGroups: [...this.state.groups], myGroupsClicked: !this.state.myGroupsClicked})
    }

    render(){
        console.log(this.props.user)
        let allGroups = this.state.filteredGroups.map(group => {
            return(<GroupTile
                    key={group.id}
                    group={group}
                    props={this.props}
                    token={this.props.token}
                    />)
        })
        return (<div>
                    <h1>{(this.state.myGroupsClicked === false ? "You're Home": "My Groups")}</h1>
                    <Grid>
                        {allGroups}
                    </Grid>
                    <br></br>
                    <Button onClick={(this.state.myGroupsClicked === false ? this.filterGroups : this.resetGroups)} name="groups" content={(this.state.myGroupsClicked === false ? "My Groups" : "Go Back")} className="button" color="green"/>
                    <Button onClick={e => this.clickHandler(e)} name="/groups/create" content="Create Group" className="button" color="green"/>
                </div>)

    }
}

export default Home
