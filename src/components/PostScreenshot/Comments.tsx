import React, { useEffect, useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { addComment, addsubComment } from '../../store/comment/actions'
import { Comment as CommentType, Post } from '../../types'
import { useSelector } from '../../store'
import { v4 as uuidv4 } from 'uuid'


const TEST_COMMENT: CommentType = {
	postId: '1',
	id: uuidv4(),
	text: 'Hello world how are uy', 
	author: 'Cezar Babin', 
	date:'now', 
	annotation: {
		geometry: {
			x: 1,
			y: 2,
			height: 3,
			width: 4,
			type: 'type'
		},
		data: {
			id: 1,
			text: 'hello'
		}
	},
	authorAvatarSrc: 'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
} 
const TEST_RESPONSES: CommentType[] = [
	{
		postId: '1',
		id: uuidv4(),
		text: 'World', 
		author: 'Cezar Babin', 
		date:'now', 
		annotation: {
			data: {
				text: 'hellp',
				id: 1
			}
		},
		authorAvatarSrc: 'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
	},
	{
		postId: '1',
		id: uuidv4(),
		text: 'Hello BLEA', 
		author: 'Cezar Babin', 
		date:'now', 
		annotation: {
			data: {
				text: 'hellp',
				id: 1
			}
		},
		authorAvatarSrc: 'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
	}
]
const REPLY_BOX_PLACEHOLDER = 'Write comment or @mention'

type CommentsSectionProps = {
	displayNewCommentBox: boolean
	post: Post
}

export const CommentsSection = (props: CommentsSectionProps) => {
	const [displayNewCommentBox, setDisplayNewCommentBox] = useState<boolean>()
	const commentsSelector = useSelector(state => state.comment.comments[props.post.id])

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(addComment(TEST_COMMENT))
		dispatch(addsubComment(TEST_COMMENT, TEST_RESPONSES[0]))
	}, [])

	useEffect(() => {
		setDisplayNewCommentBox(props.displayNewCommentBox)
		
	}, [props])

	const renderComments = () => {
		const items: JSX.Element[] = []
		// Comments could be undefined if the post has not been initialized yet. Not sure how to set up typescript to infer ha the type of this might be undefined
		if (commentsSelector === undefined) {
			return <></>
		}
		commentsSelector.forEach((comment) => {
			//let comment = commentsSelector.comments[commentId]
			if (comment.subcomments !== undefined && comment.subcomments?.length > 0) {
				items.push(
					<CommentGroup comment={comment} _responses={comment.subcomments} />
				)
			} else {
				items.push(
					<CommentGroup comment={comment} _responses={[]} />
				)
			}
		})
		
		return items
	}

	const createNewComment = () => {
		return (
			<>
				<div className={`${displayNewCommentBox ? '' : 'hidden'} absolute z-30 h-full w-full pr-3`}>
					<div className='absolute h-full w-full bg-gray-600 opacity-50 rounded-lg'></div>
				</div>
				<div className={`${displayNewCommentBox ? '' : 'hidden'} absolute w-full h-full z-30 pr-4`}>
					
					<div className='bg-white rounded-lg p-3 mr-3 w-full relative'>
						<div className="flex-shrink-0 flex border-gray-200">
							<div className="flex-shrink-0 group block focus:outline-none ">
								
							</div>
						</div>
						<div className=' text-sm leading-tight font text-gray-700 bg-gray-200  rounded-md flex-row flex'>
							<div className='w-full p-1 h-full flex-wrap'>
								{ REPLY_BOX_PLACEHOLDER }
							</div>
							<div className='cursor-pointer m-1 inline-flex items-center h-8 px-2 py-1  border border-transparent text-xs leading-4 font-medium rounded text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150'>
								Publish
							</div>
						</div>
					</div>
					
				</div>
			</>
		)
	}

	return (
		<>
			{ createNewComment() }
			<div className='overflow-scroll w-full'>
				{ renderComments() }
				{/* <CommentGroup comment={TEST_COMMENT} _responses={[]} />
				<CommentGroup comment={TEST_COMMENT} _responses={TEST_RESPONSES} /> */}
			</div>
		</>
	)
}

type CommentProps = {
	comment: CommentType
	onReply: (text: string) => void
}

const Comment = ({comment, onReply}: CommentProps) => {
	const [replyInProgress, setReplyInProgress] = useState(false)
	const replyBoxRef = useRef<HTMLDivElement>(null)

	const commentHeader = () => {
		return (
			<div className="flex-shrink-0 flex border-gray-200">
				<div className="flex-shrink-0 group block focus:outline-none ">
					<div className="flex items-center">
					<div className=''>
						<img className="inline-block h-8 w-8 rounded-full" src={comment.authorAvatarSrc} alt="" />
					</div>
					<div className="ml-2 ">
						<p className="text-sm leading-3 pt-2 font-medium text-gray-700 group-hover:text-gray-900">
							{ comment.author }
						</p>
						<p className="text-xs leading-5 font text-gray-500 group-hover:text-gray-700 group-focus:underline transition ease-in-out duration-150">
							{ comment.date }
						</p>
					</div>
					</div>
				</div>
			</div>
		)
	}

	const commentMessage = () => {
		return (
			<p className='mt-2 text-sm leading-tight font text-gray-700 flex-wrap'>
				{ comment.text } 
			</p>
		)
	}

	const onReplyButtonClick = () => {
		const replyBoxContent = replyBoxRef.current?.innerText
		
		if (replyBoxContent !== undefined && replyBoxContent !== null) {
			onReply(replyBoxContent)
			setReplyInProgress(false)
		}
	}

	const replyBox = () => {
		return (
			<div className='relative mt-1 text-sm leading-tight font text-gray-700 bg-gray-200  rounded-md flex-row flex'>
				<div ref={replyBoxRef} contentEditable="true" style={{outline: 'none'}} className='w-full p-1 h-full flex-wrap'>
					{ REPLY_BOX_PLACEHOLDER }
				</div>
				<button onClick={onReplyButtonClick} className='cursor-pointer m-1 inline-flex items-center h-8 px-2 py-1  border border-transparent text-xs leading-4 font-medium rounded text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150'>
					Publish
				</button>
			</div>
		)
	}

	const renderReplySection = () => {
		if (replyInProgress) {
			return (
				<div className='mt-2 mb-3'>
					<a onClick={() => setReplyInProgress(false)} className='cursor-pointer mt-3 text-xs leading-tight font-medium text-red-800 flex-wrap'>
						Cancel Reply
					</a>
					{ replyBox() }
				</div>
				
			)
		} else {
			return (
				<div className='mt-2 mb-3'>
					<a onClick={() => setReplyInProgress(true)} className='cursor-pointer mt-3 text-xs leading-tight font-medium text-indigo-700 flex-wrap'>
						Reply
					</a>
				</div>
			)
		}
	}

	return (
		<div className='w-full relative'>
			{ commentHeader() }
			{ commentMessage() }
			{ renderReplySection() }
		</div>
	)
}

type CommentGroupProps = {
	comment: CommentType
	_responses: CommentType[]
}

const CommentGroup = (props: CommentGroupProps) => {
	const dispatch = useDispatch()
	//const commentsSelector = useSelector(state => state.comment)

	const addResponse = (text: string) => {
		let newResponse: CommentType = {
			postId: props.comment.postId,
			id:  uuidv4(),
			text: text,
			author: 'Cezar Babin',
			date: 'now',
			authorAvatarSrc: 'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
		}
		dispatch(addsubComment(props.comment, newResponse))
	}

	const renderReponses = () => {
		const items = []

		const responses = props.comment.subcomments

		if (responses === undefined) {
			return (<></>)
		}

		for (var _i = 0; _i < responses.length; _i++) {
			let response = responses[_i]
			items.push(
				<div className={`pt-4 px-4 ${_i == responses.length - 1 ? '' : 'border-b' } w-full relative`}>
					<Comment comment={response} onReply={(text) => addResponse(text)} />												
				</div>
			)
		}

		if (responses.length === 0) {
			return (<></>)
		} else {
			return (
				<div className=''>
					{ items } 
				</div>
			)
		}
	}

	const getComentClassName = () => {
		const responses = props.comment.subcomments
		if (responses !== undefined && responses.length > 0) {
			return `w-full flex flex-row border-b`
		} else {
			return `w-full flex flex-row`
		}
	}
	
	const renderAnnotation = () => {
		if (props.comment.annotation !== undefined) {
			return (
				<div className='flex-shrink-0 my-auto h-full flex justify-center'>
					<div className='cursor-pointer hover:bg-indigo-400 bg-indigo-600 flex text-sm font-medium w-6 h-6 mx-2 rounded-full items-center justify-center text-gray-300'>
						{ props.comment.annotation.data.id }
					</div>
				</div>
			)
		} else {
			return (<></>)
		}
		
	}

	return (
		<div className='flex flex-col bg-white mb-3 rounded-lg w-full'>
			<div className={getComentClassName()}>
				{ props.comment.annotation !== undefined ? renderAnnotation() : ''}
				<div className={`${ props.comment.annotation !== undefined ? 'pl-2 pr-4' : 'p-4'} pt-4 w-full relative`}>
					<Comment comment={props.comment} onReply={(text) => addResponse(text)} />											
				</div>
			</div>
			{ renderReponses() }
		</div>
	)
}