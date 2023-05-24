import React, { useState, useEffect, useRef, useCallback } from 'react';
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
  tiebreakClass: null,
}

// array keys to keep things flat
const stats = ['cha', 'con', 'int', 'str', 'wis', 'dex'];
const ctClass = ['east', 'west', 'north', 'south'];
const professions =[
  'deception',
  'insight',
  'intimidation',
  'investigation',
  'medicine',
  'perception',
  'performance',
  'persuasion',
  'survival',
  'acrobatics',
  'stealth',
  'athletics',
]

const defaultctCharacter = {
  name: 'Clocktower Agent',
  hitPoints: 0,
  armorClass: 0,
  stats: {
    cha: 0,
    con: 0,
    int: 0,
    str: 0,
    wis: 0,
    dex: 0,
  },
  professions: {
    athletics: 0,
    acrobatics: 0,
    sleightofhand: 0,
    stealth: 0,
    arcana: 0,
    history: 0,
    investigation: 0,
    nature: 0,
    religion: 0,
    animalhandling: 0,
    insight: 0,
    medicine: 0,
    perception: 0,
    survival: 0,
    deception: 0,
    intimidation: 0,
    performance: 0,
    persuasion: 0,
  },
  ctClass: '',
  equipment: [],
  weapons: [],
  traits: [],
  description: '',
}

function App() {
  const [dimentions, setDimentions] = useState({});
  const [section, setSection] = useState('start');
  const [page, setPage] = useState(0);
  const [selectCount, setSelectCount] = useState(0);
  const [selectArr, setSelectArr] = useState([]);
  const [character, setCharacter] = useState(defaultCharacter);
  const [baseCharacter, setBaseCharacter] = useState({});
  const [ctCharacter, setCtCharacter] = useState(defaultctCharacter);
  const [hasCloned, setHasCloned] = useState(false);
  const [hasCalculated, setHasCalculated] = useState(false);
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
    `A ${gender} agent, who is around ${bodyHeight}, and ${bodyWeight} for their frame.
    They have a ${shade} ${skin} complexion. The ${accessory} covering them does not mask the 
    depth of their ${shade} ${eyes} eyes nor obscure their ${hairLength} ${shade} ${hairColor} hair.
     Their ${grooming} style is evident with a ${outerCovering} cloaking their body. ${extraLooks}`;

  const styles ={
    height,
  }

  // const diceRoll = d => {
  //   return Math.floor(Math.random() * d + 1);
  // }

  function toTitleCase(str) {
    return str.toLowerCase().split(' ').map(function (word) {
      return (word.charAt(0).toUpperCase() + word.slice(1));
    }).join(' ');
  }

  const abilityMod = stat => {
    let mod = 0;
    if (stat <= 7) { mod = -2; }
    if (stat <= 9) { mod = -1; }
    if (stat >= 12) { mod = 1; }
    if (stat >= 14) { mod = 2; }
    if (stat >= 16) { mod = 3; }
    return mod;
  }

  const numToText = num => {
    const numTextArr = ['ONE', 'TWO', 'THREE', 'FOUR']
    return numTextArr[num - 1];
  }

  const buildCharacter = obj => {
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

  const buildCtCharSheet = useCallback(characterData => {
    const newCtAgent = JSON.parse(JSON.stringify(defaultctCharacter));
    //set description
    newCtAgent.description = descTemplate;

    //stats
    for (let i = 0; i < stats.length; i++) {
      newCtAgent.stats[stats[i]] = character[stats[i]];
    }

    // traits
    const traits = [`Immune to any spell or effect that would alter its form.`];
    newCtAgent.traits = traits;

    //professions 
    for (let i = 0; i < professions.length; i++) {
      newCtAgent.professions[professions[i]] = character[professions[i]];
    }

    // hit points
    newCtAgent.hitPoints = 6 + parseInt(abilityMod(character.con)); // 6 + CON mod

    // hit points
    newCtAgent.armorClass = 12 + parseInt(abilityMod(character.dex)); // 12 + dex mod


    // determine class 
    let highCount = 0;
    for (let i = 0; i < ctClass.length; i++) {
      let classScore = character[ctClass[i]];
      if (classScore > highCount) {
        highCount = classScore;
        newCtAgent.ctClass = ctClass[i];
      }
    }
    //tiebreak on duplicate high scores
    let doulbeHighCount = 0;
    for (let i = 0; i < ctClass.length; i++) {
      if (character[ctClass[i]] === highCount) {
        doulbeHighCount++
      }
    }
    if (doulbeHighCount > 1) {
      newCtAgent.ctClass = character.tiebreakClass;
    }
    //add items
    const prefixAccessory = accessory => {
      let prefix = accessory === 'hat' ? 'wide brimmed' : 'a pair of';
      return accessory === 'jewlery' ?  accessory : `${prefix} ${accessory}`;
    }
    const equipment = [
      `Ornate Eldritch Weapon (1D6 + 1)`,
      `Clock Tower Garb (12 + DEX)`,
      `${character.metal} Pocket Watch`,
      `${prefixAccessory(character.accessory)}`, 
      `${character.trinket}`
    ]
    newCtAgent.equipment = equipment;

    setCtCharacter(newCtAgent);
  }, [character, descTemplate]);

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

  //update values as we go through the sections
  useEffect(() => {
    if (section === 'edit' && !hasCloned) {
      const clone = JSON.parse(JSON.stringify(character));
      setBaseCharacter(clone);
      setHasCloned(true)
    }
    if (section === 'results'  && !hasCalculated) {
      buildCtCharSheet(baseCharacter);
      setHasCalculated(true)
    }
  }, [character, hasCloned, hasCalculated, section, buildCtCharSheet, baseCharacter]);

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
            <p>In the mirror, you see a&nbsp;
                <input
                name="gender"
                value={gender}
                style={{width: `${gender.length + 1}ch`}}
                onChange={changeHandler}
                onFocus={focusHandler}
              /> agent, who is around &nbsp;
              <input
                name="bodyHeight"
                value={bodyHeight}
                style={{width: `${bodyHeight.length + 1}ch`}}
                onChange={changeHandler}
                onFocus={focusHandler}
              />, and&nbsp;
              <input
                name="bodyWeight"
                value={bodyWeight}
                style={{width: `${bodyWeight.length + 1}ch`}}
                onChange={changeHandler}
                onFocus={focusHandler}
              /> for their frame. They have a &nbsp;
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
              /> hair. Thier&nbsp;
              <input
                name="grooming"
                value={grooming}
                style={{width: `${grooming.length + 1}ch`}}
                onChange={changeHandler}
                onFocus={focusHandler}
              />style is evident with a&nbsp;
            <input
                name="outerCovering"
                value={outerCovering}
                style={{width: `${outerCovering.length + 1}ch`}}
                onChange={changeHandler}
                onFocus={focusHandler}
              /> cloaking their body.&nbsp;
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
      {(section === 'results' && hasCalculated) && (
        <div>
          <div className="characterSheet">
            <div>
              <h1 className="charTitle">Clock Tower Agent</h1>
              <h3 className="path">Path of the {ctCharacter.ctClass}  <span>Level 1 Human</span></h3>
              <div className="statsRow">
              <div className="health">
                  <div className="statLabel">
                      Health
                  </div>
                  <div className="statValue">
                     __ / {ctCharacter.hitPoints}
                  </div>
                </div>
                <div className="shield">
                  <div className="statLabel">
                      Armor Class
                  </div>
                  <div className="statValue">
                    {ctCharacter.armorClass}
                  </div>
                </div>
                {Object.entries(ctCharacter.stats).map( entry => {
                  const mod = abilityMod(entry[1]);
                  return (
                    <div className="statBlock" key={entry[0]}>
                      <div className="statLabel">
                      {entry[0]}
                      </div>
                      <div className="statValue">
                      {entry[1]}
                      </div>
                      <div className="statBonus">
                        {mod > 0 ? `+ ${mod}` : mod }
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className="columnBlock">
              <div className="itemBlock">
                <div className="blockLabel">Equipment</div>
                <ul>
                {ctCharacter.equipment.map( item => {
                  return (<li key={item}>{toTitleCase(item)}</li>)}
                )}
                </ul>
              </div>
              <div className="itemBlock">
                <div className="blockLabel">Known Skills</div>
                <ul>
                {professions.map( prof => {
                  return (ctCharacter.professions[prof] >= 1 && <li key={prof}>{toTitleCase(prof)}</li>)}
                )}
                </ul>
              </div>
              </div>
              <div className="itemFillBlock">
                <div className="blockLabel">Description</div>
                <p>{ctCharacter.description}</p>
              </div>
              <div className="itemFillBlock">
                <div className="blockLabel">Traits</div>
                <p>{ctCharacter.traits[0]}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
