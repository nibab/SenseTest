import { GetProjectQuery } from './API';
import { Post, postTagGraphQLToLocalType, AppBuild, ProjectMember, deviceTypeGraphQLToLocalType } from './types';
import Log from './utils/Log';
import { PostImgDownload } from './utils/PostImgDownload';


export class TypeConverter {
    static getAppBuildsFromProjectItem(item: GetProjectQuery['getProject']): AppBuild[] {
        const _project = item
		if (_project === null) return []
		
		const _appBuilds = _project.appBuilds?.items
		const appBuilds: AppBuild[] = []
		_appBuilds?.forEach((appBuild) => {
			if (appBuild !== null) {
				const appBuildOfLocalType: AppBuild = {
					id: appBuild.id,
					project: appBuild.project.id,
					name: appBuild.name,
					version: appBuild.version,
					assetId: appBuild.assetId,
					appetizeKey: appBuild.appetizeKey,
					uploadedByUserId: appBuild.uploadedByUserId,
					createdAt: appBuild.createdAt !== null ? appBuild.createdAt : 'unknown'

				}
				appBuilds.push(appBuildOfLocalType)
			}
		})
		return appBuilds
    }

    static getPostsFromProjectItem(item: GetProjectQuery['getProject']): Post[] {
        const postsToReturn: Post[] = []
        const posts = item?.posts?.items
        posts?.forEach(async (post) => {
            if (post !== null) {
                const postImgDownload = new PostImgDownload(post.imageId, () => {})
                
                const newPost: Post = {
                    id: post.id,
                    image: postImgDownload,
                    projectId: post.projectId,
                    text: post.text,
                    title: post.title,
                    dateCreated: post.createdAt,
                    tags: post.tags.filter((tag) => tag !== null).map((tag) => postTagGraphQLToLocalType(tag!) ),
                    appBuildId: post.appBuildId,
                    deviceType: deviceTypeGraphQLToLocalType(post.deviceType)
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

    static getMembersFromProjectItem(item: GetProjectQuery['getProject']): ProjectMember[] {
        const membersToReturn: ProjectMember[] = []
        const members =  item?.members?.items
        members?.forEach(async (member) => {
            if (member !== null) {
                const newMember: ProjectMember = {
                    id: member?.user.id,
                    name: member?.user.name,
                    email: member?.user.email
                }
                membersToReturn.push(newMember)
            }
        })
        return membersToReturn
    }



    static getCurentAppBuildFromProjectItem = (item: GetProjectQuery['getProject']): AppBuild | undefined => {
        const currentAppBuildId = item?.currentAppBuild
        const appBuilds =item?.appBuilds
        if (appBuilds !== undefined) {
            // should return an array of only one item
            const _currentAppBuildArray = appBuilds?.items!.filter(item => item !== null && item.id === currentAppBuildId) 
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