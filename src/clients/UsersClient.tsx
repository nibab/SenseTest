import { Auth, API } from "aws-amplify";
import Log from "../utils/Log";
import { InviteUserRequestType, CreateAndInviteUserRequestType } from "../types";

const CREATE_AND_INVITE_USER_PATH = '/createAndInviteUser'
const INVITE_USER_PATH = '/inviteUser'
const API_NAME = 'users'

const makeRequest = (request: any, path: string) => {
    return new Promise((resolve, reject) => {
        Auth.currentSession()
            .then((data) => {
                let myInit = {
                    body: request,
                    headers: {
                        Authorization: `${data.getIdToken().getJwtToken()}`
                    }
                }

                API.post(API_NAME, path, myInit).then(response => {
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

export class Users {
    static inviteUser(inviteUserRequest: InviteUserRequestType) {
        makeRequest(inviteUserRequest, INVITE_USER_PATH)
    }

    static createUser(inviteUserRequest: CreateAndInviteUserRequestType) {
        makeRequest(inviteUserRequest, CREATE_AND_INVITE_USER_PATH)
    }    
}