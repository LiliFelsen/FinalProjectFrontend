import React, { Component } from 'react'
import { Input, Button, Modal } from 'semantic-ui-react'
import AddressSearch from './AddressSearch'
import FilterShow from './FilterShow'

class UserNavbar extends Component {

  render(){
    return(
      <div>
        <Modal trigger={<Button content='Add new restaurant' icon='plus' labelPosition='left' />}>
          <Modal.Header>Look for a restaurant</Modal.Header>
            <Modal.Description>
              <AddressSearch />
            </Modal.Description>
        </Modal>

        <FilterShow />
        <Input icon='search' placeholder='Search by name' />
      </div>
    )
  }

}

export default UserNavbar
