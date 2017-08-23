import React from 'react'
import { Card, Container } from 'semantic-ui-react'
import RestaurantCard from './RestaurantCard'

const RestaurantsList = ({ restaurantsDetails, shownUserId }) => {

  return (
    <Container className='restaurants-list' fluid>
      <Card.Group>
        {restaurantsDetails.map(rest =>
          <RestaurantCard key={rest.id} restaurant={rest} shownUserId={shownUserId}/>
        )}
      </Card.Group>
    </Container>
  )
}

export default RestaurantsList
