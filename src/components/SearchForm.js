import React, { Component } from 'react'
import SelectField from './SelectField'

export default class SearchForm extends Component {
  componentDidMount() {
    console.log('SearchForm mounted');  
  }

  componentWillUnmount() {
    console.log('SearchForm will unmount');  
  }

  render () {
    console.log('SearchForm::render');  
    // console.log('SearchForm - NEW STATE', state);   

    return (
      <div className="search-form">
        <SelectField 
            options={this.props.filters['country']} 
            selectId="select-1" 
            handleChange={this.props.handleChange} 
            visible={this.props.visible.country} />

        <SelectField 
            options={this.props.filters['region']} 
            selectId="select-2" 
            handleChange={this.props.handleChange}
            visible={this.props.visible.region} />

        <SelectField 
            options={this.props.filters['county']} 
            selectId="select-3" 
            handleChange={this.props.handleChange}
            visible={this.props.visible.county} />

        <SelectField 
            options={this.props.filters['town']} 
            selectId="select-4" 
            handleChange={this.props.handleChange}
            visible={this.props.visible.town} />
      </div>
    )
  }
}

// Component specifies the context types, to be able 
// to get the store from the context
SearchForm.contextTypes = {
    store: React.PropTypes.object
};

