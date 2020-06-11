import React from 'react';
import { Row, Col, Container, Form, Button } from 'react-bootstrap';
import { AppStageEnum, AppState } from '../App';
import Jumbo from './Jumbo';
import { pdfToDataUri, pdfsave } from './pdfprint';

type StepCompleteState = {
  notes: string,
  fileName: string,
  fileType: 'pdf' | 'pdf',
  previewPdf: string
}

type StepCompleteProps = {
  setAppState: (appState: AppState) => void
  keyData: string,
  keyIsValidBip39: boolean,
  previousStage: AppStageEnum
}


class StepComplete extends React.Component<StepCompleteProps, StepCompleteState> {
  private interval: any
  constructor(props: Readonly<StepCompleteProps>) {
    super(props);
    this.state = {
      notes: '',
      fileName: 'wallet',
      fileType: 'pdf',
      previewPdf: ''
    }
  }

  canSave = () => {
    return this.state.fileName;
  }

  handleNotesChange = (event: any) => {
    let value = event.target.value;
    this.setState({ ...this.state, notes: value })
  }

  handleFilenameChange = (event: any) => {
    let value = event.target.value;
    this.setState({ ...this.state, fileName: value })
  }

  handleFileTypeChange = (event: any) => {
    let value = event.target.value;
    this.setState({ ...this.state, fileType: value })
  }

  printPaper = async () => {
    // pdfprint({
    //   keyData: this.props.keyData,
    //   keyIsValidBip39: this.props.keyIsValidBip39,
    //   notes: this.state.notes || 'No notes where supplied'
    // })
  }

  saveFile = async () => {
    let fileName = `${this.state.fileName}.${this.state.fileType}`
    pdfsave({
      keyData: this.props.keyData,
      keyIsValidBip39: this.props.keyIsValidBip39,
      notes: this.state.notes || 'No notes where supplied'
    }, fileName)
  }

  createPdf = async () => {
    let dataUri = await pdfToDataUri({
      keyData: this.props.keyData,
      keyIsValidBip39: this.props.keyIsValidBip39,
      notes: this.state.notes || 'No notes where supplied'
    })
    this.setState({ ...this.state, previewPdf: dataUri })
  }

  render() {
    let topComponent;
    if (this.state.previewPdf) {
      topComponent = <Row>
        <Col>
          <Button variant="light" onClick={() => {
            this.setState({... this.state, previewPdf:'' })
          }}>Close Preview</Button>
          <embed width='100%' height='400px' src={this.state.previewPdf} type="application/pdf" ></embed>
        </Col>
      </Row>
      
    }
    else {
      topComponent = <Jumbo></Jumbo>
    }
    return (
      <Row>
        <Col>
          {topComponent}
          <Container>
            <h2>Save your Key</h2>
            <Row>
              <Col>
                <Form>
                  <Form.Group>
                    <Form.Label>Filename<br /><small>Required when saving to file</small></Form.Label>
                    <Form.Row>
                      <Col md={8}>
                        <Form.Control type="text"
                          onChange={(event) => this.handleFilenameChange(event)}
                          value={this.state.fileName} />
                      </Col>
                      <Col md={4}>
                        <Form.Control
                          as="select"
                          className="mr-sm-2"
                          custom
                          value={this.state.fileType}
                          onChange={(event) => this.handleFileTypeChange(event)}>
                          <option value="pdf">PDF</option>
                        </Form.Control>
                      </Col>
                    </Form.Row>
                    <Form.Text>Choose whichever name you want, try and make it not stand out yet easily recognizable by your self.</Form.Text>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Optional notes</Form.Label>
                    <Form.Control as="textarea" rows={2}
                      onChange={(event) => this.handleNotesChange(event)}
                      value={this.state.notes} />
                    <Form.Text>These notes are included on the backup and can be used to describe this key</Form.Text>
                  </Form.Group>                  
                  <Row>
                    <Col>
                      <Row>
                        <Col>
                          <Button className="mr-2" variant="secondary" onClick={() => this.props.setAppState({ appStage: this.props.previousStage })}>Back</Button>
                          <Button className="mr-2" variant="primary" onClick={() => this.printPaper()}>Print</Button>
                          <Button className="mr-2" disabled={!this.canSave()} variant="primary" onClick={() => this.saveFile()}>Save</Button>
                        </Col>
                      </Row>
                    </Col>
                    <Col md="auto">
                      <Button variant="danger" onClick={() => this.createPdf()}>Preview</Button>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    );
  }
}

export default StepComplete;