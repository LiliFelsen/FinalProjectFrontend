import React from 'react'
import { Menu } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

const NavBar = ({ username }) => {

  return(
    <Menu inverted>
      <Menu.Item><i>Hi, {username}!</i></Menu.Item>
      <Menu.Item><NavLink to='/my_places'>See all your places</NavLink></Menu.Item>
      <Menu.Item position='right'>
        <NavLink to="/logout">Logout</NavLink>
      </Menu.Item>
    </Menu>
  )
}


export default NavBar
