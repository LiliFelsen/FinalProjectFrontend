import React from 'react'
import { Input, Grid } from 'semantic-ui-react'
import AddressSearchAndCreate from './AddressSearchAndCreate'
import FilterShow from './FilterShow'

const UserNavbar = (props) => {

  return (
    <Grid style={{ margin: '0 2em 0 0' }}>
      <Grid.Row columns={3}>
        <Grid.Column width={6} textAlign='right' >
          <AddressSearchAndCreate fetchData={props.fetchData}
            currentUserId={props.currentUser.id}
            shownUserId={props.shownUserId} />
        </Grid.Column>
        <Grid.Column width={4} textAlign='center' >
          <FilterShow handleShow={props.handleShow} />
        </Grid.Column>
        <Grid.Column width={6} textAlign='left' >
          <Input icon='search' placeholder='Browse your places...' onChange={props.handleSearch} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

export default UserNavbar
