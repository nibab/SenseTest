import React, { useState, useRef, useEffect } from 'react'
import { Post } from '../../../types'


const TEST_COMMENT = {message: 'Hello', author: 'Cezar', date:'now', annotation:'1'} 
const TEST_RESPONSES = [{message: 'World', author: 'Cezar', date:'now', annotation:'1'},{message: 'World', author: 'Cezar', date:'now', annotation:'1'} ]
const REPLY_BOX_PLACEHOLDER = 'Write comment or @mention'

type PostScreenshotProps = {
	post: Post
}

const PostScreenshot = ({ post }: PostScreenshotProps) => {
	

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
					<button className="inline-flex items-center mr-1 inline-flex items-center px-2.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 mr-1 icon-click-target"><path className="primary" d="M21.97 12.73c-.25-.22-.56-.4-.92-.54L20 11.8a8 8 0 1 0-8.2 8.2l.4 1.06c.12.36.3.67.53.92a10 10 0 1 1 9.25-9.25zm-10.95 5.19a6 6 0 1 1 6.9-6.9l-2.39-.9a4 4 0 1 0-5.41 5.41l.9 2.39z"/><path className="secondary" d="M17.96 16.54l3.75 3.75a1 1 0 0 1-1.42 1.42l-3.75-3.75-.57 2.28a1 1 0 0 1-1.9.11l-3-8a1 1 0 0 1 1.28-1.29l8 3a1 1 0 0 1-.1 1.91l-2.3.57z"/></svg>
						Annotate
					</button>
					
				</div>
			</div>
		)
	}

	const renderScreen = () => {
		return (
			<div className='bg-gray-300 flex-shrink-0 w-full object-contain flex relative rounded-lg rounded-r-none' style={{height: '583px', width: '281px'}}>
				<div className=' h-full w-full absolute z-0' >
					{/* <img className="h-full w-full object-contain" src='../../../../public/iphonexBlack.png'></img> */}
				</div>	
				<div className='mx-auto my-auto z-10 overflow-hidden' style={{width: '92.1%', height: '96.5%', borderRadius: '2.2rem'}}>
					<img className='h-full w-full mx-auto object-contain' src={window.URL.createObjectURL(post.image)}></img>
				</div>
				
				
			</div>
		)
	}

	return (
		<div className='flex-auto flex flex-col ml-3 ' > 
			{ renderTag() }
			<div className='pb-3 pl-3 pr-3 rounded-lg border-dashed border-gray-400 border-2 flex flex-row'>
				<div className='mb-3 flex-shrink-0  flex-col relative' >
					{ renderButtons() }
					{ renderScreen() }
				</div>
				<div className='flex flex-col rounded-lg' >
					<div className='w-full h-8 flex my-1'>
						<div className='mx-auto flex flex-row p-0.5'></div>
					</div>
					<div className='w-full relative bg-gray-300 overflow-scroll p-2 rounded-lg rounded-l-none flex flex-col' style={{height: '583px'}}>
						<CommentsSection />
					</div>
				</div>
			</div>
		</div>
	)

}


const CommentsSection = () => {
	const createNewComment = () => {
		return (
			<>
				<div className='hidden absolute z-30 h-full w-full pr-3'>
					<div className='absolute h-full w-full bg-gray-600 opacity-50 rounded-lg'></div>
				</div>
				<div className='hidden absolute w-full h-full z-30 pr-4'>
					
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
						<img className="inline-block h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
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
			date: 'now'
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

export default PostScreenshot
