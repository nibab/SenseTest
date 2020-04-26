import { AppBuildRequestBodyType } from '../types'
import { Auth, API } from 'aws-amplify';

const APP_BUILD_API_NAME = 'https://5m965rfer6.execute-api.us-east-1.amazonaws.com/staging'
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

                    API.post(APP_BUILD_API_NAME, NEW_APP_BUILD_PATH, myInit).then(response => {
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