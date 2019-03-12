import React, { Component } from 'react';
import logo from './logo.svg';
import Table from './components/Table/table';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
            <Table></Table>
        </header>
      </div>
    );
  }
}

export default App;
