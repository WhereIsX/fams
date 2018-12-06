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
        if(this.props.user){
            console.log(this.props.apiUrl, this.props.token)
            // debugger
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
        } else {
            this.props.history.replace("/")
        }
            
    }

    clickHandler = (e) => {
        this.props.history.replace(e.target.name)
    }

    filterGroups = () => {
        let props = this.props
        let user = this.props.user
        if (this.props.user) {
            this.setState({ 
            filteredGroups: [...this.state.groups].filter(group => {
                return group.members.length > 0 && this.props.user.id === group.members[0].user_id
            }),
                myGroupsClicked: !this.state.myGroupsClicked
            })
        } else {
            alert("Uh Oh! Something Went Wrong! Please Try Again!")
        }

    }

    resetGroups = () => {
        this.setState({ filteredGroups: [...this.state.groups], myGroupsClicked: !this.state.myGroupsClicked})
    }

    render(){
        console.log(this.props.user)
        let allGroups = this.state.filteredGroups.map(group => {
            return(<div className="groupTile">
                        <Grid.Column>
                            <GroupTile
                            key={group.id}
                            group={group}
                            props={this.props}
                            token={this.props.token}
                            id="tile"
                            />
                        </Grid.Column>
                    </div>)
        })
        return (<div>
                    <div className="header"><h1>{(this.state.myGroupsClicked === false ? "Welcome Home": "Groups I Made")}</h1></div>
                    <Grid className="tile-wrapper">
                        <Grid.Row >
                            {allGroups}
                        </Grid.Row>
                    </Grid>
                    <br></br>
                    <Button onClick={(this.state.myGroupsClicked === false ? this.filterGroups : this.resetGroups)} name="groups" content={(this.state.myGroupsClicked === false ? "My Groups" : "Go Back")} className="button" color="instagram"/>
                    <Button onClick={e => this.clickHandler(e)} name="/groups/create" content="Create Group" className="button" color="green"/>
                </div>)

    }
}

export default Home
