//import { combineReducers } from 'redux'
//import todos from './todos'
//import visibilityFilter from './visibilityFilter'

const filterResults = (selected, establishments) => {
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

const nextState = (state, selected, visible, filters) => {
    const establishments = state.establishments;
    let filteredResults = filterResults(selected, establishments);

    return Object.assign(
      {}, 
      state, 
      {selected: selected}, 
      {visible: visible}, 
      {filters: filters},
      {filteredResults: filteredResults}
    )
}

export default (state = {}, action) => {
  console.log('IN REDUCER');    

  switch (action.type) {
    case 'FILTER':
      let filterOptions = state.locations;

      let selected = state.selected;
      let visible = state.visible;
      let filters = state.filters;

      let selectedCountry = selected.country;
      let selectedRegion = selected.region;
      let selectedCounty = selected.county;

      const category = action.category;
      const filter = action.filter;

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

          return nextState(state, selected, visible, filters)
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

          return nextState(state, selected, visible, filters)
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

          return nextState(state, selected, visible, filters)
        case 'town':
          selected['town'] = filter;

          return nextState(state, selected, visible, filters)
        default:
          return state
      }
      
    default:
      return state
  }
}

