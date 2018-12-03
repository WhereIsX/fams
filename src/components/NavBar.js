import React, { Component } from 'react'
import { Input, Menu, Form, Dropdown } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'
import { auth } from 'firebase';

export default class NavBar extends Component {
    state = {
        path: "",
        search: ""
    }

    handleClick = (e) => {
        console.log(this.props)
        if (e.target.innerText === "Home") {
            return <Redirect push to="/" />
        } else {
            return <Redirect push to={`/${e.target.innerText.toLowerCase()}`} />
        }
    }

    handleSubmit = (e) => {
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
            <Menu.Item name="groups" className="nav-item" onClick={e => this.handleClick(e)} />
            <Menu.Item name={this.props.props.loggedIn ? "logout" : "login"} className="nav-item" onClick={e => this.handleClick(e)} />
            <Form position="left" onSubmit={e => this.handleSubmit(e)}>
                <Input icon="search" placeholder="Search Groups" value={this.state.search} onChange={e => this.onChange(e)} />
            </Form>
        </Menu>
    )
  }
}