import React from 'react'
import RestaurantsMap from './RestaurantsMap'
import RestaurantsList from './RestaurantsList'

const UserRestaurants = (props) => {

    const filteredRestaurants = props.restaurantsDetails.filter(rest => (
      rest.name.toLowerCase().includes(props.searchTerm.toLowerCase())
    ))

    return(
      <div>
        {props.mapVisible ?
          <RestaurantsMap restaurantsDetails={filteredRestaurants} /> :
          <RestaurantsList restaurantsDetails={filteredRestaurants} />
        }

      </div>
    )
  }

export default UserRestaurants
