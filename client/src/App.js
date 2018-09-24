import React, { Component } from 'react';
import { QueryRenderer, graphql } from 'react-relay';
import environment from './environment';
import BookList from './components/bookList';


class App extends Component {
  render() {
    return (
      <QueryRenderer
        environment={environment}
        query={graphql`
          query AppQuery {
            authors {
              name
            }
          }
        `}
        varibales={{}}
        render={({error, props}) => {
          console.log(props);
          if (props) {
            return <div>{props.authors.name}</div>
          } else {
            return <div>loading.... </div>
          }
        }}
      />
    );
  }
}

export default App;
