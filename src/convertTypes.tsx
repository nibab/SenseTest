import React from 'react'
import { GetProjectQuery } from './API';
import { Post, postTagGraphQLToLocalType, AppBuild } from './types';
import Log from './utils/Log';
import { PostImgDownload } from './utils/PostImgDownload';


export class TypeConverter {
    static getPostsFromProjectQuery(appBuildClientRequest: GetProjectQuery): Post[] {
        const postsToReturn: Post[] = []
        const posts = appBuildClientRequest.getProject?.posts?.items
        posts?.forEach(async (post) => {
            if (post !== null) {
                const postImgDownload = new PostImgDownload(post.imageId, () => {})
                
                const newPost = {
                    id: post.id,
                    image: postImgDownload,
                    projectId: post.projectId,
                    text: post.text,
                    title: post.title,
                    dateCreated: post.createdAt,
                    tags: post.tags.filter((tag) => tag !== null).map((tag) => postTagGraphQLToLocalType(tag!) ),
                    appVersion: post.appVersion
                }

                postImgDownload.imagePromise.then((blob) => {
                    //dispatch(updateImageForPost(newPost, blob))
                    Log.info("Downloaded post with title " + post.title)
                })

                postsToReturn.push(newPost)
            }
        })
        return postsToReturn
    }

    static getCurentAppBuildFromProjectQuery = (getProjectQuery: GetProjectQuery): AppBuild | undefined => {
        const appBuilds = getProjectQuery.getProject?.appBuilds
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
                    return appBuild
                } else {
                    Log.error('CurrentAppBuild is undefined.')
                }      
            } else {
                Log.error('Array of app builds is empty.')
            }
        } else {
            Log.error('There are no app builds for this project.') // This should never happen.
        }
    }
}