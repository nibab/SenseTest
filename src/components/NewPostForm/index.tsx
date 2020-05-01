
import React, { useState, useRef } from 'react'
import uuid from 'uuid'
import AnnotationScreen from '../AnnotationScreen'
import { CommentsSection } from '../Comments'
import { Comment as CommentType, Annotation, Post, PostTag, SubComment, AppBuild } from '../../types'
import { useDispatch } from 'react-redux'
import { addComment } from '../../store/comment/actions'
import VersionTag from '../VersionTag'
import { addsubComment } from '../../store/subcomment/actions'
import { useSelector } from '../../store'

type NewPostFormProps = {
	imageToAnnotate: Blob
	appBuild: AppBuild
	imagePromise: Promise<string> // resolves with the imageId of the uploaded imageToAnnotate.
	postId: string
	projectId: string
	onCreatePostClicked: (imageId: string, post: Post) => void
	onCancel: () => void
}

type ValidationState = 'PageNameFailedValidation' | 'None'

const NewPostForm = (props: NewPostFormProps) => {
	const [comments, setComments] = useState<CommentType[]>([])
	const [annotations, setAnnotations] = useState<Annotation[]>([])
	const dispatch = useDispatch()
	// Page name input
	const pageNameRef = useRef<HTMLInputElement>(null)
	const [validationState, setValidationState] = useState<ValidationState>('None')
	const authState = useSelector(state => state.auth)



	const renderPageNameInput = () => {

		const onInputChange = () => {
			if (validationState === 'PageNameFailedValidation') {
				setValidationState('None')
			}
		}

		const inputClassName =  validationState === 'PageNameFailedValidation' ?
			'form-input block w-full pr-10 border-red-300 text-red-900 placeholder-red-300 focus:border-red-300 focus:shadow-outline-red sm:text-sm sm:leading-5' : 
			'block w-full transition duration-150 ease-in-out form-input sm:text-sm sm:leading-5'

		return (
			<div className="sm:col-span-5">
				<label htmlFor="city" className="block text-sm font-medium leading-5 text-gray-700">
					Page Name
				</label>
				<div className="relative mt-1 rounded-md shadow-sm">
					<input onChange={onInputChange} ref={pageNameRef} id="pageName" className={inputClassName} />
					{  validationState === 'PageNameFailedValidation' && <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
						<svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
							<path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
						</svg>
					</div>}
				
				</div>
				{ validationState === 'PageNameFailedValidation' && <p className="mt-2 text-sm text-red-600" id="email-error">Page name cannot be empty.</p>}
			</div>
		)
	}

	const [isBlocker, setIsBlocker] = useState(false)

	// Is this issue a blocker? 
	const renderBlockerSelection = () => {
		

		const renderBlockerTag = () => {
			if (isBlocker) {
				return (
					<span className="bg-red-100 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium leading-4 bg-red-100 text-red-800">
						Blocker
					</span>
				)
			} else {
				return (
					<div className=''>
						<span onClick={() => setIsBlocker(true)} className="cursor-pointer border border-gray-300 border-dashed rounded inline-flex items-center px-2 py-0.5 rounded text-xs font-medium leading-4  text-gray-600">
							<svg className="w-3 mx-auto mr-1 icon-camera" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path fillRule="evenodd" clipRule="evenodd" d="M10 3C10.5523 3 11 3.44772 11 4V9H16C16.5523 9 17 9.44772 17 10C17 10.5523 16.5523 11 16 11H11V16C11 16.5523 10.5523 17 10 17C9.44772 17 9 16.5523 9 16V11H4C3.44772 11 3 10.5523 3 10C3 9.44771 3.44772 9 4 9L9 9V4C9 3.44772 9.44772 3 10 3Z" fill="#4A5568"/>
							</svg>
							Blocker
						</span>
					</div>
				)
			}
			
		}

		return (
			<fieldset className="">
				<legend className="text-sm font-medium leading-5 text-gray-700 ">
				Tags
				</legend>
				{/* <p className="text-sm leading-5 text-gray-500">Does this issue block the release ?</p> */}
				<div className="mt-2">
					<div className='flex'>

						{renderBlockerTag()}
					</div>
				</div>
			</fieldset>			
		)
	}

	const renderForm = () => {
		return (
			<div className="flex-shrink-0 h-full pr-3 overflow-scroll w-72">
				<form className='ml-1'>
					<div>
					<div>
						<div>
						<h3 className="flex text-lg font-medium leading-6 text-gray-900">
							<div className=''>
								New Issue
							</div>
							<VersionTag version={props.appBuild.version} />
						</h3>
						</div>
						<div className="grid grid-cols-1 row-gap-6 col-gap-4 mt-6 sm:grid-cols-6">
							{renderPageNameInput()}
				
							<div className="sm:col-span-6">
								<label htmlFor="about" className="block text-sm font-medium leading-5 text-gray-700">
								Repro Steps
								</label>
								<div className="mt-1 rounded-md shadow-sm">
								<textarea id="about" rows={10} className="block w-full transition duration-150 ease-in-out form-textarea sm:text-sm sm:leading-5"></textarea>
								</div>
								<p className="mt-2 text-sm text-gray-500">Help others reproduce the issue.</p>
							</div>
					
							
							{/* <div className="sm:col-span-6">
								<label htmlFor="cover_photo" className="block text-sm font-medium leading-5 text-gray-700">
								Attachments
								</label>
								<div className="flex justify-center px-6 pt-5 pb-6 mt-2 border-2 border-gray-300 border-dashed rounded-md">
								<div className="text-center">
									<svg className="w-12 h-12 mx-auto text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
									<path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
									</svg>
									<p className="mt-1 text-sm text-gray-600">
									<button type="button" className="mr-1 font-medium text-indigo-600 transition duration-150 ease-in-out hover:text-indigo-500 focus:outline-none focus:underline">
										Upload a file 
									</button>
									or drag and drop
									</p>
									<p className="mt-1 text-xs text-gray-500">
									PNG, JPG, GIF up to 10MB
									</p>
								</div>
								</div>
							</div> */}

							</div>
						</div>
						<div className="mt-6 border-gray-200">
							{ renderBlockerSelection()}
						</div>
					
						
					</div>
					
				</form>
			</div>
		)
	}

	const renderComments = () => {
		const _addsubComment = (childComment: SubComment, parentComment: CommentType) => {
			dispatch(addsubComment(parentComment, childComment))
		}

		if (comments.length > 0) {
			return (
				<div className='flex flex-col rounded-lg' >
					<div className='flex w-full h-8'>
						<div className='mx-auto flex flex-row p-0.5'></div>
					</div>
					<div className='relative flex flex-col w-auto py-2 pr-2 overflow-scroll bg-gray-300 rounded-lg rounded-l-none' style={{height: '583px'}}>
						<CommentsSection comments={comments} addSubComent={_addsubComment} displayNewCommentBox={false} />
					</div>
				</div>
			)
		}		
	}

	const onCancelButtonClick = () => {
		props.onCancel()
	}

	const onCreateButtonClick = async () => {
		const pageName = pageNameRef.current?.value
		if (pageName?.length === 0) {
			setValidationState('PageNameFailedValidation')
			return
		}
		const tagArray: PostTag[] = []
		if (isBlocker) tagArray.push('BLOCKER')
		const imageId = await props.imagePromise
		// If there are any other tags, add them here.
		props.onCreatePostClicked(imageId, {
			id: props.postId,
			title: pageName!,
			dateCreated: (new Date()).toISOString(),
			image: props.imageToAnnotate,
			projectId: props.projectId,
			text: 'text',
			comments: comments,
			tags: tagArray,
			appVersion: props.appBuild.version
		})
	}

	const onSubmitAnnotation = (annotation: Annotation) => {
		const commentsCopy = [...comments]
		const newComment: CommentType = {
			postId: props.postId,
			authorAvatarSrc: 'newsScreenshot.png',
			text: annotation.data.text !== null ? annotation.data.text : "",
			id: uuid(),
			date: (new Date()).toISOString(),
			author: authState.authenticated ? authState.userName! : 'invalid',
			annotation: annotation,
			subcomments: []
		}
		commentsCopy.push(newComment)
		setComments(commentsCopy)
		dispatch(addComment(newComment))

		const annotationsCopy = [...annotations]
		annotationsCopy.push(annotation)
		setAnnotations(annotationsCopy)
	}

	const renderButtons = () => {
		return (
			<div className='flex w-full h-8'>
				<div className='mx-auto flex flex-row p-0.5'>
					<div className="inline-flex items-center mr-1 inline-flex items-center px-2.5 border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 mr-1 icon-click-target"><path className="primary" d="M21.97 12.73c-.25-.22-.56-.4-.92-.54L20 11.8a8 8 0 1 0-8.2 8.2l.4 1.06c.12.36.3.67.53.92a10 10 0 1 1 9.25-9.25zm-10.95 5.19a6 6 0 1 1 6.9-6.9l-2.39-.9a4 4 0 1 0-5.41 5.41l.9 2.39z"/><path className="secondary" d="M17.96 16.54l3.75 3.75a1 1 0 0 1-1.42 1.42l-3.75-3.75-.57 2.28a1 1 0 0 1-1.9.11l-3-8a1 1 0 0 1 1.28-1.29l8 3a1 1 0 0 1-.1 1.91l-2.3.57z"/></svg>
						Click On Image To Annotate
					</div>					
				</div>
			</div>
		)
	}

	return (
		<div className="fixed inset-x-0 bottom-0 z-20 overflow-scroll sm:inset-0 sm:p-0 sm:flex sm:justify-center">
              {/* Background overlay, show/hide based on modal state.
          
              Entering: "ease-out duration-300"
                From: "opacity-0"
                To: "opacity-100"
              Leaving: "ease-in duration-200"
                From: "opacity-100"
                To: "opacity-0" */}
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
          
              {/* Modal panel, show/hide based on modal state.
          
              Entering: "ease-out duration-300"
                From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                To: "opacity-100 translate-y-0 sm:scale-100"
              Leaving: "ease-in duration-200"
                From: "opacity-100 translate-y-0 sm:scale-100"
                To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" */}
            <div className="pt-3 pb-3 my-auto transition-all transform rounded-lg shadow-xl ">
		
		
				<div className='flex flex-col mx-auto bg-white rounded-lg '>
					{/* padding left is only 4 because form has a margin of 1 so that the field outline shadow shows properly */}
					<div className='flex flex-row p-8 pb-0'> 
						{renderForm()}
						<div className='flex flex-row my-auto border-dashed rounded-lg '>
							<div className='relative flex flex-col flex-shrink-0 mb-3' >
								{renderButtons()}

								<AnnotationScreen 
									annotations={annotations} 
									onSubmit={onSubmitAnnotation} 
									key={props.projectId} 
									imageBlob={props.imageToAnnotate} 
								/>
							</div>
							{ renderComments() }
						</div>
					</div>
					<div className="p-8 pt-5 pb-5 border-t border-gray-200">
						<div className="flex justify-end">
							<span className="inline-flex rounded-md shadow-sm">
							<button onClick={onCancelButtonClick} type="button" className="px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out border border-gray-300 rounded-md hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800">
								Cancel
							</button>
							</span>
							<span className="inline-flex ml-3 rounded-md shadow-sm">
							<button onClick={onCreateButtonClick} type="submit" className="inline-flex justify-center px-4 py-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700">
								Create
							</button>
							</span>
						</div>
					</div>
				</div>
	
			</div>
	</div>
	
	)
}

export default NewPostForm