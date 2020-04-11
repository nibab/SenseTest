import React, { forwardRef } from 'react'
import { AnnotationCanvas } from '../../components/AnnotationCanvas'

type ScreenshotProps = {
    src: string
}

export const DeviceScreenshot = ({ src }: ScreenshotProps) => {
    return (
        <div className='flex-shrink-0 h-full mb-3 w-64 flex-col' style={{height: '583px', width: '281px'}}> 
            <div className='h-full w-full object-contain flex relative'>
                <div className='h-full w-full absolute z-0'>
                    <img className="h-full w-full object-contain" src='iphonexBlack.png'></img>
                </div>	
                <div className=' mx-auto my-auto z-10 overflow-hidden' style={{width: '92.1%', height: '96.5%', borderRadius: '2.2rem'}}>
                    <img className='h-full w-full mx-auto object-contain' src={src}></img>
                </div>
                
            </div>							
        </div>
    )
}

export const AnnotationScreenshot = forwardRef<HTMLCanvasElement, ScreenshotProps>((props, canvasRef) => {
    return (
        <div className='flex-shrink-0 h-full ml-3 mr-3 mb-3' style={{height: '583px', width: '282px'}}>
            <div className='h-full w-full object-contain flex relative'>
                <div className='border-1 border-solid border-gray-400 h-full w-full absolute z-0'>
                    <img className="h-full w-full object-contain" src='iphonexBlack.png'></img>
					{/* <div className="h-full w-full bg-gray-100 shadow-lg rounded-md"></div> */}
                </div>	
                <div className=' mx-auto my-auto z-10 overflow-hidden' style={{width: '92.1%', height: '96.5%', borderRadius: '2.2rem'}}>
                    <AnnotationCanvas
                        ref={canvasRef}
                        visible={props.src !== undefined}
                        backgroundImage={props.src !== undefined ? props.src : ""}
                    />
                </div>
            </div>
        </div>
    )
})