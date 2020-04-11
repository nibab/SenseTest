import React, { useRef, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import TextArea from 'antd/lib/input/TextArea'
import { Input, Form } from 'antd'
import { AnnotationScreenshot } from './Screenshot'
import { CreatePostInput } from '../../API'
import { DataLayerClient } from '../../clients/DataLayerClient'
import { addPost } from '../../store/post/actions'
import { v4 as uuidv4 } from "uuid"

type CreatePostViewProps = {
    onPostCreated: () => void
}

const CreatePostView = () => {
    const iframeRef = useRef<HTMLIFrameElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    
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
            title: title
        }
        const newPost = await DataLayerClient.createNewAnnotationPost(blob, createPostInput)
        // Save the post in the redux store so that the side grid is updated.
        dispatch(addPost(newPost))
    }

    const renderAppetizeScreen = () => {
        return (
            <div className='flex-shrink-0 h-full ml-3 mb-3 w-64 flex-col relative' style={{height: '583px', width: '282px'}}>
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
        </Form>
	)
	
	const renderPostToolBar = () => {
		return (
			<div className='rounded-full flex-shrink-0 w-16 p-1'>
				<div id='button-container' className='w-full flex-col'> 
					<div className='w-full h-16 flex flex-col'>
						<button onClick={(event) => onScreenshotButtonClick(event)} className="focus:outline-none  border-gray-400 shadow-lg active:shadow-sm active:bg-gray-300 w-10 h-10 bg-gray-100 rounded-full mx-auto" style={{borderWidth: "1px"}}>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="mx-auto w-6 icon-camera"><path className="primary" d="M6.59 6l2.7-2.7A1 1 0 0 1 10 3h4a1 1 0 0 1 .7.3L17.42 6H20a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8c0-1.1.9-2 2-2h2.59zM19 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-7 8a5 5 0 1 0 0-10 5 5 0 0 0 0 10z"/><path className="secondary" d="M12 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/></svg>
						</button>
						<a className="text-center font-semibold text-gray-900" style={{fontSize: '10px'}}>Screenshot</a>
					</div>
					<div className='w-full h-16 my-1 flex flex-col'>
						<button className="focus:outline-none border-gray-400 shadow-lg active:shadow-sm active:bg-gray-300 w-10 h-10 bg-gray-100 rounded-full mx-auto" style={{borderWidth: "1px"}}>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="mx-auto w-6 icon-videocam"><path className="secondary" d="M13.59 12l6.7-6.7A1 1 0 0 1 22 6v12a1 1 0 0 1-1.7.7L13.58 12z"/><rect width="14" height="14" x="2" y="5" className="primary" rx="2"/></svg>
						</button>
						<a className=" text-xs text-center font-semibold text-gray-900" style={{fontSize: '10px'}}>Record</a>
					</div>
					
					<div className='w-full h-16 my-1 flex flex-col'>
						<button className="focus:outline-none border-gray-400 shadow-lg active:shadow-sm active:bg-gray-300 w-10 h-10 bg-gray-100 rounded-full mx-auto" style={{borderWidth: "1px"}}>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 mx-auto icon-device-smartphone"><path className="primary" d="M8 2h8a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4c0-1.1.9-2 2-2z"/><path className="secondary" d="M12 20a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/></svg>
						</button>
						<a className=" text-xs text-center font-semibold text-gray-900" style={{fontSize: '10px'}}>Compare</a>
					</div>
					
				</div>
			</div>
		)
	}


    return (
        <div className='h-full flex-auto flex flex-row'>
			<div className='flex-auto h-full flex flex-col '> 
				<div className='flex w-screen flex-row justify-center my-auto'>
					{/* RenderPostToolBar is contained because otherwise it stretches for the whole height. */}
					<div className='overflow-hidden ml-3 '>
						{ renderPostToolBar() }
					</div>
					{ renderAppetizeScreen() } 					
					<AnnotationScreenshot src={imageToAnnotate} ref={canvasRef}/> 
					
					<div className='ml-3 max-h-full flex flex-col'>
                        <div className="bg-gray-100 shadow-lg rounded-lg w-64 h-auto p-3">
                            { renderForm() }
                        </div>
                    </div>
				</div>
				{/* This is here to act as a pad placeholder for the screenshot navigator. */}
				<div className="flex-shrink-0 h-10 w-full"></div> 
			</div>
			
        </div>
    )
}

export default CreatePostView