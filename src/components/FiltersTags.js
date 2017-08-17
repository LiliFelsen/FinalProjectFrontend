import React, { Component } from 'react'
import { Button, Input, Grid, Card } from 'semantic-ui-react'

class FiltersTags extends Component {
  render(){
    return(
      <div style={{ margin: '2em 0' }}>
        <Grid centered>
          <Grid.Column textAlign='center'>
            <Card fluid  style={{ background: 'rgba(245, 243, 243, 0.85)' }}>
              <Card.Content>
                <h3>Filter your places:</h3>
                <br/><br/>
                <Button basic className='button-colored-red' color='red' size='small' fluid onClick={this.props.handleClick} value='done'>Visited</Button><br/>
                <Button basic className='button-colored-teal' color='teal' size='small' fluid onClick={this.props.handleClick} value='wishlist'>Wishlist</Button><br/>
                <Button basic color='black' size='small' fluid onClick={this.props.handleClick} value=''>All</Button><br/>
                <br/>
                <br/>
                <Input icon='tag' placeholder='Filter by tag' fluid onChange={this.props.handleSearch}/>
                <br/>
                <br/><br/>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid>
      </div>
    )
  }

}

export default FiltersTags
