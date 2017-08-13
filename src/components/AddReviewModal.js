import React, { Component } from 'react'
import { Button, Modal, Icon, Form, Rating, TextArea } from 'semantic-ui-react'

class AddReviewModal extends Component {

  render() {
    const label = `Notes from your last visit at ${this.props.restaurant.name}:`
    return (
      <Modal
        trigger={<Button onClick={this.props.handleOpen} icon='comment' labelPosition='right' content='Add a review' />}
        open={this.props.modalOpen}
        onClose={this.props.handleClose}
      >
        <Modal.Header>Your new review</Modal.Header>
        <Modal.Content>
          <Form onSubmit={this.props.handleSubmit}>
            <Form.Field id='review'
              control={TextArea}
              label={label}
              onChange={this.props.handleChange}
            />
            <h5>Your Grade: {this.props.rating}</h5>
            <input type='range' min={0} max={10} id='rating' value={this.props.rating} onChange={this.props.handleChange} />
            <br/>
            <Rating icon='star' rating={this.props.rating} maxRating={10} />
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
