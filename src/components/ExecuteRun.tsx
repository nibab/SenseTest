import React, { Fragment, useState, useEffect } from "react"
import { TestCaseExecutionsClient, TestCaseExecution } from "../clients/TestCaseExecutionsClient";
import { ProjectsClient } from "../clients/ProjectsClient";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form"
import TestExecutionTable, { TestCaseExecutionMap } from "./TestExecutionTable";
import { Run, RunsClient } from "../clients/RunsClient";
import { LoadingScreen } from '../screens/LoadingScreen'

type RemainingTestExecutionTable = {
    testCaseExecutionMap: TestCaseExecutionMap // A map of testExecutionId to testCase
    runId: string
}
  
const RemainingTestExecutionTable = ({testCaseExecutionMap, runId}: RemainingTestExecutionTable) => {
  function unwrapTestCaseExecutionMapAndSetRoutes() : TestCaseExecution[] { 
    let result: TestCaseExecution[] = []
    testCaseExecutionMap.forEach((value: TestCaseExecution, key: string) => {
      const testExecution = { ...value }
      result.push(testExecution)
    });
    return result
  }
  
  let dataToDisplay = unwrapTestCaseExecutionMapAndSetRoutes()
  
  
  return (
    <TestExecutionTable testCaseExecutions={dataToDisplay} 
      testCaseExecutionMap={testCaseExecutionMap} runId={runId}
      runState={dataToDisplay ? 'pending' : 'completed'}/>
  )
}

type ActiveRunType = {
  completeTestCaseExecutions: number,
  remainingTestExecutions: number,
  onRunCompleteButtonClick: () => void
}

const ActiveRun = ({completeTestCaseExecutions, remainingTestExecutions, onRunCompleteButtonClick}: ActiveRunType) => {
  return (
    <Card>
      <Card.Body>
        {completeTestCaseExecutions}/{completeTestCaseExecutions + remainingTestExecutions} tests completed
        <Button 
          variant="primary" 
          style={{ display: 'inline-block', float: 'right' }}
          hidden={remainingTestExecutions === 0 ? false : true}
          onClick={onRunCompleteButtonClick}>Mark Completed</Button>
      </Card.Body>
    </Card>
  )
}

const NoIncompleteTestCaseExecutions = () => (
  <Fragment>
    <Card>
      <Card.Body>You do not have any test executions left.</Card.Body>
    </Card>
  </Fragment>
)

type ExecuteRunType = {
    activeRun: Run,
    onExecuteRunComplete: () => void
}

export const ExecuteRun = ({activeRun, onExecuteRunComplete}: ExecuteRunType) => {
    // Test Executions
    const [remainingTestExecutions, setRemainingTestExecutions] = useState<TestCaseExecutionMap>(new Map());
    const [completeTestExecutions, setCompletTestExecutions] = useState<TestCaseExecutionMap>(new Map());
    const [testExecutionsFetchInProgress, setExecutionsFetchInProgress] = useState(false);

    const onRunCompleteButtonClick = () => {
        ProjectsClient.setActiveRunIdForProject(null)
        
        let nrOfPassedExecutions: number = 0
        completeTestExecutions.forEach((testCaseExecution, id) => {
            if (testCaseExecution.result === true) {
                nrOfPassedExecutions += 1
            }
        })
        const passRate = nrOfPassedExecutions / completeTestExecutions.size

        RunsClient.finishRun(activeRun, passRate)
        // Optimistically marking the run done.
        onExecuteRunComplete()
    }

    useEffect(() => {
        getRemainingTestExecutions(activeRun.runId) 
    }, [])
  
    const getRemainingTestExecutions = async (runId: string) => {
        setExecutionsFetchInProgress(true)
        // Instead of filtering test executions by complete/incomplete here, do it in the query.
        let response = await TestCaseExecutionsClient.getTestCaseExecutionsForRunId(runId)
        let testCaseExecutions: TestCaseExecution[] = await response.data.Items as TestCaseExecution[]
        let remainingTestCaseExecutionsMap: TestCaseExecutionMap = new Map();
        let completeTestCaseExecutionsMap: TestCaseExecutionMap = new Map();
        for (const testCaseExecution of testCaseExecutions) {
          if (testCaseExecution.result === undefined) {
            remainingTestCaseExecutionsMap.set(testCaseExecution.testCaseExecutionId, testCaseExecution)
          } else {
            completeTestCaseExecutionsMap.set(testCaseExecution.testCaseExecutionId, testCaseExecution)
          }
        }
        setRemainingTestExecutions(remainingTestCaseExecutionsMap)
        setCompletTestExecutions(completeTestCaseExecutionsMap)
        setExecutionsFetchInProgress(false)
    }

    const isLoading = testExecutionsFetchInProgress

    if (isLoading) {
      return (<LoadingScreen />)
    } else {
      return (
        <Fragment>
          <Row style={{ paddingTop: '2em' }}>
            <Col style={{ padding: 0 }}>
              <h5>Active run</h5>
              <br />
              <ActiveRun 
                completeTestCaseExecutions={completeTestExecutions.size} 
                remainingTestExecutions={remainingTestExecutions.size}
                onRunCompleteButtonClick={onRunCompleteButtonClick}/>
            </Col>
          </Row>
          <Row style={{ paddingTop: '2em' }}>
            <Col style={{paddingLeft: 0, paddingRight: 0}}>
              <div style={{ display: 'inline-block' }}>
                <h5>Remaining Tests</h5>
              </div>
              <Form.Control as='select' style={{ display: 'inline-block', maxWidth: '200px', float: 'right'}}>
                <option value='cezar'>All</option>
                <option value='pepe'>Only mine</option>
              </Form.Control>
            </Col>
          </Row>
          <Row style={{ paddingTop: '1em' }}>
            <Col style={{ padding: 0 }}>
              {remainingTestExecutions.size > 0 ? <RemainingTestExecutionTable testCaseExecutionMap={remainingTestExecutions} runId={activeRun.runId}/> : <NoIncompleteTestCaseExecutions />}
            </Col>
          </Row>
        </Fragment>
      )
    }
  }