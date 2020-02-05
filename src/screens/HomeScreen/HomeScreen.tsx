import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import queryString from 'query-string';
import './HomeScreen.css';
import { ProjectsClient } from '../../clients/ProjectsClient';
import { CreateRun } from '../../components/CreateRun'
import { ExecuteRun } from '../../components/ExecuteRun'
import ZeplinAuth from '../../utils/ZeplinAuth';
import { Run, RunsClient } from '../../clients/RunsClient';
import { LoadingScreen } from '../LoadingScreen'

const HomeScreen = () => {
  // Runs
  const [activeRun, setActiveRun] = useState<Run | null>(null);
  const [activeRunFetchInProgress, setActiveRunFetchInProgress] = useState(false);

  const location = useLocation();
  const params = queryString.parse(location.search)

  const getActiveRun = () => {
    setActiveRunFetchInProgress(true)
    return ProjectsClient.getActiveRunForProject().then((response) => {
      return RunsClient.getRun(response[0].runId)
    }).then((response) => {
      setActiveRunFetchInProgress(false)
      if (response !== undefined && RunsClient.isRun(response)) {
        setActiveRun(response)
        console.log(`Active run is ${response}`)
      }
    })
  }

  useEffect(() => {
    getActiveRun();
    if (params['code']) {
      ZeplinAuth.handleRedirect(params['code'])
    }
  }, []);

  useEffect(() => {
    
  }, [activeRun])

  const renderRunSection = () => {
    if (!activeRunFetchInProgress) {
      return (activeRun !== null ? 
        <ExecuteRun activeRun={activeRun} onExecuteRunComplete={() => setActiveRun(null)} /> : 
        <CreateRun onCreateRunComplete={(run) => setActiveRun(run)} />)
    } else {
      return (<LoadingScreen />)
    }
  }

  return (
    <div style={{ paddingTop: 30 }}>
      <Container>
        <Row>
          <Col style={{ textAlign: 'left', display: 'flex' }}>
            <h3>Welcome to SenseTest!</h3>
          </Col>
        </Row>
        {renderRunSection()}
      </Container>
    </div>
    
  )
}

export default HomeScreen;
