import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Button } from 'semantic-ui-react'

const RestaurantCard = ({ restaurant }) => {
  debugger
  return (
    <Link to={`/my_places/${restaurant.id}`}>
      <Card key={restaurant.id}>
        <Card.Content>
          <Card.Header>
            {restaurant.name}
          </Card.Header>
          <Card.Description>
            {restaurant.address}<br/>
            {restaurant.phone_number}<br/>

          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          {restaurant.user_restaurants[0].visited ?
            <Button color='teal' size='mini' disabled>Done</Button> :
            <Button color='violet' size='mini' disabled>Wishlist</Button>}
        </Card.Content>
      </Card>
    </Link>
  )
}

export default RestaurantCard
