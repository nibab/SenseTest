import React, { useState, useEffect, Fragment } from 'react';
import { Card, Descriptions, Popover, Result, Tag, Input, Button, Table, Icon, Collapse } from 'antd';
import { UploadFile } from 'antd/lib/upload/interface';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import FileUpload from './FileUpload';
import ZeplinScreenCard from './ZeplinScreenCard';
import FileScreenCard from './FileScreenCard';
import { S3File } from './FileScreenCard/FileScreenCard';
import { TestCaseExecution, TestCaseExecutionsClient } from '../clients/TestCaseExecutionsClient';

type PastTestCaseExecutions = {
  testCaseExecutions: TestCaseExecution[]
}

const PastTestCaseExecutions = ({ testCaseExecutions }: PastTestCaseExecutions) => {
  const renderScreenshot = (file: S3File) => {
    if ((file !== undefined) && (file as S3File).s3Key) {
      return (
        <Popover placement='top' content={<div><FileScreenCard file={file}/></div>}>
          <Button type="primary">View</Button>
        </Popover>
      )
    } else {
      return `NA`
    }
  }

  const columns = [
    {title: 'Run', dataIndex: 'runId', key: 'run'},
    {title: 'Status', dataIndex: 'result', key: 'result', render: (result: string) => <Icon type={result ? 'check-circle' : 'exclamation-circle'}/>},
    {title: 'Notes', dataIndex: 'notes', key: 'notes', render: (notes: string) => notes ? notes : `NA`},
    {title: 'Screenshot', dataIndex: 'file', key: 'file', render: (file: S3File) => renderScreenshot(file)},
  ]
  return (
    <Table columns={columns} dataSource={testCaseExecutions}/>
  )
}

type Props = {
  testExecution: TestCaseExecution
  onTestExecutionComplete: (testCaseExecutionId: string, pass: boolean, notes: string, file: UploadFile | null) => void
}

const TestExecution = ({ testExecution, onTestExecutionComplete }: Props) => {
  const [file, setFile] = useState<UploadFile|null>(null);
  const [notes, setNotes] = useState<string>('');
  const [pastExecutions, setPastExecutions] = useState<TestCaseExecution[]>([])

  const onUpload = async (file: UploadFile) => {
    setFile(file)
  }

  const submit = async (passed: boolean) => {
    onTestExecutionComplete(testExecution.testCaseExecutionId,
      passed, notes, file)
    setNotes('');
    setFile(null);
  }

  const getPastExecutions = async () => {
    let response = await TestCaseExecutionsClient.getTestCaseExecutionsForTestCaseId(testExecution.testCaseId)
    let testCaseExecutions: TestCaseExecution[] = await response.data.Items as TestCaseExecution[];
    testCaseExecutions = testCaseExecutions.filter(tce => tce.testCaseExecutionId != testExecution.testCaseExecutionId)
    setPastExecutions(testCaseExecutions);
  }

  useEffect(() => {
    getPastExecutions();
  }, [])

  const inputForm = (
    <div style={{ margin: '0 auto', maxWidth: '400px' }}>
      <Input.TextArea rows={2}
       placeholder='Additional comments...'
       style={{marginBottom: 5}}
       value={notes}
       onChange={(e) => setNotes(e.currentTarget.value)}/>
      <FileUpload onUpload={onUpload} />  {/* NEED TO FORCE RE-RENDER!!! */}
      <div style={{ margin: '0 auto', marginTop: 5, textAlign: 'center' }}>
        <Button style={{ minWidth: 100, marginRight: 10 }} type='danger' onClick={() => submit(false)}>Fails</Button>
        <Button style={{ minWidth: 100 }} type='primary' onClick={() => submit(true)}>Passes</Button>
      </div>
    </div>
  )

  const results = (
    <div style={{ margin: '0 auto', maxWidth: '400px', textAlign: 'center' }}>
      <Result
        status={testExecution.result ? 'success' : 'error' }
        title={testExecution.result ? "Test passed" : 'Test Failed'}
        subTitle={testExecution.notes}
      />
      {(testExecution.file !== undefined) && (testExecution.file as S3File).s3Key && (
        <Popover placement='top' content={<div><FileScreenCard file={testExecution.file}/></div>}>
          <Button type="primary">View screenshot</Button>
        </Popover>
      )}
    </div>
  )

  return (
    <Card style={{ margin: 20 }}>
      <Row>
        <Col>
          <Descriptions>
            <Descriptions.Item label='Critical'>
              <Tag color={'geekblue'}>{testExecution.critical ? 'Yes' : 'No'}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label='Platform'>
              {testExecution.platform}
            </Descriptions.Item>
            <Descriptions.Item label='Journey'>
              {testExecution.metadata?.journey}
            </Descriptions.Item>
          </Descriptions>
          <hr style={{ marginTop: 20 }}/>
          <h5>Action:</h5>
          <p style={{ height: '20%' }}>{testExecution.action}</p>
          <h5>Expected Result:</h5>
          <p style={{ height: '20%' }}>{testExecution.expectedResult}</p>
        </Col>
        <Col style={{ textAlign: 'center' }}>
          {testExecution.metadata?.zeplinScreen && <ZeplinScreenCard width={300} zeplinScreen={testExecution.metadata.zeplinScreen} />}
          {testExecution.metadata?.file && <FileScreenCard file={testExecution.metadata.file}/>}
        </Col>
      </Row>
      <hr />
      <Row>
        <Col>
          {testExecution.result === undefined ? inputForm : results}
        </Col>
      </Row>
      <Row>
        <Col>
          {testExecution.result === undefined && (
            <Fragment>
              <hr/>
              <Collapse bordered={false} defaultActiveKey={['1']}>
                <Collapse.Panel header="View previous results" key="1" style={{ borderBottom: 'none' }}>
                  <PastTestCaseExecutions testCaseExecutions={pastExecutions}/>
                </Collapse.Panel>
              </Collapse>
            </Fragment>
          )}
        </Col>
      </Row>
    </Card>
  )
}

export default TestExecution;
