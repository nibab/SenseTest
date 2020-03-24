import { Auth } from "aws-amplify";
import request, { Options } from "request";

export type PresignedUrlFields = {
  url: string,
  formData: FormData
}

const ASSET_STORAGE_SERVICE_URL = "https://ko5if6fuv6.execute-api.us-east-1.amazonaws.com/Alpha"
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
                    if (response['statusCode'] !== 200) {
                        reject()
                    }
                    
                    const parsedResponse = JSON.parse(body)
                    var formData = new FormData()
                    const fields = parsedResponse["url"]["fields"]
                    Object.keys(fields).forEach((key) => formData.append(key, fields[key]))
                    
                    resolve({
                        formData: formData,
                        url: parsedResponse["url"]["url"]
                    })
                })
            })
        })
    }

    static uploadDataToUrl(data: Blob, presignedUrlFields: PresignedUrlFields) {
        return new Promise((resolve, reject) => {
            const formData = presignedUrlFields.formData
            formData.append('file', data)        
            fetch(presignedUrlFields.url, {
                method: 'POST', // 'GET', 'PUT', 'DELETE', etc.
                body: formData  // Coordinate the body type with 'Content-Type'
            }).then((result) => {
                if (result['status'] === 204) {
                    console.log("Upload succeeded.")
                    resolve()
                } else {
                    console.log("Upload failed.")
                    reject()
                }
            })
        })
    }
}