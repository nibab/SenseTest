import { Auth, API } from "aws-amplify";
import Log from "../utils/Log";
import { InviteUserRequestType, CreateAndInviteUserRequestType, CreateUserRequestType } from "../types";

const CREATE_AND_INVITE_USER_PATH = '/createAndInviteUser'
const INVITE_USER_PATH = '/inviteUser'
const CREATE_USER_PATH = '/createUser'
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

export class UsersClient {
    static inviteUser(inviteUserRequest: InviteUserRequestType) {
        return makeRequest(inviteUserRequest, INVITE_USER_PATH)
    }

    static createUser(createUserReqest: CreateUserRequestType) {
        return makeRequest(createUserReqest, CREATE_USER_PATH)
    }

    static createAndInviteUser(inviteUserRequest: CreateAndInviteUserRequestType) {
        return makeRequest(inviteUserRequest, CREATE_AND_INVITE_USER_PATH)
    }    
}