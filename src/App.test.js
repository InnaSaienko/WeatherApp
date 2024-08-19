import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div'); //container for rendering the React component during the test
  ReactDOM.render(<App />, div); //If there are any issues during the rendering process (syntax errors, etc.), the test will fail at this point.
  ReactDOM.unmountComponentAtNode(div); // cleanup step after the test completes
});