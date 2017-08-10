import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'

class FilterShow extends Component {
  render(){
    return(
      <Button.Group>
        <Button>Map</Button>
        <Button.Or />
        <Button>List</Button>
      </Button.Group>
    )
  }
}

export default FilterShow
