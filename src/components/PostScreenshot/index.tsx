import React, { useState, useRef, useEffect } from 'react'
import { Post, Geometry, Annotation as AnnotationType } from '../../types'
import { CommentsSection } from './Comments'
import {
	PointSelector
} from 'react-image-annotation/lib/selectors'
import Annotation from 'react-image-annotation'
import { useDispatch } from 'react-redux'
import { addComment } from '../../store/comment/actions'
import uuid from 'uuid'
import Log from '../../utils/Log'
import { useSelector } from '../../store'

type PostScreenshotProps = {
	post: Post
}

type AnnotationScreenProps = {
	post: Post
}


type DotProps = {
	geometry: Geometry
	annotationId?: number
}
const Dot = ({geometry, annotationId}: DotProps) => {
	if (annotationId !== undefined) {
		return (
			<div className='border-2 border-white border-solid cursor-pointer hover:bg-indigo-400 bg-indigo-600 flex text-sm font-medium w-6 h-6 rounded-full items-center justify-center text-gray-300 -mt-3 -ml-3' style={{
				position: 'absolute',
				left: `${geometry.x}%`,
				top: `${geometry.y}%`,
			}}> {annotationId} </div>
		)
	} else {
		return (
			<div className='h-6 w-6 bg-indigo-700 border-2 border-white border-solid rounded-full -mt-3 -ml-3' style={{
				position: 'absolute',
				left: `${geometry.x}%`,
				top: `${geometry.y}%`,
			}} />
		)
		
	}
	
}

const AnnotationScreen = (props: AnnotationScreenProps) => {
	const [annotations, setAnnotations] = useState<AnnotationType[]>([])
	const [annotation, setAnnotation] = useState<AnnotationType| {}>({})
	const [post, setPost] = useState<Post>()
	const dispatch = useDispatch()
	// To see where we can draw existing annotations
	const commentsSelector = useSelector(state => state.comment.comments[props.post.id])

	useEffect(() => {
		setPost(props.post)
		// Comment selector can be undefined if the post comments storage array has not been initialized yet
		if (commentsSelector === undefined) {
			return
		}
 		commentsSelector.forEach((comment) => {
			if (comment.annotation !== undefined) {
				const copyAnnotations = annotations
				copyAnnotations.push(comment.annotation)
				setAnnotations(copyAnnotations)
			}
		})
	}, [props])

	const onChange = (annotation: AnnotationType) => {
		setAnnotation(annotation)
	}

	const onSubmit = (annotation: AnnotationType) => {
		const currentAnnotations = [...annotations]
		const newAnnotation: AnnotationType = {
			geometry: annotation.geometry,
			data: {
				...annotation.data,
				id: annotations.length + 1
			}
		}
		currentAnnotations.push(newAnnotation)
		setAnnotation({})
		setAnnotations(currentAnnotations)

		if (post !== undefined) {
			const newComment = {
				postId: post?.id,
				id: uuid(),
				author: 'Test',
				text: annotation.data.text,
				date: 'right now',
				authorAvatarSrc: 'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
				annotation: newAnnotation
			}
			dispatch(addComment(newComment))
		} else {
			Log.error("Tried commenting on an inexistent post", "AnnotationScreen")
		}

		

	}

	type RenderHighlightParams = {
		annotation: AnnotationType
		active: boolean
	}

	// Overriding the selector appearence from react-image-annotate
	function renderSelector (params: RenderHighlightParams) {
		const geometry = params.annotation.geometry
		if (!geometry) return null
	  
		return (
			<Dot geometry={geometry} />
		)
	}

	// Overriding the highlight appearence from react-image-annotate
	const renderHighlight = (params: RenderHighlightParams) => {
		const geometry = params.annotation.geometry
		if (!geometry) return null

		return (
			<Dot annotationId={params.annotation.data.id} geometry={geometry} />
		)
	}

	if (post !== undefined) {
		return (
			<div className='bg-gray-300 flex-shrink-0 w-full object-contain flex relative rounded-lg rounded-r-none' style={{height: '583px', width: '281px'}}>
				<div className=' h-full w-full absolute z-0' >
					{/* <img className="h-full w-full object-contain" src='../../../../public/iphonexBlack.png'></img> */}
				</div>	
				{/* <div className='mx-auto my-auto z-10 overflow-hidden' style={{width: '92.1%', height: '96.5%', borderRadius: '2.2rem'}}>
					<img className='h-full w-full mx-auto object-contain' src={window.URL.createObjectURL(post.image)}></img>
				</div> */}
				<div className='mx-auto my-auto z-30' style={{width: '92.1%', height: '96.5%', borderRadius: '2.2rem'}}>
					<Annotation src={window.URL.createObjectURL(post.image)} annotations={annotations} renderSelector={renderSelector} renderHighlight={renderHighlight} onSubmit={onSubmit} onChange={onChange} type={PointSelector.TYPE} value={annotation}>
						{/* <img className='h-full w-full mx-auto object-contain' src={window.URL.createObjectURL(post.image)}></img> */}
					</Annotation>
				</div>
			</div>
		)
	} else {
		return (<></>)
	}	
	
	
}

const PostScreenshot = (props: PostScreenshotProps) => {
	const [displayNewCommentBox, setDisplayNewCommentBox] = useState(false)
	const [post, setPost] = useState<Post>()
	const commentsSelector = useSelector(state => state.comment.comments[props.post.id])

	useEffect(() => {
		setPost(props.post)
	}, [props])

	const renderTag = () => {
		return (
			<div className=' w-full h-8 flex'>
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
			<div className='w-full h-8 flex my-1'>
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
		if (commentsSelector !== undefined && commentsSelector.length > 0) {
			return (
				<div className='flex flex-col rounded-lg' >
					<div className='w-full h-8 flex my-1'>
						<div className='mx-auto flex flex-row p-0.5'></div>
					</div>
					<div className='w-full relative bg-gray-300 overflow-scroll p-2 rounded-lg rounded-l-none flex flex-col' style={{height: '583px'}}>
						{ post !== undefined ? <CommentsSection post={post} displayNewCommentBox={displayNewCommentBox} /> : <></>}
					</div>
				</div>
			)
		}
		
	}

	return (
		<div className='max-w-full flex flex-col ml-3 ' > 
			{ renderTag() }
			<div className='pb-3 pl-3 pr-3 rounded-lg border-dashed border-gray-400 border-2 flex flex-row'>
				<div className='mb-3 flex-shrink-0  flex-col relative' >
					{ renderButtons() }
					{ post !== undefined ? <AnnotationScreen key={post.id} post={post} /> : <></>}
				</div>
				{ renderComments() }
			</div>
		</div>
	)
}

export default PostScreenshot
