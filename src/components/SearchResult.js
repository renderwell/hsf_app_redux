import React, { Component } from 'react'
import ResultItem from './ResultItem'

export default class SearchResult extends Component {
  render () {
    // Get the store from the context to subscribe to the 
    // store updates and dispatch actions 
    // Container components "read the store from the context"
    const { store } = this.context;
    const state = store.getState();

    let resultItems = [];

    state.filteredResults.forEach((item) => {
        resultItems.push(<ResultItem name={item.name} country={item.country} region={item.region} county={item.county} town={item.town} key={item.id}>{item.intro}</ResultItem>);

    })

    return (
      <div className="search-result">
        {resultItems}
      </div>
    )
  }
}

// Component specifies the context types, to be able to get the 
// store from the context
SearchResult.contextTypes = {
    store: React.PropTypes.object
};

