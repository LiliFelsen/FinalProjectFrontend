import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'semantic-ui-react'

const RestaurantCard = ({ restaurant }) => {
  return (
    <Card key={restaurant.id}>
      <Card.Content>
        <Card.Header>
          {restaurant.name}
        </Card.Header>
        <Card.Description>
          {restaurant.address}<br/>
          {restaurant.phone_number}<br/>
          <a href={restaurant.website} target="_blank">{restaurant.website}</a><br/>
        </Card.Description>
      </Card.Content>
    </Card>
  )
}

export default RestaurantCard
