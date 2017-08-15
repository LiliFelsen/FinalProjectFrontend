import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'
import { Container } from 'semantic-ui-react'
import RestaurantMapPoint from './RestaurantMapPoint'

class RestaurantsMap extends Component {
  render(){
    return(
      <Container style={{ width: '100%', height: '550px' }}>
        <GoogleMapReact
          center={{lat: 40.7510467, lng: -73.9754778}}
          defaultZoom={12}
        >
          {this.props.restaurantsDetails.map(rest =>
            <RestaurantMapPoint
              key={rest.id}
              lat={rest.lat}
              lng={rest.lng}
              text={rest.name}
              linkTo={`/my_places/${rest.id}`}
              icon='map pin'
            />
          )}
        </GoogleMapReact>
      </Container>
    )
  }
}

export default RestaurantsMap
