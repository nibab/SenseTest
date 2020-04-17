import React, { Fragment, useState, useEffect } from 'react';
import { Button, Table, Divider, Tag } from 'antd';
import { TestCase } from '../clients/TestCasesClient';

type TestCaseTable = {
  testCases: TestCase[],
  setSelection?: (testCases: TestCase[]) => void,
  enableSelection?: boolean,
  enableEdit?: boolean,
  loading?: boolean,
  editTest?: (testCase: TestCase) => void,
  deleteTest?: (testCase: TestCase) => void
}

const TestCaseTable = ({
    testCases, 
    setSelection, 
    enableSelection=false, 
    enableEdit=true, 
    loading=false,
    editTest,
    deleteTest
  }: TestCaseTable) => {

  const rowSelection = enableSelection ? {
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`);
      // Get all selected test cases
      const selectedTestCases = testCases.filter((testCase) => selectedRowKeys.includes(testCase.testCaseId))
      setSelection && setSelection(selectedTestCases)
    },
  } : undefined;

  const renderAction = (testCase: TestCase) => {
    return (
      <Fragment>
        {enableEdit &&
          (
            <Fragment>
              <Button icon='edit'
                onClick={() => {
                  const testCaseToEdit = testCases.filter(_testCase => _testCase.testCaseId === testCase.testCaseId)[0]
                  if (editTest !== undefined) {
                    editTest(testCaseToEdit)
                  } else {
                    console.log('Error: editTest prop was not defined.')
                  }
                }}/>
              <Divider type='vertical'/>
            </Fragment>
          )
        }
        <Button icon='delete'
          onClick={() => {
            if (deleteTest !== undefined) {
              deleteTest(testCase)
            } else {
              console.log('Error: deleteTest prop was not defined.')
            }
          }}/>
      </Fragment>
    )
  }

  const renderPlatform = (platform: string) => <Tag color={'geekblue'} key={platform}>{platform.toUpperCase()}</Tag>
  const renderCritical = (critical: boolean) => critical ? <Tag color={'volcano'}>Critical</Tag> : <Tag color={'gray'}>Non-Critical</Tag>

  const testCaseTableColumns = [
    {title: 'Version', dataIndex: 'version', key: 'version'},
    {title: 'Platform', dataIndex: 'platform', key: 'platform', render: (platform: string) => renderPlatform(platform)},
    {title: 'Critical', dataIndex: 'critical', key: 'critical', render: (critical: boolean) => renderCritical(critical)},
    {title: 'Journey', dataIndex: 'metadata.journey', key: 'journey'},
    {title: 'Action', dataIndex: 'action', key: 'action'},
    {title: 'Expected', dataIndex: 'expectedResult', key: 'expectedResult'},
    {title: 'Options', key: 'options', render: (text: string, testCase: TestCase) => renderAction(testCase), width: 120}
  ]

  return (
    <Fragment>
      <Table style={{backgroundColor: 'white', borderRadius: '10px'}} columns={testCaseTableColumns} dataSource={testCases} rowSelection={rowSelection}
        rowKey={'testCaseId'} pagination={false} loading={loading}/>
    </Fragment>
  )
}

export default TestCaseTable;
