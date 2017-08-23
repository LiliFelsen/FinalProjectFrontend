import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Button } from 'semantic-ui-react'

class RestaurantCard extends React.Component {

  state = {
    restaurant: []
  }

  componentDidMount = () => {
    fetch(process.env.REACT_APP_API + '/user_restaurants')
      .then(resp => resp.json())
      .then(restaurants => {
        let currentRestaurant = restaurants.filter(rest => rest.restaurant_id === this.props.restaurant.id && rest.user_id === this.props.shownUserId)
        this.setState({ restaurant: currentRestaurant })
      })
  }

  render(){
    // console.log('from restaurantCard', this.state.restaurant, this.props.shownUserId);
    return (

        <Card key={this.props.restaurant.id}>
          <Card.Content>
            <Card.Header>
            <Link to={`/my_places/${this.props.restaurant.id}`}>  {this.props.restaurant.name} </Link>
            </Card.Header>
            <Card.Description>
              {this.props.restaurant.address}<br/>
              {this.props.restaurant.phone_number}<br/>
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            {this.state.restaurant.visited ?
              <Button color='red' className='button-colored-red' size='mini' disabled>Visited</Button> :
              <Button color='teal' className='button-colored-teal' size='mini' disabled>Wishlist</Button>}
          </Card.Content>
        </Card>

    )
  }
}

export default RestaurantCard
