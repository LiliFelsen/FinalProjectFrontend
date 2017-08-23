import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Grid, Card } from 'semantic-ui-react'

class LandingPage extends Component {

  render() {
    return (
      <div id='landing-page'>
        <Grid centered style={{ margin: '15em 0' }}>
          <Grid.Column computer={6} largeScreen={5} >
            <Card fluid className='card-opacity'>
              <Card.Content>
                <br/><br/><br/><br/>
                <center>
                 <div className='title'>All My Places</div>
                   <br/><br/><br/>
                 <h3><i>Bookmark the places you love<br/> and want to try!</i></h3>
                 <br/><br/>
                 <Link to="/signup"><Button color='teal' className='button-colored-teal'>Sign Up</Button></Link>
                 <Link to="/login"><Button color='teal' className='button-colored-teal'>Login</Button></Link>
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
