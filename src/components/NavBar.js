import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
import AuthAdapter from '../Auth/authAdapter'

class NavBar extends Component {

  render(){
    return(
      <Menu>
        <Menu.Item><NavLink to='/my_places'>See all your places</NavLink></Menu.Item>
        <Menu.Item position='right'>
          <NavLink to="/logout">Logout</NavLink>
        </Menu.Item>
      </Menu>
    )
  }

}

export default NavBar
