import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'
import { Container } from 'semantic-ui-react'
import RestaurantMapPoint from './RestaurantMapPoint'

class RestaurantPageMap extends Component {

  render() {
    let lat1 = parseFloat(this.props.restaurant.lat)
    let lng1 = parseFloat(this.props.restaurant.lng)
    console.log('RestaurantPageMap', this.props.restaurant, lat1, lng1);
    return(
      <Container style={{ width: '100%', height: '500px' }}>
        {this.props.restaurant ?
          <GoogleMapReact
            center={{lat: lat1, lng: lng1}}
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
