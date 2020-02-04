import React, { useState, useEffect } from 'react';
import { History } from 'history';
import Container from 'react-bootstrap/Container';
import { RunsClient, Run } from '../clients/RunsClient';
import RunCard, { LoadingRunCard, NoRunCard } from '../components/RunCard';

type RunsScreenProps = {
  history: History
}

const RunsScreen = ({ history }: RunsScreenProps) => {
  const [runs, setRuns] = useState<Run[]>([]);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    RunsClient.getRunsForProjectId("1").then((response) => {
      console.log("Response is " + response)
      const completedRuns = response.data.Items.filter((run: Run) => run.dateCompleted !== undefined)
      setRuns(completedRuns)
      setIsLoading(false)
    })
  }, []);

  return (
    <Container style={{ paddingTop: 30 }}>
      <h3>Runs</h3>
      {isLoading && <LoadingRunCard/>}
      {!!runs && runs.map((run: Run) => <RunCard key={run.runId} run={run}/>)}
      {!!runs && runs.length === 0 && !isLoading && <NoRunCard/>}
    </Container>
  )
}

export default RunsScreen;
