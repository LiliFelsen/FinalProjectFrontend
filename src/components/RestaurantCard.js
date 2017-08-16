import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Button } from 'semantic-ui-react'

const RestaurantCard = ({ restaurant }) => {
  return (

      <Card key={restaurant.id}>
        <Card.Content>
          <Card.Header>
          <Link to={`/my_places/${restaurant.id}`}>  {restaurant.name} </Link>
          </Card.Header>
          <Card.Description>
            {restaurant.address}<br/>
            {restaurant.phone_number}<br/>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          {restaurant.user_restaurants[0].visited ?
            <Button color='red' className='button-colored-red' size='mini' disabled>Visited</Button> :
            <Button color='teal' className='button-colored-teal' size='mini' disabled>Wishlist</Button>}
        </Card.Content>
      </Card>

  )
}

export default RestaurantCard
