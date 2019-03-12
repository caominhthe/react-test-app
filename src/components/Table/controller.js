import React from 'react';
import { Button } from 'react-bootstrap';
import { ButtonToolbar } from 'react-bootstrap';


class Controller extends React.Component {

  render() {
    return (
      <ButtonToolbar>
      <Button variant="primary">Draw</Button>
      <Button variant="primary">Shuffle</Button>
      <Button variant="primary">Reveal</Button>
      </ButtonToolbar>
    );
  }

}

export default Controller;