import React, { Component } from 'react'
import { Grid, Button, Feed } from 'semantic-ui-react'
import RestaurantPageMap from './RestaurantPageMap'
import RestaurantPageReviews from './RestaurantPageReviews'
import RestaurantDetailledCard from './RestaurantDetailledCard'
import AddReviewModal from './AddReviewModal'

class RestaurantPage extends Component {

  state = {
    modalOpen: false,
    currentRestaurant: '',
    restaurantReviews: [],
    review: '',
    rating: 0
  }

  fetchData = () => {
    const id = this.props.match.params.id
    fetch(`http://localhost:3000/api/v1/restaurants/${id}`)
      .then(resp => resp.json())
      .then(currentRestaurant => this.setState({ currentRestaurant }))
    fetch('http://localhost:3000/api/v1/reviews')
      .then(resp => resp.json())
      .then(reviews => this.setState({
        restaurantReviews: reviews.filter(r =>
          r.user_id === 1 && r.restaurant_id === this.state.currentRestaurant.id)
      }))
      // TODO: update user_id with real current user
  }

  componentDidMount = () => {
    this.fetchData()
  }

  handleOpen = (e) => this.setState({
    modalOpen: true,
  })

  handleClose = (e) => this.setState({
    modalOpen: false,
  })

  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.handleClose()
    fetch('http://localhost:3000/api/v1/reviews', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        user_id: 1,
        restaurant_id: this.state.currentRestaurant.id,
        rating: this.state.rating,
        notes: this.state.review
      })
    })
    .then(() => {
      this.fetchData()
    })
    // TODO: update user_id with real current user
  }

  render(){
    // console.log('current restaurant reviews:', this.state.restaurantReviews);
    // console.log('current restaurant id:', this.state.currentRestaurant.id);
    return(
      <div className='restaurant_page'>
        <Grid container divided='vertically'>
          <Grid.Row stretched columns={2} verticalAlign='middle'>
            <Grid.Column>
              <RestaurantPageMap restaurant={this.state.currentRestaurant} />
            </Grid.Column>
            <Grid.Column>
              <RestaurantDetailledCard restaurant={this.state.currentRestaurant} />
              <AddReviewModal restaurant={this.state.currentRestaurant}
                review={this.state.review}
                rating={this.state.rating}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                modalOpen={this.state.modalOpen}
                handleOpen={this.handleOpen}
                handleClose={this.handleClose} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row centered columns={1}>
            <Grid.Column verticalAlign='middle' width={10}>
              <Feed>
                {this.state.restaurantReviews.reverse().map(r => <RestaurantPageReviews key={r.id} review={r} />)}
              </Feed>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

export default RestaurantPage
