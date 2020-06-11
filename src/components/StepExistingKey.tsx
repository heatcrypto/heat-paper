import React from 'react';
import { Row, Col, Container, Form, Breadcrumb, Alert, Button } from 'react-bootstrap';
import QRCode from 'qrcode.react'
import { AppStageEnum, AppState } from '../App';
import Jumbo from './Jumbo';
import { validateMnemonic } from 'bip39'

type StepExistingKeyState = {
  keyData: string,
  keyIsValidBip39: boolean,
  checkboxUnderstandNotBip39: false
}

type StepExistingKeyProps = {
  setAppState: (appState: AppState) => void
}


class StepExistingKey extends React.Component<StepExistingKeyProps, StepExistingKeyState> {
  private interval: any
  constructor(props: Readonly<StepExistingKeyProps>) {
    super(props);
    this.state = {
      keyData: '',
      keyIsValidBip39: false,
      checkboxUnderstandNotBip39: false
    }
  }

  completeOnClick() {

  }

  canContinue = () => {
    if (this.state.keyData) {
      if (this.state.keyIsValidBip39) {
        return true;
      }
      return this.state.checkboxUnderstandNotBip39;
    }
    return false;
  }

  handleTextChange = (event: any) => {
    let value = event.target.value || "";
    let isValidBip44 = validateMnemonic(value || "")
    this.setState({ ...this.state, keyIsValidBip39: isValidBip44, keyData: value, })
  }

  handleUnderstandNotBip39 = (event: any) => {
    let value = event.target.checked;
    this.setState({ ...this.state, checkboxUnderstandNotBip39: value })
  }

  render() {
    var alert = null;
    if (this.state.keyData && this.state.keyIsValidBip39) {
      alert = <Alert variant="success">Key is valid BIP39 multi coin recovery seed.</Alert>
    } else if (this.state.keyData && !this.state.keyIsValidBip39) {
      alert = <Alert variant={this.state.checkboxUnderstandNotBip39 ? 'warning' : 'danger'}>
        <p>Key is not a valid BIP39 multi coin recovery seed.</p>
        <Form.Group >
          <Form.Check type="checkbox" label="I understand what I'm doing, my key has a different format"
            checked={this.state.checkboxUnderstandNotBip39}
            onChange={(event: any) => this.handleUnderstandNotBip39(event)}
          />
        </Form.Group>
      </Alert>
    }
    return (
      <Row>
        <Col>
          <Jumbo></Jumbo>
          <Container>
            <h2>Use existing key</h2>
            <Form>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Enter your existing recovery seed or private key below</Form.Label>
                <Form.Control as="textarea" rows={2}
                  onChange={(event) => this.handleTextChange(event)} />
              </Form.Group>
              {alert}
              <Button className="mr-2" variant="secondary" onClick={() => this.props.setAppState({ appStage: AppStageEnum.SELECT })}>Back</Button>
              <Button disabled={!this.canContinue()} variant="primary" onClick={() => this.props.setAppState({ appStage: AppStageEnum.COMPLETE, keyData: this.state.keyData, keyIsValidBip39: this.state.keyIsValidBip39, previousStage: AppStageEnum.EXISTING_KEY })}>Next</Button>
            </Form>
          </Container>
        </Col>
      </Row>
    );
  }
}

export default StepExistingKey;