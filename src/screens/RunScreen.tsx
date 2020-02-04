import React, { Fragment, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import RunCard from '../components/RunCard';
import TestExecutionTable, { TestCaseExecutionMap, RunState } from '../components/TestExecutionTable';
import { TestCaseExecutionsClient, TestCaseExecution } from '../clients/TestCaseExecutionsClient';
import { Run, RunsClient } from '../clients/RunsClient';
import { DateUtils } from '../utils/DateUtils';
import { LoadingScreen } from './LoadingScreen';

const RunScreen = () => {
  const { runId } = useParams();
  const [run, setRun] = useState<Run | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [testExecutions, setTestExecutions] = useState<TestCaseExecutionMap>(new Map())
  const [dataToDisplay, setDataToDisplay] = useState<TestCaseExecution[]>([])

  let runState = 'completed' as RunState;

  const getTestExecutions = async () => {
    let response = runId && await TestCaseExecutionsClient.getTestCaseExecutionsForRunId(runId)
    let testCaseExecutions: TestCaseExecution[] = await response.data.Items as TestCaseExecution[]
    let testCaseExecutionsMap: TestCaseExecutionMap = new Map();
    for (const testCaseExecution of testCaseExecutions) {
      testCaseExecutionsMap.set(testCaseExecution.testCaseExecutionId, testCaseExecution)
    }
    setTestExecutions(testCaseExecutionsMap);

    let result: TestCaseExecution[] = []
    testCaseExecutionsMap.forEach((value: TestCaseExecution, key: string) => {
      const testExecution: TestCaseExecution = { ...value };
      if (value.result === undefined) {
        runState = 'pending' as RunState;
      }
      result.push(testExecution)
    });
    setDataToDisplay(result);
    setIsLoading(false);
  }

  const getRunInfo = async () => {
    if (runId !== undefined) {
      setIsLoading(true)
      RunsClient.getRun(runId).then((response) => {
        setIsLoading(false)
        if (response !== undefined && RunsClient.isRun(response)) {
          setRun(response)
        }
      })
    }
    
  }

  useEffect(() => {
    getTestExecutions()
    getRunInfo()
  }, [])

  useEffect(() => {

  }, [run, isLoading])

  const hardcodedRun: Run = {
    runId: runId !== undefined ? runId : 'undefined',
    dateStarted: DateUtils.getDate(),
    version: 'undefined'
  }

  return (
    <Container style={{ paddingTop: 30 }}>
      { runId && !isLoading ? (
        <Fragment>
          <Row style={{ paddingTop: '2em'}}>
            <Col>
              <h3>Run: {runId}</h3>
              <RunCard key={runId} run={run !== null ? run : hardcodedRun} hoverable={false}/>
            </Col>
          </Row>
          <Row style={{ paddingTop: '2em' }}>
            <Col>
              <TestExecutionTable testCaseExecutions={dataToDisplay}
                testCaseExecutionMap={testExecutions} loading={isLoading}
                runId={runId} runState={runState}/>
            </Col>
          </Row>
        </Fragment>
      ) : (
        <LoadingScreen />
      )}
    </Container>
  )
}

export default RunScreen;
