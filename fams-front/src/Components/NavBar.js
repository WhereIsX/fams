import React, { Component } from 'react'
import { Input, Menu, Form, Button } from 'semantic-ui-react'

export default class NavBar extends Component {
    state = {
        activeItem: "",
        search: ""
    }

    handleClick = (e) => {
        console.log(e.target.innerText)
    }

    handleSubmit = (e) => {
        // debugger
        e.preventDefault()
        console.log(this.state.search)
    }

    onChange = (e) => {
       this.setState({ search: e.target.value})
    }

    render() {
        return (
        <Menu id="navbar">
            <Menu.Item name="home" className="nav-item" onClick={e => this.handleClick(e)} />
            <Menu.Item name="join" className="nav-item" onClick={e => this.handleClick(e)} />
            <Menu.Item name="create" className="nav-item" onClick={e => this.handleClick(e)} />
            <Menu.Menu position="right">
                <Menu.Item  id="search">
                    <Form  onSubmit={e => this.handleSubmit(e)}>
                            <Input icon="search" placeholder="Search Groups" value={this.state.search} onChange={e => this.onChange(e)} />
                    </Form>
                </Menu.Item>
                <Menu.Item name="logout" className="nav-item" onClick={e => this.handleClick(e)} />
            </Menu.Menu>
        </Menu>
    )
  }
}

// "red","orange","yellow","olive","green","teal","blue","violet","purple","pink","brown","grey","black","facebook","google plus","instagram","linkedin","twitter","vk","youtube"