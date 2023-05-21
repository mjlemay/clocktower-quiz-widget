import './App.css';
import React, { useState, useEffect, useRef } from 'react'

const ASPECT_RATIO = 0.75; // ~3:4

function App() {
  const [dimentions, setDimentions] = useState({ width: 0, height:0 });
  const appRef = useRef(null);
  const { width, height } = dimentions;

  const styles ={
    ...dimentions,
    border: '1px solid red',
  }

  useEffect(() => {
    const width = appRef.current.clientWidth;
    const height = appRef.current.clientWidth * ASPECT_RATIO;
    setDimentions({width, height})
  }, [dimentions]);

  return (
    <div className="App" style={styles} ref={appRef}>
      <h1>This is a test of the Embed Framework</h1>
      <p>width: {width}</p>
      <p>height: {height}</p>
    </div>
  );
}

export default App;
