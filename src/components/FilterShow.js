import React from 'react'
import { Button } from 'semantic-ui-react'

const FilterShow = ({ handleShow }) => {
  return(
    <Button.Group>
      <Button onClick={handleShow} color='red'>Map</Button>
      <Button.Or />
      <Button onClick={handleShow} color='teal'>List</Button>
    </Button.Group>
  )
}

export default FilterShow
