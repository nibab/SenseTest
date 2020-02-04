import React from 'react';
import Form from 'react-bootstrap/Form';

export type RunFormTypes = {
  setVersion: (version: string) => void,
  setRunType: (runType: string) => void,
  version: string,
  runType: string,
}

const RunForm = ({setVersion, setRunType, version, runType}: RunFormTypes) => (
  <Form>
    <Form.Group>
      <Form.Label>Version</Form.Label>
      <Form.Control placeholder='v1.5.0' required type="text"
        onChange={(e: React.FormEvent<HTMLInputElement>) => setVersion(e.currentTarget.value)}/>
    </Form.Group>
    <Form.Group controlId='createRunModal.runType'>
      <Form.Label>Run Type</Form.Label>
      <Form.Control as='select'
        onChange={(e: React.FormEvent<HTMLInputElement>) => setRunType(e.currentTarget.value)}>
        <option value='regression'>Regression (All active tests)</option>
        <option value='smoke'>Smoke (Only critical tests)</option>
      </Form.Control>
    </Form.Group>
  </Form>
)

export default RunForm;
