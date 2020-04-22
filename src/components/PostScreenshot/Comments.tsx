import React, { useEffect, useState, useRef } from 'react'

const TEST_COMMENT = {
	message: 'Hello world how are uy', 
	author: 'Cezar Babin', 
	date:'now', 
	annotation:'1',
	avatarSrc: 'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
} 
const TEST_RESPONSES = [
	{
		message: 'World', 
		author: 'Cezar Babin', 
		date:'now', 
		annotation:'1',
		avatarSrc: 'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
	},
	{
		message: 'World', 
		author: 'Cezar Babin', 
		date:'now', 
		annotation:'1',
		avatarSrc: 'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
	}
]
const REPLY_BOX_PLACEHOLDER = 'Write comment or @mention'

type CommentsSectionProps = {
	displayNewCommentBox: boolean
}

export const CommentsSection = (props: CommentsSectionProps) => {
	const [displayNewCommentBox, setDisplayNewCommentBox] = useState<boolean>()

	useEffect(() => {
		setDisplayNewCommentBox(props.displayNewCommentBox)
	}, [props])

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
				<CommentGroup comment={TEST_COMMENT} _responses={[]} />
				<CommentGroup comment={TEST_COMMENT} _responses={TEST_RESPONSES} />
			</div>
		</>
	)
}

type Comment = {
	message: string
	author: string
	avatarSrc: string
	date: string
	annotation?: string
}

type CommentProps = {
	comment: Comment
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
						<img className="inline-block h-8 w-8 rounded-full" src={comment.avatarSrc} alt="" />
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
				{ comment.message } 
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
	comment: Comment
	_responses: Comment[]
}

const CommentGroup = (props: CommentGroupProps) => {
	const [responses, setResponses] = useState<Comment[]>([])

	const addResponse = (text: string) => {
		let newResponses = [...responses]
		newResponses.push({
			message: text,
			author: 'Cezar Babin',
			date: 'now',
			avatarSrc: 'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
		})
		setResponses(newResponses)
	}

	useEffect(() => {
	
		setResponses(props._responses)
	}, [props])

	const renderReponses = () => {
		const items = []

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

	const commentClassName = `w-full flex flex-row ${responses.length === 0 ? '' : ' border-b '}`
	
	const renderAnnotation = () => {
		return (
			<div className='flex-shrink-0 my-auto h-full flex justify-center'>
				<div className='cursor-pointer hover:bg-indigo-400 bg-indigo-600 flex text-sm font-medium w-6 h-6 mx-2 rounded-full items-center justify-center text-gray-300'>
					{ props.comment.annotation }
				</div>
			</div>
		)
	}

	return (
		<div className='flex flex-col bg-white mb-3 rounded-lg w-full'>
			<div className={commentClassName}>
				{ props.comment.annotation !== undefined ? renderAnnotation() : ''}
				<div className={`${ props.comment.annotation !== undefined ? 'pl-2 pr-4' : 'p-4'} pt-4 w-full relative`}>
					<Comment comment={props.comment} onReply={(text) => addResponse(text)} />											
				</div>
			</div>
			{ renderReponses() }
		</div>
	)
}