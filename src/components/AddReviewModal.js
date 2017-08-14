import React from 'react'
import { Button, Modal, Icon, Form, Rating, TextArea } from 'semantic-ui-react'

const AddReviewModal = (props) => {

  const label = `Notes from your last visit at ${props.restaurant.name}:`

  return (
    <Modal
      trigger={<Button onClick={props.handleOpen} icon='comment' labelPosition='right' content='Add a review' />}
      open={props.modalOpen}
      onClose={props.handleClose}
    >
      <Modal.Header>Your new review</Modal.Header>
      <Modal.Content>
        <Form onSubmit={props.handleSubmit}>
          <Form.Field id='review'
            control={TextArea}
            label={label}
            onChange={props.handleChange}
          />
          <h5>Your Grade: {props.rating}</h5>
          <input type='range' min={0} max={10} id='rating' value={props.rating} onChange={props.handleChange} />
          <br/>
          <Rating icon='star' rating={props.rating} maxRating={10} />
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

export default AddReviewModal
