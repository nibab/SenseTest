import React, { Fragment, useState, useEffect, useRef, useCallback } from "react"
import { TestCasesClient, TestCase } from "../clients/TestCasesClient";
import { RunsClient, Run } from "../clients/RunsClient";
import { TestCaseExecutionsClient } from "../clients/TestCaseExecutionsClient";
import { CreateRunModal } from "./CreateRunModal"
import { ProjectsClient } from "../clients/ProjectsClient";
import uuidv1 from 'uuid';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TestsScreen from "../screens/TestsScreen";
import { Card, Button, Drawer, Modal } from 'antd';
import { DateUtils } from "../utils/DateUtils";
import { LoadingScreen } from '../screens/LoadingScreen';
import TextArea from "antd/lib/input/TextArea";

type AnnotationCanvasType = {
    backgroundImage: string
    width: number
    height: number
    onPublishButtonClick: (base64Image: string | null) => void
}

type Coordinate = {
    x: number
    y: number
}

export const AnnotationCanvas = ({backgroundImage, width, height, onPublishButtonClick}: AnnotationCanvasType) => {
    const [showRunModal, setShowRunModal] = useState(false);
    const [isPainting, setIsPainting] = useState(false);
    const [mousePosition, setMousePosition] = useState<Coordinate | undefined>(undefined);
    const [drawerVisible, setDrawerVisible] = useState(false)
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        drawBackground()
    }, []);

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
        <div style={{ width: `${width}px`, overflow: 'hidden'}}> 
            
            <canvas ref={canvasRef} onLoad={() => console.log('blea')} height={height} width={width} />
            
            <Modal
                title="Comment"
                visible={drawerVisible}
                onOk={() => {
                    const canvasImage = storeCanvasImage()
                    console.log(canvasImage)
                    onPublishButtonClick(canvasImage)
                }}
                onCancel={() => {}}
                >
                <TextArea rows={4} />
            </Modal>
                
            {/* <Card style={{ width: `${width}px`, height: `${height}px` }} cover={<img src={backgroundImage} />} /> */}
            <Button style={{marginTop: '5px', float: 'right'}} onClick={() => {
                
                setDrawerVisible(true)
                //onPublishButtonClick(canvasImage)
            }}>Publish</Button>
        </div>
    )
}