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
            <div className='flex-shrink-0 h-full ml-3 mt-3 mb-3 w-64 flex-col bg-green-600 relative' style={{height: '583px', width: '282px'}}>
                <button className='bg-blue-600 absolute w-24 h-10 right-0' onClick={(event) => onScreenshotButtonClick(event)}> Take Screenshot </button> 
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

            <Form.Item
                label="Assign to"
                validateStatus="success"
                //help="Cannot be empty."
            >
                <Input ref={assignToRef} placeholder="New Issue When Loading" id="error" />
            </Form.Item>

            <Form.Item
                label="Status"
                validateStatus="success"
                //help="Cannot be empty."
            >
                <Input ref={assignToRef} placeholder="Blocker" id="error" />
            </Form.Item>
        </Form>
    )

    return (
        <div className='h-full flex-auto flex flex-row'>
            { renderAppetizeScreen() }
            {/* <DeviceScreenshot src={'testScreenshot.jpg'}/> */}
            { imageToAnnotate !== undefined ? 
                <>
                    <div className='flex-shrink-0 bg-gray-100 rounded-full shadow-lg h-64 ml-3 mt-3 w-16 flex-col'>
                        <div className='w-full'>
                            <button className="w-8 h-8 bg-red-500 mx-auto my-8" onClick={(event) => onScreenshotButtonClick(event)}>S</button>
                        </div>
                        <div className='w-full'>
                            <button className="w-8 h-8 bg-red-500 mx-auto my-8" onClick={(event) => onUploadButtonClick(event)}>U</button>
                        </div>
                    </div>
                    <AnnotationScreenshot src={imageToAnnotate} ref={canvasRef}/> 
                    <div className='ml-3 mt-3 flex-auto flex flex-col'>
                        <div className="bg-gray-100 shadow-lg rounded-lg w-64 h-auto p-3">
                            { renderForm() }
                        </div>
                        
                    </div>
                </>
                : <></>}            
        </div>
    )
}

export default CreatePostView