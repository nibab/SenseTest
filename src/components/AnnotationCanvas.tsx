import React, { useState, useEffect, useRef, useCallback, forwardRef, Ref } from "react"
import Log from "../utils/Log";

type AnnotationCanvasProps = {
    backgroundImage: string
    visible: boolean
}

type Coordinate = {
    x: number
    y: number
}

/**
 * Combines many refs into one. Useful for combining many ref hooks
 */
function useCombinedRefs<T extends any>(...refs: Array<Ref<T>>) {
    const targetRef = useRef<T>(null)
    useEffect(() => {
        refs.forEach(ref => {
            if (!ref) return

            if (typeof ref === 'function') {
                ref(targetRef.current)
            } else {
                (ref as any).current = targetRef.current
            }
        })
    }, [refs])

    return targetRef
}

export const AnnotationCanvas = forwardRef<HTMLCanvasElement, AnnotationCanvasProps>((props, canvasRef) => {
    const [isPainting, setIsPainting] = useState(false)
    const [mousePosition, setMousePosition] = useState<Coordinate | undefined>(undefined)

    const innerCanvasRef = useRef(null)
    const combinedRef = useCombinedRefs(canvasRef, innerCanvasRef)

    useEffect(() => {
        drawBackground()
    }, [props.backgroundImage]);

    const drawBackground = () => {
        if (!innerCanvasRef.current) {
            return
        }
        
        const canvas: HTMLCanvasElement | null = combinedRef?.current

        if (canvas === null) return

        // ...then set the internal size to match
        canvas.width  = (combinedRef.current)!.getBoundingClientRect().width
        canvas.height = (combinedRef.current)!.getBoundingClientRect().height
        
        const background = new Image()
        background.src = props.backgroundImage
        background.crossOrigin = 'anonymous'
        
        background.onload = () => {  
            const context = (combinedRef.current)!.getContext('2d')
            const canvasToImageRatio = canvas.width/background.width
            const newImageHeight = background.height * canvasToImageRatio
            canvas.height = newImageHeight
            context?.drawImage(background, 0, 0, canvas.width, newImageHeight)
        }
    }

    const getCoordinates = (event: MouseEvent): Coordinate | undefined => {
        if (!combinedRef.current) {
            return;
        }
    
        const canvasCoordinateX = (combinedRef.current.parentNode! as Element).getBoundingClientRect().x
        const canvasCoordinateY = (combinedRef.current.parentNode! as Element).getBoundingClientRect().y
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
        if (!combinedRef.current) {
            return;
        }
        const canvas: HTMLCanvasElement = combinedRef.current;
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
        if (!combinedRef.current) {
            return;
        }
        const canvas: HTMLCanvasElement = combinedRef.current;
        canvas.addEventListener('mousedown', startPaint);
        return () => {
            canvas.removeEventListener('mousedown', startPaint);
        };
    }, [startPaint]);

    useEffect(() => {
        if (!combinedRef.current) {
            return;
        }
        const canvas: HTMLCanvasElement = combinedRef.current;
        canvas.addEventListener('mousemove', paint);
        return () => {
            canvas.removeEventListener('mousemove', paint);
        };
    }, [paint]);

    const exitPaint = useCallback(() => {
        setIsPainting(false);
    }, []);

    useEffect(() => {
        if (!combinedRef.current) {
            return;
        }
        const canvas: HTMLCanvasElement = combinedRef.current;
        canvas.addEventListener('mouseup', exitPaint);
        canvas.addEventListener('mouseleave', exitPaint);
        return () => {
            canvas.removeEventListener('mouseup', exitPaint);
            canvas.removeEventListener('mouseleave', exitPaint);
        };
    }, [exitPaint]);

    return (
        <div style={{ flex: 0.35, alignContent: 'right'}}>
            <canvas ref={ combinedRef } className='bg-red-400 w-full' />
        </div>
    )
})