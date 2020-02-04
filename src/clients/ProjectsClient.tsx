import { API, Auth } from "aws-amplify";
import { SNAPTEST_API_NAME } from "../App";

const PROJECTS_PATH = "/projects"

export type SetRunForProjectRequest = {
    runId?: string, // Making it optional so that we can send a request with runId == null to unset active run.
    projectId: string
}

export class ProjectsClient {
    static getActiveRunForProject(projectId = '1'): Promise<any> {
        let apiName = SNAPTEST_API_NAME;
        let path = PROJECTS_PATH;
      
        return new Promise((resolve, reject) => {
            Auth.currentSession()
                .then((data) => {
                    let myInit = {
                        body: {},
                        headers: {
                            Authorization: `${data.getIdToken().getJwtToken()}`
                        }
                    }

                    API.get(apiName, path + "/" + projectId, myInit).then(response => {
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

    static setActiveRunIdForProject(runId: string| null, projectId: string = '1'): Promise<any> {
        let apiName = SNAPTEST_API_NAME;
        let path = PROJECTS_PATH;
        
        return new Promise((resolve, reject) => {
            Auth.currentSession()
                .then((data) => {
                    const requestBody: SetRunForProjectRequest = {
                        projectId: projectId
                    }

                    if (runId !== null) {
                        requestBody.runId = runId
                    }

                    let myInit = {
                        body: {
                            ...requestBody
                        },
                        headers: {
                            Authorization: `${data.getIdToken().getJwtToken()}`
                        }
                    }

                    API.post(apiName, path, myInit).then(response => {
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