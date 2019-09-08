import React from 'react';
import logo from './logo.svg';
import './App.css';
import ServerButton from './components/requester';
import DigitCanvas from './components/digit_classifier_canvas';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hi Jamsey :D!</p>
        <div
          style={{
            flex:'display',
            // flexDirection:'row'
          }}
        >
          <div
            style={{
              border:'2px solid steelblue',
              padding:'15px',
              margin:'10px',
              flexDirection:'column'
            }}
          >
            <h2>Financial Data Sentiment Analyzer </h2>
            <ServerButton />
          </div>
          <div
            style={{
              border:'2px solid tan',
              padding:'15px',
              margin:'10px'
            }}
          >
            <h2>Digit Classifier</h2>
            <DigitCanvas />
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
