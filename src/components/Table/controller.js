import React from 'react';
import { Button } from 'react-bootstrap';
import { ButtonToolbar } from 'react-bootstrap';


class Controller extends React.Component {

  render() {
    return (
      <ButtonToolbar>
      <Button variant="primary" onClick={this.props.draw}>Draw</Button>
      <Button variant="primary" onClick={this.props.shuffle}>Shuffle</Button>
      <Button variant="primary" onClick={this.props.reveal}>Reveal</Button>
      </ButtonToolbar>
    );
  }

}

export default Controller;