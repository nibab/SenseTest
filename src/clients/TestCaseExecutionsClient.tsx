import { API, Auth, Storage } from "aws-amplify";
import uuidv1 from "uuid";
import { SNAPTEST_API_NAME } from "../App";
import { TestCase } from "./TestCasesClient";
import { UploadFile } from "antd/lib/upload/interface";
import { S3File } from '../components/FileScreenCard/FileScreenCard';

const TEST_CASE_EXECUTIONS_PATH = "/testCaseExecutions"

export type TestCaseExecution = {
    testCaseExecutionId: string,
    projectId?: string,
    runId: string,
    result?: boolean,
    notes?: string,
    file?: UploadFile | S3File | any
} & TestCase

export class TestCaseExecutionsClient {
    static createTestCaseExecution(testCaseExecution: TestCaseExecution): Promise<any> {
        let path = TEST_CASE_EXECUTIONS_PATH;

        return new Promise((resolve, reject) => {
            Auth.currentSession()
                .then((data) => {
                    let myInit = {
                        body: {
                            projectId: '1', // Hardcoded for now only.
                            ...testCaseExecution
                        },
                        headers: {
                            Authorization: `${data.getIdToken().getJwtToken()}`
                        }
                    }

                    /* TODO: Move to Lambda potentially. */
                    const fileToUpload = testCaseExecution.file
                    if (!!fileToUpload && (fileToUpload as UploadFile).type) {
                      Storage.put(`${testCaseExecution.testCaseExecutionId}-${fileToUpload.name}`, fileToUpload, {
                        type: (fileToUpload as UploadFile&{type?: string}).type,
                      })
                      .then((result: any) => {
                        const file = {
                          s3Key: result['key'],
                          name: fileToUpload.name
                        };
                        myInit.body = { ...myInit.body, file };
                        API.post(SNAPTEST_API_NAME, path, myInit).then(response => {
                          console.log(response);
                          resolve(response);
                        }).catch(error => {
                          console.log(error.response);
                          reject(error);
                        });
                      })
                      .catch(error => reject(error));
                    } else {
                      API.post(SNAPTEST_API_NAME, path, myInit).then(response => {
                        console.log(response);
                        resolve(response);
                      }).catch(error => {
                        console.log(error.response);
                        reject(error);
                      });                      
                    }                    
                })
                .catch(err => console.log(err));
        })
    }

    static createTestCaseExecutionBatch(testCaseList: TestCase[], runId: string) {
        let path = TEST_CASE_EXECUTIONS_PATH + "/batch";

        let testCaseExecutionList: TestCaseExecution[] = []

        for (let testCase of testCaseList) {
            let testCaseExecution: TestCaseExecution = {
                testCaseExecutionId: uuidv1(),
                projectId: '1', // Hardcoded for now only.
                runId: runId,
                ...testCase
            }
            testCaseExecutionList.push(testCaseExecution);
        }

        return new Promise((resolve, reject) => {
            Auth.currentSession()
                .then((data) => {
                    let myInit = {
                        body: {
                            ...testCaseExecutionList
                        },
                        headers: {
                            Authorization: `${data.getIdToken().getJwtToken()}`,
                            'Content-Type': 'application/json'
                        }
                    }

                    API.post(SNAPTEST_API_NAME, path, myInit).then(response => {
                        console.log(response);
                        resolve(response);
                    }).catch(error => {
                        console.log(error.response);
                        reject(error);
                    });
                })
                .catch(err => console.log(err));
        })
    }
      
    static getTestCaseExecutionsForRunId(runId: string): Promise<any> {
        let path = TEST_CASE_EXECUTIONS_PATH + '/list/runId/' + runId; 
        return TestCaseExecutionsClient.getFromPath(path)
    }

    static getTestCaseExecutionsForTestCaseId(testCaseId: string): Promise<any> {
        let path = TEST_CASE_EXECUTIONS_PATH + '/list/testCaseId/' + testCaseId; 
        return TestCaseExecutionsClient.getFromPath(path)
    }

    private static getFromPath(path: string): Promise<any> {
        return new Promise((resolve, reject) => {
            Auth.currentSession()
                .then((data) => {
                    let myInit = {
                        body: {},
                        headers: {
                            Authorization: `${data.getIdToken().getJwtToken()}`,
                            'Content-Type': 'application/json'
                        },
                        response: true
                    }

                    API.get(SNAPTEST_API_NAME, path, myInit).then(response => {
                        console.log(response);
                        resolve(response);
                    }).catch(error => {
                        console.log(error.response);
                        reject(error);
                    });
                })
                .catch(err => console.log(err));
        })
    }
}