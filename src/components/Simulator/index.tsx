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
			</>
		)
	}

	const renderButtons = () => {
		const buttonIFrameActive = "whitespace-no-wrap mr-1 w-auto inline-flex items-center px-2.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"
		const buttonIFrameInActive = "cursor-not-allowed whitespace-no-wrap mr-1 w-auto inline-flex items-center px-2.5 border border-gray-300 text-xs font-medium rounded text-gray-600 bg-gray-300 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"

		const renderCreateModeButtons = () => {
			return (
				<>
					<button disabled={!iframeActive} onClick={(e) => onScreenshotButtonClick(e)} className={iframeActive ? buttonIFrameActive: buttonIFrameInActive}>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 mx-auto mr-1 icon-camera"><path className="primary" d="M6.59 6l2.7-2.7A1 1 0 0 1 10 3h4a1 1 0 0 1 .7.3L17.42 6H20a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8c0-1.1.9-2 2-2h2.59zM19 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-7 8a5 5 0 1 0 0-10 5 5 0 0 0 0 10z"/><path className="secondary" d="M12 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/></svg>
						Screenshot
					</button>
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
			<>
				{
					props.mode === 'CREATE' ? renderCreateModeButtons() : renderViewModeButtons()
				}					
			</>
		)
	}

	const iFrameLoaded = () => {
		//iframeRef.current?.contentWindow?.postMessage('requestSession', '*');
		setTimeout(() => setIframeLoaded(true), 300)
	}
	
	const renderLoadingScreen = () => {
		const buttonClassName = "p-3 px-6 mt-3 font-extrabold text-gray-800 bg-yellow-300 rounded-md cursor-pointer text-md hover:bg-yellow-200"
		

		return (<>
			<div className='absolute z-0 w-full h-full'>
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
			<div className='flex-col flex-shrink-0 w-64 mx-auto' style={getDeviceDimensions(props.deviceType)}> 
				
				<div className='relative flex object-contain w-full h-full'>
					{ !iframeActive ? renderLoadingScreen() : <></> }
					
					<iframe 
						onLoad={() => iFrameLoaded()} 
						ref={iframeRef}
						src={`https://appetize.io/embed/${props.appBuild.appetizeKey}?device=${deviceTypeAppetize(props.deviceType)}&scale=${scale}&autoplay=false&orientation=portrait&deviceColor=black&xdocMsg=true`} width="100%" height="100%" frameBorder="0" scrolling="no"></iframe>
				</div>							
			</div>
		)
	}

	const renderTags = () => {

	}

	const renderComments = () => {
		const _addsubComment = (childComment: SubComment, parentComment: CommentType) => {
			dispatch(addsubComment(parentComment, childComment))
		}

		if (comments.length > 0) {
			return (
				<div className='flex flex-col rounded-lg' >
					{annotations.length === 0 && <div className='flex w-full h-8'>
						<div className='mx-auto flex flex-row p-0.5'></div>
					</div> }
					<div className='relative flex flex-col w-auto py-2 pr-2 overflow-scroll bg-gray-300 rounded-lg rounded-l-none' style={{height: '583px'}}>
						<CommentsSection comments={comments} addSubComent={_addsubComment} displayNewCommentBox={false} />
					</div>
				</div>
			)
		}		
	}

	const [annotations, setAnnotations] = useState<Annotation[]>([])
	const [newPostIdForCreation, setNewPostIdForCreation] = useState<string>()
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

	const renderAnnotationInProgress = () => {
		return (
			<>
			<div className='z-30'>
				{ renderAnnotationScreen() }
			</div>
			
			{ renderComments() }
			</>
		)
	}

	return (
		<Container header={renderButtons()} tags={renderTag()}>
			<div className='flex flex-row bg-gray-300 rounded-lg'>
				<div className='z-30'>
					{ !annotationInProgress && renderScreen() }
				</div>
				{ annotationInProgress &&  renderAnnotationInProgress()}
				</div>

			{/* { annotationInProgress &&  renderAnnotationInProgress()} */}
		</Container>
	)
}

export default Simulator