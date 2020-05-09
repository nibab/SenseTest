import React, { useRef, useState, useEffect } from 'react'
import { AppBuild, DeviceType, deviceTypeAppetize, deviceTypePretty, Annotation } from '../../types'
import { Comment as CommentType, Post, PostTag, SubComment } from '../../types'
import { useDispatch } from 'react-redux'
import { addComment } from '../../store/comment/actions'
import { addsubComment } from '../../store/subcomment/actions'

import { getDeviceDimensions } from '../../deviceDimensions'
import Log from '../../utils/Log'
import VersionTag from '../VersionTag'
import { useSelector } from '../../store'
import { AnalyticsClient } from '../../utils/PRAnalytics'
import Container from '../Container'
import AnnotationScreen from '../AnnotationScreen'
import uuid from 'uuid'
import { CommentsSection } from '../Comments'
import Transition from '../../utils/Transition'

type SimulatorMode = 'VIEW' | 'CREATE'

type SimulatorProps = {
	onScreenshot?: (imgSrc: string) => void
	appBuild: AppBuild
	mode: SimulatorMode
	deviceType: DeviceType

}

const Simulator = (props: SimulatorProps) => {
	const [comments, setComments] = useState<CommentType[]>([])
	const iframeRef = useRef<HTMLIFrameElement>(null)
	const [iframeLoaded, setIframeLoaded] = useState(false)
	const [iframeActive, setIframeActive] = useState(false)
	const authState = useSelector(state => state.auth)
	const [annotationInProgress, setAnnotationInProgress] = useState<boolean>(false)

	const [imageToAnnotate, setImageToAnnotate] = useState<Blob>()

	useEffect(() => {
        window.addEventListener("message", receiveMessage, false);
    })

    const receiveMessage = (event: any) => {



        if(event.data && event.data.type === 'screenshot' && props.onScreenshot){
			Log.info("Received screenshot. " + event.data)
			onScreenshotCreated(event.data.data)

			//props.onScreenshot(event.data.data)
		}
		if(event.data === 'sessionRequested'){
			Log.info("Received first frame. " + event.data)
			setTimeout(() => setIframeActive(true), 100)
        }
	}
	
	const onScreenshotCreated = (data: string) => {
		function b64toBlob(dataURI: string): Blob {

			var byteString = atob(dataURI.split(',')[1]);
			var ab = new ArrayBuffer(byteString.length);
			var ia = new Uint8Array(ab);
		
			for (var i = 0; i < byteString.length; i++) {
				ia[i] = byteString.charCodeAt(i);
			}
			return new Blob([ab], { type: 'image/jpeg' });
		}

		
		setImageToAnnotate(b64toBlob(data))
		setNewPostIdForCreation(uuid())
		setAnnotationInProgress(true)

	}

    const onScreenshotButtonClick = (event: any) => {    
		AnalyticsClient.record('TOOK_SIMULATOR_SCREENSHOT', authState)		
        iframeRef.current?.contentWindow?.postMessage('getScreenshot', '*')
	}
	
	const onPlayButtonClick = (event: any) => {
		AnalyticsClient.record('STARTED_SIMULATOR_ON_CREATE_PAGE', authState)
		iframeRef.current?.contentWindow?.postMessage('requestSession', '*')
	}


	const renderTag = () => {
		return (
			<>
				{/* <span className="inline-flex items-center text-sm px-2.5 py-0.5 rounded-md text-sm font-extrabold leading-5 bg-gray-200  text-gray-800">
					Simulator	
				</span> */}
				<span className="inline-flex items-center text-sm px-2.5 py-0.5 rounded-md text-sm font-extrabold leading-5 bg-gray-900  text-gray-100">
					{deviceTypePretty(props.deviceType)}
				</span>
				<div className='pl-2'> 
					<VersionTag appBuild={props.appBuild} />
				</div>
				<span className="flex w-full mt-3 rounded-md shadow-sm sm:mt-0 sm:w-auto">
						<button onClick={() => setAnnotationInProgress(!annotationInProgress)} type="button" className="inline-flex justify-center w-full px-4 py-2 text-base font-medium leading-6 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline sm:text-sm sm:leading-5">
						toggle
						</button>
					</span>
					
			</>
		)
	}

	const renderButtons = () => {
		const buttonIFrameActive = "whitespace-no-wrap mr-1 w-auto inline-flex items-center px-2.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"
		const buttonIFrameInActive = "cursor-not-allowed whitespace-no-wrap mr-1 w-auto inline-flex items-center px-2.5 border border-gray-300 text-xs font-medium rounded text-gray-600 bg-gray-300 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"

		const renderCreateModeButtons = () => {
			return (
				<>
					<span className="flex w-full -mt-3 rounded-md shadow-sm sm:ml-3 sm:w-auto">
						<button onClick={() => setRenderAnnotationComments(true)} type="button" className="inline-flex justify-center w-full px-4 py-2 text-base font-medium leading-6 text-indigo-800 transition duration-150 ease-in-out bg-indigo-100 border border-transparent rounded-md shadow-sm hover:bg-indigo-100 focus:outline-none focus:border-indigo-100 focus:shadow-outline-indigo sm:text-sm sm:leading-5">
						Annotate
						</button>
					</span>
					{/* <button disabled={!iframeActive}  className={buttonIFrameInActive}>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 mx-auto mr-1 icon-videocam"><path className="secondary" d="M13.59 12l6.7-6.7A1 1 0 0 1 22 6v12a1 1 0 0 1-1.7.7L13.58 12z"/><rect width="14" height="14" x="2" y="5" className="primary" rx="2"/></svg>
						Record
					</button> */}
				</>
			)
		}

		const renderViewModeButtons = () => {
			return (
				<button disabled={!iframeActive} className={iframeActive ? buttonIFrameActive: buttonIFrameInActive}>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 mr-1 icon-view-visible"><path className="primary" d="M17.56 17.66a8 8 0 0 1-11.32 0L1.3 12.7a1 1 0 0 1 0-1.42l4.95-4.95a8 8 0 0 1 11.32 0l4.95 4.95a1 1 0 0 1 0 1.42l-4.95 4.95zM11.9 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10z"/><circle cx="12" cy="12" r="3" className="secondary"/></svg>
					Visual diff
				</button>
			)
		}

		return (
			<div className='flex w-full p-2'>
				<div className='flex mx-auto'>
					{
						props.mode === 'CREATE' ? renderCreateModeButtons() : renderViewModeButtons()
					}					
				</div>
			</div>
		)
	}

	const renderScreenshotButtons = () => {
		return (
			<Transition
				show={annotationInProgress}
				enter="ease-in duration-100"
				enterFrom="opacity-0 h-0"
				enterTo="opacity-100 h-full"
				leave="ease-in duration-200"
				leaveFrom="h-full opacity-100"
				leaveTo="h-0 opacity-0"
			>
				<div className="flex flex-row w-full p-2 bg-gray-200">
					<div className='w-full my-auto font-mono font-bold'>
						New Annotation
					</div>
					<div className='flex flex-row'>	
						<span className="flex w-full mt-3 rounded-md shadow-sm sm:mt-0 sm:w-auto">
							<button onClick={() => setEmbeddedAnnotationState('Annotate')} type="button" className="inline-flex justify-center w-full px-4 py-2 text-base font-medium leading-6 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline sm:text-sm sm:leading-5">
							Cancel
							</button>
						</span>
						<span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
							<button onClick={() => setEmbeddedAnnotationState('Submit')} type="button" className="inline-flex justify-center w-full px-4 py-2 text-base font-medium leading-6 text-indigo-800 transition duration-150 ease-in-out bg-indigo-100 border border-transparent rounded-md shadow-sm hover:bg-indigo-100 focus:outline-none focus:border-indigo-100 focus:shadow-outline-indigo sm:text-sm sm:leading-5">
							Next
							</button>
						</span>
					</div>
					
					
				</div>
			</Transition>
		)
	}



	const iFrameLoaded = () => {
		//iframeRef.current?.contentWindow?.postMessage('requestSession', '*');
		setTimeout(() => setIframeLoaded(true), 300)
	}
	
	const renderLoadingScreen = () => {
		const buttonClassName = "p-3 px-6 mt-3 font-extrabold text-gray-800 bg-yellow-300 rounded-md cursor-pointer text-md hover:bg-yellow-200"
		

		return (<>
			<div className='absolute z-0 w-full h-full bg-red-400'>
				<img className="object-contain w-full h-full" src={process.env.PUBLIC_URL + '/iphonexBlack.png'}></img>
			</div>
			<div className='absolute z-10 flex w-full h-full'>
				<div className='flex flex-col mx-auto my-auto '>
					<div className='w-full'>
						<img className="w-20 h-20 mx-auto rounded-lg" src={process.env.PUBLIC_URL + '/appIcon.png'} alt="" />
					</div>

					{ iframeLoaded && <div onClick={(e) => onPlayButtonClick(e) } className={buttonClassName}> Start Application</div>}
					{ !iframeLoaded && <div className={"mt-5 spinner"}> </div>}
					
					{/* <div onClick={(e) => onPlayButtonClick(e) } className={iframeLoaded ? buttonClassName: 'spinner'}> Start Application</div> */}
				</div>
				
			</div>	
		</>)
	}


	const renderScreen = () => {
		const scale = getDeviceDimensions(props.deviceType).scale ? getDeviceDimensions(props.deviceType).scale : '69'
		return (
			<div className='relative flex-col flex-shrink-0 w-64 mx-auto' style={getDeviceDimensions(props.deviceType)}> 
				
				<div className='flex object-contain w-full h-full'>
					{ !iframeActive ? renderLoadingScreen() : <></> }
					
					<iframe
						className='' 
						onLoad={() => iFrameLoaded()} 
						ref={iframeRef}
						src={`https://appetize.io/embed/${props.appBuild.appetizeKey}?device=${deviceTypeAppetize(props.deviceType)}&scale=${scale}&autoplay=false&orientation=portrait&deviceColor=black&xdocMsg=true`} width="100%" height="100%" frameBorder="0" scrolling="no"></iframe>
				</div>							
			</div>
		)
	}

	const [annotations, setAnnotations] = useState<Annotation[]>([])
	const [newPostIdForCreation, setNewPostIdForCreation] = useState<string>()
	const [renderAnnotationComments, setRenderAnnotationComments] = useState(false)
	const dispatch = useDispatch()

	const onSubmitAnnotation = (annotation: Annotation) => {
		const commentsCopy = [...comments]
		const newComment: CommentType = {
			postId: newPostIdForCreation!,
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

	const renderAnnotationScreen = () => {
		return (

			<AnnotationScreen 
				deviceType={props.deviceType}
				annotations={annotations} 
				onSubmit={onSubmitAnnotation} 
				//key={props.projectId} 
				imageBlob={imageToAnnotate!} 
			/>
		)
	}

	const [embeddedAnnotationState, setEmbeddedAnnotationState] = useState<EmbeddedAnnotationState>('Annotate')

	return (
		<Container header={annotationInProgress ? renderScreenshotButtons(): renderButtons() } tags={renderTag()}>
			<div className='relative flex flex-row rounded-lg' style={getDeviceDimensions(props.deviceType)} >
				<Transition
					show={!annotationInProgress}
					enter="ease-in duration-0"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-100"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className='absolute z-30' >
						{ renderScreen() }
					</div>
				</Transition>
				<EmbeddedAnnotation show={annotationInProgress} deviceType={props.deviceType} state={embeddedAnnotationState} />
				</div>

			{/* { annotationInProgress &&  renderAnnotationInProgress()} */}
		</Container>
	)
}

type EmbeddedAnnotationState = 'Annotate' | 'Submit'
type ValidationState = 'PageNameFailedValidation' | 'None'

type EmbeddedAnnotationProps = {
	show: boolean
	deviceType: DeviceType
	state: EmbeddedAnnotationState
}

const EmbeddedAnnotation = (props: EmbeddedAnnotationProps) => {
	const dispatch = useDispatch()
	const [comments, setComments] = useState<CommentType[]>([])

	// Page name input
	const pageNameRef = useRef<HTMLInputElement>(null)
	// Repro steps input
	const reproStepsRef = useRef<HTMLTextAreaElement>(null)

	const [validationState, setValidationState] = useState<ValidationState>('None')

	const [isBlocker, setIsBlocker] = useState(false)

	const renderComments = () => {
		const _addsubComment = (childComment: SubComment, parentComment: CommentType) => {
			dispatch(addsubComment(parentComment, childComment))
		}

		if (comments.length === 0) {
			return (
				<div className='flex-col rounded-lg ' >
					{/* {annotations.length === 0 && <div className='flex w-full h-8'>
						<div className='mx-auto flex flex-row p-0.5'></div>
					</div> } */}
					<div className='relative flex-col py-2 pr-2 overflow-scroll rounded-lg rounded-l-none' style={{height: getDeviceDimensions(props.deviceType!).height}}>
						{/* <CommentsSection comments={comments} addSubComent={_addsubComment} displayNewCommentBox={false} /> */}
						<div className='w-64 p-3 my-auto text-center border border-dashed rounded-lg bg-gray-50'>
							<div className='font-bold text-gray-400'>Your annotations will show up here. Click anywhere on the image to create a new annotation.</div> 
						</div>
					</div>
				</div>
			)
		} else {
			return (
				<div className='flex flex-col rounded-lg' >
					{/* {annotations.length === 0 && <div className='flex w-full h-8'>
						<div className='mx-auto flex flex-row p-0.5'></div>
					</div> } */}
					<div className='relative flex flex-col w-auto py-2 pr-2 overflow-scroll rounded-lg rounded-l-none' style={{height: getDeviceDimensions(props.deviceType!).height}}>
						<CommentsSection comments={comments} addSubComent={_addsubComment} displayNewCommentBox={false} />
					</div>
				</div>
			)
		}
	}

	const renderAnnotate = () => {

		const renderScreen = () => {
			return (
				<div className='z-30'>
					<div className='relative flex flex-shrink-0 object-contain w-full rounded-lg rounded-r-none' style={getDeviceDimensions(props.deviceType!)}>
						<div className='z-30 mx-auto my-auto bg-orange-300 spinner' style={{width: '92.1%', height: '96.5%', borderRadius: '2.2rem'}}>
						</div>
					</div>
				</div>
			)
		}

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
				
				<div className="z-30 flex-shrink-0 h-full p-3 overflow-scroll w-72">
					<form className='ml-1'>
						<div>
							<div>
								<div className="grid grid-cols-1 row-gap-6 col-gap-4 sm:grid-cols-6">
									{renderPageNameInput()}
						
									<div className="sm:col-span-6">
										<label htmlFor="repro" className="block text-sm font-medium leading-5 text-gray-700">
										Repro Steps
										</label>
										<div className="mt-1 rounded-md shadow-sm">
											<textarea id="repro" ref={reproStepsRef} rows={10} className="block w-full transition duration-150 ease-in-out form-textarea sm:text-sm sm:leading-5"></textarea>
										</div>
										<p className="mt-2 text-sm text-gray-500">Help others reproduce the issue.</p>
									</div>	
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

		return (
			<div className='relative'>
				<Transition
					show={props.show}
					enter="ease-in duration-100"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom=" w-64 opacity-100"
					leaveTo="w-0 opacity-0"
				>
		
					<div className='absolute z-30 w-full h-full bg-gray-300 '></div>
				</Transition>
				<div className='relative flex flex-row'>
					<Transition
						show={props.show && props.state === 'Submit'}
						enter="ease-in duration-100"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100 h-64"
						leaveTo="opacity-0 h-0"
					>
						<div className="absolute w-96">
							{ renderForm() }
						</div>
						
					</Transition>

					<Transition
						show={props.show && props.state === 'Annotate'}
						enter="ease-in duration-100"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						{ renderScreen() }
						
					</Transition>

					<Transition
						show={props.show && props.state=== 'Annotate'} 
						enter="ease-in duration-100"
						enterFrom="w-0 opacity-0"
						enterTo=" w-64 opacity-100"
						leave="ease-in duration-200"
						leaveFrom=" w-64 opacity-100"
						leaveTo="w-0 opacity-0"
					>
						{renderComments()}
					</Transition>	
				</div>
			</div>
		)
	}

	return (renderAnnotate())
	
}

export default Simulator