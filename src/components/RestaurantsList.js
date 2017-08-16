import React from 'react'
import { Card, Container } from 'semantic-ui-react'
import RestaurantCard from './RestaurantCard'

const RestaurantsList = ({ restaurantsDetails }) => {
  return(
    <Container fluid style={{height: '700px', overflowY: 'scroll', overflowX: 'hidden' }}>
    <Card.Group>
      {restaurantsDetails.map(rest =>
        <RestaurantCard key={rest.id} restaurant={rest} />
      )}
    </Card.Group>
    </Container>
  )
}

export default RestaurantsList
