import { CreatePostInput, CreatePostMutation, CreateCommentInput, CreateCommentMutation, CreateSubCommentInput, CreateSubCommentMutation, GetProjectQuery, CreateProjectInput, CreateProjectMutation, ListProjectsQuery, UpdatePostInput, UpdatePostMutation, PostStatus } from "../API"
import { Post, Comment, SubComment, Project, AppBuild, PostStatus as LocalPostStatus, deviceTypeGraphQLToLocalType} from "../types"
import { API, graphqlOperation } from "aws-amplify"
import { createPost, createComment, createSubComment, createProject, updatePost } from "../graphql/mutations"
import Log from "../utils/Log"
import { getProject, listProjects } from "../graphql/queries"
import { TypeConverter } from "../convertTypes"

const TEST_APP_BUILD: AppBuild= {
	id: '1',
	project: '1',
	name: '1',
	assetId: '2',
	appetizeKey: '1',
	createdAt: 'now',
	version: '12',
	uploadedByUserId: '1'
}

export class DataLayerClient {
	static createNewAnnotationPost = (imageBlob: Blob, createPostInput: CreatePostInput): Promise<Post> => {
		return new Promise(async (resolve, reject) => {
			try {
				const createNewAnnotationResult = (await API.graphql(graphqlOperation(createPost, {input: createPostInput}))) as { data: CreatePostMutation }
				const newPost = createNewAnnotationResult.data.createPost!
				// Create post that can be displayed in the app.
				const _newPost: Post = {
					id: newPost.id,
					title: newPost.title,
					image: imageBlob,
					projectId: newPost.projectId,
					text: newPost.text,
					dateCreated: newPost.createdAt,
					appVersion: newPost.appVersion,
					deviceType: deviceTypeGraphQLToLocalType(newPost.deviceType)
				}
				Log.info("Succeeded in creating post.", "AppetizeScreen")
				resolve(_newPost)
			} catch (err) {
				Log.error("There has been an error in createNewAnnotationPost")
				reject(err)
			}
		})
	}

	static updatePostStatus = (post: Post, status: LocalPostStatus): Promise<void> => {
		return new Promise(async (resolve, reject) => {
			const newStatus: PostStatus = ((): PostStatus => {
				switch(status) {
					case 'OPEN':
						return PostStatus.OPEN
					case 'PENDING':
						return PostStatus.PENDING
					case 'RESOLVED':
						return PostStatus.RESOLVED
				}
			})()
			const updatePostInput: UpdatePostInput = {
				id: post.id,
				status: newStatus
			}

			try {
				const updatePostResult = (await API.graphql(graphqlOperation(updatePost, {input: updatePostInput})) as { data: UpdatePostMutation})
				resolve()
			} catch (err) {
				Log.error("Failed to update post.")
				reject(err)
			}
		})
	}

	static createNewProject = (projectId: string, name: string, appBuildId: string): Promise<Project> => {
		return new Promise(async (resolve, reject) => {
			const createProjectInput: CreateProjectInput = {
				name: name,
				id: projectId,
				active: true,
				currentAppBuild: appBuildId 
			}
	
			try {
				const createProjectResult = await API.graphql(
					graphqlOperation(createProject, {input: createProjectInput})
				) as { data: CreateProjectMutation }
	
				const newProject = createProjectResult.data.createProject!
				// Create project that can be displayed in the app.
				const _newProject: Project = {
					id: newProject.id,
					name: newProject.name,
					posts: [],
					appBuilds: [],
					members: [],
					dateCreated: newProject.createdAt ? newProject.createdAt : "unknown"
				}

				Log.info(`Succeeded in creating project ${JSON.stringify(_newProject)}.`, "ProjectsScreen")
				resolve(_newProject)
			} catch (err) {
				Log.error(`There was an error creating a project ${JSON.stringify(err)}.`, "ProjectsScreen")
				reject()
			}
		})
		
	}

	static getProjectInfo = async (projectId: string): Promise<Project> => {
		return new Promise(async (resolve, reject) => {
			const projectQuery = await API.graphql(graphqlOperation(getProject, {id: projectId})) as {data: GetProjectQuery}
			const _project = projectQuery.data.getProject
			
			if (_project !== undefined && _project !== null) {
				const posts = TypeConverter.getPostsFromProjectItem(_project)
				const appBuilds = TypeConverter.getAppBuildsFromProjectItem(_project)
				const currentAppBuild = TypeConverter.getCurentAppBuildFromProjectItem(_project)
				const members = TypeConverter.getMembersFromProjectItem(_project)
				const project: Project = {
					id: _project.id,
					name: _project.name,
					appBuilds: appBuilds,
					posts: posts,
					currentAppBuild: currentAppBuild,
					members: members,
					dateCreated:  _project.createdAt ? _project.createdAt : "unknown"
				}
				resolve(project)
			} else {
				reject()
			}
		})
	}

	static listProjects = async (): Promise<Project[]> => {
		return new Promise(async (resolve, reject) => {
			const projectQuery = await API.graphql(graphqlOperation(listProjects, {filter: null})) as {data: ListProjectsQuery}
			const projectsToReturn: Project[] = []			
			const projects = projectQuery.data.listProjects?.items

			projects?.forEach((_project) => {
				if (_project !== undefined && _project !== null) {
					// This _project as GetProjectQuery['getProject'] is a bit of a hack because it seems that the 
					// GetProjectQuery['getProject'] and ListProjectQuery['listProject']['items']['0'] should technically be the same
					// but very hard to do with typescript
					const posts = TypeConverter.getPostsFromProjectItem(_project as GetProjectQuery['getProject'])
					const appBuilds = TypeConverter.getAppBuildsFromProjectItem(_project as GetProjectQuery['getProject'])
					const currentAppBuild = TypeConverter.getCurentAppBuildFromProjectItem(_project as GetProjectQuery['getProject'])
					const members = TypeConverter.getMembersFromProjectItem(_project as GetProjectQuery['getProject'])
					const project: Project = {
						id: _project.id,
						name: _project.name,
						appBuilds: appBuilds,
						posts: posts,
						currentAppBuild: currentAppBuild !== undefined ? currentAppBuild : TEST_APP_BUILD,
						members: members,
						dateCreated: _project.createdAt ? _project.createdAt : "unknown"
					}
					projectsToReturn.push(project)
				}
			
			})
			resolve(projectsToReturn)
		})
	}

	static addSubCommentToComment = async (childComment: SubComment, parentComment: Comment) => {
		const createSubCommentInput: CreateSubCommentInput = {
			id: childComment.id,
			postId: parentComment.postId,
			author: childComment.author,
			authorAvatar: childComment.authorAvatarSrc,
			content: childComment.text,
			subCommentParentCommentId: parentComment.id
		}
		let _ = await API.graphql(graphqlOperation(createSubComment, {input: createSubCommentInput})) as { data: CreateSubCommentMutation}
	}

	static createCommentForPost = (post: Post, comment: Comment): Promise<Comment> => {
		const createCommentInput: CreateCommentInput = {
			id: comment.id,
			author: comment.author,
			authorAvatar: comment.authorAvatarSrc,
			content: comment.text,
			commentPostId: post.id,
			annotation: comment.annotation
		}

		return new Promise(async (resolve, reject) => {
			try {
				const createNewCommentResult = (await API.graphql(graphqlOperation(createComment, {input: createCommentInput}))) as { data: CreateCommentMutation }
				const newComment = createNewCommentResult.data.createComment!

				// Create post that can be displayed in the app.
				const _newComment: Comment = {
					postId: newComment.post!.id,
					id: newComment.id,
					author: newComment.author!,
					authorAvatarSrc: newComment.authorAvatar!,
					date: newComment.createdAt === null ? '' : newComment.createdAt,
					text: newComment.content === null ? '' : newComment.content,
					subcomments: []// newComment.subComments
				}
				Log.info("Succeeded in creating post.", "AppetizeScreen")
				resolve(_newComment)
			} catch (err) {
				Log.error("There has been an error in createNewAnnotationPost")
			}
		})
	}
}