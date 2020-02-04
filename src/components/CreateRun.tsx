import React, { Fragment, useState, useEffect } from "react"
import { TestCasesClient, TestCase } from "../clients/TestCasesClient";
import { RunsClient, Run } from "../clients/RunsClient";
import { TestCaseExecutionsClient } from "../clients/TestCaseExecutionsClient";
import { CreateRunModal } from "./CreateRunModal"
import { ProjectsClient } from "../clients/ProjectsClient";
import uuidv1 from 'uuid';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import TestsScreen from "../screens/TestsScreen";
import Card from "react-bootstrap/Card";
import { DateUtils } from "../utils/DateUtils";
import { LoadingScreen } from '../screens/LoadingScreen';

const NoActiveTestCases = () => (
    <Fragment>
      <Card>
        <Card.Body>You do not have any test cases defined.</Card.Body>
      </Card>
    </Fragment>
)

type CreateRunTypes = {
    onCreateRunComplete: (run: Run) => void
}

export const CreateRun = ({onCreateRunComplete}: CreateRunTypes) => {
    const [showRunModal, setShowRunModal] = useState(false);
    const [testCases, setTestCases] = useState<TestCase[]>([]);
    const [createRunRequestInProgress, setCreateRunRequestInProgress] = useState(false);
    const [testCasesFetchInProgress, setTestCasesFetchInProgress] = useState(false);
    const [selectedTestCases, setSelectedTestCases] = useState<TestCase[]>([]);
    const [runType, setRunType] = useState('');
    const [runVersion, setRunVersion] = useState('')
    
    const handleCloseRunModal = () => setShowRunModal(false);
    const handleShowRunModal = () => {
      console.log("Show modal")
      setShowRunModal(true);
    }

    const getTestCases = () => {
        setTestCasesFetchInProgress(true)
        TestCasesClient.getTestCasesForProjectId("1").then((response) => {
          setTestCases(response.data.Items)
          setTestCasesFetchInProgress(false)
        })    
    }

    const setTestCasesForRun = (testCases: TestCase[]) => {
        setSelectedTestCases(testCases);
    }

    const handleSubmitRunModal = () => {
        console.log(runType);
        const newRun: Run = {
          runId: uuidv1(),
          dateStarted: DateUtils.getDate(),
          version: runVersion
        }
        setCreateRunRequestInProgress(true)
        RunsClient.createRun(newRun).then(() => {
          TestCaseExecutionsClient.createTestCaseExecutionBatch(selectedTestCases, newRun.runId)
        }).then(() => {
          ProjectsClient.setActiveRunIdForProject(newRun.runId)
        }).catch((error) => {
          setCreateRunRequestInProgress(false)
        }).then(() => {
          onCreateRunComplete(newRun)
          setCreateRunRequestInProgress(false)
        })
        handleCloseRunModal();
    }

    useEffect(() => {
        getTestCases();
    }, []);

    const isLoading = createRunRequestInProgress || testCasesFetchInProgress
    
    if (isLoading) {
        return (<LoadingScreen />)
    } else {
        return (
        <Fragment>
            <CreateRunModal show={showRunModal} handleClose={handleCloseRunModal}
                setRunType={setRunType} runType={runType}
                setVersion={setRunVersion} version={runVersion}
                handleSubmit={handleSubmitRunModal} />
            <Row style={{ paddingTop: '2em' }}>
            <Col style={{ padding: 0 }}>
                <div style={{ display: 'inline-block' }}>
                <h5>Start a run</h5>
                </div>
                <Button variant="primary" style={{ display: 'inline-block', float: 'right' }}
                disabled={!selectedTestCases.length} onClick={handleShowRunModal}>
                Start
                </Button>
                <br />
            </Col>
            </Row>
            <Row style={{ paddingTop: '1em' }}>
            <Col style={{ padding: 0 }}>
            {testCases.length > 0 ? <TestsScreen asAddIn={true} enableSelection={true} setSelection={setTestCasesForRun}/> : <NoActiveTestCases />}
            </Col>
            </Row>
        </Fragment>
        )
    }
}