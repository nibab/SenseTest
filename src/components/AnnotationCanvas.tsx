import React, { useState, useEffect, useRef, useCallback } from "react"
import { Input, Form, Modal, Button } from 'antd';
import TextArea from "antd/lib/input/TextArea";
import { AssetStorageClient } from "../clients/AssetStorageClient";
import { v4 as uuidv4 } from "uuid"
import { Post } from "../types";
import { useDispatch } from "react-redux";
import { addPost } from '../store/post/actions'
import { graphqlOperation, API } from 'aws-amplify'
import { createPost } from '../graphql/mutations'
import { CreatePostInput } from "../API";
import 'antd/dist/antd.css';
import Log from "../utils/Log";

type AnnotationCanvasType = {
    backgroundImage: string
    onPublishButtonClick: (blobPromise: Promise<Blob>, text: string | undefined, title: string | undefined) => void
    onCancel: () => void
    visible: boolean
}

type AnnotationCanvasData = {
    img: string | null,
    text: string
}

type Coordinate = {
    x: number
    y: number
}

export const AnnotationCanvas = ({backgroundImage, onPublishButtonClick, onCancel, visible}: AnnotationCanvasType) => {
    const [isPainting, setIsPainting] = useState(false)
    const [mousePosition, setMousePosition] = useState<Coordinate | undefined>(undefined)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const textAreaRef= useRef<TextArea>(null)
    const titleRef= useRef<Input>(null)
    const dispatch = useDispatch()

    useEffect(() => {
        drawBackground()
    }, [backgroundImage]);

    const drawBackground = () => {
        if (!canvasRef.current) {
            return
        }
        
        const canvas: HTMLCanvasElement = canvasRef.current

        // ...then set the internal size to match
        canvas.width  = (canvasRef.current)!.getBoundingClientRect().width
        canvas.height = (canvasRef.current)!.getBoundingClientRect().height
        
        const background = new Image()
        background.src = backgroundImage
        background.crossOrigin = 'anonymous'
        
        background.onload = () => {  
            const context = (canvasRef.current)!.getContext('2d')

            const currentCanvasWidth = canvas.width
            const canvasToImageRatio = canvas.width/background.width
            const newImageHeight = background.height * canvasToImageRatio
            canvas.height = newImageHeight
            

           
            context?.drawImage(background, 0, 0, canvas.width, newImageHeight)
        }

        window.addEventListener('resize', (event) => {
            //const context = (canvasRef.current)!.getContext('2d')
            //canvas.width  = (canvasRef.current)!.getBoundingClientRect().width
        })
    }

    const getCoordinates = (event: MouseEvent): Coordinate | undefined => {
        if (!canvasRef.current) {
            return;
        }
    
        const canvasCoordinateX = (canvasRef.current.parentNode! as Element).getBoundingClientRect().x
        const canvasCoordinateY = (canvasRef.current.parentNode! as Element).getBoundingClientRect().y
        const coordinate: Coordinate = {
            x: event.clientX - canvasCoordinateX,
            y: event.clientY - canvasCoordinateY
        }
        return coordinate
    };

    const startPaint = useCallback((event: MouseEvent) => {
        const coordinates = getCoordinates(event);
        if (coordinates) {
            setIsPainting(true);
            setMousePosition(coordinates);
        }
    }, []);

    const drawLine = (originalMousePosition: Coordinate, newMousePosition: Coordinate) => {
        if (!canvasRef.current) {
            return;
        }
        const canvas: HTMLCanvasElement = canvasRef.current;
        const context = canvas.getContext('2d');
        if (context) {
            context.strokeStyle = 'red';
            context.lineJoin = 'round';
            context.lineWidth = 5;

            context.beginPath();
            context.moveTo(originalMousePosition.x, originalMousePosition.y);
            context.lineTo(newMousePosition.x, newMousePosition.y);
            context.closePath();
            context.stroke();
        }
    };

    const paint = useCallback(
        (event: MouseEvent) => {
            if (isPainting) {
                const newMousePosition = getCoordinates(event);
                if (mousePosition && newMousePosition) {
                    drawLine(mousePosition, newMousePosition);
                    setMousePosition(newMousePosition);
                }
            }
        },
        [isPainting, mousePosition]
    );

    useEffect(() => {
        if (!canvasRef.current) {
            return;
        }
        const canvas: HTMLCanvasElement = canvasRef.current;
        canvas.addEventListener('mousedown', startPaint);
        return () => {
            canvas.removeEventListener('mousedown', startPaint);
        };
    }, [startPaint]);

    useEffect(() => {
        if (!canvasRef.current) {
            return;
        }
        const canvas: HTMLCanvasElement = canvasRef.current;
        canvas.addEventListener('mousemove', paint);
        return () => {
            canvas.removeEventListener('mousemove', paint);
        };
    }, [paint]);

    const exitPaint = useCallback(() => {
        setIsPainting(false);
    }, []);

    useEffect(() => {
        if (!canvasRef.current) {
            return;
        }
        const canvas: HTMLCanvasElement = canvasRef.current;
        canvas.addEventListener('mouseup', exitPaint);
        canvas.addEventListener('mouseleave', exitPaint);
        return () => {
            canvas.removeEventListener('mouseup', exitPaint);
            canvas.removeEventListener('mouseleave', exitPaint);
        };
    }, [exitPaint]);

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

    return (
        // <div style={{ display: 'flex', height: '100%'}} onLoad={() => console.log('blea canvasref')}> 
            <div style={{ flex: 0.35, alignContent: 'right'}}>
                <canvas ref={canvasRef} className='bg-red-400 w-full' />
            </div>
    )
}

{/* <div style={{ flex: 0.6, paddingLeft: '30px' }}>
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
                </Form>
                <Button style={{marginTop: '5px', float: 'right'}} onClick={async () => {
                    const canvasImage = getBase64ImageOfCanvas()
                    if (canvasImage === null) {
                        return
                    }
                    const text = textAreaRef.current === null ? "" : textAreaRef.current.state.value
                    const title = titleRef.current === null ? "" : titleRef.current.state.value
                    Log.info(`AnnotationCanvas title: ${title} text: ${text}`, 'AnnotationCanvas')
                    onPublishButtonClick(getBlobFromCanvas(), text, title)
                }}>Publish</Button>
            </div> */}
        // </div>