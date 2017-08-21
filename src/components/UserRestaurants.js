import React from 'react'
import RestaurantsMap from './RestaurantsMap'
import RestaurantsList from './RestaurantsList'

// class UserRestaurants extends React.Component {
//
//   filterByName = () => {
//     this.props.restaurantsDetails.filter(rest =>
//       rest.name.toLowerCase().includes(this.props.searchTerm.toLowerCase()) )
//     }
//
//   filterByTag = (arrayToFilter) => {
//     arrayToFilter.filter(rest => {
//      for(let i=0; i< rest.tags.length; i++){
//        if(rest.tags[i].name.includes(this.props.tagSearch)){
//          return rest
//         }
//       }
//     })
//   }
//
//   render(){
//     let filteredRestaurants = if (this.props.searchTerm) {
//       return this.filterByName()
//     } else if (this.props.show === 'done' && this.props.tagSearch) {
//       return this.filterByTag(this.props.doneDetails)
//     } else if (this.props.show === 'wishlist' && this.props.tagSearch) {
//       return this.filterByTag(this.props.wishlistDetails)
//     } else if (this.props.tagSearch) {
//       return this.filterByTag(this.props.restaurantsDetails)
//     } else if (this.props.show === 'done') {
//       return this.props.doneDetails
//     } else if (this.props.show === 'wishlist') {
//       return this.props.wishlistDetails
//     } else {
//       return this.props.restaurantsDetails
//     }
//
//     return(
//       <div>
//         {this.props.mapVisible ?
//           <RestaurantsMap restaurantsDetails={filteredRestaurants} /> :
//           <RestaurantsList restaurantsDetails={filteredRestaurants} />
//         }
//       </div>
//     )
//   }
//
// }

const UserRestaurants = (props) => {

  // let filterByName = () => {
  //   props.restaurantsDetails.filter(rest =>
  //     rest.name.toLowerCase().includes(props.searchTerm.toLowerCase()) )
  //   }
  //
  //   let filterByTag = (arrayToFilter) => {
  //     arrayToFilter.filter(rest => {
  //      for(let i=0; i< rest.tags.length; i++){
  //        if(rest.tags[i].name.includes(props.tagSearch)){
  //          return rest
  //         }
  //       }
  //     })
  //   }
  //
    let filteredRestaurants = []
  //
  //   if (props.searchTerm) {
  //     filteredRestaurants = filterByName()
  //   } else if (props.show === 'done' && props.tagSearch) {
  //     filteredRestaurants = filterByTag(props.doneDetails)
  //   } else if (props.show === 'wishlist' && props.tagSearch) {
  //     filteredRestaurants = filterByTag(props.wishlistDetails)
  //   } else if (props.tagSearch) {
  //     filteredRestaurants = filterByTag(props.restaurantsDetails)
  //   } else if (props.show === 'done') {
  //     filteredRestaurants = props.doneDetails
  //   } else if (props.show === 'wishlist') {
  //     filteredRestaurants = props.wishlistDetails
  //   } else {
  //     filteredRestaurants = props.restaurantsDetails
  //   }

    if (props.searchTerm) {
    filteredRestaurants = props.restaurantsDetails.filter(rest =>
      rest.name.toLowerCase().includes(props.searchTerm.toLowerCase()) )
    } else if (props.show === 'done' && props.tagSearch) {
      filteredRestaurants = props.doneDetails.filter(rest => {
       for(let i=0; i< rest.tags.length; i++){
         if(rest.tags[i].name.includes(props.tagSearch)){
           return rest
          }
        }
        })
      } else if (props.show === 'wishlist' && props.tagSearch) {
      filteredRestaurants = props.wishlistDetails.filter(rest => {
       for(let i=0; i< rest.tags.length; i++){
         if(rest.tags[i].name.includes(props.tagSearch)){
           return rest
           }
         }
        })
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
