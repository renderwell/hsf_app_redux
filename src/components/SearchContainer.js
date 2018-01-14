import React, { Component } from 'react'
import SearchForm from '../components/SearchForm'
import SearchResult from '../components/SearchResult'

export default class SearchContainer extends Component {
  constructor(props) {
    console.log('In SearchContainer::constructor');  

    super(props);

    this.state = {
      selected: {
        country: '',
        region: '',
        county: '',
        town: ''
      },
      visible: {
        country: true,
        region: false,
        county: false,
        town: false
      },
      filters: {},
      filteredResults: []
    }
  }

  componentWillMount() {
    console.log('SearchContainer::componentWillMount');  

    const { store } = this.context;
    const state = store.getState();

    const locations = state.locations;
    const filters = this.getFilters(locations);

    this.setState({
      filters: filters
    });

    const establishments = state.establishments;

    this.setState({
      filteredResults: establishments
    });
  }

  componentDidMount() {
    console.log('SearchContainer::componentDidMount');  
  }

  componentWillReceiveProps() {
    console.log('SearchContainer::componentWillReceiveProps');  
  }

  // shouldComponentUpdate() {
  //   console.log('SearchContainer::shouldComponentUpdate');  
  // }

  componentWillUpdate() {
    console.log('SearchContainer::componentWillUpdate');  
  }

  componentDidUpdate() {
    console.log('SearchContainer::componentDidUpdate');  
  } 

  componentWillUnmount() {
    console.log('SearchContainer::componentWillUnmount');  
  }

  componentDidCatch() {
    console.log('SearchContainer::componentDidCatch');  
  } 

  getFilters = (locations) => {
    console.log('SearchContainer::getFilters');  
    let filters = {};
    filters['country'] = Object.keys(locations);
    filters['region'] = [];
    filters['county'] = [];
    filters['town'] = [];
    
    return filters;
  }

  filterResults = (selected, establishments) => {
    let results = [];
    
    const selected_country = selected.country;
    const selected_region = selected.region;
    const selected_county = selected.county;
    const selected_town = selected.town;
    
    establishments.forEach((item) => {
        if ((selected_country === "") || (selected_country === item.country)){
            if ((selected_region === "") || (selected_region === item.region)) {
                if ((selected_county === "") || (selected_county === item.county)) {
                    if ((selected_town === "") || (selected_town === item.town)) {
                        results.push(item)
                    }
                }
            }
        }
    })
    
    return results
  }

  setFiltersAndResults = (locations, establishments, category, filter) => {
    let filterOptions = locations;

    let selected = this.state.selected;
    let visible = this.state.visible;
    let filters = this.state.filters;

    let selectedCountry = selected.country;
    let selectedRegion = selected.region;
    let selectedCounty = selected.county;

    switch (category) {
      case 'country':
        selected['country'] = filter;
        selected['region'] = '';
        selected['county'] = '';
        selected['town'] = '';

        visible['region'] = true;
        visible['county'] = false;
        visible['town'] = false;
        
        if (filter == '') {
          visible['region'] = false;
          filters['region'] = [];
        }
        else {
          filters['region'] = Object.keys(filterOptions[filter]);
        }

        filters['county'] = [];
        filters['town'] = [];
        break;
      case 'region':
        selected['region'] = filter;
        selected['county'] = '';
        selected['town'] = '';

        visible['county'] = true;
        visible['town'] = false;

        if (filter == '') {
          visible['county'] = false;
          filters['county'] = [];
        }
        else {
          filters['county'] = Object.keys(filterOptions[selectedCountry][filter]);
        }

        filters['town'] = [];
        break;
      case 'county':
        selected['county'] = filter;
        selected['town'] = '';

        visible['town'] = true;

        if (filter == '') {
          visible['town'] = false;
          filters['town'] = [];
        }
        else {
          filters['town'] = filterOptions[selectedCountry][selectedRegion][filter];
        }
        break;
      case 'town':
        selected['town'] = filter;
        break;
      default:
        break;
    }

    let filteredResults = this.filterResults(selected, establishments);
    
    console.log('SET THE STATE');  

    this.setState({
      selected: selected,
      visible: visible,
      filters: filters,
      filteredResults: filteredResults
    });
  }


  handleChange = (event) => {
    const el = event.target;
    const filter = el.value;
    const select_id = el.id;

    let category = '';

    switch (select_id) {
      case "select-1":
        category = 'country';
        break;
      case "select-2":
        category = 'region';
        break;
      case "select-3":
        category = 'county';
        break;
      case "select-4":
        category = 'town';
        break;
    }

    const { store } = this.context;
    const state = store.getState();
    const locations = state.locations;
    const establishments = state.establishments;

    this.setFiltersAndResults(locations, establishments, category, filter);
  }

  render () {
    console.log('SearchContainer::render');  
    console.log('STATE in SearchContainer', this.state);  

    return (
      <div className="search-container">
          <SearchForm 
            filters={this.state.filters} 
            selected={this.state.selected} 
            visible={this.state.visible}
            handleChange={this.handleChange}/>

          <SearchResult filteredResults={this.state.filteredResults}/>
      </div>
    )
  }
}

// Component specifies the context types, to be able 
// to get the store from the context
SearchContainer.contextTypes = {
    store: React.PropTypes.object
};

