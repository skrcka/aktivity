// App.js
import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Row, Col } from 'reactstrap';
import WordBox from './WordBox';
import DropTarget from './DropTarget';
import {Button} from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';

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


function App() {
  const [answers, setAnswers] = useState({});
  const [errors, setErrors] = useState([]);
  const [isCorrect, setIsCorrect] = useState(null);

  const [used, setUsed] = useState([]);

  const handleDrop = (hint, word) => {
    setErrors(prevErrors => [...prevErrors.filter(error => error !== hint)]);
    setIsCorrect(null);
    setAnswers(prev => ({
      ...prev,
      [hint]: word
    }));
  };

  const handleChange = (prev, newWord) => {
    console.log(prev, newWord);
    setUsed(prevState => [
      ...prevState.filter(word => word !== prev),
      newWord,
    ]);
  };

  const reset = () => {
    window.location.reload();
  }

  const wordPairs = [
    { hint: "Portland", correct: "cement" },
    { hint: "Reinforced", correct: "concrete" },
    { hint: "Compressive", correct: "strength" },
    { hint: "Hydraulic", correct: "binder" },
    { hint: "Hydration", correct: "reaction" },
    { hint: "Recycled", correct: "aggregate" },
    { hint: "Crushed", correct: "stone" },
  ];

  const verifyAnswers = () => {
    let errors = [];
    for (let pair of wordPairs) {
      if (answers[pair.hint] !== true) {
        errors.push(pair.hint);
      }
    }
    if(!errors.length) {
      setIsCorrect(true);
    }
    else{
      setIsCorrect(false);
      setErrors(errors);
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="border p-3 shadow-sm bg-white" style={{width: '60%'}}>
      <Button onClick={reset}>Reset</Button>
      <DndProvider backend={HTML5Backend}>
      {wordPairs.map(pair => (
        <Row className='p-3 w-100' key={pair.hint}>
          <Col xs={6} className="mb-3 text-end">
          {pair.hint}
          </Col>
          <Col xs={6}>
          <DropTarget
            correctWord={pair.correct}
            onVerify={(word) => handleDrop(pair.hint, word)}
            onChange={(prev, newWord) => {
              console.log("Changing from", prev, "to", newWord);
              handleChange(prev, newWord);
            }}
          />
          </Col>
          </Row>
      ))}
        <Row className="justify-content-center mt-3">
        {shuffle(wordPairs.filter(word => !used.includes(word.correct))).map(pair => (
          <Col xs="auto" key={pair.hint}>
          <WordBox word={pair.correct} />
          </Col>
        ))}
        </Row>
        <Row className="justify-content-center mt-3 mb-3">
          <Col xs="6" className='text-end'>
            <Button onClick={verifyAnswers}>Verify</Button>
          </Col>
          <Col xs="6" className="mb-2">
          {isCorrect !== null && (
            <>
            <FontAwesomeIcon size='2xl' className='pt-1 pe-2' color={isCorrect ? 'green' : 'red'} icon={isCorrect ? faCheck : faXmark} />
            {isCorrect ? 'Correct!' : 'Incorrect!'}
            </>
          )}
          </Col>
          </Row>
          {errors.length > 0 && (
            <Row className="justify-content-center">
            <Col xs="6" className="text-end">Errors:</Col>
            <Col xs="6">
            {errors.map(error => (
              <div style={{color:'red'}} key={error}>{error}</div>
            ))}
            </Col>
            </Row>
          )}
    </DndProvider>
    </div>
        </div>
  );
}

export default App;
