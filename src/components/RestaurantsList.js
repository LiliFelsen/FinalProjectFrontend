import React from 'react'
import { Card, Container } from 'semantic-ui-react'
import RestaurantCard from './RestaurantCard'

const RestaurantsList = ({ restaurantsDetails }) => {
  return(
    <Container className='restaurants-list' fluid>
    <Card.Group>
      {restaurantsDetails.map(rest =>
        <RestaurantCard key={rest.id} restaurant={rest} />
      )}
    </Card.Group>
    </Container>
  )
}

export default RestaurantsList
