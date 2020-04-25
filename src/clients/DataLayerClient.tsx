import { CreatePostInput, CreatePostMutation, ModelPostFilterInput, ListPostsQuery, CreateCommentInput, CreateCommentMutation, CreateSubCommentInput, CreateSubCommentMutation } from "../API"
import { Post, Comment, Annotation, SubComment } from "../types"
import {AssetStorageClient} from "./AssetStorageClient"
import { API, graphqlOperation } from "aws-amplify"
import { createPost, createComment, createSubComment } from "../graphql/mutations"
import Log from "../utils/Log"
import { listPosts } from "../graphql/queries"
import { useDispatch } from "react-redux"
import { addPost } from "../store/post/actions"
import { PostImgDownload } from "../utils/PostImgDownload"

export class DataLayerClient {
	static createNewAnnotationPost = (imageBlob: Blob, createPostInput: CreatePostInput): Promise<Post> => {
		return new Promise((resolve, reject) => {
			AssetStorageClient.createUploadUrl(createPostInput.imageId, createPostInput.projectId).then((presignedUrlFields) => {
				console.log("Presigned url for get " + presignedUrlFields)
				return AssetStorageClient.uploadDataToUrl(imageBlob, presignedUrlFields)
			}).then(async () => {
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
						dateCreated: newPost.createdAt
					}
					Log.info("Succeeded in creating post.", "AppetizeScreen")
					resolve(_newPost)
				} catch (err) {
					console.log("There has been an error in createNewAnnotationPost")
				}
			}).catch(() => {
				
			})
		})
	}

	static addSubCommentToComment = async (childComment: SubComment, parentComment: Comment) => {
		const createSubCommentInput: CreateSubCommentInput = {
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