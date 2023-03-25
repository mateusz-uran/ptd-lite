import './App.css';
import React, { useEffect, useState } from 'react';

function App() {


  useEffect(() => {
    fetch('http://localhost:8181/api/card/live')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
     })
      .catch((err) => {
        console.log(err);
      });
  }, [])

  return (
    <div className="App">
    </div>
  );
}

export default App;
