import React from 'react';
import logo from './logo.svg';
import './App.css';
import ServerButton from './components/requester';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hi Jamsey :D!</p>

        <ServerButton />
      </header>
    </div>
  );
}

export default App;
