import React, { useState, useEffect, useRef, useCallback } from 'react';
import { jsPDF } from "jspdf";
import { version } from '../package.json';

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
const ctCopy = {
  north: {
    sub: 'BLADE',
    description: 'The Path that has led you to the Clock Tower was filled with war and hard fought victory, battle after battle, it was only by your force of will and your blade that you narrowly survived your way to the Clock Tower. Now you use that blade to complete every mission you are given.',
    A: 'When you roll a 1 or 2 on a damage die for an attack you make with your Clock Tower Weapon, you can reroll the die and must use the new roll, even if the new roll is a 1 or a 2. Your Clock tower Weapon takes on the appearance of any two handed blade of your choice, this appearance can be changed any time you return to the Clock Tower to rest.',
    B: 'When you engage in two-weapon fighting, you can add your ability modifier to the damage of the second attack. You gain two Clock Tower Weapons that take on the appearance of any two, light, one handed blades of your choice. These appearances can be changed any time you return to the Clock Tower to rest.',
  },
  west:{
    sub: 'IRON',
    description: 'The Path that has led you to the Clock Tower was nothing but long stretches of dusty plains dotted with old ghost towns. Those you met along the way tested your grit and the speed of your draw at every turn, you learned your way under a hot sun. Now you continue to buck the odds and claim your prize every chance you get.',
    A: 'When you attack with your Clock Tower Weapon you ignore half cover and three-quarters cover. Your Clock Tower Weapon becomes a ranged weapon with a range of 600 feet and it takes on the appearance of lever action rifle or bolt action rifle of your choice. This appearance can be changed anytime you return to the Clock Tower to rest.',
    B: 'When you use the Attack action with your Clock Tower Weapon you can attack with your other Clock Tower Weapon as a bonus action, You do not add your ability modifier to the bonus action attack. You gain two Clock Tower Weapons both of which are ranged weapons with a range of 150 feet. Your Clock Tower Weapons take on the appearance of any revolver of your choice.',
  },
  east: {
    sub: 'FOCUS',
    description: 'The Path that has led you to the Clock Tower was a never ending road of strange obstacles each requiring more thought than the last, quickly you learned creative solutions to all of your problems. Now welding strange magics you set forth to achieve your goal.',
    A: 'When you attack with your Clock Tower Weapon your range is 120 feet and you ignore half cover and three-quarters cover. Your Clock Tower Weapon becomes a ranged weapon(120 feet) and it takes on the appearance of any rod, staff or wand you choose. This appearance can be changed anytime you return to the Clock Tower to rest.',
    B: `When you attack with your Clock Tower Weapon you range is 60 feet. You don't have disadvantage on attack rolls when casting within 5 feet of a hostile creature, and when ahostile creature's movement provokes an opportunity attack from you, you can use your Reaction to make an attack with your Clock Tower Weapon against them. Your Clock Tower Weapon becomes a ranged weapon (60 feet) and it takes on the appearance of any ring, earring or necklace of your choice. This appearance can be changed any time you returnto the Clock Tower to rest.`,
  },
  south: {
    sub: 'HUNTER',
    description: 'The Path that has led you to the Clock Tower was an almost never ending slog of strange eldritch creatures, narrow filthy streets and an oppressive darkness that seemed to drain the light from everything it touched. Now after surviving such a harsh journey, nothing can deter you from catching your prey.',
    A: `When a creature you can see, within 30 feet targets you with an attack or spell and your ranged Clock Tower Weapon is loaded, you can use your reaction to make a ranged attack against the attacker. If you hit the attacker's AC their attack orspell fails to hit you. You gain two Clock Tower Weapons oneof which is a light melee weapon and the other is a rangedweapon wit h a range of 15 feet. When you use the Attack Action with your Clock Tower Weapon you can attack with your other Clock Tower Weapon as a bonus action, You do not add your ability modifier to the damage of the bonusaction attack. Your Clock Tower Weapons take on the appearance of any light melee weapon of your choice and any single shot flintlock of your choice. This appearance can be changed anytime you return to the Clock Tower to rest.`,
    B: `When you make a melee attack with you Clock Tower Weapon you can use a bonus action to attempt to shove the creature you have attacked. You gain a +1 to AC while two handing your Clock Tower Weapon. Your Clock Tower Weapon takes on the appearance of any two handed weapon of your choice. This appearance can be changed anytime you return to the Clock Tower to rest.`,
  }
};
const professions =[
  'deception',
  'insight',
  'intimidation',
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
  ctWeapon: '',
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
    `A ${gender} agent, who is around ${bodyHeight}, and ${bodyWeight} for their frame. They have a ${shade} ${skin} complexion. The ${accessory} covering them does not mask the depth of their ${shade} ${eyes} eyes nor obscure their ${hairLength} ${shade} ${hairColor} hair. Their ${grooming} style is evident with a ${outerCovering} cloaking their body. ${extraLooks}`;

  const styles ={
    height,
  }

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

  const modStr = stat => {
    const mod = abilityMod(stat);
    if (mod === 0 ) {
      return '0'
    } 
    return mod < 0 ? `${mod}` : `+${mod}`;
  }

  const hasProf = prof => {
    return ctCharacter.professions[prof] !== 0;
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

    //determine weapon
    newCtAgent.ctWeapon = character.weaponSetA > character.weaponSetB ? 'A' : 'B';

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
      return accessory === 'jewelry' ?  accessory : `${prefix} ${accessory}`;
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
   
  const generatePdf = () => {
    var doc = new jsPDF({
      orientation: 'p',
      unit: 'in',
      format: 'letter',
      putOnlyUsedFonts:true,
      floatPrecision: 16 // or "smart", default is 16
     });
    doc.addImage("dnd5e_ct.png", "PNG", 0, 0, 8.5, 11);
    doc.setFont("Times");
    doc.setFontSize(12); 
    //top of the page
    doc.setFontSize(11); 
    doc.text("Clock Tower Agent", 3.75, 0.86);
    doc.setFontSize(6); 
    doc.setTextColor("#908d8e");
    doc.text("(Level 1)", 4.45, 0.98);
    doc.setTextColor("#000000");
    doc.setFontSize(11); 
    doc.text(`Path of the ${ctCharacter.ctClass.replace(/\b[a-z]/g, (x) => x.toUpperCase())}`, 5.3, 0.86);
    doc.text("Human Variant", 3.75, 1.2);
    //stats
    doc.setFontSize(20); 
    const { cha, con, dex, int, str, wis } = ctCharacter.stats;
    doc.text(`${str}`, 0.79, 2.4, 'center');
    doc.text(`${dex}`, 0.79, 3.4, 'center');
    doc.text(`${con}`, 0.79, 4.4, 'center');
    doc.text(`${int}`, 0.79, 5.4, 'center');
    doc.text(`${wis}`, 0.79, 6.4, 'center');
    doc.text(`${cha}`, 0.79, 7.4, 'center');
    doc.setFontSize(10); 
    doc.text(modStr(str), 0.79, 2.725, 'center');
    doc.text(modStr(dex), 0.79, 3.725, 'center');
    doc.text(modStr(con), 0.79, 4.712, 'center');
    doc.text(modStr(int), 0.79, 5.7, 'center');
    doc.text(modStr(wis), 0.79, 6.7, 'center');
    doc.text(modStr(cha), 0.79, 7.7, 'center');

    //saving throws
    const calcSavThrow = stat => { return Math.floor((stat - 10) / 2); }
    doc.text(`${calcSavThrow(str)}`, 1.675, 2.95, 'center');
    doc.text(`${calcSavThrow(dex)}`, 1.675, 3.16, 'center');
    doc.text(`${calcSavThrow(con)}`, 1.675, 3.34, 'center');
    doc.text(`${calcSavThrow(int)}`, 1.675, 3.52, 'center');
    doc.text(`${calcSavThrow(wis)}`, 1.675, 3.71, 'center');
    doc.text(`${calcSavThrow(cha)}`, 1.675, 3.9, 'center');
    // Passive Perception
    doc.setFontSize(18);
    doc.text(`${parseFloat(modStr(wis)) + 10}`, 0.59, 8.42, 'center');
    // Profiencey Bonus
    doc.setFontSize(18);
    doc.text(`+${2}`, 1.47, 2.55, 'center');
    // Armor Class
    doc.setFontSize(20);
    doc.text(`${ctCharacter.armorClass}`, 3.45, 2.2, 'center');
    // Hit Points
    doc.setFontSize(20);
    doc.setFontSize(7); 
    doc.setTextColor("#908d8e");
    doc.text(`${ctCharacter.hitPoints} at Level 1`, 4.1, 2.85);
    doc.setTextColor("#000000");
    

    // Skills
    // the following aren't used in the class build:
    // animalhandling, arcana, history, investigation, nature, religion

    const skillPosArr = [
      {name: 'acrobatics' , x: 1.675, y: 4.56},
      {name: 'animalhandling' , x: 1.675, y: 4.75},
      {name: 'arcana' , x: 1.675, y: 4.94},
      {name: 'athletics' , x: 1.675, y: 5.13},
      {name: 'deception' , x: 1.675, y: 5.32},
      {name: 'history' , x: 1.675, y: 5.51},
      {name: 'insight' , x: 1.675, y: 5.7},
      {name: 'intimidation' , x: 1.675, y: 5.89},
      {name: 'investigation' , x: 1.675, y: 6.07},
      {name: 'medicine' , x: 1.675, y: 6.26},
      {name: 'nature' , x: 1.675, y: 6.45},
      {name: 'perception' , x: 1.675, y: 6.62},
      {name: 'performance' , x: 1.675, y: 6.82},
      {name: 'persuasion' , x: 1.675, y: 7.01},
      {name: 'religion' , x: 1.675, y: 7.19},
      {name: 'sleightofhand' , x: 1.675, y: 7.39},
      {name: 'survival' , x: 1.675, y: 7.57},
      {name: 'stealth' , x: 1.675, y: 7.76},
    ]

    doc.setFontSize(8);

    for (let index = 0; index < skillPosArr.length; index++) {
      const skill = skillPosArr[index];
      if (hasProf(skill.name)) {
        doc.text(`${ctCharacter.professions[skill.name]}`, skill.x, skill.y, 'center');
      }
    }

    // Traits
    doc.setFontSize(7);
    doc.text('CLOCK TOWER HUMAN VARIANT TRAIT', 0.5, 8.8, {maxWidth: 2});
    doc.setFontSize(10);
    doc.text(`${ctCharacter.traits[0]}`, 0.5, 9, {maxWidth: 2});

    //Skill
    doc.setFontSize(7);
    doc.text('THE POCKET WATCH', 5.725, 5.5, {maxWidth: 2});
    doc.setFontSize(9);
    doc.text('At 1st Level, you are given your Pocket Watch, this allows youto use trial and error in an effort to complete your mission. Once per round as a free action, when you or another creature you can see within 60 feet makes an ability check, an attack roll, or a saving throw you can roll a Clock Tower die, a d2 and add up to the result as a bonus or penalty to the roll. To effect another creature with this ability the creature must be able to see you, hear you, or be touched by you. You can use this feature a number of times equal to your Intelligence modifier (a minimum of once). You regain any expended uses when you finish a long rest.', 5.725, 5.6725, {maxWidth: 2.3});
    doc.setFontSize(7);
    doc.text(`FIGHTING STYLE ${ctCharacter.ctWeapon}`, 5.725, 7.95, {maxWidth: 2.3});
    doc.setFontSize(9);
    doc.text(`${ctCopy[ctCharacter.ctClass][ctCharacter.ctWeapon]}`, 5.725, 8.125, {maxWidth: 2.3});


    // Equipment
    doc.setFontSize(9);
    doc.text(`• ${toTitleCase(ctCharacter.equipment[0])}`, 3.2, 6.45, 'left');
    for (let index = 1; index < ctCharacter.equipment.length; index++) {
      doc.text(`• ${toTitleCase(ctCharacter.equipment[index])}`, 3.75, 8.25 + (index * .2), 'left');
    }

    // Description
    doc.setFontSize(9);
    doc.text(`${ctCharacter.description}`, 5.825, 2.15, {maxWidth: 2.125});
    doc.setFontSize(7);
    doc.text(`THE ${ctCopy[ctCharacter.ctClass].sub} OF THE CLOCK TOWER`, 5.825, 3.6, {maxWidth: 2});
    doc.setFontSize(9);
    doc.text(`${ctCopy[ctCharacter.ctClass].description}`, 5.825, 3.7725, {maxWidth: 2.125});

    //save out pdf
    doc.save('myClocktowerAgent.pdf');
  }

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
          <div className="version">ver. {version}</div>
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
            <button className="download" onClick={() => generatePdf()}>
              DOWNLOAD&nbsp;
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" style={{height:'24px',lineHeight:'18px', marginBottom: '-4px'}}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </button>
            <div>
              <h1 className="charTitle">Clock Tower Agent <span> Level 1</span></h1>
              <h3 className="path">Path of the {ctCharacter.ctClass}  <span>Fighting Style {ctCharacter.ctWeapon}</span></h3>
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
                <div className="blockLabel">Clock Tower Human Variant Trait</div>
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
