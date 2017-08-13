import React, { Component } from 'react'
import { Card } from 'semantic-ui-react'
import RestaurantCard from './RestaurantCard'

class RestaurantList extends Component {
  render(){
    console.log(this.props.restaurantsDetails);
    return(
      <div>
        <Card.Group>
          {this.props.restaurantsDetails.map(rest =>
            <RestaurantCard restaurant={rest} />
          )}
        </Card.Group>
      </div>
    )
  }
}

export default RestaurantList
