import React, { useState, useEffect } from 'react'
import { Post, Annotation } from '../../types'
import { useSelector } from '../../store'
import { Comment as CommentType } from '../../types'

import { useDispatch } from 'react-redux'
import { addComment, addsubComment } from '../../store/comment/actions'

import uuid from 'uuid'
import { CommentsSection } from '../Comments'
import AnnotationScreen from '../AnnotationScreen'


type PostScreenshotProps = {
	post: Post
}

const PostScreenshot = (props: PostScreenshotProps) => {
	const [displayNewCommentBox, setDisplayNewCommentBox] = useState(false)
	const [post, setPost] = useState<Post>()
	const commentsSelector = useSelector(state => state.comment.comments[props.post.id])
	const dispatch = useDispatch()

	useEffect(() => {
		setPost(props.post)
	}, [props])

	const renderTag = () => {
		return (
			<div className='flex w-full h-8 '>
				<div className=' pb-1 mx-auto flex flex-row p-0.5'>
					<span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium leading-5 bg-gray-100 text-gray-800">
						Screenshot
					</span>
					<span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium leading-5 bg-indigo-100 text-indigo-800">
						<svg className="-ml-0.5 mr-1.5 h-2 w-2 text-indigo-400" fill="currentColor" viewBox="0 0 8 8">
							<circle cx="4" cy="4" r="3" />
						</svg>
						v 1.0.1.b
					</span>
				</div> 
			</div>
		)	
	}

	const renderButtons = () => {
		return (
			<div className='flex w-full h-8 my-1'>
				<div className='mx-auto flex flex-row p-0.5'>
					<button onClick={() => setDisplayNewCommentBox(!displayNewCommentBox)} className="inline-flex items-center mr-1 inline-flex items-center px-2.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 mr-1 icon-click-target"><path className="primary" d="M21.97 12.73c-.25-.22-.56-.4-.92-.54L20 11.8a8 8 0 1 0-8.2 8.2l.4 1.06c.12.36.3.67.53.92a10 10 0 1 1 9.25-9.25zm-10.95 5.19a6 6 0 1 1 6.9-6.9l-2.39-.9a4 4 0 1 0-5.41 5.41l.9 2.39z"/><path className="secondary" d="M17.96 16.54l3.75 3.75a1 1 0 0 1-1.42 1.42l-3.75-3.75-.57 2.28a1 1 0 0 1-1.9.11l-3-8a1 1 0 0 1 1.28-1.29l8 3a1 1 0 0 1-.1 1.91l-2.3.57z"/></svg>
						Annotate
					</button>					
				</div>
			</div>
		)
	}

	const renderComments = () => {

		const _addsubComment = (childComment: CommentType, parentComment: CommentType) => {
			dispatch(addsubComment(parentComment, childComment))
		}

		if (commentsSelector !== undefined && commentsSelector.length > 0) {
			return (
				<div className='flex flex-col rounded-lg' >
					<div className='flex w-full h-8 my-1'>
						<div className='mx-auto flex flex-row p-0.5'></div>
					</div>
					<div className='relative flex flex-col w-full p-2 overflow-scroll bg-gray-300 rounded-lg rounded-l-none' style={{height: '583px'}}>
						{ post !== undefined ? <CommentsSection comments={commentsSelector} addSubComent={_addsubComment} displayNewCommentBox={false} /> : <></>}
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
			commentsSelector.forEach((comment) => {
				if (comment.annotation !== undefined) {
					annotations.push(comment.annotation)
				}
			})
			return annotations
		}

		const onSubmitAnnotation = (annotation: Annotation) => {
			const newComment = {
				postId: props.post.id,
				id: uuid(),
				author: 'Test',
				text: annotation.data.text,
				date: 'right now',
				authorAvatarSrc: 'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
				annotation: annotation
			}
			dispatch(addComment(newComment))
		}

		if (post!== undefined) {
			return (
				<AnnotationScreen 
					annotations={getAnnotations()} 
					onSubmit={onSubmitAnnotation} 
					key={post.id} 
					imageSrc={window.URL.createObjectURL(props.post.image)} 
				/>
			)
		} else {
			return (<></>)
		}
	}

	return (
		<div className='flex flex-col max-w-full ' > 
			{ renderTag() }
			<div className='flex flex-row pb-3 pl-3 pr-3 border-2 border-gray-400 border-dashed rounded-lg'>
				<div className='relative flex-col flex-shrink-0 mb-3' >
					{ renderButtons() }
					{ renderAnnotationScreen() }
				</div>
				{ renderComments() }
			</div>
		</div>
	)
}

export default PostScreenshot
