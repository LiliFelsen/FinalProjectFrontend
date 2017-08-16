import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Grid, Card } from 'semantic-ui-react'

class LandingPage extends Component {

  render(){
    return(
      <div id='landing-page'>
        <Grid centered style={{ margin: '12em 0' }}>
          <Grid.Column computer={8} largeScreen={6} >
            <Card fluid textAlign='center' style={{ background: 'rgba(245, 243, 243, 0.90)' }}>
              <Card.Content>
                <br/><br/>
                <center>
                 <h1 style={{ color: '#EF4343' }}>ALL MY PLACES</h1>
                   <br/>
                 <h3><i>Bookmark the places you love<br/> and want to try!</i></h3>
                 <br/><br/>
                 <Link to="/signup"><Button color='teal'>Sign Up</Button></Link>
                 <Link to="/login"><Button color='teal'>Login</Button></Link>
                 </center>
                 <br/><br/>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}


export default LandingPage
