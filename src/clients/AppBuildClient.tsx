import { AppBuildRequestBodyType, AppBuild } from '../types'
import { Auth, API, graphqlOperation } from 'aws-amplify';
import Log from '../utils/Log';
import { getProject } from '../graphql/queries';
import { GetProjectQuery } from '../API';
import { resolve } from 'dns';
import { TypeConverter } from '../convertTypes';

const APP_BUILD_API_NAME = 'https://5m965rfer6.execute-api.us-east-1.amazonaws.com/staging/'
const NEW_APP_BUILD_PATH = '/addAppBuild'

export class AppBuildClient {
    static createAppBuildClient(appBuildClientRequest: AppBuildRequestBodyType): Promise<any> {
        return new Promise((resolve, reject) => {
            Auth.currentSession()
                .then((data) => {
                    let myInit = {
                        body: appBuildClientRequest,
                        headers: {
                            Authorization: `${data.getIdToken().getJwtToken()}`
                        }
                    }

                    API.post("newAppBuild", NEW_APP_BUILD_PATH, myInit).then(response => {
                        Log.info(response);
                        resolve(response);
                    }).catch(error => {
                        Log.error(error.response);
                        reject(error);
                    });
                })
                .catch(error => {
                    Log.error(error.response);
                    reject(error);
                });
        }) 
    }

    static getCurrentAppBuildForProjectId = async (projectId: string): Promise<AppBuild> => {
        return new Promise(async (resolve, reject) => {
            const project = await API.graphql(graphqlOperation(getProject, {id: projectId})) as {data: GetProjectQuery}
            const appBuild: AppBuild | undefined = TypeConverter.getCurentAppBuildFromProjectItem(project.data.getProject)
            if (appBuild === undefined) {
                reject()
            } else {
                resolve(appBuild)
            }
        })
    }
}