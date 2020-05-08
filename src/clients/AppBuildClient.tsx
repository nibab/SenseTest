import { AppBuildRequestBodyType, AppBuild } from '../types'
import { Auth, API, graphqlOperation } from 'aws-amplify';
import Log from '../utils/Log';
import { getProject } from '../graphql/queries';
import { GetProjectQuery } from '../API';
import { resolve } from 'dns';
import { TypeConverter } from '../convertTypes';

const NEW_APP_BUILD_PATH = '/addAppBuild'

export class AppBuildClient {
    static createAppBuildClient(appBuildClientRequest: AppBuildRequestBodyType): Promise<AppBuild> {
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
                        const newAppBuild: AppBuild = {
                            id: response.body.appBuildId,
                            project: appBuildClientRequest.projectId,
                            name: appBuildClientRequest.appName,
                            assetId: appBuildClientRequest.assetId,
                            appetizeKey: response.publicKey,
                            version: appBuildClientRequest.appVersion,
                            createdAt: (new Date()).toISOString(),
                            uploadedByUserId: data.getAccessToken().payload.sub

                        }
                        resolve(newAppBuild);
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