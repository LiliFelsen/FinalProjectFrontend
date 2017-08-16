import React from 'react'
import { Card } from 'semantic-ui-react'

const RestaurantDetailledCard = ({ restaurant }) => {
  return(
    <Card fluid>
      <Card.Content>
        <Card.Header style={{ color: '#14DBD9'}}>
          <center>{restaurant.name}</center>
        </Card.Header>
      </Card.Content>
      <Card.Content>
        <Card.Description>
          <p>
            {restaurant.address}<br/>
            <br/>
            {restaurant.phone_number}<br/>
            <br/>
            <a href={restaurant.website} target="_blank">{restaurant.website}</a><br/>
            <br/>
            {restaurant.hours_monday}<br/>
            {restaurant.hours_tuesday}<br/>
            {restaurant.hours_wednesday}<br/>
            {restaurant.hours_thursday}<br/>
            {restaurant.hours_friday}<br/>
            {restaurant.hours_saturday}<br/>
            {restaurant.hours_sunday}<br/>
          </p>
        </Card.Description>
      </Card.Content>
    </Card>
  )
}

export default RestaurantDetailledCard
