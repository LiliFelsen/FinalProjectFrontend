import React from 'react'
import { Card } from 'semantic-ui-react'
import RestaurantCard from './RestaurantCard'

const RestaurantsList = ({ restaurantsDetails }) => {

  return(
    <Card.Group>
      {restaurantsDetails.map(rest =>
        <RestaurantCard key={rest.id} restaurant={rest} />
      )}
    </Card.Group>
  )
}

export default RestaurantsList
