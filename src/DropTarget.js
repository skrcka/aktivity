// DropTarget.js
import React, { useState, useRef, useEffect } from 'react';
import { useDrop } from 'react-dnd';

const DropTarget = ({ correctWord, onVerify, onChange }) => {
  const [droppedWord, setDroppedWord] = useState("");
  const droppedWordRef = useRef(droppedWord);

  useEffect(() => {
    droppedWordRef.current = droppedWord;
  }, [droppedWord]);

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: 'WORD',
    drop: (item) => {
      onChange(droppedWordRef.current, item.word);
      setDroppedWord(item.word);
      onVerify(item.word === correctWord);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  let backgroundColor = 'lightgray';
  if (isOver) {
    backgroundColor = canDrop ? 'lightgreen' : 'lightcoral';
  }

  return (
    <div ref={drop} style={{ backgroundColor, width: 100, height: 50, lineHeight: '50px', textAlign: 'center' }}>
      {droppedWord}
    </div>
  );
};

export default DropTarget;
