import React, { useState, useRef } from 'react'
import { Comment as CommentType, SubComment, Annotation } from '../../types'
import { v4 as uuidv4 } from 'uuid'
import { useSelector } from '../../store'

const REPLY_BOX_PLACEHOLDER = 'Write comment'

type CommentsSectionProps = {
	displayNewCommentBox: boolean
	comments: CommentType[]
	addSubComent: (childComment: SubComment, parentComment: CommentType) => void
}

export const CommentsSection = (props: CommentsSectionProps) => {
	const renderComments = () => {
		const items: JSX.Element[] = []
		props.comments.forEach((comment) => {
			//let comment = commentsSelector.comments[commentId]
			if (comment.subcomments !== undefined && comment.subcomments?.length > 0) {
				items.push(
					<CommentGroup key={comment.id} addSubComent={props.addSubComent} comment={comment} _responses={comment.subcomments} />
				)
			} else {
				items.push(
					<CommentGroup key={comment.id} addSubComent={props.addSubComent} comment={comment} _responses={[]} />
				)
			}
		})
		
		return items
	}

	// const createNewComment = () => {
	// 	return (
	// 		<>
	// 			<div className={`${displayNewCommentBox ? '' : 'hidden'} absolute z-30 h-full w-full pr-3`}>
	// 				<div className='absolute w-full h-full bg-gray-600 rounded-lg opacity-50'></div>
	// 			</div>
	// 			<div className={`${displayNewCommentBox ? '' : 'hidden'} absolute w-full h-full z-30 pr-4`}>
					
	// 				<div className='relative w-full p-3 mr-3 bg-white rounded-lg'>
	// 					<div className="flex flex-shrink-0 border-gray-200">
	// 						<div className="flex-shrink-0 block group focus:outline-none ">
								
	// 						</div>
	// 					</div>
	// 					<div className='flex flex-row text-sm leading-tight text-gray-700 bg-gray-200 rounded-md font'>
	// 						<div className='flex-wrap w-full h-full p-1'>
	// 							{ REPLY_BOX_PLACEHOLDER }
	// 						</div>
	// 						<div className='inline-flex items-center h-8 px-2 py-1 m-1 text-xs font-medium leading-4 text-white transition duration-150 ease-in-out bg-indigo-600 border border-transparent rounded cursor-pointer hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700'>
	// 							Publish
	// 						</div>
	// 					</div>
	// 				</div>
					
	// 			</div>
	// 		</>
	// 	)
	// }

	return (
		<>
			<div className='w-full overflow-scroll'>
				{ renderComments() }
			</div>
		</>
	)
}

type CommentProps = {
	annotation?: Annotation
	comment: CommentType | SubComment
	onReply: (text: string) => void
}

const Comment = (props: CommentProps) => {
	const [replyInProgress, setReplyInProgress] = useState(false)
	const replyBoxRef = useRef<HTMLTextAreaElement>(null)
	const [replyBoxFirstTouch, setReplyBoxFirstTouch] = useState(false)

	const onFirstReplyBoxTouch = () => {
		if (!replyBoxFirstTouch) {
			(replyBoxRef.current)!.value = ''
			setReplyBoxFirstTouch(true)
		}
	}

	const onReplyButtonClick = () => {
		const replyBoxContent = replyBoxRef.current?.value
		
		if (replyBoxContent !== undefined && replyBoxContent !== null) {
			props.onReply(replyBoxContent)
			setReplyInProgress(false)
		}
	}

	const replyBox = () => {
		return (
			<div className='relative flex flex-row mt-1 text-sm leading-tight text-gray-700 bg-white rounded-md font'>
				<textarea placeholder={REPLY_BOX_PLACEHOLDER } ref={replyBoxRef} contentEditable="true" onChange={() => onFirstReplyBoxTouch()} style={{outline: 'none'}} className='flex w-full h-full p-1 rounded-md'>
					{/* { REPLY_BOX_PLACEHOLDER } */}
				</textarea>
				<button onClick={onReplyButtonClick} className='inline-flex items-center h-8 px-2 py-1 m-1 text-xs font-medium leading-4 text-white transition duration-150 ease-in-out bg-indigo-600 border border-transparent rounded cursor-pointer hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700'>
					Publish
				</button>
			</div>
		)
	}

	const renderReplySection = () => {
		if (replyInProgress) {
			return (
				<div className='mb-3 '>
					<a onClick={() => setReplyInProgress(false)} className='flex-wrap mt-3 text-xs font-medium leading-tight text-red-800 cursor-pointer'>
						Cancel Reply
					</a>
					{ replyBox() }
				</div>
				
			)
		} else {
			return (
				<div className=''>
					<a onClick={() => setReplyInProgress(true)} className='flex-wrap mt-3 text-xs font-medium leading-tight text-indigo-700 cursor-pointer'>
						Reply
					</a>
				</div>
			)
		}
	}

	return (
		<div className='relative w-full'>
			<div className='flex flex-row rounded-lg'>
				<div className='justify-start flex-shrink-0 pt-0.5 pl-2 '>
					{/* <div className=''>
						<img className="inline-block w-8 h-8 rounded-full" src={props.comment.authorAvatarSrc} alt="" />
					</div> */}
					{ props.annotation && <div className='flex items-center justify-center w-6 h-6 mx-auto mt-1 text-sm font-medium text-gray-300 bg-indigo-600 rounded-full cursor-pointer mx-2uto hover:bg-indigo-400'>
						{props.annotation.data.id}
					</div>}
					
				</div> 
				<div className='relative w-full pt-0.5 pl-2'>
					<div className="flex flex-shrink-0 border-gray-200">
						<div className="flex-shrink-0 block group focus:outline-none ">
							<div className="flex items-center">
							
							<div className="">
								<p className="text-sm font-medium leading-3 text-gray-700 group-hover:text-gray-900">
								{ props.comment.author } <a className="ml-1 text-xs leading-5 text-gray-500 transition duration-150 ease-in-out font group-hover:text-gray-700 group-focus:underline">
								{ props.comment.date }
									</a>
								</p>
								
							</div>
							</div>
						</div>
					</div>
					{<p className='flex-wrap p-2 text-sm leading-tight text-gray-700 bg-white rounded-md font'>
						{props.comment.text}
					</p>}
					{ renderReplySection()}
				</div>
			</div>
		</div>
	)
}

type CommentGroupProps = {
	
	comment: CommentType
	_responses: SubComment[]
	addSubComent: (childComment: SubComment, parentComment: CommentType) => void
}

const CommentGroup = (props: CommentGroupProps) => {
	const subComments = useSelector(state => state.subcomment.commentsMap[props.comment.id])

	const addResponse = (text: string) => {
		let newResponse: SubComment = {
			id:  uuidv4(),
			text: text,
			author: 'Cezar Babin',
			date: 'now',
			authorAvatarSrc: 'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
			parentCommentId: props.comment.id
		}
		props.addSubComent(newResponse, props.comment)
	}

	const renderSubComments = () => {
		const items = []

		

		if (subComments === null || subComments === undefined) {
			return (<></>)
		}

		const responses = Object.values(subComments)

		for (var _i = 0; _i < responses.length; _i++) {
			let response = responses[_i]
			items.push(
				<div className={`pl-10 ${_i == responses.length - 1 ? '' : 'border-b' } w-full relative`}>
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
				<div className='flex justify-center flex-shrink-0 h-full my-auto'>
					<div className='flex items-center justify-center w-6 h-6 mx-2 text-sm font-medium text-gray-300 bg-indigo-600 rounded-full cursor-pointer hover:bg-indigo-400'>
						{ props.comment.annotation.data.id }
					</div>
				</div>
			)
		} else {
			return (<></>)
		}
		
	}

	return (
		<div className='flex flex-col w-full pt-1.5 rounded-lg'>
			<div className={getComentClassName()}>
				{/* { props.comment.annotation !== undefined ? renderAnnotation() : ''} */}
				<div className={`${ props.comment.annotation !== undefined ? '' : ''} w-full relative`}>
					<Comment annotation={props.comment.annotation} comment={props.comment} onReply={(text) => addResponse(text)} />											
				</div>
			</div>
			{ renderSubComments() }
		</div>
	)
}