import React, { useState, useEffect } from 'react'
import { Post, Annotation, SubComment } from '../../types'
import { useSelector } from '../../store'
import { Comment as CommentType } from '../../types'

import { useDispatch } from 'react-redux'
import { addComment } from '../../store/comment/actions'

import uuid from 'uuid'
import { CommentsSection } from '../Comments'
import AnnotationScreen from '../AnnotationScreen'
import { PostImgDownload } from '../../utils/PostImgDownload'
import { DataLayerClient } from '../../clients/DataLayerClient'
import VersionTag from '../VersionTag'
import { addsubComment } from '../../store/subcomment/actions'
import Container from '../Container'


type PostScreenshotProps = {
	post: Post
}

const PostScreenshot = (props: PostScreenshotProps) => {
	const [displayNewCommentBox, setDisplayNewCommentBox] = useState(false)
	const [post, setPost] = useState<Post>()
	const commentsSelector = useSelector(state => state.comment.comments[props.post.id])

	const postsSelector = useSelector(state => state.post.posts[props.post.projectId][props.post.id])
	const dispatch = useDispatch()
	const authState = useSelector(state => state.auth)

	useEffect(() => {
		setPost(props.post)
	}, [props])

	const renderTag = () => {
		return (
			<div className='flex w-full h-8 '>
				<div className=' pb-1 mx-auto flex flex-row p-0.5'>
					<span className="mr-1 inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-extrabold leading-5 bg-cool-gray-100 text-gray-800">
						Screenshot
					</span>
					{/* <VersionTag version={props.post.} /> */}
				</div> 
			</div>
		)	
	}

	const renderButtons = () => {
		return (
				<div className="inline-flex items-center px-5 mr-1 text-sm font-medium text-gray-600 transition duration-150 ease-in-out border-gray-300 rounded hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50">
					<div className='text-indigo-600'>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 mr-2 fill-current icon-click-target "><path className="" d="M21.97 12.73c-.25-.22-.56-.4-.92-.54L20 11.8a8 8 0 1 0-8.2 8.2l.4 1.06c.12.36.3.67.53.92a10 10 0 1 1 9.25-9.25zm-10.95 5.19a6 6 0 1 1 6.9-6.9l-2.39-.9a4 4 0 1 0-5.41 5.41l.9 2.39z"/><path className="secondary" d="M17.96 16.54l3.75 3.75a1 1 0 0 1-1.42 1.42l-3.75-3.75-.57 2.28a1 1 0 0 1-1.9.11l-3-8a1 1 0 0 1 1.28-1.29l8 3a1 1 0 0 1-.1 1.91l-2.3.57z"/></svg>
					</div>
					Click on image to annotate
				</div>					
		)
	}

	const renderComments = () => {

		const _addsubComment = (childComment: SubComment, parentComment: CommentType) => {
			dispatch(addsubComment(parentComment, childComment))
			DataLayerClient.addSubCommentToComment(childComment, parentComment)
		}

		if (commentsSelector !== undefined && Object.keys(commentsSelector).length > 0) {
			return (
				<div className='flex flex-col w-full rounded-lg' >
					
					<div className='relative flex flex-col w-full pt-1 pr-2 -ml-1 overflow-scroll bg-gray-300 rounded-lg rounded-l-none' style={{height: '583px'}}>
						{ post !== undefined ? <CommentsSection comments={Object.values(commentsSelector)} addSubComent={_addsubComment} displayNewCommentBox={false} /> : <></>}
					</div>
				</div>
			)
		}
		
	}

	const renderAnnotationScreen = () => {
		const getAnnotations = () => {
			// Comment selector can be undefined if the post comments storage array has not been initialized yet
			if (commentsSelector === undefined) {
				return []
			}
			const annotations: Annotation[] = []
			Object.values(commentsSelector).forEach((comment) => {
				if (comment.annotation !== undefined) {
					annotations.push(comment.annotation)
				}
			})
			return annotations
		}

		const onSubmitAnnotation = (annotation: Annotation) => {
			const newComment: CommentType = {
				postId: props.post.id,
				id: uuid(),
				author: authState.authenticated ? authState.userName! : 'invalid',
				text: annotation.data.text ? annotation.data.text : '',
				date: (new Date()).toISOString(),
				authorAvatarSrc: 'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
				annotation: annotation,
				subcomments: []
			}
			dispatch(addComment(newComment))
			DataLayerClient.createCommentForPost(props.post, newComment)
		}

		if (post !== undefined) {
			const img = postsSelector.image
			if (isPostImgDownload(img)) {
				return (
					<div className='relative flex flex-shrink-0 object-contain w-full bg-gray-300 rounded-lg rounded-r-none' style={{height: '583px', width: '281px'}}>
						<div className='z-30 mx-auto my-auto bg-white spinner' style={{width: '92.1%', height: '96.5%', borderRadius: '2.2rem'}}>
						</div>
					</div>
				)
			} else {
				return (
					<AnnotationScreen 
						annotations={getAnnotations()} 
						onSubmit={onSubmitAnnotation} 
						key={post.id} 
						imageBlob={img} 
					/>
				)
			}			
		} else {
			return (<></>)
		}
	}

	return (
		<Container header={renderButtons()} tag={'Screenshot'}>
			<div className='flex flex-row'>
				<div className='flex-col flex-shrink-0 mb-3' >
					{ renderAnnotationScreen() }
				</div>
				{ renderComments() }
			</div>
		</Container>
	)
}

function isPostImgDownload(object: any): object is PostImgDownload{
	return object.imagePromise !== undefined
  }

export default PostScreenshot
