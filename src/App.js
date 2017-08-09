import React, { Component } from 'react'
import './App.css'
// import SearchForm from './SearchForm'
import AddressSearch from './AddressSearch'

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <SearchForm /> */}
        <AddressSearch />
      </div>
    )
  }
}

export default App
