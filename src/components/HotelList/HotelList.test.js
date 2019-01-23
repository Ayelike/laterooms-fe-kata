import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-testing-library';
import { Provider } from 'react-redux';
import store from '../../store';
import HotelList from './HotelList';
import hotelData from '../../data/hotels.json';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Provider store={store}><HotelList /></Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders component title', () => {
  const { getByText } = render(<Provider store={store}><HotelList /></Provider>);
  expect(getByText('Your Hotels')).toBeInTheDocument();
});

it('renders hotel list', () => {
  const { getByText } = render(<Provider store={store}><HotelList /></Provider>);
  for (const hotel of hotelData) {
    expect(getByText(hotel.name)).toBeInTheDocument();
    expect(getByText('Rating: ' + hotel.starRating + ' stars')).toBeInTheDocument();
    if (hotel.facilities.length > 0) {
      expect(getByText('Facilities: ' + hotel.facilities.join(', '))).toBeInTheDocument();
    }
  }
});