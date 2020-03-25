import React, { useState, useEffect, useRef, useCallback } from "react"
import { Button } from 'antd';
import TextArea from "antd/lib/input/TextArea";
import { AssetStorageClient } from "../clients/AssetStorageClient";
import { v4 as uuidv4 } from "uuid"
import { Post, PostRaw } from "../types";
import { useSelector as useReduxSelector, TypedUseSelectorHook, useDispatch } from "react-redux";
import { addPost } from '../store/post/actions'
import { RootState, useSelector } from '../store'
import { graphqlOperation, API } from 'aws-amplify'
import { createPost } from '../graphql/mutations'
import { CreatePostInput } from "../API";


type AnnotationCanvasType = {
    backgroundImage: string
    width: number
    height: number
    onPublishButtonClick: () => void
}

type AnnotationCanvasData = {
    img: string | null,
    text: string
}

type Coordinate = {
    x: number
    y: number
}

export const AnnotationCanvas = ({backgroundImage, width, height, onPublishButtonClick}: AnnotationCanvasType) => {
    const [isPainting, setIsPainting] = useState(false);
    const [mousePosition, setMousePosition] = useState<Coordinate | undefined>(undefined);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const textAreaRef= useRef<TextArea>(null);
    const dispatch = useDispatch()

    useEffect(() => {
        drawBackground()
    }, [backgroundImage]);

    const drawBackground = () => {
        if (!canvasRef.current) {
            return;
        }
        
        const canvas: HTMLCanvasElement = canvasRef.current
        const context = canvas.getContext('2d')

        if (context !== null) {
            context.clearRect(0, 0, canvas.width, canvas.height)
        }
        
        const background = new Image()
        background.src = backgroundImage
        background.crossOrigin = 'anonymous'
        
        background.onload = () => {    
            context?.drawImage(background, 0, 0, width, height)
        }
    }

    const getCoordinates = (event: MouseEvent): Coordinate | undefined => {
        if (!canvasRef.current) {
            return;
        }
    
        const canvas: HTMLCanvasElement = canvasRef.current;
        const parentOffsetY = (window.innerHeight - (canvas.offsetParent as any)?.offsetHeight)/2
        const parentOffsetX = (window.innerWidth - (canvas.offsetParent as any)?.offsetWidth)/2
        const coordinate: Coordinate = {
            x: event.clientX - canvas.offsetLeft - parentOffsetX ,
            y: event.clientY - canvas.offsetTop/2 - parentOffsetY
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
            //localStorage.setItem("imgData", base64Image);
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

    const createNewAnnotationPost = (imageId: string, imageBlob: Blob, post: Post) => {
        AssetStorageClient.createUploadUrl(imageId, "1").then((presignedUrlFields) => {
            console.log("Presigned url for get " + presignedUrlFields)
            return AssetStorageClient.uploadDataToUrl(imageBlob, presignedUrlFields)
        }).then(async () => {
            try {
                const postRequest: CreatePostInput = {
                    id: post.id,
                    imageId: imageId,
                    projectId: "1",
                    title: "2",
                    text: "t",
                    dateCreated: "today"
                }
                const result = API.graphql(graphqlOperation(createPost, {input: postRequest}))
                console.log("Succeded in creating post.")
            } catch (err) {
                console.log("There has been an error in createNewAnnotationPost")
            }
        }).catch(() => {
            
        })
    }

    return (
        <div style={{ display: 'flex'}}> 
            <div style={{ flex: 0.5 }}>
                <canvas ref={canvasRef} onLoad={() => console.log('blea')} height={height} width={width} />
            </div>
            <div style={{ flex: 0.5 }}>
                <TextArea ref={textAreaRef} rows={4} />
                <Button style={{marginTop: '5px', float: 'right'}} onClick={async () => {
                    const canvasImage = getBase64ImageOfCanvas()
                    if (canvasImage === null) {
                        return
                    }

                    const image = canvasImage.replace(/^data:image\/(png|jpg);base64,/, "")
                    const text = textAreaRef.current === null ? "" : textAreaRef.current.state.value
                    const uuid = uuidv4()

                    const newPost: Post = {
                        id: uuid,
                        image: await getBlobFromCanvas(),
                        projectId: '1',
                        text: text
                    }
                    
                    getBlobFromCanvas().then((blob) => {
                        createNewAnnotationPost(uuid, blob, newPost)
                    })

                    dispatch(addPost(newPost))
                    onPublishButtonClick()
                }}>Publish</Button>
            </div>
        </div>
    )
}