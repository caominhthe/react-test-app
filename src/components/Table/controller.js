import React from 'react';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';

const Controller = ({}) => {
  return (
    <ButtonToolbar>
        <Button variant="primary">Draw</Button>
        <Button variant="primary">Shuffle</Button>
        <Button variant="primary">Reveal</Button>
    </ButtonToolbar>
  );
  }

export default Controller;


