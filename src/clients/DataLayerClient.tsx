import { CreatePostInput, CreatePostMutation, ModelPostFilterInput, ListPostsQuery } from "../API"
import { Post } from "../types"
import {AssetStorageClient} from "./AssetStorageClient"
import { API, graphqlOperation } from "aws-amplify"
import { createPost } from "../graphql/mutations"
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
}