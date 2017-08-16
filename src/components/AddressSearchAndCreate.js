import React, { Component } from 'react'
import { Input, Button, Modal, Icon, Dropdown, Form, Radio, Grid } from 'semantic-ui-react'
import Autocomplete from 'react-google-autocomplete'

class AddressSearchAndCreate extends Component {

  state = {
      currentPlaceId: '',
      currentRestaurant: {},
      existingTags: [],
      selectedTagsId: [],
      newTags: [],
      currentTag: '',
      visited: false,
      modalOpen: false
    }

  componentDidMount = () => {
    fetch(process.env.REACT_APP_API + '/tags')
      .then(resp => resp.json())
      .then(existingTags => this.setState({ existingTags }))
  }

  handleOpen = () => {
    this.setState({ modalOpen: true, newTags: [] })
  }

  handleClose = () => {
    this.setState({ modalOpen: false })
  }

  fetchRestaurant = () => {
    fetch(process.env.REACT_APP_API + '/restaurants')
      .then(resp => resp.json())
      .then(restaurants => {
        this.setState({
          currentRestaurant: restaurants.filter(r => r.placeId === this.state.currentPlaceId)[0]
        })
      }
    )
  }

  handleSelectedRestaurant = (place) => {
    this.setState({ currentPlaceId: place.place_id })
    let restaurant = {
      placeId: place.place_id,
      name: place.name,
      address: place.formatted_address,
      phone_number: place.formatted_phone_number,
      website: place.website,
      hours_monday: place.opening_hours.weekday_text[0],
      hours_tuesday: place.opening_hours.weekday_text[1],
      hours_wednesday: place.opening_hours.weekday_text[2],
      hours_thursday: place.opening_hours.weekday_text[3],
      hours_friday: place.opening_hours.weekday_text[4],
      hours_saturday: place.opening_hours.weekday_text[5],
      hours_sunday: place.opening_hours.weekday_text[6]
    }
    fetch(process.env.REACT_APP_API + '/restaurants', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(restaurant)
    })
      .then(() => this.fetchRestaurant())
  }

  handleSelectTag = (event, data) => {
    this.setState({ selectedTagsId: data.value })
  }

  handleTagInput = (event) => {
    this.setState({ currentTag: event.target.value })
  }

  handleNewTag = (event) => {
    event.preventDefault()
    document.getElementById('tag').value = ""
    this.setState({ newTags: [...this.state.newTags, this.state.currentTag] })
  }

  handleVisited = (event) => {
    this.setState({ visited: !this.state.visited })
  }

  createUserRestaurant = () => {
    fetch(process.env.REACT_APP_API + '/user_restaurants', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        user_id: this.props.currentUserId,
        restaurant_id: this.state.currentRestaurant.id,
        visited: this.state.visited
      })
    })
      .then(() => this.props.fetchRestaurants())
  }

  createRestaurantTags = () => {
    if (this.state.selectedTagsId) {
      this.state.selectedTagsId.map(tagId =>
        fetch(process.env.REACT_APP_API + '/restaurant_tags', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            restaurant_id: this.state.currentRestaurant.id,
            tag_id: tagId
          })
        })
      )
    }
  }

  createRestaurantTagsForNewTags = () => {
  let tagsToAddToRest = this.state.newTags.map(tag =>
      this.state.existingTags.filter(e => e.name === tag)[0].id
    )
    tagsToAddToRest.map(tagId =>
      fetch(process.env.REACT_APP_API + '/restaurant_tags', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          restaurant_id: this.state.currentRestaurant.id,
          tag_id: tagId
        })
      })
    )
  }

  createTagsThenRestaurantTags = () => {
    if (this.state.newTags.length > 0) {
      this.state.newTags.map(tag =>
        fetch(process.env.REACT_APP_API + '/tags', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({ name: tag })
        })
        .then(() => fetch(process.env.REACT_APP_API + '/tags')
          .then(resp => resp.json())
          .then(existingTags => this.setState({ existingTags }))
          .then(() => this.createRestaurantTagsForNewTags())
        )
      )
    }
  }

  handleSaveRestaurant = () => {
    this.handleClose()
    this.createUserRestaurant()
    this.createRestaurantTags()
    this.createTagsThenRestaurantTags()
    document.getElementById('autocomplete').value = ""
  }

  render(){
    const tagOptions = this.state.existingTags.map(tag => {
      return {key: tag.id, text: tag.name, value: tag.id}
    })

    return(
      <div>
          <Input>
            <Autocomplete
              id='autocomplete'
              placeholder='Search new restaurant'
              onPlaceSelected={this.handleSelectedRestaurant}
              types={['establishment']}
              componentRestrictions={{country: 'us'}}
            />
          </Input>
          <Modal
            trigger={<Button onClick={this.handleOpen} icon='plus' color='white'/>}
            open={this.state.modalOpen}
            onClose={this.handleClose}
          >
            <Modal.Header>Add a restaurant to your list:</Modal.Header>
              <Modal.Description>
                {this.state.currentRestaurant ?
                  <Grid style={{ margin: '0.5em 1em' }}>
                    <Grid.Row>
                      <Grid.Column>
                        <h2>{this.state.currentRestaurant.name}</h2>
                        <h4>{this.state.currentRestaurant.address}</h4>
                        <h4>{this.state.currentRestaurant.phone_number}</h4>
                        <p>Have you been there? {this.state.visited === false ? ' No' : ' Yes'}</p>
                        <Radio toggle onChange={this.handleVisited} />
                        <p>Select existing tags:</p>
                        <Dropdown placeholder='Tags' fluid multiple selection options={tagOptions} onChange={this.handleSelectTag} />
                        <br/>
                        <p>and/or create new ones:</p>
                        <ul>{this.state.newTags.map(tag => <li key={tag.id}>{tag}</li>)}</ul>
                        <Form onSubmit={this.handleNewTag}>
                          <Form.Field id='tag' placeholder='New tag name' control={Input} onChange={this.handleTagInput} />
                          <Button type='submit'><Icon name='plus' /></Button>
                        </Form>
                        <br/>
                        <Button onClick={this.handleSaveRestaurant} floated='right' color='black'>Save</Button>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                  : null
                }
              </Modal.Description>
            </Modal>
      </div>
    )
  }
}

export default AddressSearchAndCreate
