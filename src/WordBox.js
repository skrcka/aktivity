// WordBox.js
import React from 'react';
import { useDrag } from 'react-dnd';

const WordBox = ({ word }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'WORD',
    item: { word },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1, cursor: 'pointer' }}>
      {word}
    </div>
  );
};

export default WordBox;