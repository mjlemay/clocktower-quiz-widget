import './App.css';
import React, { useState, useEffect, useRef } from 'react'

const ASPECT_RATIO = 0.75; // ~3:4

function App() {
  const [dimentions, setDimentions] = useState({});
  const appRef = useRef(null);
  const { width, height } = dimentions;

  const styles ={
    ...dimentions,
    background: 'rgba(255,255,255, 0.125)'
  }

  useEffect(() => {
    const newWidth = appRef.current.clientWidth;
    const newHeight = appRef.current.clientWidth * ASPECT_RATIO;
    newWidth !== width && setDimentions({ width: newWidth, height: newHeight });
  }, [width]);

  return (
    <div className="App" style={styles} ref={appRef}>
      <h1>This is a test of the Embed Framework</h1>
      <p>width: {width}</p>
      <p>height: {height}</p>
    </div>
  );
}

export default App;
