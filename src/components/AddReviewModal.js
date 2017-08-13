import React, { Component } from 'react'
import { Button, Modal, Icon, Form, Rating, TextArea } from 'semantic-ui-react'

class AddReviewModal extends Component {

  state = {
    modalOpen: false,
    review: '',
    rating: 0
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

// TODO: handleSubmit to create new review for currentRestaurant(props). For now user_id is harcoded to 1.

  render() {
    const label = `Notes from your last visit at ${this.props.restaurant.name}:`
    return (
      <Modal
        trigger={<Button onClick={this.handleOpen} icon='comment' labelPosition='right' content='Add a review' />}
        open={this.state.modalOpen}
        onClose={this.handleClose}
      >
        <Modal.Header>Your new review</Modal.Header>
        <Modal.Content>
          <Form onSubmit={this.handleSubmit}>
            <Form.Field id='review'
              control={TextArea}
              label={label}
              onChange={this.handleChange}
            />
            <h5>Your Grade: {this.state.rating}</h5>
            <input type='range' min={0} max={10} id='rating' value={this.state.rating} onChange={this.handleChange} />
            <br/>
            <Rating icon='heart' rating={this.state.rating} maxRating={10} />
            <br/>
            <br/>
            <Button type='submit' floated='right' style={{ margin: '0 0 1em 0' }}>
              <Icon name='plus' /> Add
            </Button>
          </Form>
        </Modal.Content>
      </Modal>
    )
  }

}

export default AddReviewModal
