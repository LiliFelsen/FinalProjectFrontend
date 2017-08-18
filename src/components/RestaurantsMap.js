import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'
import { Container } from 'semantic-ui-react'
import RestaurantMapPoint from './RestaurantMapPoint'

class RestaurantsMap extends Component {
  render(){
    return(
      <Container style={{ width: '100%', height: '650px' }}>
        <GoogleMapReact
          center={{lat: 40.7236346, lng: -73.9639765}}
          defaultZoom={12}
        >
          {this.props.restaurantsDetails.map(rest =>
            <RestaurantMapPoint
              key={rest.id}
              lat={rest.lat}
              lng={rest.lng}
              text={rest.name}
              linkTo={`/my_places/${rest.id}`}
              icon='marker'
              size='big'
            />
          )}
        </GoogleMapReact>
      </Container>
    )
  }
}

export default RestaurantsMap
