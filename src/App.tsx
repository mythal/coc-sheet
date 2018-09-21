import * as React from 'react';
import './App.css';

import logo from './logo.svg';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Alea Dea</h1>
        </header>
        <p className="App-intro">
          Call of Cthulhu 7 Edition Character Sheet
        </p>
      </div>
    );
  }
}

export default App;
