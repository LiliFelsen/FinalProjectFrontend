import React from 'react'
import RestaurantsMap from './RestaurantsMap'
import RestaurantsList from './RestaurantsList'

const UserRestaurants = (props) => {

  const filterByName = () => {
    return props.restaurantsDetails.filter(rest =>
      rest.name.toLowerCase().includes(props.searchTerm.toLowerCase())
  )}

  const filterByTag = (arrayToFilter) => {
    return arrayToFilter.filter(rest => {
      for (let idx = 0; idx < rest.tags.length; idx++) {
        if (rest.tags[idx].name.includes(props.tagSearch))
          return rest
      }
      return undefined
    })
  }

  const getFilteredRestaurants = () => {
    switch (true) {
      case (props.searchTerm.length > 0):
        return filterByName()
      case (props.tagSearch.length > 0):
        return filterByTag(props.restaurantsDetails)
      case (props.show === 'done'):
        return (props.tagSearch) ? filterByTag(props.doneDetails) : props.doneDetails
      case (props.show === 'wishlist'):
        return (props.tagSearch) ? filterByTag(props.wishlistDetails) : props.wishlistDetails
      default:
        return props.restaurantsDetails
    }
  }

  const filteredRestaurants = getFilteredRestaurants()

  return (
    <div>
      {props.mapVisible ?
        <RestaurantsMap restaurantsDetails={filteredRestaurants} /> :
        <RestaurantsList restaurantsDetails={filteredRestaurants} shownUserId={props.shownUserId}/>
      }
    </div>
  )
}


export default UserRestaurants
