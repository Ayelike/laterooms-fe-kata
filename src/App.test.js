import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-testing-library';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders page title', () => {
  const { getByText } = render(<App />);
  expect(getByText('LateRooms Frontend Kata')).toBeInTheDocument();
});