import { CreatePostInput, CreatePostMutation, ModelPostFilterInput, ListPostsQuery, CreateCommentInput, CreateCommentMutation, CreateSubCommentInput, CreateSubCommentMutation, GetProjectQuery, CreateProjectInput, CreateProjectMutation } from "../API"
import { Post, Comment, Annotation, SubComment, Project, AppBuild } from "../types"
import {AssetStorageClient} from "./AssetStorageClient"
import { API, graphqlOperation } from "aws-amplify"
import { createPost, createComment, createSubComment, createProject } from "../graphql/mutations"
import Log from "../utils/Log"
import { listPosts, getProject } from "../graphql/queries"
import { useDispatch } from "react-redux"
import { addPost } from "../store/post/actions"
import { PostImgDownload } from "../utils/PostImgDownload"
import { TypeConverter } from "../convertTypes"
import { v4 as uuidv4 } from 'uuid'

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
					appVersion: newPost.appVersion
				}
				Log.info("Succeeded in creating post.", "AppetizeScreen")
				resolve(_newPost)
			} catch (err) {
				console.log("There has been an error in createNewAnnotationPost")
			}
		})
	}

	static createNewProject = (): Promise<Project> => {
		return new Promise(async (resolve, reject) => {
			const createProjectInput: CreateProjectInput = {
				name: 'TestProject',
				id: uuidv4() 
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
					currentAppBuild: TEST_APP_BUILD
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
			//console.log(project.data)
			const _project = projectQuery.data.getProject
			const posts = TypeConverter.getPostsFromProjectQuery(projectQuery.data)
			
			if (_project !== undefined && _project !== null) {
				const appBuilds = TypeConverter.getAppBuildsFromProjectQuery(projectQuery.data)
				const currentAppBuild = TypeConverter.getCurentAppBuildFromProjectQuery(projectQuery.data)
				const project: Project = {
					id: _project.id,
					name: _project.name,
					appBuilds: appBuilds,
					posts: posts,
					currentAppBuild: currentAppBuild !== undefined ? currentAppBuild : TEST_APP_BUILD
				}
				resolve(project)
			} else {
				reject()
			}
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
		const createNewSubComment = (await API.graphql(graphqlOperation(createSubComment, {input: createSubCommentInput}))) as { data: CreateSubCommentMutation}

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

				const getAnnotation = (comment: typeof newComment) => {
					let geometry = comment.annotation?.geometry
					let data = comment.annotation?.data
					
					if (geometry !== null && data !== null) {
						return {
							geometry: geometry,
							data: data
						}
					} else {
						Log.info("No annotation discovered for comment during comment creation.")
					}
				} 

				// Create post that can be displayed in the app.
				const _newComment: Comment = {
					postId: newComment.post!.id,
					id: newComment.id,
					author: newComment.author!,
					authorAvatarSrc: newComment.authorAvatar!,
					date: 'now',
					text: newComment.content === null ? '' : newComment.content,
					subcomments: []// newComment.subComments
				}
				Log.info("Succeeded in creating post.", "AppetizeScreen")
				resolve(_newComment)
			} catch (err) {
				console.log("There has been an error in createNewAnnotationPost")
			}
		})
	}
}