import React, { Component } from 'react'
import './App.css'
// import SearchForm from './SearchForm'
import AddressSearch from './AddressSearch'
import FacebookLogin from './FacebookLogin'

class App extends Component {
  render() {
    return (
      <div className="App">
        <FacebookLogin />
        {/* <SearchForm /> */}
        <AddressSearch />
      </div>
    )
  }
}

export default App
