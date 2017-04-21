import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {results: [], input: ''};
  }

  handleChange(event) {
    const setState = this.setState.bind(this);
    this.setState({input: event.target.value});
    fetch('http://0.0.0.0:3000/?search_text=' + event.target.value)
      .then(function (response) {
        return response.json()
      }).then(function (json) {
      console.log("json",json); // todo console.log statement
      setState({results: json});
    }).catch(function (ex) {
      console.log('parsing failed', ex)
    });
  }

  render() {

    const results = this.state.results.map(result =>

      <li key={result.input}>{result.input}</li>
    );

    return (
      <form className="App" onInput={this.onInput}>
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h2>Welcome to React</h2>
          <input type="text" value={this.state.value} onChange={this.handleChange.bind(this)}/>
        </div>
        <ul className="App-intro">
          {results}
        </ul>
      </form>
    );
  }
}

export default App;
