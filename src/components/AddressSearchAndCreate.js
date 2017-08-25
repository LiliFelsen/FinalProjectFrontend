import React, { Component } from 'react'
import { Input, Button, Modal, Icon, Dropdown, Form, Checkbox, Grid, Dimmer, Loader } from 'semantic-ui-react'
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
      modalOpen: false,
      loading: true
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
        let currentRestaurant = restaurants.find(r => r.placeId === this.state.currentPlaceId)
        this.setState({
          currentRestaurant: currentRestaurant,
          loading: false
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
      hours_monday: place.opening_hours ? place.opening_hours.weekday_text[0] : "Monday: Standard Hours",
      hours_tuesday: place.opening_hours ? place.opening_hours.weekday_text[1] : "Tuesday: Standard Hours",
      hours_wednesday: place.opening_hours ? place.opening_hours.weekday_text[2] : "Wednesday: Standard Hours",
      hours_thursday: place.opening_hours ? place.opening_hours.weekday_text[3] : "Thursday: Standard Hours",
      hours_friday: place.opening_hours ? place.opening_hours.weekday_text[4] : "Friday: Standard Hours",
      hours_saturday: place.opening_hours ? place.opening_hours.weekday_text[5] : "Saturday: Standard Hours",
      hours_sunday: place.opening_hours ? place.opening_hours.weekday_text[6] : "SUnday: Standard Hours"
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
      .then(() => {
        this.setState({ visited: false })
        this.props.fetchData(this.props.shownUserId)
      })
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
        .then(() => this.setState({ selectedTagsId: [] }))
      )
    }
  }

  createRestaurantTagsForNewTags = () => {
    let tagsToAddToRest = this.state.newTags.map(tag =>
      this.state.existingTags.filter(e => e.name === tag)[0].id
    )
    if (tagsToAddToRest.length > 0) {
      tagsToAddToRest.map(tagId => (
        fetch(process.env.REACT_APP_API + '/restaurant_tags', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            restaurant_id: this.state.currentRestaurant.id,
            tag_id: tagId
          })
        })
        .then(() => this.setState({ currentRestaurant: {}, newTags: [] }))
      ))
    }
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
          .then(existingTags => {
            this.setState({ existingTags },
            () => {
              this.createRestaurantTagsForNewTags()
            })

          })
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

  render() {
    let tagOptions = this.state.existingTags.map(tag => {
      return {key: tag.id, text: tag.name, value: tag.id}
    }).sort(function(a, b){
      if (a.text < b.text)
        return -1
      if (a.text.toLowerCase() > b.text.toLowerCase())
      return 1
    })

    const loader = (
      <Dimmer active inverted>
        <Loader inverted size='medium' content='Loading...'/>
      </Dimmer>)

    return (
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
            trigger={<Button onClick={this.handleOpen} icon='plus' color='grey'/>}
            open={this.state.modalOpen}
            onClose={this.handleClose}
          >
            <Modal.Header>Add a restaurant to your list:</Modal.Header>
              <Modal.Description>
                {this.state.loading ? loader :
                  <Grid style={{ margin: '0.5em 1em' }}>
                    <Grid.Row>
                      <Grid.Column>
                        <h2>{this.state.currentRestaurant.name}</h2>
                        <h4>{this.state.currentRestaurant.address}</h4>
                        <h4>{this.state.currentRestaurant.phone_number}</h4>
                        <p><Checkbox onChange={this.handleVisited} label='Have you been there?'/> &nbsp;
                         {this.state.visited === false ? 'No' : 'Yes'}</p>
                        <p>Select existing tags:</p>
                        <Dropdown placeholder='Tags' fluid multiple selection options={tagOptions} onChange={this.handleSelectTag} />
                        <br/>
                        <p>and/or create new ones:</p>
                        <ul>{this.state.newTags.map(tag => <li>{tag}</li>)}</ul>
                        <Form onSubmit={this.handleNewTag}>
                          <Form.Field id='tag' placeholder='New tag name' control={Input} onChange={this.handleTagInput} />
                          <Button type='submit'><Icon name='plus' /></Button>
                        </Form>
                        <br/>
                        <Button onClick={this.handleSaveRestaurant} floated='right' color='black'>Save</Button>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                }
              </Modal.Description>
            </Modal>
      </div>
    )
  }
}

export default AddressSearchAndCreate
