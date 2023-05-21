import React, { useState, useEffect, useRef } from 'react'
import quiz from './quiz';

const ASPECT_RATIO = 0.75; // ~3:4
const defaultCharacter = {
  cha: 13,
  con: 13,
  int: 13,
  str: 8,
  wis: 8,
  dex: 8,
  east: 0,
  west: 0,
  north: 0,
  south: 0,
  deception: 0,
  insight: 0,
  intimidation: 0,
  investigation: 0,
  history: 0,
  medicine: 0,
  perception: 0,
  performance: 0,
  persuasion: 0,
  religion: 0,
  survival: 0,
}

// array keys to keep things flat
const stats = ['cha', 'con', 'int', 'str', 'wis', 'dex'];
const tally = ['east', 'west', 'north', 'south'];
const prof =[
  'deception',
  'insight',
  'intimidation',
  'investigation',
  'medicine',
  'perception',
  'performance',
  'persuasion',
  'survival']

function App() {
  const [dimentions, setDimentions] = useState({});
  const [section, setSection] = useState('start');
  const [page, setPage] = useState(0);
  const [selectCount, setSelectCount] = useState(0);
  const [selectArr, setSelectArr] = useState([]);
  const [character, setCharacter] = useState(defaultCharacter);
  const appRef = useRef(null);
  const { height } = dimentions;

  const styles ={
    height,
    background: 'rgba(0,0,0, 0.75)',
    color: '#fff'
  }

  const numToText = num => {
    const numTextArr = ['ONE', 'TWO', 'THREE', 'FOUR']
    return numTextArr[num - 1];
  }

  const  buildCharacter = function (obj) {
    const updatedCharacter = character;
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        if (obj[prop] === '+') {
          updatedCharacter[prop] = updatedCharacter[prop] + 1;
        } else if (obj[prop] === '-') {
          updatedCharacter[prop] = updatedCharacter[prop] - 1;
        } else {
        updatedCharacter[prop] = obj[prop];
        }
      }
    }
    setCharacter(updatedCharacter);
  };

  const nextPage = () => {
    const selected = page + 1;
    setPage(selected);
    setSelectCount(0)
    setSelectArr([]);
    if (selected >= quiz.pages.length) {
      setSection('results');
    }
  }
  const selectChoice = index => {
    const selected = selectCount + 1;
    setSelectCount(selected);
    const choices = quiz.pages[page].choices[index];
    const mod = choices && choices.mods[selectCount];
    buildCharacter(mod);
    setSelectArr([...selectArr, index]);
    if (selected >= quiz.pages[page].limit) {
      nextPage();
    }
  }

  useEffect(() => {
    const newWidth = appRef.current.clientWidth;
    const newHeight = appRef.current.clientWidth * ASPECT_RATIO;
    setDimentions({ width: newWidth, height: newHeight });
  }, []);

  return (
    <div className="app" style={styles} ref={appRef}>
      {section === 'start' && (
        <div>
          <div className="question">
            <p>This is a test used to create a first level <span>Clocktower Agent</span>,
            a custom class for Dungeons & Dragons 5th edition.</p>
          </div>
          <div className="choices">
            <button className="choice" onClick={()=> setSection('quiz')}>START</button>
          </div>
        </div>
      )}
      {section === 'quiz' && (
        <div>
          <div className="prompt"><p>{quiz.pages[page].prompt}</p></div>
          <div className="question"><p>{quiz.pages[page].question}</p></div>
          <div className="select"><p>SELECT {numToText(quiz.pages[page].limit) || 'ONE'}</p></div>
          <div className="choices">
          {quiz.pages[page].choices ? quiz.pages[page].choices.map((choice, index) => { 
            return (
            <button 
              className="choice"
              disabled={selectArr.indexOf(index) !== -1}
              key={encodeURIComponent(choice.text)}
              onClick={()=> selectChoice(index)}
            >
              <span>{choice.text}</span>
            </button>)
          }) : null}
          </div>
        </div>
      )}
      {section === 'results' &&  (
        <div>
          <div style={{maxHeight: height - 50, overflow: 'auto'}}>
            <p>
            {Object.entries(character).map(entry => {
              return(<span>{entry}, </span>)
            })}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
