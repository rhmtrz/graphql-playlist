import React, { Component } from 'react';
import BookList from './components/bookList';


class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Hello react</h1>
        <BookList />
      </div>
    );
  }
}

export default App;
