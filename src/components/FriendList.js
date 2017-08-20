import React, { Component } from 'react'
import { Grid, Card, Input, Icon, Button, Modal, Header } from 'semantic-ui-react'

class FriendList extends Component {

  state = {
    currentUser: '',
    allUsers: [],
    currentUserFriends: [],
    usernameInput: '',
    addedFriend: '',
    modalOpen: false
  }

  componentWillReceiveProps = (nextProps) => {
    fetch(process.env.REACT_APP_API + '/users')
    .then(resp => resp.json())
    .then(users => {
      let currentUser = users.filter(user => user.id === nextProps.currentUserId)[0]
      this.setState({
        currentUser: currentUser,
        allUsers: users
      }
    )})
  }

  componentDidMount = () => {
    fetch(process.env.REACT_APP_API + '/users')
    .then(resp => resp.json())
    .then(users => {
      let currentUser = users.filter(user => user.id === this.props.currentUserId)[0]
      this.setState({
        currentUser: currentUser,
        allUsers: users
      }
    )})
  }

  handleOpen = () => {
    this.setState({ modalOpen: true })
  }

  handleClose = () => {
    this.setState({ modalOpen: false })
  }

  handleChange = (event) => {
    this.setState({ usernameInput: event.target.value })
  }

  handleFriend = (event) => {
    this.handleOpen()
    this.setState({ addedFriend: this.state.allUsers.filter(
      user => user.username.toLowerCase() === this.state.usernameInput.toLowerCase())[0]
    })
  }


  render(){
    // console.log('current user:', this.state.currentUser);
    return(
      <div style={{ margin: '2em 0 0 0' }}>
        <Grid centered>
          <Grid.Column textAlign='center'>
            <Card fluid  style={{ background: 'rgba(245, 243, 243, 0.85)' }}>
              <Card.Content>
                  <Input placeholder='Add friend by username' onChange={this.handleChange}/>
                  <Modal
                    trigger={<Button className='button-colored-teal' onClick={this.handleFriend} icon='add user' />}
                    open={this.state.modalOpen}
                    onClose={this.handleClose}
                    size='mini'
                  >
                    <Modal.Description>
                      {!this.state.addedFriend ?
                        <div style={{ margin: '0 5em' }}>
                          <br/><br/><br/>
                          <center><h3>Oops... We don't have any user with that username.</h3></center>
                          <br/><br/>
                          <Button floated='right' color='black' onClick={this.handleClose}>Exit</Button>
                          <br/><br/><br/>
                        </div> :
                        <Grid textAlign='center' style={{ margin: '0.5em 1em' }}>
                          <Grid.Row>
                            <Grid.Column>
                              <Header>
                                <Icon name='user circle' size='huge' color='teal' />
                                {this.state.addedFriend.username}
                              </Header>
                              {this.state.addedFriend.restaurants ?
                                <p>{this.state.addedFriend.restaurants.length} places saved.</p>
                                : null }
                              {this.state.addedFriend.reviews ?
                                <p>{this.state.addedFriend.restaurants.length} reviews posted.</p>
                                : null }
                                <Button color='black' onClick={this.createFriendship}>Add</Button>
                            </Grid.Column>
                          </Grid.Row>
                        </Grid>
                      }
                    </Modal.Description>
                  </Modal>

              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid>
      </div>
    )
  }

}

export default FriendList
