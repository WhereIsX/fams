import React, { Component } from 'react'
import {  Menu } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

export default class NavBar extends Component {
    state = {
        path: "",
        search: ""
    }

    render() {
        return (
        <Menu id="navbar">
            <Menu.Item name="home" >
                <NavLink to="/home" className="nav-item">Home</NavLink>
            </Menu.Item>
            <Menu.Item>
                <NavLink to="/" onClick={this.props.logout}>{this.props.props.user === null ? "Login" : "Logout "}</NavLink>
            </Menu.Item>
        </Menu>
    )
  }
}