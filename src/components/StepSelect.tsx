import React from 'react';
import { Row, Col, Container, Button, Card, Alert } from 'react-bootstrap';
import Jumbo from './Jumbo';
import { AppStageEnum, AppState } from '../App';

type StepSelectProps = {
  setAppState: (appState: AppState) => void
}

class StepSelect extends React.Component<StepSelectProps, {}> {
  private interval: any
  constructor(props: Readonly<StepSelectProps>) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <Row>
        <Col>
          <Jumbo></Jumbo>
          <Container>
            <Alert variant="warning">Instructions to download and verify this page are <a href="#">here</a></Alert>
            <h2>Let's get started</h2>
            <p>Please select what applies to you.</p>
            <Card className="mt-2">
              <Card.Body >
                <Card.Title>I want to create a new key</Card.Title>
                <Card.Text>
                  Generate new unique secure bip44 standard multi coin recovery seed compatible with pretty much every wallet and crypto currency.
                  </Card.Text>
                <Button variant="primary" onClick={() => this.props.setAppState({appStage:AppStageEnum.NEW_KEY})}>Create new key</Button>
              </Card.Body>
            </Card>
            <Card className="mt-3">
              <Card.Body >
                <Card.Title>I have an existing key</Card.Title>
                <Card.Text>
                  Supported are bip44 standard recover seeds (12/24 words) as well as several private key formats for Bitcoin, Ethereum, Litecoin, Heat and more.</Card.Text>
                <Button variant="secondary" onClick={() => this.props.setAppState({appStage:AppStageEnum.EXISTING_KEY})}>Use existing key</Button>
              </Card.Body>
            </Card>
          </Container>
        </Col>
      </Row>
    );
  }
}

export default StepSelect;