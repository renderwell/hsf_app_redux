import React, { Component } from 'react'
import SelectField from './SelectField'

export default class SearchForm extends Component {

  handleChange = (event) => {
    const el = event.target;
    const selected_value = el.value;
    const select_id = el.id;

    const { store } = this.context;
    const state = store.getState();

    let category_selected = '';

    switch (select_id) {
      case "select-1":
        category_selected = 'country';
        break;
      case "select-2":
        category_selected = 'region';
        break;
      case "select-3":
        category_selected = 'county';
        break;
      case "select-4":
        category_selected = 'town';
        break;
    }

    store.dispatch({ type: 'FILTER', category: category_selected, filter: selected_value });
  }

  render () {
    // Get the store from the context to subscribe to the 
    // store updates and dispatch actions 
    // Container components "read the store from the context"
    const { store } = this.context;
    const state = store.getState();

    console.log('In SearchForm render method');  
    console.log('SearchForm - NEW STATE', state);   

    return (
      <div className="search-form">
        <SelectField 
            options={state.filters['country']} 
            selectId="select-1" 
            handleChange={this.handleChange} 
            visible={state.visible.country} />

        <SelectField 
            options={state.filters['region']} 
            selectId="select-2" 
            handleChange={this.handleChange}
            visible={state.visible.region} />

        <SelectField 
            options={state.filters['county']} 
            selectId="select-3" 
            handleChange={this.handleChange}
            visible={state.visible.county} />

        <SelectField 
            options={state.filters['town']} 
            selectId="select-4" 
            handleChange={this.handleChange}
            visible={state.visible.town} />
      </div>
    )
  }

}

// Component specifies the context types, to be able 
// to get the store from the context
SearchForm.contextTypes = {
    store: React.PropTypes.object
};

