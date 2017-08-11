import React, { Component } from 'react'
import { Input, Button, Modal, Grid } from 'semantic-ui-react'
import AddressSearchAndCreate from './AddressSearchAndCreate'
import FilterShow from './FilterShow'

class UserNavbar extends Component {


  render(){
    return(
      <Grid>
        <Grid.Row columns={3}>
          <Grid.Column width={6} textAlign='right' >
            <AddressSearchAndCreate />
          </Grid.Column>
          <Grid.Column width={4} textAlign='center' >
            <FilterShow />
          </Grid.Column>
          <Grid.Column width={6} textAlign='left' >
            <Input icon='search' placeholder='Browse your places...' />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }

}

export default UserNavbar
