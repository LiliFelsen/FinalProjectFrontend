import React, { Component } from 'react'
import { Input } from 'semantic-ui-react'
import Autocomplete from 'react-google-autocomplete'

class AddressSearch extends Component {

state = {
  placeId: '',
  name: '',
  address: '',
  phoneNumber: ''
}

handleSelected = (place) => {
  console.log('place selected is:', place)
  let restaurant = {
    placeId: place.place_id,
    name: place.name,
    address: place.formatted_address,
    phone_number: place.formatted_phone_number,
    website: place.website
  }
  console.log(restaurant)
  fetch('http://localhost:3000/api/v1/restaurants', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(restaurant)
  })
}


render(){
  console.log('current state is:', this.state);
  return(
    <div>
        <Autocomplete
          style={{width: '100%', padding: '1em 1em'}}
          placeholder='Enter restaurant name'
          onPlaceSelected={this.handleSelected}
          types={['establishment']}
          componentRestrictions={{country: 'us'}}
        />
        <div id="map"></div>
    </div>
  )
}
}

export default AddressSearch
