import React from 'react'
import RestaurantsMap from './RestaurantsMap'
import RestaurantsList from './RestaurantsList'

const UserRestaurants = (props) => {

    let filteredRestaurants = []

    if (props.searchTerm) {
      filteredRestaurants = props.restaurantsDetails.filter(rest =>
        rest.name.toLowerCase().includes(props.searchTerm.toLowerCase()) )
    } else if (props.tagSearch) {
      filteredRestaurants = props.restaurantsDetails.filter(rest => {
       for(let i=0; i< rest.tags.length; i++){
         if(rest.tags[i].name.includes(props.tagSearch)){
           return rest
         }
       }
      })
    } else if (props.show === 'done') {
      filteredRestaurants = props.doneDetails
    } else if (props.show === 'wishlist') {
      filteredRestaurants = props.wishlistDetails
    } else {
      filteredRestaurants = props.restaurantsDetails
    }

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
