import React, { Component } from 'react'
import { Input, Button, Modal, Grid } from 'semantic-ui-react'
import AddressSearchAndCreate from './AddressSearchAndCreate'
import FilterShow from './FilterShow'

class UserNavbar extends Component {


  render(){
    return(
      <div>
          <AddressSearchAndCreate />
          <FilterShow />
          <Input icon='search' placeholder='Browse your places...' />
      </div>
    )
  }

}

export default UserNavbar
