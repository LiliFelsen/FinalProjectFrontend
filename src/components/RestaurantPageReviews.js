import React from 'react'
import moment from "moment"
import { Feed, Icon, Rating } from 'semantic-ui-react'

const RestaurantPageReviews = ({ review }) => {

  const timeAgo = moment(review.created_at).fromNow()

  return(
    <Feed.Event>
      <Feed.Label><Icon name='comment'/></Feed.Label>
      <Feed.Content>
        <Feed.Summary>
          " {review.notes} "
          <Feed.Date>{timeAgo}</Feed.Date>
        </Feed.Summary>
        <Feed.Meta>
          <Rating icon='star' defaultRating={review.rating} maxRating={10} disabled size='mini' />
        </Feed.Meta>
      </Feed.Content>
    </Feed.Event>
  )
}

export default RestaurantPageReviews
