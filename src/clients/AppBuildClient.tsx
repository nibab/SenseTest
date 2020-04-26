import { AppBuildRequestBodyType, AppBuild } from '../types'
import { Auth, API, graphqlOperation } from 'aws-amplify';
import Log from '../utils/Log';
import { getProject } from '../graphql/queries';
import { GetProjectQuery } from '../API';
import { resolve } from 'dns';

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
            const currentAppBuildId = project.data.getProject?.currentAppBuild
            const appBuilds = project.data.getProject?.appBuilds
            if (appBuilds !== undefined) {
                // should return an array of only one item
                const _currentAppBuildArray = [appBuilds?.items![0]] //.filter(item => item !== null && item.id === currentAppBuildId) 
                if (_currentAppBuildArray?.length !== 0 && _currentAppBuildArray !== undefined) {
                    const currentAppBuild = _currentAppBuildArray[0]
                    if (currentAppBuild !== undefined && currentAppBuild !== null) {
                        const appBuild: AppBuild = {
                            id: currentAppBuild.id,
                            appetizeKey: currentAppBuild.appetizeKey,
                            name: currentAppBuild.name,
                            assetId: currentAppBuild.assetId,
                            version: currentAppBuild.version,
                            uploadedByUserId: currentAppBuild.uploadedByUserId,
                            createdAt: currentAppBuild.createdAt !== null ? currentAppBuild.createdAt : 'not available',
                            project: currentAppBuild.project.id
                        }
                        resolve(appBuild)
                    } else {
                        reject('CurrentAppBuild is undefined.')
                    }      
                } else {
                    reject('Array of app builds is empty.')
                }
            } else {
                reject('There are no app builds for this project.') // This should never happen.
            }
        })
       
    }
}