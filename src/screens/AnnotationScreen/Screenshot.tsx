import React, { forwardRef } from 'react'
import { AnnotationCanvas } from '../../components/AnnotationCanvas'
import { DeviceType } from '../../types'
import { getDeviceDimensions } from '../../deviceDimensions'

type ScreenshotProps = {
    src: string
    deviceType: DeviceType
}

export const DeviceScreenshot = (props: ScreenshotProps) => {
    return (
        <div className='flex-col flex-shrink-0 w-64 h-full mb-3' style={getDeviceDimensions(props.deviceType)}> 
            <div className='relative flex object-contain w-full h-full'>
                <div className='absolute z-0 w-full h-full'>
                    <img className="object-contain w-full h-full" src='iphonexBlack.png'></img>
                </div>	
                <div className='z-10 mx-auto my-auto overflow-hidden ' style={{width: '92.1%', height: '96.5%', borderRadius: '2.2rem'}}>
                    <img className='object-contain w-full h-full mx-auto' src={props.src}></img>
                </div>
                
            </div>							
        </div>
    )
}

export const AnnotationScreenshot = forwardRef<HTMLCanvasElement, ScreenshotProps>((props, canvasRef) => {
    return (
        <div className='flex-shrink-0 h-full mb-3 ml-3 mr-3' style={getDeviceDimensions(props.deviceType)}>
            <div className='relative flex object-contain w-full h-full'>
                <div className='absolute z-0 w-full h-full border-gray-400 border-solid border-1'>
                    <img className="object-contain w-full h-full" src='iphonexBlack.png'></img>
					{/* <div className="w-full h-full bg-gray-100 rounded-md shadow-lg"></div> */}
                </div>	
                <div className='z-10 mx-auto my-auto overflow-hidden ' style={{width: '92.1%', height: '96.5%', borderRadius: '2.2rem'}}>
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