import React, { useState } from 'react';
import {Button} from 'reactstrap'
import './App.css';

import 'bootstrap/dist/css/bootstrap.css';

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
      // Generate a random index between 0 and i (inclusive)
      const j = Math.floor(Math.random() * (i + 1));

      // Swap elements array[i] and array[j]
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function Filler() {
  const [selections, setSelections] = useState({});
  const [verified, setVerified] = useState(false);

  const phrases = [
    { id: 1, text: "A concrete plant, also called concrete batching plant is an industrial facility used to produce" },
    { id: 2, select: ["concrete", "mixer", "equipment"] },
    { id: 3, text: ". It is formed by mixing" },
    { id: 4, select: ["aggregates", "batchers", "silos"] },
    { id: 5, text: "," },
    { id: 6, select: ["sand", "bins", "room"] },
    { id: 7, text: "," },
    { id: 8, select: ["cement", "batchers", "concrete"] },
    { id: 9, text: "," },
    { id: 10, select: ["water", "equipment", "silos"] },
    { id: 11, text: "and usually other additives, which are most often fly ash, slag, stone flour and" },
    { id: 12, select: ["chemical additives", "concrete", "room"] },
    { id: 13, text: "." },
    { id: 14, text: "br" },
    { id: 15, text: "A concrete batching plant has various components: mainly a" },
    { id: 16, select: ["mixer", "concrete", "sand"] },
    { id: 17, text: ", aggregate " },
    { id: 18, select: ["bins", "chemical additives", "aggregates"] },
    { id: 19, text: ", cement " },
    { id: 20, select: ["silos", "cement", "water"] },
    { id: 21, text: ", aggregate and cement" },
    { id: 22, select: ["batchers", "chemical additives", "sand"] },
    { id: 23, text: ", batch plant control " },
    { id: 24, select: ["room", "water", "aggregates"] },
    { id: 25, text: "and others such as recycling " },
    { id: 26, select: ["equipment", "sand", "concrete"] },
    { id: 27, text: ", etc..." },
  ];

  const correctAnswers = {
    2: "concrete",
    4: "aggregates",
    5: "sand",
    6: "cement",
    7: "water",
    9: "chemical additives",
    12: "mixer",
    14: "bins",
    16: "silos",
    18: "batchers",
    20: "room",
    22: "equipment",
  };

  const handleChange = (id, value) => {
    setSelections({
      ...selections,
      [id]: value
    });
    setVerified(false);
  };

  const handleVerify = () => {
    setVerified(true);
  };

  return (
    <div className="d-flex justify-content-center text-justify">
      <div className="border p-3 shadow-sm bg-white" style={{width: '60%'}}>
      {phrases.map(phrase => (
        phrase.text
          ? <>
            {(phrase.text === 'br') ?
              <div className='mt-3'></div>
              :
              <span className='m-1' key={phrase.id}>{phrase.text} </span>
            }
            </>
          : <div className="custom-select">
            <select
              key={phrase.id}
              onChange={(e) => handleChange(phrase.id, e.target.value)}
              className='m-1'
              style={{
                backgroundColor: verified && selections[phrase.id] !== correctAnswers[phrase.id] ? 'red' : 'white'
              }}
            >
              <option value=''></option>
              {shuffle(phrase.select).map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            </div>
      ))}
      <br/>
      <Button onClick={handleVerify}>Verify</Button>
    </div>
    </div>
  );
}

export default Filler;
