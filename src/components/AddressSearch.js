import React, { Component } from 'react'
import { Input, Button, Modal, Icon, Dropdown, Form } from 'semantic-ui-react'
import Autocomplete from 'react-google-autocomplete'

class AddressSearch extends Component {
  constructor(){
    super()

    this.state = {
      name: '',
      address: '',
      phoneNumber: '',
      website: '',
      existingTags: [],
      selectedTags: [],
      newTags: [],
      currentTag: ''
    }

  }

  componentDidMount = () => {
    fetch('http://localhost:3000/api/v1/tags')
      .then(resp => resp.json())
      .then(existingTags => this.setState({ existingTags }))
      .catch(error => console.log(error))
  }

  handleSelectedRestaurant = (place) => {
    // console.log('place selected is:', place)
    this.setState({
      name: place.name,
      address: place.formatted_address,
      phoneNumber: place.formatted_phone_number,
      website: place.website
    })
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
    console.log(restaurant)
    fetch('http://localhost:3000/api/v1/restaurants', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(restaurant)
    })
  }

  handleSelectTag = (event, data) => {
    this.setState({ selectedTags: data.value })
  }

  handleChange = (event) => {
    this.setState({ currentTag: event.target.value })
  }

  handleNewTag = (event) => {
    event.preventDefault()
    document.getElementById('tag').value = ""
    this.setState({ newTags: [...this.state.newTags, this.state.currentTag] })
  }


  render(){
    const options = this.state.existingTags.map(tag => { return {key: tag.id, text: tag.name, value: tag.name} })
    // console.log(options);
    // console.log('Existing tags:', this.state.existingTags);
    // console.log('Selected tags:', this.state.selectedTags);
    // console.log('current:', this.state.currentTag);
    // console.log('new tags:', this.state.newTags);
    // console.log('current state is:', this.state);
    return(
      <div>
          <Autocomplete
            style={{width: '40%', padding: '1em 1em'}}
            placeholder='Search new restaurant'
            onPlaceSelected={this.handleSelectedRestaurant}
            types={['establishment']}
            componentRestrictions={{country: 'us'}}
          />
          <Modal trigger={<Button icon><Icon name='plus' /></Button>}>
            <Modal.Header>Add restaurant to your list</Modal.Header>
              <Modal.Description>
                <h2>{this.state.name}</h2>
                <h4>{this.state.address}</h4>
                <h4>{this.state.phone_number}</h4>
                <h4>{this.state.website}</h4>
                <p>Select existing tags:</p>
                <Dropdown placeholder='Tags' fluid multiple selection options={options} onChange={this.handleSelectTag} />
                <p>and/or create new ones:</p>
                {this.state.newTags}
                <Form onSubmit={this.handleNewTag}>
                  <Form.Field id='tag' placeholder='new tag' control={Input} onChange={this.handleChange} />
                  <Button type='submit'><Icon name='plus' /></Button>
                </Form>
                <br/>
                <Button>Save</Button>
              </Modal.Description>
          </Modal>
      </div>
    )
  }
}

export default AddressSearch
