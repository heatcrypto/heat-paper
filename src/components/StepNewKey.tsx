import React from 'react';
import { Row, Col, Container, Form, Button } from 'react-bootstrap';
import { AppStageEnum, AppState } from '../App';
import Jumbo from './Jumbo';
import { generateMnemonic } from 'bip39'

type StepNewKeyState = {
  keyData: string
}

type StepNewKeyProps = {
  setAppState: (appState: AppState) => void
}

class StepNewKey extends React.Component<StepNewKeyProps, StepNewKeyState> {
  private interval: any
  constructor(props: Readonly<StepNewKeyProps>) {
    super(props);
    this.state = {
      keyData: ''
    }
  }

  componentDidMount() {
    this.generateKey();
  }

  generateKey = () => {
    var key = generateMnemonic();
    this.setState({ ...this.state, keyData: key })
  }

  render() {
    return (
      <Row>
        <Col>
          <Jumbo></Jumbo>
          <Container>
            <h2>This is your new key</h2>
            <Form>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>This is a valid bip39 compatibale recovery seed compatible with most wallets and crypto currencies.</Form.Label>
                <Form.Control as="textarea" rows={2}
                  readOnly={true} value={this.state.keyData} />
              </Form.Group>
              <Row>
                <Col>
                  <Row>
                    <Col>
                      <Button className="mr-2" variant="secondary" onClick={() => this.props.setAppState({ appStage: AppStageEnum.SELECT })}>Back</Button>
                      <Button variant="primary" onClick={() => this.props.setAppState({ appStage: AppStageEnum.COMPLETE, keyData: this.state.keyData, keyIsValidBip39: true, previousStage: AppStageEnum.NEW_KEY })}>Next</Button>
                    </Col>
                  </Row>
                </Col>
                <Col md="auto">
                  <Button variant="light" onClick={() => this.generateKey()}>Generate different key</Button>
                </Col>
              </Row>
            </Form>
          </Container>
        </Col>
      </Row>
    );
  }
}

export default StepNewKey;