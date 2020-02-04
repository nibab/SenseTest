import { API, Auth } from "aws-amplify";
import { SNAPTEST_API_NAME } from "../App";
import { DateUtils } from "../utils/DateUtils"

const RUNS_PATH = "/runs"

export type Run = {
    runId: string,
    projectId?: string,
    testExecutions?: string[], // For ordering.
    dateStarted: string,
    dateCompleted?: string,
    version: string,
    passRate?: number
}

export class RunsClient {
    static createRun(run: Run): Promise<any> {
        return new Promise((resolve, reject) => {
            Auth.currentSession()
                .then((data) => {
                    let myInit = {
                        body: {
                            ...run,
                            projectId: '1',
                            dateStarted: DateUtils.getDate(),
                            metadata: {}
                        },
                        headers: {
                            Authorization: `${data.getIdToken().getJwtToken()}`
                        }
                    }

                    API.post(SNAPTEST_API_NAME, RUNS_PATH, myInit).then(response => {
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

    static getRun(runId: string): Promise<any> {
        return new Promise((resolve, reject) => {
            Auth.currentSession()
                .then((data) => {
                    let myInit = {
                        body: {},
                        headers: {
                            Authorization: `${data.getIdToken().getJwtToken()}`
                        }
                    }

                    API.get(SNAPTEST_API_NAME, RUNS_PATH + '/object/' + runId, myInit).then(response => {
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

    static finishRun(run: Run, passRate: number) {
        return new Promise((resolve, reject) => {
            Auth.currentSession()
                .then((data) => {
                    let myInit = {
                        body: {
                            ...run,
                            projectId: '1',
                            passRate: passRate,
                            dateCompleted: DateUtils.getDate(),
                            metadata: {}
                        },
                        headers: {
                            Authorization: `${data.getIdToken().getJwtToken()}`
                        }
                    }

                    API.post(SNAPTEST_API_NAME, RUNS_PATH, myInit).then(response => {
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
      
    static getRunsForProjectId(projectId: string): Promise<any> {
        let apiName = SNAPTEST_API_NAME;
        let path = RUNS_PATH + '/list/' + projectId 

        return new Promise((resolve, reject) => {
            Auth.currentSession()
                .then((data) => {
                    console.log("Auth " + data.getAccessToken().payload)

                    let myInit = {
                        body: {},
                        headers: {
                            Authorization: `${data.getIdToken().getJwtToken()}`
                        },
                        response: true
                    }

                    API.get(apiName, path, myInit).then(response => {
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

    static isRun(object: any): object is Run {
        return object.runId !== undefined && object.dateStarted !== undefined && object.version !== undefined
    }
}