import React from 'react';
import { Provider } from 'react-redux'
import store from './store';
import Table from './components/Table';

const App = () => (
  <Provider store={store}>
    <Table />
  </Provider>
);

export default App;
