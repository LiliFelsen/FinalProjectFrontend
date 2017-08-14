import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'

class FilterShow extends Component {
  render(){
    return(
      <Button.Group>
        <Button onClick={this.props.handleShow}>Map</Button>
        <Button.Or />
        <Button onClick={this.props.handleShow}>List</Button>
      </Button.Group>
    )
  }
}

export default FilterShow
