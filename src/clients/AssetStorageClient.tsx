import { Auth } from "aws-amplify";
import request, { Options } from "request";
import Log from "../utils/Log";

export type PresignedUrlFields = {
  url: string,
  formData: FormData
}

const ASSET_STORAGE_SERVICE_URL = process.env.REACT_APP_ASSETS_SERVICE_URL
const CREATE_UPLOAD_URL_PATH = "/createUploadUrl"
const CREATE_DOWNLOAD_URL_PATH = "/getDownloadUrl"

export class AssetStorageClient {
    static getDownloadUrl(forAssetId: string): Promise<string> {
        let uri = ASSET_STORAGE_SERVICE_URL + CREATE_DOWNLOAD_URL_PATH + '/' + forAssetId

        return new Promise((resolve, reject) => {
            Auth.currentSession().then((data) => {
                let requestOptions: Options = {
                    uri: uri,
                    headers: {
                        Authorization: `${data.getIdToken().getJwtToken()}`
                    }
                }
                
                request.get(requestOptions, (error, response, body) => {
                    if (response !== undefined && response.statusCode === 200) {
                        resolve(JSON.parse(JSON.parse(response.body))['url'])
                    } else {
                        reject()
                    }
                })
            })
        })
    }

    static createUploadUrl(forAssetId: string, projectId: string): Promise<PresignedUrlFields> {
        let uri = ASSET_STORAGE_SERVICE_URL + CREATE_UPLOAD_URL_PATH

        return new Promise((resolve, reject) => {
            Auth.currentSession().then((data) => {
                let requestOptions: Options = {
                    uri: uri,
                    headers: {
                        Authorization: `${data.getIdToken().getJwtToken()}`
                    },
                    body: {
                        "assetId": forAssetId,
                        "projectId": projectId
                    },
                    json: true
                }
                request.post(requestOptions, (error, response, body) => {
                    if (response === undefined || response['statusCode'] !== 200) {
                        reject()
                    } else {
                        const parsedResponse = JSON.parse(body)
                        var formData = new FormData()
                        const fields = parsedResponse["url"]["fields"]
                        Object.keys(fields).forEach((key) => formData.append(key, fields[key]))
                        
                        resolve({
                            formData: formData,
                            url: parsedResponse["url"]["url"]
                        })
                    }
                })
            })
        })
    }

    static uploadDataToUrlWithProgress = (data: Blob, presignedUrlFields: PresignedUrlFields, onUploadProgress: (progress: number) => void): Promise<void> => {
        return new Promise((resolve, reject) => {
            const oReq = new XMLHttpRequest()
            oReq.open("POST", presignedUrlFields.url, true)
            oReq.onload = (oEvent) => {
                Log.info("Finished upload.")
            }
            oReq.onreadystatechange = function() { // Call a function when the state changes.
                if (this.status === 204) {
                    // Request finished. Do processing here.
                    resolve()
                } else {
                    reject()
                }
            }
            oReq.addEventListener('error', (e) => {
                Log.error("Something bad happened during uploading file with progress.")
                reject()
            })
            oReq.upload.onprogress = (evt: any) => {
                if (evt.lengthComputable) {
                    var percentComplete = (evt.loaded / evt.total) * 100
                    onUploadProgress(percentComplete)
                }
            }
        
            const formData = presignedUrlFields.formData
            formData.append('file', data)        
            oReq.send(formData)
        })
        
    }

    static uploadDataToUrl(data: Blob, presignedUrlFields: PresignedUrlFields): Promise<void> {
        return new Promise((resolve, reject) => {
            const formData = presignedUrlFields.formData
            formData.append('file', data)        
            fetch(presignedUrlFields.url, {
                method: 'POST', // 'GET', 'PUT', 'DELETE', etc.
                body: formData  // Coordinate the body type with 'Content-Type'
            }).then((result) => {
                if (result['status'] === 204) {
                    Log.info("Upload succeeded.")
                    resolve()
                } else {
                    Log.error("Upload failed.")
                    reject()
                }
            })
        })
    }
}