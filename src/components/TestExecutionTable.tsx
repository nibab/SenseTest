import React from 'react';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import { Table, Tag, Badge } from 'antd';
import { TestCase } from '../clients/TestCasesClient';
import { TestCaseExecution } from '../clients/TestCaseExecutionsClient';

export type TestCaseExecutionMap = Map<TestCaseExecutionId, TestCaseExecution>;

export type RunState = 'completed' | 'pending';

export type TestExecutionTable = {
  testCaseExecutions: TestCase[]
  testCaseExecutionMap: TestCaseExecutionMap
  runId: string
  runState: RunState
  loading?: boolean
}

export type TestCaseExecutionId = string

const TestExecutionTable = ({ testCaseExecutions, testCaseExecutionMap, runId, runState, loading=false }: TestExecutionTable) => {
  const renderPlatform = (platform: string) => <Tag color={'geekblue'} key={platform}>{platform?.toUpperCase()}</Tag>
  console.log("Test executions: " + testCaseExecutions)
  const renderView = (testCaseExecutionId: string) => (
    <Link to={{
      pathname: `/run/${runId}/executions`,
      state: {
        testCaseExecutionsMap: testCaseExecutionMap,
        testCaseExecutionId,
        runState
      }}} >View</Link>
  )

  const renderCritical = (critical: boolean) => critical ? <Tag color={'volcano'}>Critical</Tag> : <Tag color={'gray'}>Non-Critical</Tag>

  let testExecutionTableColumns = [
    {title: 'Version', dataIndex: 'version', key: 'version'},
    {title: 'Platform', dataIndex: 'platform', key: 'platform', render: (platform: string) => renderPlatform(platform)},
    {title: 'Critical', dataIndex: 'critical', key: 'critical', render: (critical: boolean) => renderCritical(critical)},
    {title: 'Journey', dataIndex: 'metadata.journey', key: 'journey'},
    {title: 'Action', dataIndex: 'action', key: 'action'},
    {title: 'Expected', dataIndex: 'expectedResult', key: 'expectedResult'},
    {title: 'Options', dataIndex: 'testCaseExecutionId', key: 'testCaseExecutionId', 
     render: (testCaseExecutionId: string) => renderView(testCaseExecutionId)}
  ]

  const renderState = (runState: boolean) => {
    if (runState) {
      return (<Badge style={{ marginTop: 15 }} status="success"/>)
    } else {
      return (<Badge style={{ marginTop: 15 }} status="error"/>)
    }
  }

  if (runState === 'completed') {
    let runStateBadgeColumn = {
      title: '', 
      dataIndex: 'result',
      key: 'result',
      render: (result: boolean) => renderState(result) 
    }
    testExecutionTableColumns = [runStateBadgeColumn, ...testExecutionTableColumns]
  }

  return (
    <Table style={{backgroundColor: 'white', borderRadius: '10px'}} columns={testExecutionTableColumns} dataSource={testCaseExecutions}
      loading={loading}/>
  )
}

export default TestExecutionTable;
