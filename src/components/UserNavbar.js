import React, { Component } from 'react'
import { Input, Button, Modal } from 'semantic-ui-react'
import AddressSearch from './AddressSearch'
import FilterShow from './FilterShow'

class UserNavbar extends Component {


  render(){
    return(
      <div>
        <AddressSearch />
        <FilterShow />
        <Input icon='search' placeholder='Browse your places...' />
      </div>
    )
  }

}

export default UserNavbar
