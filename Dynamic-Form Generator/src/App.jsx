import React from 'react';
import FormGenerator from './FormGenerator.jsx';

export function App(props) {
  const appContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh', // Adjust the height as needed
  };

  const appTitleStyle = {
    textAlign: 'center',
  };

  return (
    <div style={appContainerStyle}>
      <h1 style={appTitleStyle}>Dynamic Form Generator</h1>
      <FormGenerator />
    </div>
  );
}
