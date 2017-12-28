import React from 'react'
// import { render } from 'react-dom'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './components/App'
import reducer from './reducers'
import $ from 'jquery';

console.log('In root index');  

const getFilters = (locations) => {
    console.log('In getFilters');  
    let filters = {};
    filters['country'] = Object.keys(locations);
    filters['region'] = [];
    filters['county'] = [];
    filters['town'] = [];

    return filters
}

const url = "http://localhost:7000/api/data" 

const loadItemsFromServer = () => {
  $.ajax({
    url: url,
    dataType: 'json',
    cache: false,
    success: function(data) {
        console.log('Items loaded');  

        initialState.establishments = data.establishments;
        initialState.locations = data.locations;
        initialState.filters = getFilters(initialState.locations);
        initialState.filteredResults = data.establishments;

        console.log("initialState: ", initialState);  

        render();

    }.bind(this),
    error: function(xhr, status, err) {
        console.error(url, status, err.toString());
    }.bind(this),
  });
}

let initialState = {};

initialState.selected = {
    country: '',
    region: '',
    county: '',
    town: ''
};

initialState.visible = {
    country: true,
    region: false,
    county: false,
    town: false
};

initialState.filteredResults = []


// The store binds together the 3 principles of redux:
// (1) It holds the current application's state object
// (2) It lets you dispatch actions
// (3) When you create it, you need to specify the reducer,
//     that determines how the state is updated via actions

//const store = createStore(reducer)
const store = createStore(reducer, initialState);

console.log("STATE in root index: ", store.getState());  

const render = () => {
    console.log('In render function in root index');  

    ReactDOM.render (
        // Provider exposes the store, passed through as a prop, on the context (pass the store down the context)
        <Provider store={store}>
          <App />
        </Provider>,
        document.getElementById('root')
    );
};

store.subscribe(render);

loadItemsFromServer();

