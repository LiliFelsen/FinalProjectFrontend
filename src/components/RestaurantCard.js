import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Button } from 'semantic-ui-react'

const RestaurantCard = (props) => {

  let UserRest = props.restaurant.user_restaurants.find(rest => rest.user_id === props.shownUserId)

  if (UserRest) {
    var visitStatus = UserRest.visited
  } else {
    return null
  }

  return (
    <Card key={props.restaurant.id}>
      <Card.Content>
        <Card.Header>
          <Link to={`/my_places/${props.restaurant.id}`}> {props.restaurant.name} </Link>
        </Card.Header>
        <Card.Description>
          {props.restaurant.address}<br/>
          {props.restaurant.phone_number}<br/>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        {visitStatus ?
          <Button color='red' className='button-colored-red' size='mini' disabled>Visited</Button> :
          <Button color='teal' className='button-colored-teal' size='mini' disabled>Wishlist</Button>}
      </Card.Content>
    </Card>
  )
}

export default RestaurantCard
