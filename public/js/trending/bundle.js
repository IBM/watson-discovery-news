import React from 'react';
import ReactDOM from 'react-dom';
import Main from '../../../src/trending/main';

ReactDOM.render(<Main {...window.__INITIAL_STATE__} />, document.querySelector('main'));
