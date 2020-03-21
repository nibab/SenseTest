import { API, Auth } from "aws-amplify";
import { SNAPTEST_API_NAME } from "../App";
import request, { CoreOptions, UrlOptions, Options } from "request";

const PROJECTS_PATH = "/projects"

export type PresignedUrlFields = {
  url: string,
  baseUrl: string,
  formData: {[key: string]: any}
}

const ASSET_STORAGE_SERVICE_URL = "https://4e6sjjm751.execute-api.us-east-1.amazonaws.com/Alpha"
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
            debugger
            JSON.parse(body)
            resolve("test")
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
            }
          }
          request.post(requestOptions, (error, response, body) => {
            debugger
            JSON.parse(body)
            resolve({
              baseUrl: 'test',
              formData: {},
              url: ''
            })
          })
        })
      })
    }

    static uploadDataToUrl(data: string, url: string, presignedUrlFields: PresignedUrlFields) {
      request.post(presignedUrlFields, () => {})
    }
}