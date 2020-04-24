
import React, { useState, useRef } from 'react'
import uuid from 'uuid'
import AnnotationScreen from '../AnnotationScreen'
import { CommentsSection } from '../Comments'
import { Comment as CommentType, Annotation, Post } from '../../types'
import { useDispatch } from 'react-redux'
import { addComment, addsubComment } from '../../store/comment/actions'

type NewPostFormProps = {
	imageToAnnotate: string
	postId: string
	onCreatePostClicked: (post: Post) => void
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
							<path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
						</svg>
					</div>}
				
				</div>
				{ validationState === 'PageNameFailedValidation' && <p className="mt-2 text-sm text-red-600" id="email-error">Page name cannot be empty.</p>}
			</div>
		)
	}

	const renderForm = () => {
		return (
			<div className="flex-shrink-0 h-full p-5 overflow-scroll w-72">
				<form>
					<div>
					<div>
						<div>
						<h3 className="flex text-lg font-medium leading-6 text-gray-900">
							<div className=''>
								New Issue
							</div>
							<span className="ml-1 inline-flex flex-shrink-0 items-center px-2.5 py-0.5 rounded-md text-sm font-medium leading-5 bg-indigo-100 text-indigo-800">
								<svg className="-ml-0.5 mr-1.5 h-2 w-2 text-indigo-400" fill="currentColor" viewBox="0 0 8 8">
									<circle cx="4" cy="4" r="3" />
								</svg>
								v 1.0.1.b
							</span>
						</h3>
						</div>
						<div className="grid grid-cols-1 row-gap-6 col-gap-4 mt-6 sm:grid-cols-6">
							{renderPageNameInput()}
				
							<div className="sm:col-span-6">
								<label htmlFor="about" className="block text-sm font-medium leading-5 text-gray-700">
								Repro Steps
								</label>
								<div className="mt-1 rounded-md shadow-sm">
								<textarea id="about" rows={3} className="block w-full transition duration-150 ease-in-out form-textarea sm:text-sm sm:leading-5"></textarea>
								</div>
								<p className="mt-2 text-sm text-gray-500">Help others reproduce the issue.</p>
							</div>
					
							
							<div className="sm:col-span-6">
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
							</div>
							</div>
						</div>
					
					<div className="mt-8 border-gray-200">
						<fieldset className="mt-6">
							<legend className="text-base font-medium text-gray-900">
							Blocking
							</legend>
							<p className="text-sm leading-5 text-gray-500">Does this issue block the release ?</p>
							<div className="mt-4">
							<div className="flex items-center">
								<input id="push_everything" name="form-input push_notifications" type="radio" className="w-4 h-4 text-indigo-600 transition duration-150 ease-in-out form-radio" />
								<label htmlFor="push_everything" className="ml-3">
								<span className="block text-sm font-medium leading-5 text-gray-700">Yes</span>
								</label>
							</div>
							<div className="flex items-center mt-4">
								<input id="push_email" name="form-input push_notifications" type="radio" className="w-4 h-4 text-indigo-600 transition duration-150 ease-in-out form-radio" />
								<label htmlFor="push_email" className="ml-3">
								<span className="block text-sm font-medium leading-5 text-gray-700">No</span>
								</label>
							</div>
							
							</div>
						</fieldset>
					
						
					</div>
					</div>
					
				</form>
			</div>
		)
	}

	const renderComments = () => {
		const _addsubComment = (childComment: CommentType, parentComment: CommentType) => {
			dispatch(addsubComment(parentComment, childComment))
		}

		if (comments.length > 0) {
			return (
				<div className='flex flex-col rounded-lg' >
					<div className='flex w-full h-8 my-1'>
						<div className='mx-auto flex flex-row p-0.5'></div>
					</div>
					<div className='relative flex flex-col w-auto p-2 overflow-scroll bg-gray-300 rounded-lg rounded-l-none' style={{height: '583px'}}>
						<CommentsSection comments={comments} addSubComent={_addsubComment} displayNewCommentBox={false} />
					</div>
				</div>
			)
		}		
	}

	const onCancelButtonClick = () => {
		props.onCancel()
	}

	const onCreateButtonClick = () => {
		if (pageNameRef.current?.value.length === 0) {
			setValidationState('PageNameFailedValidation')
			return
		}
		props.onCreatePostClicked({
			id: props.postId,
			title: 'Test',
			dateCreated: 'now',
			image: new Blob(),//b64toBlob(props.imageToAnnotate),
			projectId: '1',
			text: 'text',
			comments: comments
		})
	}

	function b64toBlob(dataURI: string) {

		var byteString = atob(dataURI.split(',')[1]);
		var ab = new ArrayBuffer(byteString.length);
		var ia = new Uint8Array(ab);
	
		for (var i = 0; i < byteString.length; i++) {
			ia[i] = byteString.charCodeAt(i);
		}
		return new Blob([ab], { type: 'image/jpeg' });
	}


	const onSubmitAnnotation = (annotation: Annotation) => {
		const commentsCopy = [...comments]
		const newComment = {
			postId: props.postId,
			authorAvatarSrc: 'newsScreenshot.png',
			text: annotation.data.text,
			id: uuid(),
			date: 'now',
			author: 'Cezbabs',
			annotation: annotation
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
			<div className='flex w-full h-8 my-1'>
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
		<div className='flex flex-col w-auto m-3 mx-auto bg-white rounded-md shadow-lg'>
			<div className='flex flex-row'> 
				{renderForm()}
				<div className='flex flex-row pr-5 my-auto border-dashed rounded-lg '>
					<div className='relative flex-col flex-shrink-0 mb-3' >
						{renderButtons()}

						<AnnotationScreen 
							annotations={annotations} 
							onSubmit={onSubmitAnnotation} 
							key={uuid()} 
							imageSrc={props.imageToAnnotate} 
						/>
					</div>
					{ renderComments() }
				</div>
			</div>
			<div className="p-5 border-t border-gray-200">
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
	)
}

export default NewPostForm