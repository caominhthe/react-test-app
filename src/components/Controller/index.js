import React from 'react';
import { Button } from 'react-bootstrap';
import './styles.scss';

const Controller = ({ onDraw, onShuffle, onReveal }) =>(
  <div className="Controller-wrapper">
    <Button variant="warning" onClick={onDraw}>Draw</Button>
    <Button variant="warning" onClick={onShuffle}>Shuffle</Button>
    <Button variant="warning" onClick={onReveal}>Reveal</Button>
  </div>
);

export default Controller;