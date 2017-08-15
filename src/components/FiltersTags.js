import React, { Component } from 'react'
import { Button, Input } from 'semantic-ui-react'

class FiltersTags extends Component {
  render(){
    return(
      <div style={{ margin: '0 1em' }}>
        <br/>

        <Button basic color='teal' size='mini' fluid>Done</Button><br/>
        <Button basic color='violet' size='mini' fluid>Wishlist</Button><br/>
        <Button basic color='black' size='mini' fluid>All</Button><br/>

        <br/>
        <br/>

        <Input icon='tag' placeholder='Filter by tag' fluid onChange={this.props.handleSearch}/>
      </div>
    )
  }

}

export default FiltersTags
