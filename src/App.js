import React, { useState, useRef, useEffect } from 'react';
import {Button} from 'reactstrap'
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import DragDrop from './DragDrop';
import Filler from './Filler';

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <div className='d-flex justify-content-center'>
            <Button onClick={() => navigate('/drop')}>Drag and drop</Button>
            <Button onClick={() => navigate('/filler')}>Fill in blanks</Button>
        </div>
    );
}

const App = () => {
    return (
        <Router>
            <Routes>
            <Route exact path="/drop" element={<DragDrop />} />
            <Route path="/filler" element={<Filler />} />
            <Route path="*" element={<HomePage />} />
            </Routes>
        </Router>
    );
};

export default App;
