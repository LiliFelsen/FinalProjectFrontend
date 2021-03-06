import React, { Component } from 'react'
import RestaurantPageFriend from './RestaurantPageFriend'
import RestaurantPageUser from './RestaurantPageUser'

class RestaurantPage extends Component {

  state = {
    modalOpen: false,
    currentRestaurant: '',
    currentUserRestaurant: '',
    visited: false,
    restaurantReviews: [],
    review: '',
    rating: 0
  }

  fetchData = () => {
    const id = this.props.match.params.id
    fetch(process.env.REACT_APP_API + `/restaurants/${id}`)
      .then(resp => resp.json())
      .then(currentRestaurant => {
        let currentUserRestaurant = currentRestaurant.user_restaurants.filter(rest => rest.user_id === this.props.shownUserId)[0]
        if (currentUserRestaurant) {
          this.setState({
            currentRestaurant: currentRestaurant,
            currentUserRestaurant: currentUserRestaurant,
            visited: currentUserRestaurant.visited,
            restaurantReviews: currentRestaurant.reviews
          })
        }
      })
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
        user_id: this.props.currentUser.id,
        restaurant_id: this.state.currentRestaurant.id,
        rating: this.state.rating,
        notes: this.state.review
      })
    })
    .then(() => this.fetchData())
    .then(() => this.setState({ rating: 0 }))
  }

  handleVisited = (event) => {
    this.setState({ visited: !this.state.visited },
      () => {
        fetch(process.env.REACT_APP_API + `/user_restaurants/${this.state.currentUserRestaurant.id}`, {
          method: 'PUT',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            visited: this.state.visited
          })
        })
      }
    )
  }

  handleDeleteReview = (event) => {
    fetch(process.env.REACT_APP_API + `/reviews/${event.target.id}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'}
    })
    .then(() => this.fetchData())
  }


  render() {
    return (
      <div>
        {this.props.currentUser.id !== this.props.shownUserId ?
          <RestaurantPageFriend shownUserId={this.props.shownUserId}
            currentUser={this.props.currentUser}
            fetchData={this.fetchData}
            visited={this.state.visited}
            currentRestaurant={this.state.currentRestaurant}
            restaurantReviews={this.state.restaurantReviews}
            deleteReview={this.handleDeleteReview} /> :
          <RestaurantPageUser shownUserId={this.props.shownUserId}
            currentUser={this.props.currentUser}
            fetchData={this.fetchData}
            visited={this.state.visited}
            currentRestaurant={this.state.currentRestaurant}
            restaurantReviews={this.state.restaurantReviews}
            deleteReview={this.handleDeleteReview}
            handleVisited={this.handleVisited}
            review={this.state.review}
            rating={this.state.rating}
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
            modalOpen={this.state.modalOpen}
            handleOpen={this.handleOpen}
            handleClose={this.handleClose}
            />
        }
      </div>
    )
  }
}

export default RestaurantPage
