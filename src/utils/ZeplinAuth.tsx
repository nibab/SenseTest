import { API, Auth } from "aws-amplify"
import { SNAPTEST_API_NAME } from "../App"
import Log from "./Log"

export type ZeplinCredentials = {
    accessToken: string,
    refreshToken: string,
    accessTokenExpiresAt: number,
    refreshTokenExpiresAt: number 
}

type ZeplinCredentialsResponse = {
    access_token: string,
    refresh_token: string,
    expires_in: number,
    refresh_expires_in: number
}

type ZeplinIntegrationConfiguration = {
    projectId: string
    hasZeplinIntegration: boolean
}

// DO NOT MODIFY. This type represents the response from the Zeplin API.
export type ZeplinProject = {
  id: string,
  name: string,
  thumbnail: string,
  platform: string,
  status: string, 
  created: number,
  updated: number,
  number_of_screens: number,
  number_of_components: number,
  number_of_test_styles: number,
  number_of_colors: number,
  number_of_members: number
}

export type ZeplinImage = {
  width: number,
  height: number,
  original_url: string
}

export type ZeplinScreen = {
  id: string,
  created: number,
  updated: number,
  tags: string[],
  name: string,
  image: ZeplinImage,
  number_of_versions: number,
  number_of_notes: number
}

export const ZEPLIN_INTEGRATION_CLIENT_ID = "5df1298dd0f7fb1a408d4ef1"
export const ZEPLIN_INTEGRATION_CLIENT_SECRET = "85c73f65-2a7f-48c6-aef8-6f7a84bdfaa7"

const PATH = "/integrations"

export default class ZeplinAuth {
    private static credentials: ZeplinCredentials
    private static configuration: ZeplinIntegrationConfiguration

    static async isZeplinIntegrationActivated() {
        if (!!!ZeplinAuth.configuration) {
            Error("ZeplinAuth not configured. Call ZeplinAuth.configure() before using any other ZeplinAuth methods.")
            return false
        }
        return ZeplinAuth.configuration.hasZeplinIntegration
    }

    // This method should be used only if the user's SnapTest account has already been linked with a Zeplin account.
    static async getCredentials(): Promise<ZeplinCredentials> {
        return new Promise(async (resolve, reject) => {
            if (!ZeplinAuth.configuration) {
                reject("ZeplinAuth not configured. Call ZeplinAuth.configure() before using any other ZeplinAuth methods.")
            }

            const currentTimeInSeconds = new Date().getTime() / 1000
            if (!ZeplinAuth.credentials) {
                // Get credentials from the back-end.
                ZeplinAuth.getCredentialsFromBackend().then((zeplinCredentials) => {
                    if (zeplinCredentials.accessTokenExpiresAt <= currentTimeInSeconds) {
                        return ZeplinAuth.refreshCredentials(zeplinCredentials)
                    } else {
                        ZeplinAuth.credentials = zeplinCredentials
                        resolve(zeplinCredentials)
                    }
                }).then((zeplinCredentials) => {
                    if (zeplinCredentials) {
                        ZeplinAuth.credentials = zeplinCredentials  
                        ZeplinAuth.persistCredentials(zeplinCredentials)  
                        resolve(zeplinCredentials)
                    }
                }).catch((error) => {
                    reject(error)
                })
            } else {
                if (ZeplinAuth.credentials.accessTokenExpiresAt <= currentTimeInSeconds) {
                    ZeplinAuth.refreshCredentials(ZeplinAuth.credentials).then((zeplinCredentials) => {
                        ZeplinAuth.credentials = zeplinCredentials
                        ZeplinAuth.persistCredentials(zeplinCredentials)  
                        resolve(zeplinCredentials)
                    }).catch((error) => {
                        reject(error)
                    })
                } else {
                    resolve(ZeplinAuth.credentials)
                }
            }
        })
    }

    static async handleRedirect(code: string | string[] | null | undefined) {
        const apiURL = 'https://cors-anywhere.herokuapp.com/https://api.zeplin.dev/v1/oauth/token';
        const payload = {
            client_id: ZEPLIN_INTEGRATION_CLIENT_ID, // Static
            client_secret: ZEPLIN_INTEGRATION_CLIENT_SECRET, // Static
            redirect_uri: 'http://localhost:9090', // Static
            grant_type: 'authorization_code', // Static
            code
        }
        const response = await fetch(apiURL, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json();
        if (isZeplinCredentialsResponse(data)) {
            const zeplinCredentials: ZeplinCredentials = {
                accessToken: data.access_token,
                refreshToken: data.refresh_token,
                accessTokenExpiresAt: getTimeInSeconds() + data.expires_in,
                refreshTokenExpiresAt: getTimeInSeconds() + data.refresh_expires_in
            }
            await ZeplinAuth.persistCredentials(zeplinCredentials)
            ZeplinAuth.credentials = zeplinCredentials
        }
        Log.info(data)
    }

    static refreshCredentials(credentials: ZeplinCredentials): Promise<ZeplinCredentials> {
        const currentTimeInSeconds = new Date().getTime() / 1000

        return new Promise((resolve, reject) => {
            if (ZeplinAuth.credentials.refreshTokenExpiresAt <= currentTimeInSeconds) {
                reject("Refresh token is expired. Need to go through the Zeplin integration workflow again.")
                // Try getting credentials from the backend.
                // If credentials not in the back-end, have to start the integration from the beginning.
            } else {
                const apiURL = 'https://cors-anywhere.herokuapp.com/https://api.zeplin.dev/v1/oauth/token';
                const payload = {
                    client_id: ZEPLIN_INTEGRATION_CLIENT_ID, // Static
                    client_secret: ZEPLIN_INTEGRATION_CLIENT_SECRET, // Static
                    grant_type: 'refresh_token', // Static
                    refresh_token: credentials.refreshToken
                }
                fetch(apiURL, {
                    method: 'POST',
                    mode: 'cors',
                    body: JSON.stringify(payload),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then((data) => {
                    return data.json()
                }).catch((error) => {
                    reject(error)
                }).then((data) => {
                    if (isZeplinCredentialsResponse(data)) {
                        const zeplinCredentials: ZeplinCredentials = {
                            accessToken: data.access_token,
                            refreshToken: data.refresh_token,
                            accessTokenExpiresAt: getTimeInSeconds() + data.expires_in,
                            refreshTokenExpiresAt: getTimeInSeconds() + data.refresh_expires_in
                        }
                        resolve(zeplinCredentials)
                    } else {
                        reject("Either the returned shaped does not match the ZeplinCredentials type or the response was unexpected.")
                    }
                }).catch((error) => {
                    reject(error)
                })
            }
        })    
    }

    static getCredentialsFromBackend(): Promise<ZeplinCredentials> {
        return new Promise((resolve, reject) => {
            if (!ZeplinAuth.configuration) {
                reject("ZeplinAuth not configured. Call ZeplinAuth.configure() before using any other ZeplinAuth methods.")
            }

            if (!ZeplinAuth.configuration.hasZeplinIntegration === false) {
                reject("Zeplin integration has not been setup for this project yet.")
            }

            Auth.currentSession()
                .then((data) => {
                    let myInit = {
                        body: {},
                        headers: {
                            Authorization: `${data.getIdToken().getJwtToken()}`
                        },
                        response: true
                    }

                    API.get(SNAPTEST_API_NAME, PATH + '/object/' + ZeplinAuth.configuration.projectId + '/zeplin', myInit).then(response => {
                        Log.info(response);
                        const zeplinCredentials: ZeplinCredentials = {
                            accessToken: response.access_token,
                            refreshToken: response.refresh_token,
                            accessTokenExpiresAt: response.accessTokenExpiresAt,
                            refreshTokenExpiresAt: response.refreshTokenExpiresAt
                        }
                        resolve(zeplinCredentials);
                    }).catch(error => {
                        Log.info(error.response);
                        reject(error);
                    });
                })
                .catch(err => Log.error(err));
        })
    }

    private static persistCredentials(credentials: ZeplinCredentials): Promise<any> {
        if (!ZeplinAuth.configuration) {
            Error("ZeplinAuth not configured. Call ZeplinAuth.configure() before using any other ZeplinAuth methods.")
        }
        
        return new Promise((resolve, reject) => {
            Auth.currentSession()
                .then((data) => {
                    const requestBody = {
                        projectId: ZeplinAuth.configuration.projectId,
                        integration: "zeplin",
                        ...credentials
                    }

                    let myInit = {
                        body: {
                            ...requestBody
                        },
                        headers: {
                            Authorization: `${data.getIdToken().getJwtToken()}`
                        }
                    }

                    API.post(SNAPTEST_API_NAME, PATH, myInit).then(response => {
                        Log.info(response);
                        resolve(response);
                    }).catch(error => {
                        Log.error(error.response);
                        reject(error);
                    });
                })
                .catch(err => Log.error(err));
        }) 
    }

    static async configure(projectId: string) {
        // Call backend to check if account has been linked with Zeplin
        Auth.currentSession()
            .then((data) => {
                let myInit = {
                    body: {},
                    headers: {
                        Authorization: `${data.getIdToken().getJwtToken()}`
                    },
                    response: true
                }

                API.get(SNAPTEST_API_NAME, PATH + '/object/' + projectId + "/zeplin", myInit).then(response => {
                    Log.info(response);
                    ZeplinAuth.configuration = {
                        projectId: projectId,
                        hasZeplinIntegration: true
                    }
                    if (isZeplinCredentials(response.data)) {
                        ZeplinAuth.credentials = {
                            accessToken: response.data.accessToken,
                            refreshToken: response.data.refreshToken,
                            accessTokenExpiresAt: response.data.accessTokenExpiresAt,
                            refreshTokenExpiresAt: response.data.refreshTokenExpiresAt
                        }
                    }
                }).catch(error => {
                    Log.error(error.response);
                    ZeplinAuth.configuration = {
                        projectId: projectId,
                        hasZeplinIntegration: false
                    }
                });
            })
            .catch(err => Log.error(err));
    }
}

function isZeplinCredentialsResponse(obj: any): obj is ZeplinCredentialsResponse {
    return obj.access_token !== undefined &&
        obj.refresh_token !== undefined &&
        obj.expires_in !== undefined &&
        obj.refresh_expires_in !== undefined
}

function isZeplinCredentials(obj: any): obj is ZeplinCredentials {
    return obj.accessToken !== undefined &&
        obj.refreshToken !== undefined &&
        obj.accessTokenExpiresAt !== undefined &&
        obj.refreshTokenExpiresAt !== undefined
}

function getTimeInSeconds() {
    return Math.round(new Date().getTime() / 1000)
}