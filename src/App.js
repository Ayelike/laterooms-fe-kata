import React, { Component } from 'react';
import './App.scss';
import { Provider } from 'react-redux';
import store from './store';

//components
import Filter from './components/Filter/Filter';
import HotelList from './components/HotelList/HotelList';
import Sort from './components/Sort/Sort';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="app">
          <header className="app__header">
            <h1>LateRooms Frontend&nbsp;Kata</h1>
          </header>
          <div className="toolbar">
            <Sort />
            <Filter />
          </div>
          <HotelList />
        </div>
      </Provider>
    );
  }
}

export default App;
