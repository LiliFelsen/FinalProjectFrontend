import React, { Component } from 'react'
import { Grid, Card } from 'semantic-ui-react'

class FriendList extends Component {
  render(){
    return(
      <div style={{ margin: '2em 0 0 0' }}>
        <Grid centered>
          <Grid.Column textAlign='center'>
            <Card fluid style={{ background: 'rgba(245, 243, 243, 0.85)' }}>
              <Card.Content>
                <br/><br/><br/><br/><br/><br/><br/>
                <h4>Friend list will be here</h4>
                <br/><br/><br/><br/><br/><br/><br/><br/>
                <br/><br/><br/><br/><br/><br/><br/>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid>
      </div>
    )
  }

}

export default FriendList
