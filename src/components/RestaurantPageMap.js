import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'
import { Container } from 'semantic-ui-react'
import RestaurantMapPoint from './RestaurantMapPoint'

class RestaurantPageMap extends Component {

  render() {
    return(
      <Container style={{ width: '100%', height: '500px' }}>
        {this.props.restaurant.lat && this.props.restaurant.lng ?
          <GoogleMapReact
            center={{lat: this.props.restaurant.lat, lng: this.props.restaurant.lng}}
            defaultZoom={15}
          >
              <RestaurantMapPoint
                lat={this.props.restaurant.lat}
                lng={this.props.restaurant.lng}
                text={this.props.restaurant.name}
                linkTo={`/my_places/${this.props.restaurant.id}`}
                icon='pin'
                size='huge'
              />
          </GoogleMapReact>
          : null}
      </Container>
    )
  }
}

export default RestaurantPageMap
