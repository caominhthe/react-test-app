import React, { Component } from 'react';
import logo from './logo.svg';
import Table from './components/Table/table';
import './App.scss';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return state;
}

const mapDispatchToProps = dispatch => ({

});

class App extends Component {
  render() {
    return (
    <Table></Table>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
