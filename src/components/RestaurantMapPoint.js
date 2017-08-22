import React from 'react'
import { Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const RestaurantMapPoint = (props) => {
  return(
    <div>
      <Link to={props.linkTo}><Icon name={`${props.icon}`} size={`${props.size}`}></Icon></Link>
    </div>
  )
}

export default RestaurantMapPoint
