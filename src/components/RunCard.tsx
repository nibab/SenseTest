import React from 'react';
import { Card, Descriptions, Tag, Progress } from 'antd';
import { Run } from '../clients/RunsClient';
import { useHistory } from "react-router-dom";

type RunCardProps = {
  run: Run
  hoverable?: boolean
}

const RunCard = ({run, hoverable=true}: RunCardProps) => {
  const history = useHistory()

  const renderPassRate = (_runPassPercentage: number) => {
    const runPassPercentage = Math.round(_runPassPercentage)
    if (runPassPercentage < 100) {
      return (
        <div>Pass Rate: { `${runPassPercentage}%`}
          <Progress percent={100} successPercent={runPassPercentage} status={"exception"}/>
        </div>)
    } else {
      return (
        <div>Pass Rate: { `${runPassPercentage}%`}
          <Progress percent={100} successPercent={runPassPercentage}/>
        </div>)
    }
  }

  return (
    <Card key={run.runId} style={{ marginBottom: 10, borderRadius: '10px' }}
    hoverable={hoverable} onClick={() => history && history.push(`/run/${run.runId}`)}
    title={`Run on ${run.dateStarted}`}>
      <Descriptions title='Info'>
        <Descriptions.Item label='Version'>
          {run.version ? run.version : `v1.0.0`}
        </Descriptions.Item>
        <Descriptions.Item label='Type'>
          <Tag color={'geekblue'} key='critical'>Regression</Tag>
        </Descriptions.Item>
        <Descriptions.Item label='Started on'>
          {`${run.dateStarted} GMT+00:00`}
        </Descriptions.Item>
        <Descriptions.Item label='Completed on'>
          {run.dateCompleted !== undefined ? `${run.dateCompleted} GMT+00:00` : "unavailale"}
        </Descriptions.Item>
      </Descriptions>
      <p>
      { run.passRate !== undefined ? renderPassRate(run.passRate * 100): NaN}
      </p>
    </Card>
  )
}

export const LoadingRunCard = () => (
  <Card style={{ marginBottom : 10 }} loading={true}>
    <Descriptions title='Info'>
      <Descriptions.Item label='Version'>
      </Descriptions.Item>
      <Descriptions.Item label='Type'>
      </Descriptions.Item>
      <Descriptions.Item label='Pass rate'>
      </Descriptions.Item>
      <Descriptions.Item label='Started on'>
      </Descriptions.Item>
      <Descriptions.Item label='Completed on'>
      </Descriptions.Item>
    </Descriptions>
  </Card>
)

export const NoRunCard = () => (
  <Card style={{ marginBottom: 10 }}>
    <b>No runs available</b>
    <p>Go to the home page to start a run.</p>
  </Card>
)

export default RunCard;
