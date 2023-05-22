import React, { useState, useEffect, useRef } from 'react';
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
  acrobatics: 0,
  stealth: 0,
  athletics:0,
  bodyWeight: 'unknown',
  hairColor: 'unknown',
  hairLength: 'average',
  eyes: 'unknown',
  skin: 'unknown',
  shade: 'average',
  gender: 'unknown',
  bodyHeight: 'several feet',
  grooming: 'average',
  accessory: 'a blank expression',
  outerCovering: 'coat',
  extraLooks: ' ',
  tinket: '',
  weaponSetA: 0,
  weaponSetB: 0,
  metal: 'bronze',
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
  const [baseCharacter, setBaseCharacter] = useState({});
  const [hasCloned, setHasCloned] = useState(false);
  const appRef = useRef(null);
  const { height } = dimentions;

  const { 
    bodyWeight,
    hairColor,
    hairLength,
    eyes,
    skin,
    shade,
    gender,
    bodyHeight,
    grooming,
    accessory,
    outerCovering,
    extraLooks
  } = character;

  const descTemplate = 
    `An around ${bodyWeight} ${gender} individual of ${shade} ${skin} complexion.
    The ${accessory} covering them does not mask the depth of thier ${shade} ${eyes} eyes nor
    obscure thier ${hairLength} ${shade} ${hairColor} hair. Standing about ${bodyHeight} tall,
    their ${grooming} style is evident with a ${outerCovering} cloaking their frame. ${extraLooks}`;

  const styles ={
    height,
  }

  const numToText = num => {
    const numTextArr = ['ONE', 'TWO', 'THREE', 'FOUR']
    return numTextArr[num - 1];
  }

  const  buildCharacter = function (obj) {
    const updatedCharacter = JSON.parse(JSON.stringify(character));
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
      setSection('edit');
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

  useEffect(() => {
    if (section === 'edit' && !hasCloned) {
      const clone = JSON.parse(JSON.stringify(character));
      setBaseCharacter(clone);
      setHasCloned(true)
    }
  }, [character, hasCloned, section]);

  const changeHandler = event => {
    const modValue = event.target.value;
    const modName = event.target.name;
    const mod = JSON.parse(JSON.stringify(character));
    mod[modName] = modValue;
    setCharacter({...mod});
  }

  const focusHandler = event => {
    setCharacter(baseCharacter);
  }

  return (
    <div className="app" style={styles} ref={appRef}>
      {section === 'start' && (
        <div>
          <div className="heading">
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
      {section === 'edit' &&  (
        <div>
          <div className="prompt"><p>Inside is nothing but a small table and a mirror. As you approach the table you see a pile of gear and weapons. You recognize them, because they are yours. You put on your things and Inspect the mirror. You are surprised to see yourself--or rather who you have become through this journey.</p></div>
          <div className="question"><p>But something's not right. Change one thing about your character's appearance.</p></div>
          <div className="select"><p>MODIFY ONE</p></div>
          <div className="editbox">
            <p>Before you, an around&nbsp;
              <input
                name="bodyWeight"
                value={bodyWeight}
                style={{width: `${bodyWeight.length + 1}ch`}}
                onChange={changeHandler}
                onFocus={focusHandler}
              />&nbsp;
                <input
                name="gender"
                value={gender}
                style={{width: `${gender.length + 1}ch`}}
                onChange={changeHandler}
                onFocus={focusHandler}
              /> individual of&nbsp;
              <input
                name="shade"
                value={shade}
                style={{width: `${shade.length + 1}ch`}}
                onChange={changeHandler}
                onFocus={focusHandler}
              />&nbsp;
              <input
                name="skin"
                value={skin}
                style={{width: `${skin.length + 1}ch`}}
                onChange={changeHandler}
                onFocus={focusHandler}
              /> complexion.
              The&nbsp;
              <input
                name="accessory"
                value={accessory}
                style={{width: `${accessory.length + 1}ch`}}
                onChange={changeHandler}
                onFocus={focusHandler}
              /> covering them does not mask the depth of thier&nbsp;
              <input
                name="shade"
                value={shade}
                style={{width: `${shade.length + 1}ch`}}
                onChange={changeHandler}
                onFocus={focusHandler}
              />&nbsp;
              <input
                  name="eyes"
                  value={eyes}
                  style={{width: `${eyes.length + 1}ch`}}
                  onChange={changeHandler}
                  onFocus={focusHandler}
                />&nbsp;
                eyes nor obscure thier&nbsp;
                <input
                name="hairLength"
                value={hairLength}
                style={{width: `${hairLength.length + 1}ch`}}
                onChange={changeHandler}
                onFocus={focusHandler}
              />&nbsp;
              <input
                name="shade"
                value={shade}
                style={{width: `${shade.length + 1}ch`}}
                onChange={changeHandler}
                onFocus={focusHandler}
              />&nbsp;
              <input
                name="hairColor"
                value={hairColor}
                style={{width: `${hairColor.length + 1}ch`}}
                onChange={changeHandler}
                onFocus={focusHandler}
              /> hair. Standing about&nbsp;
              <input
                name="bodyHeight"
                value={bodyHeight}
                style={{width: `${bodyHeight.length + 1}ch`}}
                onChange={changeHandler}
                onFocus={focusHandler}
              />  tall, their&nbsp;
              <input
              name="grooming"
              value={grooming}
              style={{width: `${grooming.length + 1}ch`}}
              onChange={changeHandler}
              onFocus={focusHandler}
            /> style is evident with a&nbsp;
            <input
                name="outerCovering"
                value={outerCovering}
                style={{width: `${outerCovering.length + 1}ch`}}
                onChange={changeHandler}
                onFocus={focusHandler}
              /> cloaking their frame.&nbsp;
            <input
                name="extraLooks"
                value={extraLooks}
                style={{width: `${extraLooks.length + 1}ch`}}
                onChange={changeHandler}
                onFocus={focusHandler}
              /></p>
          </div>
          <div className="choices">
          <button className="choice" onClick={()=> setSection('results')}>CONTINUE</button>
          </div>
        </div>
      )}  
      {section === 'results' &&  (
        <div>
          <div style={{maxHeight: height - 50, overflow: 'auto'}}>
            <p>
            {JSON.stringify(character)}
            </p>
            <div className="prompt">
              <p>{descTemplate}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
