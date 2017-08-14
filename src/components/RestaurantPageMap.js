import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'
import { Container } from 'semantic-ui-react'
import RestaurantMapPoint from './RestaurantMapPoint'

// const RestaurantPagemap = ({ text }) => <div>{text}</div>

class RestaurantPageMap extends Component {

  render(){
    return(
      <Container style={{ width: '100%', height: '390px' }}>
        <GoogleMapReact
          center={{lat: 40.7664772, lng: -73.9759242}}
          defaultZoom={12}
        >
            <RestaurantMapPoint
              lat={this.props.restaurant.lat}
              lng={this.props.restaurant.lng}
              text={this.props.restaurant.name}
              linkTo={`/my_places/${this.props.restaurant.id}`}
              icon='map pin'
            />
        </GoogleMapReact>
      </Container>
    )
  }
}

export default RestaurantPageMap
