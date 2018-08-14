import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

describe("long asynchronous specs", function() {
  let originalTimeout;
  beforeEach(function() {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 300000;
  });

  it('renders without crashing', (done) => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
    setTimeout(() => done(), 200000);
  });

  afterEach(function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });
});
