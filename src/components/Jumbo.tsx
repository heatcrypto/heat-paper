import React from 'react';
import { Jumbotron, Container } from 'react-bootstrap';
import AppStoreLogo from './AppStoreLogo';
import PlayStoreLogo from './PlayStoreLogo';

class Jumbo extends React.Component<{}, {}> {
  private interval: any
  constructor(props: Readonly<{}>) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <Jumbotron>
        <h1>Simple, Secure, Off-line</h1>
        <p>Backup your keys on paper or as PDF file.<br />
          HEAT wallet is fully functional with no keys stored on your phone.<br />
          Only when your keys are needed quickly scan your backup and get on with being secure.
        </p>
        <br />
        <h5>Download HEAT Wallet now!</h5>
        <p>Available for Android and Iphone</p>
        <AppStoreLogo></AppStoreLogo>
        <PlayStoreLogo></PlayStoreLogo>
      </Jumbotron>
    );
  }
}

export default Jumbo;