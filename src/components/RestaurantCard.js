import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Button } from 'semantic-ui-react'

const RestaurantCard = (props) => {

  let restVisitStatus = props.restaurant.user_restaurants.find(rest => rest.user_id === props.shownUserId)

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
        {restVisitStatus.visited ?
          <Button color='red' className='button-colored-red' size='mini' disabled>Visited</Button> :
          <Button color='teal' className='button-colored-teal' size='mini' disabled>Wishlist</Button>}
      </Card.Content>
    </Card>
  )
}

export default RestaurantCard
