import React from 'react'
import { Button } from 'semantic-ui-react'

const FilterShow = ({ handleShow }) => {
  return(
    <Button.Group>
      <Button onClick={handleShow}>Map</Button>
      <Button.Or />
      <Button onClick={handleShow}>List</Button>
    </Button.Group>
  )
}

export default FilterShow
