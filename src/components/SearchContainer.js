import React, { Component } from 'react'
import SearchForm from '../components/SearchForm'
import SearchResult from '../components/SearchResult'

export default class SearchContainer extends Component {

  render () {
    return (
      <div className="search-container">
          <SearchForm />
          <SearchResult />
      </div>
    )
  }

}

