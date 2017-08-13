import React, { Component } from 'react'
import { Grid, Button } from 'semantic-ui-react'
import RestaurantDetailledCard from './RestaurantDetailledCard'
import AddReviewModal from './AddReviewModal'

class RestaurantPage extends Component {

  state = {
    currentRestaurant: ''
  }

  componentDidMount = () => {
      const id = this.props.match.params.id
      fetch(`http://localhost:3000/api/v1/restaurants/${id}`)
        .then(resp => resp.json())
        .then(currentRestaurant => this.setState({ currentRestaurant }))
  }

  render(){
    return(
      <div className='restaurant_page'>
        <Grid container divided='vertically'>
          <Grid.Row stretched columns={2} verticalAlign='middle'>
            <Grid.Column>
              Map with location
            </Grid.Column>
            <Grid.Column>
              <RestaurantDetailledCard restaurant={this.state.currentRestaurant} />
              <AddReviewModal restaurant={this.state.currentRestaurant} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row centered columns={1}>
            <Grid.Column width={10}>
              Show reviews
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

export default RestaurantPage
