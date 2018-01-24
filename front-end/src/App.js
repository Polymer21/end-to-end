import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    message: "NO MESSAGE RECEIVED"
  }

  getData = async () => {
    const url = "http://localhost:3001"
    const response = await fetch(url)
    const data = await response.json()

    return data
  }

  async componentDidMount () {
    const data= await this.getData()

    this.setState({ message: data })
  }
  render() {  
    return (
      <div className="App">
        <h1>{this.state.message}</h1>
      </div>
    );
  }
}

export default App;
