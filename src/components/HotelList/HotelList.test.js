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
  Object.keys(hotelData).forEach(function(key) {
    expect(getByText(hotelData[key].name)).toBeInTheDocument();
    expect(getByText('Rating: ' + hotelData[key].starRating + ' stars')).toBeInTheDocument();
    if (hotelData[key].facilities.length > 0) {
      expect(getByText('Facilities: ' + hotelData[key].facilities.join(', '))).toBeInTheDocument();
    }
  });
});