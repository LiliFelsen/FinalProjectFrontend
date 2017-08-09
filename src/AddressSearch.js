import React, { Component } from 'react'
import Autocomplete from 'react-google-autocomplete'

class AddressSearch extends Component {

state = {
  placeId: '',
  name: '',
  address: '',
  phoneNumber: ''
}

handleSelected = (place) => {
  console.log(place)
  this.setState({
    placeId: place.place_id,
    name: place.name,
    address: place.formatted_address,
    phoneNumber: place.formatted_phone_number
  })
}


render(){
  console.log(this.state);
  return(
    <div>
        <Autocomplete
          style={{width: '90%'}}
          onPlaceSelected={this.handleSelected}
          types={'establishment'}
          componentRestrictions={{country: 'us'}}
        />
    </div>
  )
}
}

export default AddressSearch
