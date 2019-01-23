import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-testing-library';
import { Provider } from 'react-redux';
import store from '../../store';
import Filter from './Filter';
import { getFacilities } from '../../utilities';
import hotelData from '../../data/hotels.json';

//get unique list of hotel facilities
const facilities = getFacilities(hotelData);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Provider store={store}><Filter /></Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});

if (facilities.length > 0) {
  it('renders component title', () => {
    const { getByText } = render(<Provider store={store}><Filter /></Provider>);
    expect(getByText('Filter by:')).toBeInTheDocument();
  });

  it('renders filter list', () => {
    const { getByText } = render(<Provider store={store}><Filter /></Provider>);
    for (const facility of facilities) {
      expect(getByText(facility)).toBeInTheDocument();
    }
  });
}