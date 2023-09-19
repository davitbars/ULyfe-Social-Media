import './App.css';
import Header from './header';
import React, { useState, useEffect } from 'react';

function App() {
  const [apiData, setApiData] = useState({});

  useEffect(() => {
    fetch('http://localhost:5000/api/hello') 
      .then((response) => response.json())
      .then((data) => setApiData(data));
  }, []);
  

  return (
    <div className="App">
      <Header />
      <main>
        <p>Welcome to our starter site!</p>
        <p id="APIResponse">API Response: {apiData.message}</p>
      </main>
    </div>
  );
}

export default App;