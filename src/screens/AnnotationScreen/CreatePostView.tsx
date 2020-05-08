import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from '../../store'
import { PostStatus, DeviceType } from '../../API'
import { DataLayerClient } from '../../clients/DataLayerClient'
import { addPost } from '../../store/post/actions'
import uuid, { v4 as uuidv4 } from "uuid"
import CreatePostViewSimulator from '../../components/Simulator/CreatePostViewSimulator'
import NewPostForm from '../../components/NewPostModal'
import { Post, postTagToGraphQLType, AppBuild, Project } from '../../types'
import { AssetStorageClient } from '../../clients/AssetStorageClient'
import Log from '../../utils/Log'
import { AppBuildClient } from '../../clients/AppBuildClient'
import { AnalyticsClient } from '../../utils/PRAnalytics'
import NewPostModal from '../../components/NewPostModal'

type Mode = 'CREATE_ISSUE' | 'BROWSE'

type CreatePostViewProps = {
    project: Project
}

const CreatePostView = (props: CreatePostViewProps) => {
    const [currentMode, setCurrentMode] = useState<Mode>('BROWSE')
    const [imageToAnnotate, setImageToAnnotate] = useState<Blob>()
    const [currentAppBuild, setCurrentAppBuild] = useState<AppBuild>()
    const authState = useSelector(state => state.auth)
    
    const dispatch = useDispatch()
    // Hardcoded projectId
    const projectId = props.project.id

    useEffect(() => {
        // DEBUG
        // loadXHR(process.env.PUBLIC_URL + '/iphonexBlack.png').then((blob) => {console.log('yo'); setImageToAnnotate(blob)})
        AppBuildClient.getCurrentAppBuildForProjectId(projectId).then((appBuild) => setCurrentAppBuild(appBuild))
    }, [])

    const onCreatePostClicked = async (imageId: string, post: Post) => {
        setCurrentMode('BROWSE')
        dispatch(addPost(post))

        const newPost = await DataLayerClient.createNewAnnotationPost(post.image as Blob, {
            id: post.id,
            title: post.title,
            imageId: imageId,
            projectId: post.projectId,
            text: post.text.length === 0 ? 'none provided' : post.text,
            status: PostStatus.OPEN,
            tags: post.tags === undefined ? [] : post.tags.map(postTag => postTagToGraphQLType(postTag)),
            appVersion: post.appVersion,
            deviceType: DeviceType.IPHONE_X      
        })

        AnalyticsClient.record('CREATED_ISSUE', authState)

        post.comments?.forEach(async (comment) => {
            await DataLayerClient.createCommentForPost(newPost, comment)
        })
    }

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

    function b64toBlob(dataURI: string): Blob {

        var byteString = atob(dataURI.split(',')[1]);
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
    
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: 'image/jpeg' });
    }

    const createImagePromise = (image: Blob): Promise<string> => {
        return new Promise((resolve, reject) => {
            const imageId = uuidv4()
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

    // const renderAppetizeScreen = () => {
    //     return (
    //         <div className='relative flex-col flex-shrink-0 w-64 h-full mb-3 ml-3' style={{height: '583px', width: '282px'}}>
    //             <iframe onLoad={() => iFrameLoaded()} ref={iframeRef} src="https://appetize.io/embed/fczxctdk32wb17vabzd3k2wq9w?device=iphonex&scale=69&autoplay=false&orientation=portrait&deviceColor=black&xdocMsg=true" width="100%" height="100%" frameBorder="0" scrolling="no"></iframe>
    //         </div>
    //     )
    // }

    // const getBase64ImageOfCanvas = (): string | null => {
    //     if (!canvasRef.current) {
    //         return null
    //     }
    //     const canvas: HTMLCanvasElement = canvasRef.current;
    //     const context = canvas.getContext('2d');
    //     if (context) {
    //         var dataURL = canvas.toDataURL("image/png");
    //         return dataURL
    //     } else {
    //         return null
    //     }
    // }

    // const getBlobFromCanvas = (): Promise<Blob> => {
    //     return new Promise((resolve, reject) => {
    //         const currentCanvas = canvasRef.current
    //         if (currentCanvas !== undefined && currentCanvas !== null) {
    //             const context = currentCanvas.getContext('2d');
    //             if (context) {
    //                 currentCanvas.toBlob((blob) => {
    //                     if (blob !== null) {
    //                         resolve(blob)
    //                     }
    //                     reject()
    //                 }, "image/png");                    
    //             } else {
    //                 reject()
    //             }
    //         } else {
    //             reject()
    //         }
    //     })
    // }

    const renderPostToolBar = () => {
		const buttonContainerClassName = 'w-full flex flex-col'
		const buttonClassName = 'focus:outline-none active:shadow-sm active:bg-gray-300 w-10 h-10 rounded-full mx-auto'
		const unSelectedButtonClassName = 'bg-white shadow-lg border-gray-400 ' + ' ' + buttonClassName
		const selectedButtonClassName = 'bg-gray-200' + ' ' + buttonClassName

		// const handleButtonClick = (state: DisplayState) => {
		// 	if (state === displayState) {
		// 		setDisplayState('None')
		// 	} else {
		// 		setDisplayState(state)
		// 	}
		// }

		return (
            <div className='mx-auto'>
                 <div className='flex flex-row w-48 p-2 my-auto mr-3'>
                    <div className={buttonContainerClassName}>
                        <button className={unSelectedButtonClassName} style={{borderWidth: '1px'}}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 mx-auto icon-device-smartphone"><path className="primary" d="M8 2h8a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4c0-1.1.9-2 2-2z"/><path className="secondary" d="M12 20a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/></svg>
                        </button>
                        <a className="text-xs font-semibold text-center text-gray-900 " style={{fontSize: '10px'}}>New Simulator</a>
                    </div>
                    <div className={buttonContainerClassName}>
                        <button className={unSelectedButtonClassName} style={{borderWidth: '1px'}}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 mx-auto icon-user"><path className="primary" d="M12 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10z"/><path className="secondary" d="M21 20v-1a5 5 0 0 0-5-5H8a5 5 0 0 0-5 5v1c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2z"/></svg>
                        </button>
                        <a className="text-xs font-semibold text-center text-gray-900 " style={{fontSize: '10px'}}>UI Mocks</a>
                    </div>
                </div>
            </div>
           
		)
    }
    
    const renderCreateIssue = () => {
        if (imageToAnnotate !== undefined && currentAppBuild !== undefined) {
            return (
                <NewPostModal
                    show={currentMode === 'CREATE_ISSUE'}
                    postId={uuid()}
                    projectId={projectId}
                    imageToAnnotate={imageToAnnotate} 
                    appBuild={currentAppBuild}
                    imagePromise={createImagePromise(imageToAnnotate)}
                    onCreatePostClicked={onCreatePostClicked} 
                    onCancel={() => {setCurrentMode('BROWSE')}} />
            )
        }
     
    }

    return (
        <div className='flex flex-row flex-auto h-full'>
			<div className='flex flex-col flex-auto h-full '> 
                {/* when navbar is hidden this should also include justify-center */}
                {/* <div className='flex flex-shrink-0 w-full ml-3 overflow-hidden'>
                    { renderPostToolBar() }
                </div> */}
				<div className='flex flex-row my-auto'> 
					{/* RenderPostToolBar is contained because otherwise it stretches for the whole height. */}
					
                    <div className='flex flex-row justify-center w-full pt-1 pb-1 pl-2 pr-2 mx-auto overflow-scroll'> 
                        { currentAppBuild !== undefined && <CreatePostViewSimulator appBuild={currentAppBuild} onScreenshot={(img) => {
                            setImageToAnnotate(b64toBlob(img)); 
                            setTimeout(() => {setCurrentMode('CREATE_ISSUE')}, 100)
                        }}/> }
                        { renderCreateIssue() }
                    </div>
					{/* { renderAppetizeScreen() } 					
					<AnnotationScreenshot src={imageToAnnotate} ref={canvasRef}/>  */}
				</div>
				{/* This is here to act as a pad placeholder for the screenshot navigator. */}
				<div className="flex-shrink-0 w-full h-10"></div> 
			</div>
			
        </div>
    )
}

export default CreatePostView