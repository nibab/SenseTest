import React, { useState, useEffect, useRef, useCallback } from "react"
import { Button } from 'antd';
import TextArea from "antd/lib/input/TextArea";

type AnnotationCanvasType = {
    backgroundImage: string
    width: number
    height: number
    onPublishButtonClick: (data: AnnotationCanvasData) => void
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

    useEffect(() => {
        drawBackground()
    }, [backgroundImage]);

    const drawBackground = () => {
        if (!canvasRef.current) {
            return;
        }
        
        const canvas: HTMLCanvasElement = canvasRef.current;
        const context = canvas.getContext('2d');
        
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

    const storeCanvasImage = (): string | null => {
        if (!canvasRef.current) {
            return null
        }
        const canvas: HTMLCanvasElement = canvasRef.current;
        const context = canvas.getContext('2d');
        if (context) {
            var dataURL = canvas.toDataURL("image/png");
            const base64Image = dataURL.replace(/^data:image\/(png|jpg);base64,/, "")
            //localStorage.setItem("imgData", base64Image);
            return base64Image
        } else {
            return null
        }
    }

    return (
        <div style={{ display: 'flex'}}> 
            <div style={{ flex: 0.5 }}>
                <canvas ref={canvasRef} onLoad={() => console.log('blea')} height={height} width={width} />
            </div>
            <div style={{ flex: 0.5 }}>
                <TextArea ref={textAreaRef} rows={4} />
                <Button style={{marginTop: '5px', float: 'right'}} onClick={() => {
                    const canvasImage = storeCanvasImage()
                    const text = textAreaRef.current === null ? "" : textAreaRef.current.state.value
                    onPublishButtonClick({img: canvasImage, text: text})
                    console.log()
                }}>Publish</Button>
            </div>
        </div>
    )
}