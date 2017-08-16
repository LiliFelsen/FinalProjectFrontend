import React, { Component } from 'react'
import { Grid, Button, Feed, Radio, Card } from 'semantic-ui-react'
import NavBar from './NavBar'
import RestaurantPageMap from './RestaurantPageMap'
import RestaurantPageReviews from './RestaurantPageReviews'
import RestaurantDetailledCard from './RestaurantDetailledCard'
import AddReviewModal from './AddReviewModal'
import AuthAdapter from '../Auth/authAdapter'

class RestaurantPage extends Component {

  state = {
    modalOpen: false,
    currentUserId: '',
    currentUsername: '',
    currentRestaurant: '',
    currentUserRestaurant: '',
    visited: '',
    restaurantReviews: [],
    review: '',
    rating: 0
  }

  fetchUserRestaurantInfo = () => {
    fetch(process.env.REACT_APP_API + '/user_restaurants')
      .then(resp => resp.json())
      .then(userRestaurants => this.setState({
        currentUserRestaurant: userRestaurants.filter(ur =>
        ur.user_id === this.state.currentUserId && ur.restaurant_id === this.state.currentRestaurant.id)[0]
      }))
      .then(() => this.setState({ visited: this.state.currentUserRestaurant.visited }))
  }

  fetchReviews = () => {
    fetch(process.env.REACT_APP_API + '/reviews')
      .then(resp => resp.json())
      .then(reviews => this.setState({
        restaurantReviews: reviews.filter(r =>
          r.user_id === this.state.currentUserId && r.restaurant_id === this.state.currentRestaurant.id)
      }))
  }

  fetchData = () => {
    const id = this.props.match.params.id
    fetch(process.env.REACT_APP_API + `/restaurants/${id}`)
      .then(resp => resp.json())
      .then(currentRestaurant => this.setState({ currentRestaurant }))
      .then(() => this.fetchReviews())
      .then(() => this.fetchUserRestaurantInfo())
  }

  componentDidMount = () => {
    AuthAdapter.currentUser()
      .then(user => this.setState({ currentUserId: user.id, currentUsername: user.username }))
      .then(() => this.fetchData())
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
    fetch(process.env.REACT_APP_API + '/reviews', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        user_id: this.state.currentUserId,
        restaurant_id: this.state.currentRestaurant.id,
        rating: this.state.rating,
        notes: this.state.review
      })
    })
    .then(() => this.fetchReviews())
  }

  handleVisited = (event) => {
    this.setState({ visited: !this.state.visited })
    fetch(process.env.REACT_APP_API + `/user_restaurants/${this.state.currentUserRestaurant.id}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        visited: true
      })
    })
  }

  handleDeleteReview = (event) => {
    fetch(process.env.REACT_APP_API + `/reviews/${event.target.id}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'}
    })
    .then(() => this.fetchReviews())
  }

  render(){
    return(
      <div id='restaurant-page'>
        <NavBar username={this.state.currentUsername} />
        <Grid container divided='vertically'>
          <Grid.Row stretched columns={2} verticalAlign='middle'>
            <Grid.Column>
              <RestaurantPageMap restaurant={this.state.currentRestaurant} />
            </Grid.Column>
            <Grid.Column>
              <RestaurantDetailledCard restaurant={this.state.currentRestaurant} />
              {!this.state.visited ?
                <Card fluid>
                  <Card.Content>
                  Did you try that restaurant since you added it?
                  <Radio toggle onChange={this.handleVisited} /><br/>
                  </Card.Content>
                </Card>
                : <Button color='red' size='tiny'>Visited</Button> }
                <br/>
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
            <Grid.Column verticalAlign='middle' width={8}>
              <Feed style={{ background: 'rgba(245, 243, 243, 0.90)' }}>
                {this.state.restaurantReviews.reverse().map(r => <RestaurantPageReviews key={r.id} review={r} deleteReview={this.handleDeleteReview}/>)}
              </Feed>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

export default RestaurantPage
