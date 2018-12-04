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
        fetch("http://localhost:3003/groups")
        .then(res => res.json())
        .then(data => this.setState({ groups: data}))
    }

    render(){
        console.log(this.props)
        let allGroups = this.state.groups.map(group => {
            return(<GroupTile 
                    key={group.id}
                    group={group}
                    props={this.props}
                    />)
        })
        return (<div>
                    <h1>You're Home</h1>
                    <Grid>
                        {allGroups}
                    </Grid>
                    <Button onClick={e => this.clickHandler(e)} name="groups" content="My Groups" className="button" color="green"/> 
                    <Button onClick={e => this.clickHandler(e)} name="/groups/create" content="Create Group" className="button" color="green"/>
                <br></br>
                </div>)

    }
}

export default Home