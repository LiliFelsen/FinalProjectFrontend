import React from 'react'
import RestaurantsMap from './RestaurantsMap'
import RestaurantsList from './RestaurantsList'

const UserRestaurants = (props) => {

  let filterByName = () => {
    return props.restaurantsDetails.filter(rest =>
      rest.name.toLowerCase().includes(props.searchTerm.toLowerCase()) )
    }

  let filterByTag = (arrayToFilter) => {
      return arrayToFilter.filter(rest => {
        for(let i=0; i< rest.tags.length; i++){
          if(rest.tags[i].name.includes(props.tagSearch)){
            return rest
          }
        }
      })
    }
    let filteredRestaurants = []

    if (props.searchTerm) {
      filteredRestaurants = filterByName()
    } else if (props.show === 'done' && props.tagSearch) {
      filteredRestaurants = filterByTag(props.doneDetails)
    } else if (props.show === 'wishlist' && props.tagSearch) {
      filteredRestaurants = filterByTag(props.wishlistDetails)
    } else if (props.tagSearch) {
      filteredRestaurants = filterByTag(props.restaurantsDetails)
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
          <RestaurantsList restaurantsDetails={filteredRestaurants} shownUserId={props.shownUserId}/>
        }
      </div>
    )
  }


export default UserRestaurants
