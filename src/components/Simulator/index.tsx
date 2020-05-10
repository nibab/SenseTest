import React, { useRef, useState, useEffect, forwardRef, ReactNode } from 'react'
import { AppBuild, DeviceType, deviceTypeAppetize, deviceTypePretty, Annotation, postTagToGraphQLType, Project, deviceTypeToGraphQLType } from '../../types'
import { Comment as CommentType, Post, PostTag, SubComment } from '../../types'
import { useDispatch } from 'react-redux'
import { addComment } from '../../store/comment/actions'
import { addsubComment } from '../../store/subcomment/actions'
import { getDeviceDimensions } from '../../deviceDimensions'
import Log from '../../utils/Log'
import VersionTag, { DeviceTag } from '../VersionTag'
import { useSelector } from '../../store'
import { AnalyticsClient } from '../../utils/PRAnalytics'
import Container from '../Container'
import AnnotationScreen from '../AnnotationScreen'
import uuid from 'uuid'
import { CommentsSection } from '../Comments'
import Transition from '../../utils/Transition'
import { AssetStorageClient } from '../../clients/AssetStorageClient'
import { addPost } from '../../store/post/actions'
import { DataLayerClient } from '../../clients/DataLayerClient'
import { PostStatus, DeviceType as DeviceTypeGraphQL } from '../../API'
import Button from '../Button'

type SimulatorMode = 'VIEW' | 'CREATE'

type SimulatorProps = {
	onScreenshot?: (imgSrc: string) => void
	appBuild: AppBuild
	mode: SimulatorMode
	deviceType: DeviceType
	project: Project
}

const Simulator = (props: SimulatorProps) => {
	const dispatch = useDispatch()

	const iframeRef = useRef<HTMLIFrameElement>(null)
	const [iframeLoaded, setIframeLoaded] = useState(false)
	const [iframeActive, setIframeActive] = useState(false)

	const [validationState, setValidationState] = useState<ValidationState>('None')

	const [comments, setComments] = useState<CommentType[]>([])
	const [annotations, setAnnotations] = useState<Annotation[]>([])
	const [imagePromise, setImagePromise] = useState<Promise<string>>()
	
	// Variables to be set before post creation
	const [newPostIdForCreation, setNewPostIdForCreation] = useState<string>()
	const [annotationInProgress, setAnnotationInProgress] = useState<boolean>(false)
	const [imageToAnnotate, setImageToAnnotate] = useState<Blob>()

	const throttledScreenshotCreated = useRef(false)

	// FORM INPUTS
	const [isBlocker, setIsBlocker] = useState(false)
	// Page name input
	const pageNameRef = useRef<HTMLInputElement>(null)
	// Repro steps input
	const reproStepsRef = useRef<HTMLTextAreaElement>(null)
	
	const authState = useSelector(state => state.auth)

	useEffect(() => {
        window.addEventListener("message", receiveMessage, false);
	})

	useEffect(() => {
		throttledScreenshotCreated.current = annotationInProgress
	}, [annotationInProgress])

	useEffect(() => {
		//For debugging purposes only
		//loadXHR(process.env.PUBLIC_URL + '/iphonexBlack.png').then((blob) => {console.log('yo'); setImageToAnnotate(blob)})
	}, [])

    const receiveMessage = (event: any) => {
        if(event.data && event.data.type === 'screenshot' && props.onScreenshot){
			Log.info("Received screenshot. " + event.data)
			onScreenshotCreated(event.data.data)
		}
		if(event.data === 'sessionRequested'){
			Log.info("Received first frame. " + event.data)
			setTimeout(() => setIframeActive(true), 100)
        }
	}
	
	const onScreenshotCreated = (data: string) => {
		// Using a throttled value to check since onScreenshotCreated gets called a gazillion times in between renders
		// which results in annotationInProgress to be continously false when we had set it to true...
		if (throttledScreenshotCreated.current === false) {
			const imageBlob = b64toBlob(data)
			setImageToAnnotate(imageBlob)
			setNewPostIdForCreation(uuid())
			setAnnotationInProgress(true)
			setImagePromise(createImagePromise(imageBlob, props.project.id))
			setEmbeddedAnnotationState('Annotate')
		}
	}

	const onCancel = () => {
		setEmbeddedAnnotationState('Annotate')
		setImageToAnnotate(undefined)
		setAnnotationInProgress(false)
		setComments([])
		setAnnotations([])
		setImagePromise(undefined)
	}

	const onCreatePostClicked = async (imageId: string, post: Post) => {
        dispatch(addPost(post))

        const newPost = await DataLayerClient.createNewAnnotationPost(post.image as Blob, {
            id: post.id,
            title: post.title,
            imageId: imageId,
            projectId: post.projectId,
            text: post.text.length === 0 ? 'none provided' : post.text,
            status: PostStatus.OPEN,
            tags: post.tags === undefined ? [] : post.tags.map(postTag => postTagToGraphQLType(postTag)),
            appBuildId: post.appBuildId,
            deviceType: deviceTypeToGraphQLType(props.deviceType)      
        })

        AnalyticsClient.record('CREATED_ISSUE', authState)

        post.comments?.forEach(async (comment) => {
            await DataLayerClient.createCommentForPost(newPost, comment)
		})
		
		onCancel()
    }


    const onScreenshotButtonClick = () => {    
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
				<DeviceTag deviceType={props.deviceType}/>
				<div className='pl-2'> 
					<VersionTag appBuild={props.appBuild} />
				</div>
				
			</>
		)
	}

	const renderButtons = () => {
		const renderCreateModeButtons = () => {
			return (
				<>
					<span className="flex w-full -mt-3 rounded-md shadow-sm sm:ml-3 sm:w-auto">
						<Button buttonClass='SECONDARY' onClick={() => {onScreenshotButtonClick()}}>
							<div className='text-indigo-600'>
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 mr-2 fill-current icon-click-target "><path className="" d="M21.97 12.73c-.25-.22-.56-.4-.92-.54L20 11.8a8 8 0 1 0-8.2 8.2l.4 1.06c.12.36.3.67.53.92a10 10 0 1 1 9.25-9.25zm-10.95 5.19a6 6 0 1 1 6.9-6.9l-2.39-.9a4 4 0 1 0-5.41 5.41l.9 2.39z"/><path className="secondary" d="M17.96 16.54l3.75 3.75a1 1 0 0 1-1.42 1.42l-3.75-3.75-.57 2.28a1 1 0 0 1-1.9.11l-3-8a1 1 0 0 1 1.28-1.29l8 3a1 1 0 0 1-.1 1.91l-2.3.57z"/></svg>
							</div>
							Annotate
						</Button>
						
					</span>
				</>
			)
		}

		return (<>
			{ props.mode === 'CREATE' && 
			<Transition
				show={!annotationInProgress && iframeActive}
				enter="ease-in duration-100"
				enterFrom="opacity-0 h-0"
				enterTo="opacity-100 h-full"
				leave="ease-in duration-200"
				leaveFrom="h-full opacity-100"
				leaveTo="h-0 opacity-0"
			>
				<div className='flex w-full p-2'>
					<div className='flex mx-auto'>
						{
							renderCreateModeButtons()
						}					
					</div>
				</div>
			</Transition>
			}
		</>)
	}

	const renderScreenshotButtons = () => {
		const onCreateButtonClick = async () => {
			const pageName = pageNameRef.current?.value
			const reproSteps = reproStepsRef.current?.value
			if (pageName?.length === 0) {
				setValidationState('PageNameFailedValidation')
				return
			}
			const tagArray: PostTag[] = []
			if (isBlocker) tagArray.push('BLOCKER')
			const imageId = await imagePromise
			// If there are any other tags, add them here.
			onCreatePostClicked(imageId!, {
				id: newPostIdForCreation!,
				title: pageName!,
				dateCreated: (new Date()).toISOString(),
				image: imageToAnnotate!,
				projectId: props.project.id,
				text: reproSteps ? reproSteps : '',
				comments: comments,
				tags: tagArray,
				appBuildId: props.appBuild.id,
				deviceType: props.deviceType
			})
		}

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
				<div className="flex flex-row w-full p-3 bg-gray-200">
					<div className='w-full my-auto font-mono font-bold'>
						New Annotation
					</div>
					<div className='flex flex-row'>	
						<span className="flex w-full mt-3 rounded-md shadow-sm sm:mt-0 sm:w-auto">
							<Button onClick={() => onCancel()} buttonClass={'SECONDARY'}>
							Cancel
							</Button>
						</span>
						<span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
							{ embeddedAnnotationState === 'Annotate' && <Button onClick={() => setEmbeddedAnnotationState('Submit')} buttonClass={'PRIMARY'}>
								Next
							</Button> }
							{ embeddedAnnotationState === 'Submit' && <Button onClick={() => onCreateButtonClick()} buttonClass={'PRIMARY'}>
								Submit
							</Button> }
						</span>
					</div>
					
					
				</div>
			</Transition>
		)
	}

	const iFrameLoaded = () => {
		setTimeout(() => setIframeLoaded(true), 300)
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
				<label htmlFor="city" className="block font-mono text-xs font-medium leading-5 text-gray-700">
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
						<span onClick={() => setIsBlocker(true)} className="cursor-pointer border border-gray-400 border-dashed rounded inline-flex items-center px-2 py-0.5 rounded text-xs font-medium leading-4  text-gray-600">
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
				<legend className="font-mono text-xs font-medium leading-5 text-gray-700 ">
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


	const renderComments = () => {
		const _addsubComment = (childComment: SubComment, parentComment: CommentType) => {
			dispatch(addsubComment(parentComment, childComment))
		}

		if (comments.length === 0) {
			return (
				<div className='flex-col rounded-lg ' >
					<div className='relative flex-col py-2 pr-2 overflow-scroll rounded-lg rounded-l-none' style={{height: getDeviceDimensions(props.deviceType!).height}}>
						<div className='w-64 p-3 my-auto text-center border border-dashed rounded-lg bg-gray-50'>
							<div className='font-bold text-gray-400'>Your annotations will show up here. Click anywhere on the image to create a new annotation.</div> 
						</div>
					</div>
				</div>
			)
		} else {
			return (
				<div className='flex flex-col rounded-lg' >
					<div className='relative flex flex-col w-auto py-2 pr-2 overflow-scroll rounded-lg rounded-l-none' style={{height: getDeviceDimensions(props.deviceType!).height}}>
						<CommentsSection comments={comments} addSubComent={_addsubComment} displayNewCommentBox={false} />
					</div>
				</div>
			)
		}
	}

	const renderForm = () => {
		return (
			
			<div className="flex-shrink-0 h-full p-3 overflow-scroll w-96">
				<form className='ml-1'>
					<div>
						<div>
							<div className="grid grid-cols-1 row-gap-6 col-gap-4 sm:grid-cols-6">
								{renderPageNameInput()}
					
								<div className="sm:col-span-6">
									<label htmlFor="repro" className="block font-mono text-xs font-medium leading-5 text-gray-700">
									Repro Steps
									</label>
									<div className="mt-1 rounded-md shadow-sm">
										<textarea id="repro" ref={reproStepsRef} rows={10} className="block w-full transition duration-150 ease-in-out form-textarea sm:text-sm sm:leading-5"></textarea>
									</div>
									<p className="mt-2 font-mono text-xs text-gray-500">Help others reproduce the issue.</p>
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
			<>
				{ imageToAnnotate &&  <AnnotationScreen 
					deviceType={props.deviceType}
					annotations={annotations} 
					onSubmit={onSubmitAnnotation} 
					key={'1'} 
					imageBlob={imageToAnnotate} 
				/>}
			</>
		)
	}
	
	const renderLoadingScreen = () => {
		const buttonClassName = "p-3 px-6 mt-3 font-extrabold text-gray-800 bg-yellow-300 rounded-md cursor-pointer text-md hover:bg-yellow-200"
		
		return (
			<>
				<div className='absolute z-0 w-full h-full '>
					<img className="w-full h-full " src={process.env.PUBLIC_URL + '/iphonexBlack.png'}></img>
				</div>
				<div className='absolute z-10 flex w-full h-full'>
					<div className='flex flex-col mx-auto my-auto '>
						<div className='w-full'>
							<img className="w-20 h-20 mx-auto rounded-lg" src={process.env.PUBLIC_URL + '/appIcon.png'} alt="" />
						</div>
						{ iframeLoaded && <div onClick={(e) => onPlayButtonClick(e) } className={buttonClassName}> Start Application</div>}
						{ !iframeLoaded && <div className={"mt-5 spinner"}> </div>}					
					</div>
				</div>	
			</>
		)
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

	const [embeddedAnnotationState, setEmbeddedAnnotationState] = useState<EmbeddedAnnotationState>('Annotate')

	return (
		<Container header={ annotationInProgress? renderScreenshotButtons() : renderButtons() } tags={renderTag()}>
			<div className='relative flex flex-row rounded-lg' style={getDeviceDimensions(props.deviceType)} >
				<div className='absolute z-10' >
					{ renderScreen() }
				</div>
				<EmbeddedPostCreator 
					show={annotationInProgress}
					annotationScreen={renderAnnotationScreen()}
					postCreationForm={renderForm()}
					commentsSection={renderComments()}
					state={embeddedAnnotationState}
					deviceType={props.deviceType}
				></EmbeddedPostCreator>
			</div>
		</Container>
	)
}

type EmbeddedAnnotationState = 'Annotate' | 'Submit' | 'None'
type ValidationState = 'PageNameFailedValidation' | 'None'

type EmbeddedPostCreatorProps = {
	annotationScreen: ReactNode
	commentsSection: ReactNode
	postCreationForm: ReactNode
	show: boolean
	state: EmbeddedAnnotationState
	deviceType: DeviceType
}

const EmbeddedPostCreator = (props: EmbeddedPostCreatorProps) => {
	return (
		<div className='z-40 overflow-scroll bg-gray-300'>
			<Transition show={ props.show && props.state === 'Annotate'}>
				<div className='relative bg-gray-300'>
					<div className='relative flex flex-row'>
						<Transition
							enter="ease-in duration-100"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<div className="z-50" style={{ width: getDeviceDimensions(props.deviceType!).minWidth}}>
								{ props.annotationScreen }
							</div>	
						</Transition>
						<Transition
							enter="ease-in duration-100"
							enterFrom="w-0 opacity-0"
							enterTo=" w-64 opacity-100"
							leave="ease-in duration-200"
							leaveFrom=" w-64 opacity-100"
							leaveTo="w-0 opacity-0"
						>
							{ props.commentsSection }
						</Transition>	
					</div>
				</div>
			</Transition>
			<Transition 
				show={  props.show && props.state === 'Submit' }
				leave="ease-out duration-300"
				leaveFrom="opacity-100"
				leaveTo="opacity-0 w-0"
			>
				<div className='relative'>
					<div className='relative flex flex-row overflow-scroll'>
						<Transition 
							enter="ease-in duration-100"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="ease-out duration-300"
							leaveFrom="opacity-100"
							leaveTo="opacity-0 w-0"
						>
							{ props.postCreationForm }
						</Transition>
					</div>
				</div>
			</Transition>	
		</div>
	)
}

const createImagePromise = (image: Blob, projectId: string): Promise<string> => {
	return new Promise((resolve, reject) => {
		const imageId = uuid()
		AssetStorageClient.createUploadUrl(imageId, projectId).then((presignedUrlFields) => {
			Log.info("Presigned url for get " + presignedUrlFields)
			return AssetStorageClient.uploadDataToUrl(image, presignedUrlFields)
		}).then(() => {
			resolve(imageId)
		}).catch(() => {
			Log.error("Something happened during image upload.", "CreatePostView")
		})
	})
	
}

// For debugging purposes
function loadXHR(url: string): Promise<Blob> {

	return new Promise(function(resolve, reject) {
		try {
			var xhr = new XMLHttpRequest();
			xhr.open("GET", url);
			xhr.responseType = "blob";
			xhr.onerror = function() {reject("Network error.")};
			xhr.onload = function() {
				if (xhr.status === 200) {resolve(xhr.response)}
				else {reject("Loading error:" + xhr.statusText)}
			};
			xhr.send();
		}
		catch(err) {reject(err.message)}
	});
}

// Util for base64 string to Blob conversion
function b64toBlob(dataURI: string): Blob {
	var byteString = atob(dataURI.split(',')[1]);
	var ab = new ArrayBuffer(byteString.length);
	var ia = new Uint8Array(ab);

	for (var i = 0; i < byteString.length; i++) {
		ia[i] = byteString.charCodeAt(i);
	}
	return new Blob([ab], { type: 'image/jpeg' });
}

export default Simulator