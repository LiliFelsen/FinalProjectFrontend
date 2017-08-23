import React, { Component } from 'react'
import { Grid, Button, Feed, Checkbox, Card } from 'semantic-ui-react'
import NavBar from './NavBar'
import RestaurantPageMap from './RestaurantPageMap'
import RestaurantPageReviews from './RestaurantPageReviews'
import RestaurantDetailledCard from './RestaurantDetailledCard'
import AddReviewModal from './AddReviewModal'

class RestaurantPageUser extends Component {

  componentDidMount = () => {
    this.props.fetchData()
  }

  render() {
    return (
      <div id='restaurant-page'>
        <NavBar username={this.props.currentUser.username} />
        <Grid container divided='vertically' className='restaurant-page'>
          <Grid.Row stretched columns={2} verticalAlign='middle'>
            <Grid.Column>
              <RestaurantPageMap restaurant={this.props.currentRestaurant} />
            </Grid.Column>
            <Grid.Column>
              <RestaurantDetailledCard restaurant={this.props.currentRestaurant} />
              {!this.props.visited ?
                <Card fluid>
                  <Card.Content>
                  <Checkbox onChange={this.props.handleVisited}
                    checked={this.props.visited}
                    label="Have you been here?"/><br/><br/>
                  <Button disabled fluid color='teal' className='button-colored-teal' size='tiny'>Wishlist</Button>
                  </Card.Content>
                </Card>
                :
                <Card fluid>
                  <Card.Content>
                    <Checkbox onChange={this.props.handleVisited}
                      checked={this.props.visited}
                      label="Have you been here?"/><br/><br/>
                    <Button disabled fluid color='red' className='button-colored-red' size='tiny'>Visited</Button>
                  </Card.Content>
                </Card> }
                <br/>
              <AddReviewModal restaurant={this.props.currentRestaurant}
                review={this.props.review}
                rating={this.props.rating}
                handleChange={this.props.handleChange}
                handleSubmit={this.props.handleSubmit}
                modalOpen={this.props.modalOpen}
                handleOpen={this.props.handleOpen}
                handleClose={this.props.handleClose} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row centered columns={1}>
            <Grid.Column verticalAlign='middle' width={8}>
              <Feed className='card-opacity'>
                {this.props.restaurantReviews.reverse().map(r =>
                  <RestaurantPageReviews key={r.id}
                    review={r}
                    deleteReview={this.props.deleteReview}
                    currentUser={this.props.currentUser} />)}
              </Feed>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

export default RestaurantPageUser
