import React from 'react'
import RestaurantsMap from './RestaurantsMap'
import RestaurantsList from './RestaurantsList'

const UserRestaurants = ({ restaurantsDetails, searchTerm, tagSearch, mapVisible }) => {

    let filteredRestaurants = []

    if (searchTerm) {
      filteredRestaurants = restaurantsDetails.filter(rest =>
        rest.name.toLowerCase().includes(searchTerm.toLowerCase()) )
    } else if (tagSearch) {
      filteredRestaurants = restaurantsDetails.filter(rest => {
       for(let i=0; i< rest.tags.length; i++){
         if(rest.tags[i].name.includes(tagSearch)){
           return rest
         }
       }
      })
    } else {
      filteredRestaurants = restaurantsDetails
    }

    return(
      <div>
        {mapVisible ?
          <RestaurantsMap restaurantsDetails={filteredRestaurants} /> :
          <RestaurantsList restaurantsDetails={filteredRestaurants} />
        }
      </div>
    )
  }

export default UserRestaurants
