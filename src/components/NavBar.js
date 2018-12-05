import React, { Component } from 'react'
import { Input, Menu, Form, Dropdown } from 'semantic-ui-react'
import { Redirect, NavLink } from 'react-router-dom'

export default class NavBar extends Component {
    state = {
        path: "",
        search: ""
    }

    handleClick = (e) => {
        console.log(this.props)
        if (e.target.innerText === "Home") {
            return <Redirect push to="/home" />
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
        console.log(this.props.props.user)  
        return (
        <Menu id="navbar">
            <Menu.Item name="home" >
                <NavLink to="/" className="nav-item">Home</NavLink>
            </Menu.Item>
            <Menu.Item>
                <NavLink to="/groups" className="nav-item">Groups</NavLink>
            </Menu.Item>
            <Menu.Item>
                <NavLink to="/" onClick={this.props.logout}>{this.props.props.user ? "Logout" : "Login"}</NavLink>
            </Menu.Item>
        </Menu>
    )
  }
}