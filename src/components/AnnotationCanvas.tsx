import React, { Fragment, useState, useEffect, useRef, useCallback } from "react"
import { TestCasesClient, TestCase } from "../clients/TestCasesClient";
import { RunsClient, Run } from "../clients/RunsClient";
import { TestCaseExecutionsClient } from "../clients/TestCaseExecutionsClient";
import { CreateRunModal } from "./CreateRunModal"
import { ProjectsClient } from "../clients/ProjectsClient";
import uuidv1 from 'uuid';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import TestsScreen from "../screens/TestsScreen";
import { Card } from 'antd';
import { DateUtils } from "../utils/DateUtils";
import { LoadingScreen } from '../screens/LoadingScreen';

type AnnotationCanvasType = {
    backgroundImage: string
    width: number
    height: number
}

type Coordinate = {
    x: number
    y: number
}

export const AnnotationCanvas = ({backgroundImage, width, height}: AnnotationCanvasType) => {
    const [showRunModal, setShowRunModal] = useState(false);
    const [isPainting, setIsPainting] = useState(false);
    const [mousePosition, setMousePosition] = useState<Coordinate | undefined>(undefined);
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
        
        background.onload = () => {    
            context?.drawImage(background, 0, 0, width, height)
        }
    }

    const getCoordinates = (event: MouseEvent): Coordinate | undefined => {
        if (!canvasRef.current) {
            return;
        }
    
        const canvas: HTMLCanvasElement = canvasRef.current;
        const coordinate: Coordinate = {
            x: event.pageX - canvas.offsetLeft,
            y: event.pageY - canvas.offsetTop
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

    

    return (
        <div style={{ width: `${width}px`, marginLeft: '20px'}}> 
            <canvas ref={canvasRef} onLoad={() => console.log('blea')} height={height} width={width} />
            {/* <Card style={{ width: `${width}px`, height: `${height}px` }} cover={<img src={backgroundImage} />} /> */}
            {/* <Button style={ styles.button }>Hello</Button> */}
        </div>
    )
}