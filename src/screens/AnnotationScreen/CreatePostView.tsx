import React, { useRef, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import TextArea from 'antd/lib/input/TextArea'
import { Input, Form } from 'antd'
import { AnnotationScreenshot } from './Screenshot'
import { CreatePostInput, PostStatus } from '../../API'
import { DataLayerClient } from '../../clients/DataLayerClient'
import { addPost } from '../../store/post/actions'
import uuid, { v4 as uuidv4 } from "uuid"
import CreatePostViewSimulator from '../../components/Simulator/CreatePostViewSimulator'
import NewPostForm from '../../components/NewPostForm'
import PostScreenshot from '../../components/PostScreenshot'
import { Post, postTagToGraphQLType } from '../../types'
import { addComment } from '../../store/comment/actions'
import { AssetStorageClient } from '../../clients/AssetStorageClient'

type CreatePostViewProps = {
    onPostCreated: () => void
}

type Mode = 'CREATE_ISSUE' | 'BROWSE'

const CreatePostView = () => {
    const iframeRef = useRef<HTMLIFrameElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)

    const [currentMode, setCurrentMode] = useState<Mode>('BROWSE')
    const [imageToAnnotate, setImageToAnnotate] = useState<string>('newsScreenshot.png')
    
    const dispatch = useDispatch()

    // Form
    const textAreaRef= useRef<TextArea>(null)
    const titleRef= useRef<Input>(null)
    const assignToRef = useRef<Input>(null)
    const reproStepsRef = useRef<TextArea>(null)

    useEffect(() => {
        window.addEventListener("message", receiveMessage, false);
    })

    const receiveMessage = (event: any) => {
        console.log('blea')
        if(event.data && event.data.type == 'screenshot'){
            console.log(event.data);
            setImageToAnnotate(event.data.data)
            console.log("BLEA screenshot")
            //document.getElementById("screenshot").src = event.data.data;
        }
    }

    const iFrameLoaded = () => {
        //iframeRef.current?.contentWindow?.postMessage('requestSession', '*');
    }

    const onScreenshotButtonClick = (event: any) => {        
        iframeRef.current?.contentWindow?.postMessage('getScreenshot', '*')
    }

    const onUploadButtonClick = async (event: any) => {
        // Take the canvas ref and then upload it with some text
        const blob = await getBlobFromCanvas()
        var text = textAreaRef.current === null ? "" : textAreaRef.current.state.value
        var title = titleRef.current === null ? "" : titleRef.current.state.value
                            
        // Validate that there is text.
        if (text === "" || text === undefined) {
            text = 'No title'
        }

        // Validate that there is a title.
        if (title === "" || title === undefined) {
            title = 'No text'
        }

        const createPostInput: CreatePostInput = {
            id: uuidv4(),
            imageId: uuidv4(),
            projectId: '1',
            text: text,
            title: title,
            status: PostStatus.OPEN,
            tags: []
        }
        const newPost = await DataLayerClient.createNewAnnotationPost(blob, createPostInput)
        // Save the post in the redux store so that the side grid is updated.
        dispatch(addPost(newPost))
    }

    const onCreatePostClicked = async (post: Post) => {
        dispatch(addPost(post))

        const imageId = uuidv4()
        
        AssetStorageClient.createUploadUrl(imageId, post.projectId).then((presignedUrlFields) => {
            console.log("Presigned url for get " + presignedUrlFields)
            return AssetStorageClient.uploadDataToUrl(post.image as Blob, presignedUrlFields)
        })

        const newPost = await DataLayerClient.createNewAnnotationPost(post.image as Blob, {
            id: post.id,
            title: post.title,
            imageId: imageId,
            projectId: post.projectId,
            text: post.text,
            status: PostStatus.OPEN,
            tags: post.tags === undefined ? [] : post.tags.map(postTag => postTagToGraphQLType(postTag))         
        })

        post.comments?.forEach(async (comment) => {
            await DataLayerClient.createCommentForPost(newPost, comment)
        })
         
        setCurrentMode('BROWSE')
    }

    const renderAppetizeScreen = () => {
        return (
            <div className='relative flex-col flex-shrink-0 w-64 h-full mb-3 ml-3' style={{height: '583px', width: '282px'}}>
                <iframe onLoad={() => iFrameLoaded()} ref={iframeRef} src="https://appetize.io/embed/fczxctdk32wb17vabzd3k2wq9w?device=iphonex&scale=69&autoplay=false&orientation=portrait&deviceColor=black&xdocMsg=true" width="100%" height="100%" frameBorder="0" scrolling="no"></iframe>
            </div>
        )
    }

    const getBase64ImageOfCanvas = (): string | null => {
        if (!canvasRef.current) {
            return null
        }
        const canvas: HTMLCanvasElement = canvasRef.current;
        const context = canvas.getContext('2d');
        if (context) {
            var dataURL = canvas.toDataURL("image/png");
            return dataURL
        } else {
            return null
        }
    }

    const getBlobFromCanvas = (): Promise<Blob> => {
        return new Promise((resolve, reject) => {
            const currentCanvas = canvasRef.current
            if (currentCanvas !== undefined && currentCanvas !== null) {
                const context = currentCanvas.getContext('2d');
                if (context) {
                    currentCanvas.toBlob((blob) => {
                        if (blob !== null) {
                            resolve(blob)
                        }
                        reject()
                    }, "image/png");                    
                } else {
                    reject()
                }
            } else {
                reject()
            }
        })
    }

    const renderForm = () => (
        <Form layout='vertical'>
            <Form.Item
                label="Title"
                validateStatus="success"
                //help="Cannot be empty."
            >
                <Input ref={titleRef} placeholder="New Issue When Loading" id="error" />
            </Form.Item>

            <Form.Item
                label="Description"
                hasFeedback
                //help="The information is being validated..."
            >
                <Input.TextArea ref={textAreaRef} autoSize={{ minRows: 4, maxRows: 6 }} placeholder="Description" id="validating" />
            </Form.Item>

            <Form.Item
                label="Repro steps"
                hasFeedback
                //help="The information is being validated..."
            >
                <Input.TextArea ref={reproStepsRef} autoSize={{ minRows: 4, maxRows: 6 }} placeholder="Description" id="validating" />
            </Form.Item>

            {/* <Form.Item
                label="Assign to"
                validateStatus="success"
                //help="Cannot be empty."
            >
                <Input ref={assignToRef} placeholder="New Issue When Loading" id="error" />
            </Form.Item> */}

            <Form.Item
                label="Status"
                validateStatus="success"
                //help="Cannot be empty."
            >
                <Input ref={assignToRef} placeholder="Blocker" id="error" />
            </Form.Item>
            <button onClick={(e) => onUploadButtonClick(e)} className='p-1 mt-2 text-blue-400 bg-blue-200 rounded-md'>UPLOAD</button>
        </Form>
	)
	
	// const renderPostToolBar = () => {
	// 	return (
	// 		<div className='flex-shrink-0 w-16 p-1 rounded-full'>
	// 			<div id='button-container' className='flex-col w-full'> 
	// 				{/* <div className='flex flex-col w-full h-16'>
	// 					<button onClick={(event) => onScreenshotButtonClick(event)} className="w-10 h-10 mx-auto bg-gray-100 border-gray-400 rounded-full shadow-lg focus:outline-none active:shadow-sm active:bg-gray-300" style={{borderWidth: "1px"}}>
	// 						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 mx-auto icon-camera"><path className="primary" d="M6.59 6l2.7-2.7A1 1 0 0 1 10 3h4a1 1 0 0 1 .7.3L17.42 6H20a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8c0-1.1.9-2 2-2h2.59zM19 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-7 8a5 5 0 1 0 0-10 5 5 0 0 0 0 10z"/><path className="secondary" d="M12 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/></svg>
	// 					</button>
	// 					<a className="font-semibold text-center text-gray-900" style={{fontSize: '10px'}}>Screenshot</a>
	// 				</div>
	// 				<div className='flex flex-col w-full h-16 my-1'>
	// 					<button className="w-10 h-10 mx-auto bg-gray-100 border-gray-400 rounded-full shadow-lg focus:outline-none active:shadow-sm active:bg-gray-300" style={{borderWidth: "1px"}}>
	// 						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 mx-auto icon-videocam"><path className="secondary" d="M13.59 12l6.7-6.7A1 1 0 0 1 22 6v12a1 1 0 0 1-1.7.7L13.58 12z"/><rect width="14" height="14" x="2" y="5" className="primary" rx="2"/></svg>
	// 					</button>
	// 					<a className="text-xs font-semibold text-center text-gray-900 " style={{fontSize: '10px'}}>Record</a>
	// 				</div> */}
					
	// 				<div className='flex flex-col w-full h-16 my-1'>
	// 					<button className="w-10 h-10 mx-auto bg-gray-100 border-gray-400 rounded-full shadow-lg focus:outline-none active:shadow-sm active:bg-gray-300" style={{borderWidth: "1px"}}>
	// 						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 mx-auto icon-device-smartphone"><path className="primary" d="M8 2h8a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4c0-1.1.9-2 2-2z"/><path className="secondary" d="M12 20a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/></svg>
	// 					</button>
	// 					<a className="text-xs font-semibold text-center text-gray-900 " style={{fontSize: '10px'}}>Compare</a>
	// 				</div>
					
	// 			</div>
	// 		</div>
	// 	)
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
                        { currentMode === 'BROWSE' && <CreatePostViewSimulator onScreenshot={(img) => {setImageToAnnotate(img); setCurrentMode('CREATE_ISSUE')}}/> }
                        { currentMode === 'CREATE_ISSUE' && <NewPostForm 
                            postId={uuid()}
                            projectId={'1'}
                            imageToAnnotate={imageToAnnotate} 
                            onCreatePostClicked={onCreatePostClicked} 
                            onCancel={() => {setCurrentMode('BROWSE')}} />}
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