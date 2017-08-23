import React from 'react'
import moment from "moment"
import { Feed, Icon, Rating } from 'semantic-ui-react'

const RestaurantPageReviews = ({ review, deleteReview, currentUser }) => {

  const timeAgo = moment(review.created_at).fromNow()

  return (
    <Feed.Event>
      <Feed.Label><Icon name='comment' color='black'/></Feed.Label>
      <Feed.Content>
        <Feed.Summary>
          {review.user.id === currentUser.id ? 'You ' : review.user.username + ' ' }
           said " {review.notes} "
          <Feed.Date>{timeAgo}</Feed.Date>
          {review.user.id === currentUser.id ?
            <Icon id={review.id} name='remove' className='delete-review' onClick={deleteReview}/>
            : null }
        </Feed.Summary>
        <Feed.Meta>
          <Rating icon='star' defaultRating={review.rating} maxRating={10} disabled size='mini' />
        </Feed.Meta>
      </Feed.Content>
    </Feed.Event>
  )
}

export default RestaurantPageReviews
