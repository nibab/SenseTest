import React, { useRef, useState, useEffect } from 'react'

type CreatePostViewSimulatorProps = {
	onScreenshot: (imgSrc: string) => void
}

const CreatePostViewSimulator = (props: CreatePostViewSimulatorProps) => {
	const iframeRef = useRef<HTMLIFrameElement>(null)
	const [iframeLoaded, setIframeLoaded] = useState(false)

	useEffect(() => {
        window.addEventListener("message", receiveMessage, false);
    })

    const receiveMessage = (event: any) => {
        console.log('blea')
        if(event.data && event.data.type == 'screenshot'){
            console.log(event.data);
			//setImageToAnnotate(event.data.data)
			props.onScreenshot(event.data.data)
            console.log("BLEA screenshot")
        }
    }

    const onScreenshotButtonClick = (event: any) => {        
        iframeRef.current?.contentWindow?.postMessage('getScreenshot', '*')
    }


	const renderTag = () => {
		return (
			<div className='flex w-full h-8 '>
				<div className=' pb-1 mx-auto flex flex-row p-0.5'>
					<span className="mr-1 inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium leading-5 bg-gray-100 text-gray-800">
						Simulator
					</span>
					<span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium leading-5 bg-indigo-100 text-indigo-800">
						<svg className="-ml-0.5 mr-1.5 h-2 w-2 text-indigo-400" fill="currentColor" viewBox="0 0 8 8">
							<circle cx="4" cy="4" r="3" />
						</svg>
						v 1.0.1.b
					</span>
				</div> 
			</div>
		)
	}

	const renderButtons = () => {
		return (
			<div className='flex w-full h-8 my-1'>
				<div className='mx-auto p-0.5 flex'>
					<button onClick={(e) => onScreenshotButtonClick(e)} className="whitespace-no-wrap mr-1 w-auto inline-flex items-center px-2.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 mx-auto mr-1 icon-camera"><path className="primary" d="M6.59 6l2.7-2.7A1 1 0 0 1 10 3h4a1 1 0 0 1 .7.3L17.42 6H20a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8c0-1.1.9-2 2-2h2.59zM19 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-7 8a5 5 0 1 0 0-10 5 5 0 0 0 0 10z"/><path className="secondary" d="M12 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/></svg>
						Screenshot
					</button>
					<button className="whitespace-no-wrap mr-1 w-auto inline-flex items-center px-2.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 mx-auto mr-1 icon-videocam"><path className="secondary" d="M13.59 12l6.7-6.7A1 1 0 0 1 22 6v12a1 1 0 0 1-1.7.7L13.58 12z"/><rect width="14" height="14" x="2" y="5" className="primary" rx="2"/></svg>
						Record
					</button>
					{/* <button className="mr-1 inline-flex items-center px-2.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 mr-1 icon-view-visible"><path className="primary" d="M17.56 17.66a8 8 0 0 1-11.32 0L1.3 12.7a1 1 0 0 1 0-1.42l4.95-4.95a8 8 0 0 1 11.32 0l4.95 4.95a1 1 0 0 1 0 1.42l-4.95 4.95zM11.9 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10z"/><circle cx="12" cy="12" r="3" className="secondary"/></svg>
						Compare
					</button>
					<button className="mr-1 inline-flex items-center px-2.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 mr-1 icon-view-visible"><path className="primary" d="M17.56 17.66a8 8 0 0 1-11.32 0L1.3 12.7a1 1 0 0 1 0-1.42l4.95-4.95a8 8 0 0 1 11.32 0l4.95 4.95a1 1 0 0 1 0 1.42l-4.95 4.95zM11.9 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10z"/><circle cx="12" cy="12" r="3" className="secondary"/></svg>
						Screenshot
					</button>
					<button className="inline-flex items-center px-2.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 mr-1 icon-view-visible"><path className="primary" d="M17.56 17.66a8 8 0 0 1-11.32 0L1.3 12.7a1 1 0 0 1 0-1.42l4.95-4.95a8 8 0 0 1 11.32 0l4.95 4.95a1 1 0 0 1 0 1.42l-4.95 4.95zM11.9 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10z"/><circle cx="12" cy="12" r="3" className="secondary"/></svg>
						Screenshot
					</button> */}
				</div>
			</div>
		)
	}

	const iFrameLoaded = () => {
		//iframeRef.current?.contentWindow?.postMessage('requestSession', '*');
		setTimeout(() => setIframeLoaded(true), 300)
	}
	
	const renderLoadingScreen = () => {
		return (
			<div className='absolute z-0 w-full h-full'>
				<img className="object-contain w-full h-full" src='iphonexBlack.png'></img>
			</div>
		)
	}


	const renderScreen = () => {
		return (
			<div className='flex-col flex-shrink-0 w-64 mx-auto mb-3 ' style={{height: '583px', width: '281px'}}> 
				
				<div className='relative flex object-contain w-full h-full'>
					{ !iframeLoaded ? renderLoadingScreen() : <></> }
					{/* <div className='absolute z-0 w-full h-full'>
						<img className="object-contain w-full h-full" src='iphonexBlack.png'></img>
					</div>	 */}
					<iframe onLoad={() => iFrameLoaded()} ref={iframeRef} src="https://appetize.io/embed/fczxctdk32wb17vabzd3k2wq9w?device=iphonex&scale=69&autoplay=false&orientation=portrait&deviceColor=black&xdocMsg=true" width="100%" height="100%" frameBorder="0" scrolling="no"></iframe>
				</div>							
			</div>
		)
	}

	return (
		<div className='flex flex-col '>
			{ renderTag() }
			<div className='pb-3 pl-3 pr-3 border-2 border-gray-400 border-dashed rounded-lg'>
				<div className='h-full'>
					{ renderButtons() }
					{ renderScreen() }
				</div>
			</div>
		</div>
	)
}

export default CreatePostViewSimulator