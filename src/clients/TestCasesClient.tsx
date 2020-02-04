import { API, Auth, Storage } from "aws-amplify";
import { SNAPTEST_API_NAME } from "../App";

const TEST_CASES_PATH = "/testCases";

export type TestCase = {
    testCaseId: string, 
    projectId?: string, // Hardcoded for now
    version: string,
    critical: boolean,
    platform: string,
    action: string,
    expectedResult: string,
    metadata?: any
}

export class TestCasesClient {
    static createTestCase(testCase: TestCase): Promise<any> {
        console.log(`Created test case with testCaseId ${testCase.testCaseId}`)
        return TestCasesClient.postWithTestCase(testCase)
    }

    static editTestCase(testCase: TestCase): Promise<any> {
        console.log(`Edited testCaseId ${testCase.testCaseId}`)
        return TestCasesClient.postWithTestCase(testCase)
    }

    private static postWithTestCase(testCase: TestCase): Promise<any> {
        return new Promise((resolve, reject) => {
            Auth.currentSession()
                .then((data) => {
                    let myInit = {
                        body: {
                            projectId: '1',
                            ...testCase
                        },
                        headers: {
                            Authorization: `${data.getIdToken().getJwtToken()}`
                        },
                        response: true
                    }

                    /* TODO: Move to Lambda potentially. */
                    if (testCase.metadata?.file) {
                      Storage.put(`${testCase.testCaseId}-${testCase.metadata.file.name}`, testCase.metadata.file, {
                        type: testCase.metadata.file.type,
                      })
                      .then((result: any) => {
                        const file = {
                          s3Key: result['key'],
                          name: testCase.metadata.file.name
                        };
                        myInit.body.metadata = { ...myInit.body.metadata, file }
                        API.post(SNAPTEST_API_NAME, TEST_CASES_PATH, myInit).then(response => {
                          resolve(response);
                        }).catch(error => {
                          reject(error);
                        });
                      })
                      .catch(error => reject(error));
                    } else {
                      API.post(SNAPTEST_API_NAME, TEST_CASES_PATH, myInit).then(response => {
                        resolve(response);
                      }).catch(error => {
                        reject(error);
                      });
                    }
                })
                .catch(err => console.log(err));
        })
    }

    static deleteTestCase(testCaseId: string): Promise<any> {
        return new Promise((resolve, reject) => {
            Auth.currentSession()
                .then((data) => {
                    let myInit = {
                        body: {},
                        headers: {
                            Authorization: `${data.getIdToken().getJwtToken()}`
                        },
                        response: true
                    }

                    /* TODO: Get testCase and check presence of file. If exists, delete from S3. */
                    API.del(SNAPTEST_API_NAME, TEST_CASES_PATH + "/object/" + testCaseId, myInit).then(response => {
                        console.log(response);
                        resolve(response);
                    }).catch(error => {
                        console.log(error.response);
                        reject(error);
                    });
                })
                .catch(error => console.log(error));
        })
    }

    static getTestCase(testCaseId: string): Promise<any> {
      let path = TEST_CASES_PATH + '/object/' + testCaseId;

      return new Promise((resolve, reject) => {
        Auth.currentSession()
          .then((data) => {
            let myInit = {
              body: {},
              headers: {
                Authorization: `${data.getIdToken().getJwtToken()}`
              }
            }

            API.get(SNAPTEST_API_NAME, path, myInit).then(response => {
                console.log(response);
                resolve(response);
            }).catch(error => {
                console.log(error.response);
                reject(error);
            });
        })
        .catch(error => console.log(error));
      }) 

    }

    static getTestCasesForProjectId(projectId: string): Promise<any> {       
        let path = TEST_CASES_PATH + '/list/' + projectId 

        return new Promise((resolve, reject) => {
            Auth.currentSession()
                .then((data) => {
                    let myInit = {
                        body: {},
                        headers: {
                            Authorization: `${data.getIdToken().getJwtToken()}`
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