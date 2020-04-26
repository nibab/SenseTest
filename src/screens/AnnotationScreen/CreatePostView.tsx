import React, { useRef, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import TextArea from 'antd/lib/input/TextArea'
import { Input, Form } from 'antd'
import { AnnotationScreenshot } from './Screenshot'
import { CreatePostInput, PostStatus, GetProjectQuery } from '../../API'
import { DataLayerClient } from '../../clients/DataLayerClient'
import { addPost } from '../../store/post/actions'
import uuid, { v4 as uuidv4 } from "uuid"
import CreatePostViewSimulator from '../../components/Simulator/CreatePostViewSimulator'
import NewPostForm from '../../components/NewPostForm'
import PostScreenshot from '../../components/PostScreenshot'
import { Post, postTagToGraphQLType, AppBuild } from '../../types'
import { addComment } from '../../store/comment/actions'
import { AssetStorageClient } from '../../clients/AssetStorageClient'
import Log from '../../utils/Log'
import { API, graphqlOperation } from 'aws-amplify'
import { getProject } from '../../graphql/queries'

type CreatePostViewProps = {
    onPostCreated: () => void
}

type Mode = 'CREATE_ISSUE' | 'BROWSE'

const CreatePostView = () => {
    const iframeRef = useRef<HTMLIFrameElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)

    const [currentMode, setCurrentMode] = useState<Mode>('BROWSE')
    const [imageToAnnotate, setImageToAnnotate] = useState<Blob>()
    const [currentAppBuild, setCurrentAppBuild] = useState<AppBuild>()
    
    const dispatch = useDispatch()

    // Form
    const textAreaRef= useRef<TextArea>(null)
    const titleRef= useRef<Input>(null)
    const assignToRef = useRef<Input>(null)
    const reproStepsRef = useRef<TextArea>(null)

    // Hardcoded projectId
    const projectId = '1'

    useEffect(() => {
        window.addEventListener("message", receiveMessage, false);
    })

    useEffect(() => {
        getCurrentAppBuild()
    }, [])

    const getCurrentAppBuild = async () => {
        const project = await API.graphql(graphqlOperation(getProject, {id: '68134e24-ed27-494e-b0bb-8a14f2b3167f'})) as {data: GetProjectQuery}
        const currentAppBuildId = project.data.getProject?.currentAppBuild
        const appBuilds = project.data.getProject?.appBuilds
        if (appBuilds !== undefined) {
            // should return an array of only one item
            const _currentAppBuildArray = [appBuilds?.items![0]] //.filter(item => item !== null && item.id === currentAppBuildId) 
            if (_currentAppBuildArray?.length !== 0 && _currentAppBuildArray !== undefined) {
                const currentAppBuild = _currentAppBuildArray[0]
                if (currentAppBuild !== undefined && currentAppBuild !== null) {
                    const appBuild: AppBuild = {
                        id: currentAppBuild.id,
                        appetizeKey: currentAppBuild.appetizeKey,
                        name: currentAppBuild.name,
                        assetId: currentAppBuild.assetId,
                        version: currentAppBuild.version,
                        uploadedByUserId: currentAppBuild.uploadedByUserId,
                        createdAt: currentAppBuild.createdAt !== null ? currentAppBuild.createdAt : 'not available',
                        project: currentAppBuild.project.id
                    }
                    setCurrentAppBuild(appBuild)
                }       
            }
        }
    }

    const receiveMessage = (event: any) => {
        console.log('blea')
        if(event.data && event.data.type == 'screenshot'){
            console.log(event.data);
            setImageToAnnotate(event.data.data)
            console.log("BLEA screenshot")
            //document.getElementById("screenshot").src = event.data.data;
        }
    }

    const onCreatePostClicked = async (imageId: string, post: Post) => {
        setCurrentMode('BROWSE')
        dispatch(addPost(post))

        const newPost = await DataLayerClient.createNewAnnotationPost(post.image as Blob, {
            id: post.id,
            title: post.title,
            imageId: imageId,
            projectId: post.projectId,
            text: post.text,
            status: PostStatus.OPEN,
            tags: post.tags === undefined ? [] : post.tags.map(postTag => postTagToGraphQLType(postTag)),
            appVersion: post.appVersion      
        })

        post.comments?.forEach(async (comment) => {
            await DataLayerClient.createCommentForPost(newPost, comment)
        })
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
                console.log("Presigned url for get " + presignedUrlFields)
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
               
                    {/* <div className={buttonContainerClassName}>
                        <button className={unSelectedButtonClassName} style={{borderWidth: '1px'}}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 mx-auto icon-attach"><path className="secondary" d="M20.12 11.95l-6.58 6.59a5 5 0 1 1-7.08-7.07l6.59-6.6a3 3 0 0 1 4.24 4.25l-6.58 6.59a1 1 0 1 1-1.42-1.42l6.59-6.58a1 1 0 0 0-1.42-1.42l-6.58 6.59a3 3 0 0 0 4.24 4.24l6.59-6.58a5 5 0 0 0-7.08-7.08l-6.58 6.6a7 7 0 0 0 9.9 9.9l6.59-6.6a1 1 0 0 0-1.42-1.4z"/></svg>
                        </button>
                        <a className="text-xs font-semibold text-center text-gray-900 " style={{fontSize: '10px'}}>Attachments</a>
                    </div> */}
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
                    {/* <div className={buttonContainerClassName}>
                        <button className={unSelectedButtonClassName} style={{borderWidth: '1px'}}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 mx-auto icon-flag"><path className="primary" d="M3 15a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h8a1 1 0 0 1 .7.3L13.42 5H21a1 1 0 0 1 .9 1.45L19.61 11l2.27 4.55A1 1 0 0 1 21 17h-8a1 1 0 0 1-.7-.3L10.58 15H3z"/><rect width="2" height="20" x="2" y="2" className="secondary" rx="1"/></svg>
                        </button>
                        <a className="text-xs font-semibold text-center text-gray-900 " style={{fontSize: '10px'}}>Flag</a>
                    </div>					 */}
                </div>
            </div>
           
		)
    }
    
    const renderCreateIssue = () => {
        if (currentMode === 'CREATE_ISSUE' && imageToAnnotate !== undefined && currentAppBuild !== undefined) {
            return (
                <NewPostForm 
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
                <div className='flex flex-shrink-0 w-full ml-3 overflow-hidden'>
                    { renderPostToolBar() }
                </div>
				<div className='flex flex-row my-1'> 
					{/* RenderPostToolBar is contained because otherwise it stretches for the whole height. */}
					
                    <div className='flex flex-row justify-center w-full pt-1 pb-1 pl-2 pr-2 mx-auto overflow-scroll'> 
                        { currentMode === 'BROWSE' && currentAppBuild !== undefined && <CreatePostViewSimulator appBuild={currentAppBuild} onScreenshot={(img) => {
                            setImageToAnnotate(b64toBlob(img)); 
                            setTimeout(() => {setCurrentMode('CREATE_ISSUE')}, 100)
                        }}/> }
                        { renderCreateIssue() }
                        {/* <PostScreenshot post={{
                            id: '1',
                            .image: window.URL.createObjectURL('newsScreenshot.png'),

                        }
                            
                        }></PostScreenshot> */}
                    </div>
					{/* { renderAppetizeScreen() } 					
					<AnnotationScreenshot src={imageToAnnotate} ref={canvasRef}/>  */}
                   
					
					{/* <div className='flex flex-col max-h-full ml-3'>
                        <div className="w-64 h-auto p-3 bg-gray-100 rounded-lg shadow-lg">
                            { renderForm() }
                        </div>
                    </div> */}
				</div>
				{/* This is here to act as a pad placeholder for the screenshot navigator. */}
				<div className="flex-shrink-0 w-full h-10"></div> 
			</div>
			
        </div>
    )
}

export default CreatePostView