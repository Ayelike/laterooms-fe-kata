import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-testing-library';
import { Provider } from 'react-redux';
import store from '../../store';
import Filter from './Filter';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Provider store={store}><Filter /></Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders component title', () => {
  const { getByText } = render(<Provider store={store}><Filter /></Provider>);
  expect(getByText('Filter by:')).toBeInTheDocument();
});