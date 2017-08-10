import React, { Component } from 'react'
import PlacesAutocomplete, { geocodeByAddress, getLatLng, geocodeByPlaceId } from 'react-places-autocomplete'

class SearchForm extends Component {
  constructor(){
    super()

    this.state = {
      address: ''
    }

    this.onChange = (address) => this.setState({ address })

  }

  handleFormSubmit = (event) => {
    event.preventDefault()
    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .catch(error => console.log('Error', error))
  }

  render(){
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange
    }

    return(
      <form onSubmit={this.handleFormSubmit}>
        <PlacesAutocomplete inputProps={inputProps} />
        <button type="submit">Submit</button>
      </form>
    )
  }

}

export default SearchForm
