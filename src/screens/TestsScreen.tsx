import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TestCaseTable from '../components/TestCaseTable';
import TestForm from '../components/TestForm';
import { TestCasesClient, TestCase } from '../clients/TestCasesClient';

type TestsScreenProps = {
  asAddIn: boolean,
  enableSelection: boolean,
  setSelection?: (testCases: TestCase[]) => void
}

const TestsScreen = ({asAddIn=false, enableSelection=false, setSelection} : TestsScreenProps) => {
  const [showCreateTestModal, setShowCreateTestModal] = useState(false);
  const [showEditTestModal, setShowEditTestModal] = useState(false);
  const [editTestCase, setEditTestCase] = useState<TestCase | null>(null);

  const [getTestCasesFetchInProgress, setGetTestCasesFetchInProgress] = useState(false)
  const [modalRequestInProgress, setModalRequestInProgress] = useState(false)
  const [deleteTestCaseInProgress, setDeleteTestCaseInProgress] = useState(false)
  const [testCases, setTestCases] = useState<TestCase[]>([]);

  const getTestCases = () => {
    setGetTestCasesFetchInProgress(true)
    TestCasesClient.getTestCasesForProjectId("1").then((response) => {
      setTestCases(response.data.Items)
      setGetTestCasesFetchInProgress(false)
    }).catch((error) => {
      setGetTestCasesFetchInProgress(false)
    })
  }

  const editTest = (testCase: TestCase) => {
    setEditTestCase(testCase)
    setShowEditTestModal(true)
  }

  const deleteTest = (testCase: TestCase) => {
    setDeleteTestCaseInProgress(true)
    TestCasesClient.deleteTestCase(testCase.testCaseId).then((response) => {
      console.log(`Successfully deleted ${testCase.testCaseId}.`)
      const newTestCases = testCases.filter(_testCase => _testCase.testCaseId !== testCase.testCaseId);
      setTestCases(newTestCases)
      setDeleteTestCaseInProgress(false)
    }).catch((error) => {
      console.log(`Error ${error} encountered during attempt to delete test case ${testCase.testCaseId}.`)
      setDeleteTestCaseInProgress(false)
    })
  }
  
  useEffect(() => { 
    getTestCases();
  }, []);

  useEffect(() => {

  }, [testCases])

  const renderTable = () => {
    const isLoading = getTestCasesFetchInProgress || modalRequestInProgress || deleteTestCaseInProgress
    return(<TestCaseTable 
      testCases={testCases} 
      enableSelection={enableSelection} 
      setSelection={setSelection}
      loading={isLoading} 
      editTest={editTest}
      deleteTest={deleteTest}/>)
  }

  const onSubmitModal = (request: Promise<any>) => {
    // After editing a test, we want to make sure that the test case table is updated.
    // The code below will wait on the request from the modal.
    setModalRequestInProgress(true)
    request.then(() => {
      setModalRequestInProgress(false)
      getTestCases()
    }).catch(() => {
      // TODO: Show an error screen that will notify the user that test editing failed.
      setModalRequestInProgress(false)
    })
  }

  const renderTestModal = () => {
    if (showEditTestModal === true) {
      if (editTestCase !== undefined && editTestCase !== null) {
        return (
          <TestForm 
            show={showEditTestModal} 
            handleClose={() => setShowEditTestModal(false)} 
            mode='edit' 
            testCase={editTestCase}
            onSubmit={(request) => {
              onSubmitModal(request)
              setShowEditTestModal(false)
            }}/>
        )
      } else {
        Error("Tried editing a test case without providing one.")
      }
    } else {
      return (
        <TestForm 
          show={showCreateTestModal} 
          handleClose={() => setShowCreateTestModal(false)} 
          mode='create'
          onSubmit={(request) => {
            onSubmitModal(request)
            setShowCreateTestModal(false)
          }}/>
      )
    }
  }

  const render = () => {
    if (asAddIn === true) {
      return (
        <div>
          <Row style={{ paddingTop: '1em' }}>
            <Col>
              {renderTable()}
            </Col>
          </Row>
          {renderTestModal()}
        </div>
      )
    } else {
      return (
        <Container style={{ paddingTop: 30 }}>
          <Row style={{ paddingTop: '2em' }}>
            <Col>
              <div style={{ display: 'inline-block' }}>
                <h3>Tests</h3>
              </div>
              <Button style={{ display: 'inline-block', float: 'right' }}
                onClick={() => setShowCreateTestModal(true)}
                icon='plus' size='large'
                type='primary'>
                Add
              </Button>
            </Col>
          </Row>
          <Row style={{ paddingTop: '1em' }}>
            <Col>
              {renderTable()}
            </Col>
          </Row>
          {renderTestModal()}
        </Container>
      )
    }
  }

  return (
    <div>
      {render()}
    </div> 
  )
}

export default TestsScreen;
