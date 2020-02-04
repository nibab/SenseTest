import React, { Fragment, useState, ReactNode } from 'react';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import FormControl from 'react-bootstrap/FormControl';
import uuidv1 from "uuid";
import { Button, Card, Radio } from 'antd';
import { UploadFile } from 'antd/lib/upload/interface';
import { TestCasesClient, TestCase } from '../clients/TestCasesClient';
import FileUpload from './FileUpload';
import ZeplinImport from './ZeplinImport';
import ZeplinScreenCard from './ZeplinScreenCard';
import FileScreenCard from './FileScreenCard';
import { ZeplinScreen } from '../utils/ZeplinAuth';

type TestFileManagerProps = {
  zeplinScreen: ZeplinScreen | null
  setZeplinScreen: (zeplinScreen: ZeplinScreen | null) => void
  file: UploadFile | null
  setFile: (file: UploadFile | null) => void
}

const TestFileManager = ({ zeplinScreen, setZeplinScreen, file, setFile }: TestFileManagerProps) => {
  const [ fileType, setFileType ] = useState('zeplin')

  const onUpload = async (file: UploadFile) => {
    setFile(file)
  }

  return (
    <Fragment>
      {zeplinScreen && (
        <div style={{ textAlign: 'center' }}>
          <ZeplinScreenCard width={300} zeplinScreen={zeplinScreen} onClick={() => setZeplinScreen(null)}/>
        </div>
      )}
      {file && (
        <div style={{ textAlign: 'center'}}>
          <FileScreenCard file={file} onClick={() => { setFile(null)}}/>
        </div>
      )}
      {!zeplinScreen && !file && (
        <Container style={{ height: '100%', textAlign: 'center' }}>
          <Radio.Group onChange={(e) => setFileType(e.target.value)}
            value={fileType} style={{ marginBottom: 8 }}>
            <Radio.Button value='zeplin'>Select from Zeplin</Radio.Button>
            <Radio.Button value='upload'>Upload a file</Radio.Button>
          </Radio.Group>
          {fileType === 'zeplin' && <ZeplinImport setZeplinScreen={setZeplinScreen}/>}
          {fileType === 'upload' && <FileUpload onUpload={onUpload}/>}
        </Container>
      )}
    </Fragment>
  )
}

type TestFormProps = {
  mode: 'edit' | 'create'
  show: boolean
  onSubmit?: (request: Promise<any>) => void
  handleClose: () => void 
  testCase?: TestCase
}

type TestFormState = {
  version: string
  platform: string
  journey: string
  isCritical: boolean
  action: string
  expectedBehavior: string
  defaultAssignee: string
  zeplinScreen: ZeplinScreen | null
  activeKey: string
  file: UploadFile | null
}

const initialState = {
  version: '',
  platform: 'mobile',
  journey: '',
  isCritical: false,
  action: '',
  expectedBehavior: '',
  defaultAssignee: 'cezar',
  zeplinScreen: null,
  file: null,
  activeKey: 'parameters',
}

class TestForm extends React.Component<TestFormProps, TestFormState> {
    constructor(props: TestFormProps) {
      super(props);
      this.state = initialState;
      this.handleChange = this.handleChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      this.isValid = this.isValid.bind(this);
      this.setZeplinScreen = this.setZeplinScreen.bind(this);
      this.setFile = this.setFile.bind(this);
      this.onEntering = this.onEntering.bind(this);
      this.onExiting = this.onExiting.bind(this);
      this.setActiveKey = this.setActiveKey.bind(this);
    }

    onEntering() {
      if (this.props.testCase) {
        console.log(this.props.testCase)
        this.setState({
          version: this.props.testCase.version,
          platform: this.props.testCase.platform,
          journey: this.props.testCase.metadata.journey,
          isCritical: this.props.testCase.critical,
          action: this.props.testCase.action,
          expectedBehavior: this.props.testCase.expectedResult,
          defaultAssignee: this.props.testCase.metadata.defaultAssignee,
          zeplinScreen: this.props.testCase.metadata.zeplinScreen,
          file: this.props.testCase.metadata.file
        })
      } else {
        // Reset the state if a test case is not provided.
        this.setState(initialState)
      }
    }

    onExiting() {
      this.setState(initialState)
    }

    componentDidMount() {
      this.setState({ defaultAssignee: 'cezar' }); // handle lata
    }

    isValid() {
      const isValid = (
        !!this.state.version && !!this.state.platform &&
        !!this.state.journey && !!this.state.action &&
        !!this.state.expectedBehavior && !!this.state.defaultAssignee
      );
       return isValid;
    }

    onSubmit() {
      const testCase: TestCase = {
        testCaseId: uuidv1(),
        projectId: '1',
        version: this.state.version,
        critical: this.state.isCritical,
        platform: this.state.platform,
        action: this.state.action,
        expectedResult: this.state.expectedBehavior,
        metadata: {
          zeplinScreen: this.state.zeplinScreen,
          defaultAssignee: this.state.defaultAssignee,
          journey: this.state.journey,
          file: this.state.file,
        }
      }
      console.log(testCase)
      if (this.props.mode === 'edit' && this.props.testCase) {
        testCase.testCaseId = this.props.testCase.testCaseId;
        if (this.props.onSubmit !== undefined) {
          this.props.onSubmit(TestCasesClient.editTestCase(testCase));
        } else {
          TestCasesClient.editTestCase(testCase)
        }
      } else {
        if (this.props.onSubmit !== undefined) {
          this.props.onSubmit(TestCasesClient.createTestCase(testCase));
        } else {
          TestCasesClient.createTestCase(testCase)
        } 
      }
      this.props.handleClose();
    }

    handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      const { name, value } = e.currentTarget;
      this.setState(state => ({
        ...state,
        [name]: value
      }));
    }

    setZeplinScreen(zeplinScreen: ZeplinScreen | null) {
      // TODO: Do we want to store more data?
      this.setState({ zeplinScreen })
    }

    setFile(file: UploadFile | null) {
      this.setState({ file })
    }

    setActiveKey(activeKey: string) {
      this.setState({ activeKey })
    }

    render() {
      // TODO: Get members of project
      const assigneeOptions = ['cezar', 'pepe'].map(userId => (
        <option value={userId}>{userId}</option>
      ))

      const tabList = [
        {
          key: 'parameters',
          tab: 'Info'
        },
        {
          key: 'screens',
          tab: 'Add a Screen'
        }
      ];

      const parameters = (
        <Form>
          <Form.Group>
            <Form.Label>Version</Form.Label>
            <FormControl name='version'
              placeholder='v1.5.0' required type="text"
              value={this.state.version}
              onChange={this.handleChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Journey</Form.Label>
            <Form.Control name='journey'
              placeholder='Onboarding' required type='text'
              value={this.state.journey}
              onChange={this.handleChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Platform</Form.Label>
            <Form.Control name='platform'
              required as='select'
              value={this.state.platform}
              onChange={this.handleChange}>
              <option value='mobile'>Mobile</option>
              <option value='web'>Web</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Action</Form.Label>
            <Form.Control name='action' required as='textarea'
              value={this.state.action}
              onChange={this.handleChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Expected behavior</Form.Label>
            <Form.Control name='expectedBehavior' required as='textarea'
              value={this.state.expectedBehavior}
              onChange={this.handleChange} />
          </Form.Group>
          <Form.Group>
            <Form.Check type='checkbox' label='Critical' required
              name='isCritical'
              checked={this.state.isCritical}
              onChange={(newValue: any) => { this.setState({ isCritical: newValue.currentTarget.checked }) }} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Default Assignee</Form.Label>
            <Form.Control name='defaultAssignee' as='select' required
              value={this.state.defaultAssignee}
              onChange={this.handleChange}>
              {assigneeOptions}
            </Form.Control>
          </Form.Group>
        </Form>
      )

      const screens = (
        <TestFileManager setZeplinScreen={this.setZeplinScreen}
          zeplinScreen={this.state.zeplinScreen}
          setFile={this.setFile}
          file={this.state.file} />
      )

      const contentList: { [key: string]: ReactNode } = {
        parameters: parameters,
        screens: screens,
      }

      return (
        <Modal show={this.props.show} onHide={this.props.handleClose}
          id='test-modal' onEntering={this.onEntering} onExiting={this.onExiting}>
          <Modal.Header closeButton>
            <Modal.Title>Test Form</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{backgroundColor: '#f0f2f5'}}>
            <Card style={{ width: '100%', backgroundColor: '#f0f2f5'}}
              tabList={tabList}
              bordered={false}
              activeTabKey={this.state.activeKey}
              onTabChange={(key: string) => this.setActiveKey(key)}>
                {contentList[this.state.activeKey]}
            </Card>
          </Modal.Body>
          <Modal.Footer>
            <Button type='default' onClick={this.props.handleClose}>
              Close
            </Button>
            <Button type='primary' disabled={!this.isValid()} onClick={this.onSubmit}>
              Save
            </Button>
          </Modal.Footer>
        </Modal> 
      )
    }
};


export default TestForm;