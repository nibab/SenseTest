import React, { useState, useRef } from 'react'
import { Comment as CommentType, SubComment, Annotation } from '../../types'
import { v4 as uuidv4 } from 'uuid'
import { useSelector } from '../../store'
import { type } from 'os'
import moment from 'moment'

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

	return (
		<>
			<div className='w-full overflow-scroll '>
				{ renderComments() }
			</div>
		</>
	)
}

type CommentProps = {
	annotation?: Annotation
	comment: CommentType | SubComment
	onReply: (text: string) => void
	noReply: boolean
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
			<div className='flex flex-row w-full'>
				<div className='justify-start flex-shrink-0 pt-0.5 pl-2 '>
					{/* <div className=''>
						<img className="inline-block w-8 h-8 rounded-full" src={props.comment.authorAvatarSrc} alt="" />
					</div> */}
					{ props.annotation && <div className='flex items-center justify-center w-6 h-6 mx-auto mt-1 text-sm font-medium text-gray-300 bg-indigo-600 rounded-full cursor-pointer mx-2uto hover:bg-indigo-400'>
						{props.annotation.data.id}
					</div>}
					
				</div> 
				<div className={`flex flex-col w-full pt-0.5 pl-2`}>
					
					<div className='flex flex-row inline w-full pr-2'>
						<div className='flex-shrink-0 w-auto mb-0.5 my-auto text-sm font-semibold leading-tight text-gray-700 '>
							{ props.comment.author }
						</div>
						<div className="flex-shrink-0 my-auto ml-1 text-xs text-gray-500"> { moment(props.comment.date).fromNow() }  </div>
					</div>
					

					<div className='w-full p-2 text-sm leading-5 text-gray-700 break-all bg-white rounded-md'>
						{props.comment.text}
					</div>
					{ !props.noReply && renderReplySection()}
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
	const authState = useSelector(state => state.auth)

	const addResponse = (text: string) => {
		let newResponse: SubComment = {
			id:  uuidv4(),
			text: text,
			author: authState.authenticated ? authState.userName! : 'invalid',
			date: (new Date()).toISOString(),
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
				<div className={`pl-6 pt-1  w-full ${responses.length !== _i ? 'border border-t-0 border-r-0 border-l-0' : ''}`}>
					<Comment noReply={_i !== responses.length - 1} comment={response} onReply={(text) => addResponse(text)} />												
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
	
	return (
		<div className='flex flex-col pt-1.5 pb-0.5 pr-0.5 w-full rounded-lg'>
			{/* the first comment */}
			
			<Comment noReply={subComments !== undefined && Object.values(subComments).length > 0} annotation={props.comment.annotation} comment={props.comment} onReply={(text) => addResponse(text)} />											
			<div className="">{ renderSubComments() }</div>
		</div>
	)
}