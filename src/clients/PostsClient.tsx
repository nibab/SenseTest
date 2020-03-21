import { API, Auth } from "aws-amplify";
import { SNAPTEST_API_NAME } from "../App";
import { DateUtils } from "../utils/DateUtils"

const POSTS_PATH = "/posts"

export type CreatePost = {
    projectId: string,
    postId: string,
    imgId: string,
    title: string,
    description: string
}

export type Post = CreatePost & {
    dateCreated: string
}

export class PostsClient {
    static createPost(post: Post): Promise<any> {
        return new Promise((resolve, reject) => {
            Auth.currentSession()
                .then((data) => {
                    let myInit = {
                        body: {
                            ...post,
                            dateCreated: DateUtils.getDate(),
                        },
                        headers: {
                            Authorization: `${data.getIdToken().getJwtToken()}`
                        }
                    }

                    API.post(SNAPTEST_API_NAME, POSTS_PATH, myInit).then(response => {
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

    static getPost(projectId: string, postId: string): Promise<any> {
        return new Promise((resolve, reject) => {
            Auth.currentSession()
                .then((data) => {
                    let myInit = {
                        body: {},
                        headers: {
                            Authorization: `${data.getIdToken().getJwtToken()}`
                        }
                    }

                    API.get(SNAPTEST_API_NAME, POSTS_PATH + '/object/' + projectId + '/' + 'postId', myInit).then(response => {
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
      
    static getPostsForProject(projectId: string): Promise<any> {
        let apiName = SNAPTEST_API_NAME;
        let path = POSTS_PATH + '/' + projectId 

        return new Promise((resolve, reject) => {
            Auth.currentSession()
                .then((data) => {
                    console.log("Auth " + data.getAccessToken().payload)

                    let myInit = {
                        body: {},
                        headers: {
                            Authorization: `${data.getIdToken().getJwtToken()}`
                        },
                        response: true
                    }

                    API.get(apiName, path, myInit).then(response => {
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

    static isPost(object: any): object is Post {
        return object.projectId !== undefined && 
            object.postId !== undefined && 
            object.imgId !== undefined && 
            object.dateCreated !== undefined &&
            object.title !== undefined &&
            object.description !== undefined
    }
}