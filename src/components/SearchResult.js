import React, { Component } from 'react'
import ResultItem from './ResultItem'

export default class SearchResult extends Component {
  render () {
    let resultItems = [];

    this.props.filteredResults.forEach((item) => {
        resultItems.push(<ResultItem name={item.name} country={item.country} region={item.region} county={item.county} town={item.town} key={item.id}>{item.intro}</ResultItem>);

    })

    return (
      <div className="search-result">
        {resultItems}
      </div>
    )
  }
}

