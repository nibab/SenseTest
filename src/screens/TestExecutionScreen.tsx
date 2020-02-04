import React from 'react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button'
import TestExecution from '../components/TestExecution';
import { TestCaseExecutionsClient, TestCaseExecution } from '../clients/TestCaseExecutionsClient';
import { UploadFile } from 'antd/lib/upload/interface';

type TestExecutionScreenInjectedState = {
  testCaseExecutionsMap: Map<string, TestCaseExecution>,
  testCaseExecutionOrder: string[],
  currentTestCaseExecutionIndex: number,
  runState: string
}

class TestExecutionScreen extends React.Component<RouteComponentProps, TestExecutionScreenInjectedState> {
  constructor(props: RouteComponentProps) {
    super(props)
    this.checkNextExecution = this.checkNextExecution.bind(this)
    this.checkPreviousExecution = this.checkPreviousExecution.bind(this)
    this.testExecutionComplete = this.testExecutionComplete.bind(this)    
    this.getTestCaseExecutions = this.getTestCaseExecutions.bind(this)
    let testCaseExecutionOrder = this.getTestCaseExecutions(
      this.props.history.location.state.testCaseExecutionsMap,
      this.props.history.location.state.runState
    )
    let currentTestCaseExecutionIndex = testCaseExecutionOrder.indexOf(this.props.history.location.state.testCaseExecutionId)

    this.state = {
      testCaseExecutionsMap: this.props.history.location.state.testCaseExecutionsMap,
      testCaseExecutionOrder: testCaseExecutionOrder,
      currentTestCaseExecutionIndex: currentTestCaseExecutionIndex,
      runState: this.props.history.location.state.runState
    }
  }

  getTestCaseExecutions(testCaseExecutionsMap: Map<string, TestCaseExecution>, runState: string) {
    let testExecutionsIds: string[] = []
    testCaseExecutionsMap.forEach((testCaseExecution, testCaseExecutionId) => {
      if (testCaseExecution.result === undefined && runState === 'pending') {
        testExecutionsIds.push(testCaseExecutionId)
      } else if (runState === 'completed') {
        testExecutionsIds.push(testCaseExecutionId)
      }
    })
    console.log(testExecutionsIds)
    return testExecutionsIds
  }

  testExecutionComplete(testExecutionId: string, pass: boolean, notes: string | null, file: UploadFile | null) {
    let currentTestExecution = this.state.testCaseExecutionsMap.get(testExecutionId)
    if (currentTestExecution !== undefined) {
      currentTestExecution.result = pass;
      notes && (currentTestExecution.notes = notes);
      file && (currentTestExecution.file = file);
      console.log(currentTestExecution);
      // Call the backend.
      TestCaseExecutionsClient.createTestCaseExecution({
        ...currentTestExecution
      })

      let currentTestExecutionsMap = this.state.testCaseExecutionsMap
      currentTestExecutionsMap.set(testExecutionId, currentTestExecution)
      this.setState({testCaseExecutionsMap: currentTestExecutionsMap})
      let testCaseExecutions = this.getTestCaseExecutions(this.state.testCaseExecutionsMap, this.state.runState)
      
      //this.setState({testCaseExecutionOrder: currentNotStartedTestCaseExecutions})
      if (testCaseExecutions.length === 0) {
        this.props.history.push("/")
      } else {
        this.checkNextExecution(testCaseExecutions)
      }
    } else {
      console.log("Could not find the test execution id: " + testExecutionId)
    }
  }

  checkNextExecution(testCaseExecutions?: string[]) {
    let currentIndex = this.state.currentTestCaseExecutionIndex
    let currentTestCaseExecutionOrder = this.state.testCaseExecutionOrder
    let nextIndex = (currentIndex + 1) % currentTestCaseExecutionOrder.length
    if (testCaseExecutions !==   undefined) {
      let nextElement = currentTestCaseExecutionOrder[nextIndex]
      nextIndex = testCaseExecutions.indexOf(nextElement)
      this.setState({currentTestCaseExecutionIndex: nextIndex, testCaseExecutionOrder: testCaseExecutions})
    } else {
      this.setState({currentTestCaseExecutionIndex: nextIndex})
    }
  }

  checkPreviousExecution() {
    let currentIndex = this.state.currentTestCaseExecutionIndex
    let currentTestCaseExecutionOrder = this.state.testCaseExecutionOrder
    let nextIndex = currentIndex - 1
    if (nextIndex < 0) {
      nextIndex = currentTestCaseExecutionOrder.length + nextIndex
    }
    this.setState({currentTestCaseExecutionIndex: nextIndex})
  }

  renderTestExecution(currentTestCaseExecutionId: string) {
    let testCaseExecution: TestCaseExecution | undefined 
    testCaseExecution = this.state.testCaseExecutionsMap.get(currentTestCaseExecutionId)
    if (testCaseExecution !== undefined) {
      return (
      <TestExecution testExecution={testCaseExecution} onTestExecutionComplete={this.testExecutionComplete}/>)
    }
  }

  render() {
    const currentTestCaseExecutionId = this.state.testCaseExecutionOrder[this.state.currentTestCaseExecutionIndex]

    return (
      <Container style={{ paddingTop: 30 }}>
        <div style={{ display: 'inline-block' }}>
          <h3>Test Execution: {currentTestCaseExecutionId}</h3>
        </div>
        <div style={{ display: 'inline-block', float: 'right'}}>
          <Button variant='light' style={{ minWidth: 100, marginRight: 10 }} onClick={this.checkPreviousExecution}>Previous</Button>
          <Button variant='light' style={{ minWidth: 100 }} onClick={() => this.checkNextExecution()}>Next</Button>
        </div>
        <Container style={{ paddingTop: 30 }}>
          {this.renderTestExecution(currentTestCaseExecutionId)}
        </Container>
        {/* Next button, number remaining */}
      </Container>
    )
  }
}

export default TestExecutionScreen;
