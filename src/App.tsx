import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Container } from 'react-bootstrap';
import StepSelect from './components/StepSelect';
import StepExistingKey from './components/StepExistingKey';
import StepNewKey from './components/StepNewKey';
import StepComplete from './components/StepComplete';


export enum AppStageEnum {
  SELECT = 1,
  EXISTING_KEY = 2,
  NEW_KEY = 3,
  COMPLETE = 4
}

export type AppState = {
  appStage?: AppStageEnum;
  keyData?: string,
  keyIsValidBip39?: boolean,
  previousStage?: AppStageEnum
}

class App extends React.Component<{}, AppState> {
  constructor(props: Readonly<{}>) {
    super(props);
    this.state = {
      appStage: AppStageEnum.SELECT,
      keyData: '',
      keyIsValidBip39: false
    }
  }

  setAppState = (appState: AppState) => {
    this.setState({ ...this.state, ...appState })
  }

  render() {
    let contents;
    switch (this.state.appStage) {
      case AppStageEnum.SELECT:
        contents = <StepSelect setAppState={this.setAppState}></StepSelect>;
        break;
      case AppStageEnum.EXISTING_KEY:
        contents = <StepExistingKey setAppState={this.setAppState}></StepExistingKey>;
        break;
      case AppStageEnum.NEW_KEY:
        contents = <StepNewKey setAppState={this.setAppState}></StepNewKey>;
        break;
      case AppStageEnum.COMPLETE:
        contents = <StepComplete keyData={this.state.keyData||''} keyIsValidBip39={this.state.keyIsValidBip39||false} previousStage={this.state.previousStage||AppStageEnum.EXISTING_KEY}  setAppState={this.setAppState}></StepComplete>;        
        break;
    }
    return <Container className="mb-2"> { contents }</Container>
  }
}

export default App;