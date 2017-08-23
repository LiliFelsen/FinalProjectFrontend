import React from 'react'
import { Button, Modal, Icon, Grid, Header } from 'semantic-ui-react'

const AddFriendModal = (props) => {

  return (
    <Modal
      trigger={<Button color='grey' onClick={props.handleFriend} icon='add user' />}
      open={props.modalOpen}
      onClose={props.handleClose}
      size='mini'
    >
      <Modal.Description>
        {!props.addedFriend ?
          <div style={{ margin: '0 5em' }}>
            <br/><br/><br/>
            <center><h3>Oops... We don't have any user with that username.</h3></center>
            <br/><br/>
            <Button floated='right' color='black' onClick={props.handleClose}>Exit</Button>
            <br/><br/><br/>
          </div> :
          <Grid textAlign='center' style={{ margin: '0.5em 1em' }}>
            <Grid.Row>
              <Grid.Column>
                <Header>
                  <Icon name='user circle' size='huge' color='teal' />
                  {props.addedFriend.username}
                </Header>
                {props.addedFriend.restaurants ?
                  <p>{props.addedFriend.restaurants.length} places saved.</p>
                  : null }
                {props.addedFriend.reviews ?
                  <p>{props.addedFriend.reviews.length} reviews posted.</p>
                  : null }
                  <Button color='black' onClick={props.createFriendship}>Add</Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        }
      </Modal.Description>
    </Modal>

  )
}

export default AddFriendModal
