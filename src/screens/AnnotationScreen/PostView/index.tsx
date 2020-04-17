import React, { useEffect, useState } from 'react'
import { Post } from '../../../types'
import { DeviceScreenshot } from '../Screenshot'

type PostViewProps = {
    post: Post
}

type DisplayState = 'None' | 'Simulator' | 'Attachment'

const PostView = ({ post }: PostViewProps) => {
	const [displayState, setDisplayState] = useState<DisplayState>('None')

    useEffect(() => {
		setDisplayState('None')
	}, [post])
	
	const renderWarningMessage = () => {
		return (
			<div className="z-30 w-full absolute bottom-0 ">
				<div className="rounded-md bg-yellow-100 shadow-xl p-4 mx-4 my-1">
					<div className="flex">
						<div className="flex-shrink-0">
							<svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
							<path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
							</svg>
						</div>
						<div className="ml-3">
							<h3 className="text-sm leading-5 font-medium text-yellow-800">
							Warning
							</h3>
							<div className=" flex flex-row text-sm leading-5 text-yellow-700 relative w-full mt-1 ">
								<div className=' my-auto '>
									There have been <b>2</b> new app versions since this post was created.
								</div>
								<span className="inline-flex rounded-md shadow-sm  mx-1">
									<button type="button" className="inline-flex items-center px-2 py-1  border border-transparent text-xs leading-4 font-medium rounded text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150">
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 mr-1 icon-device-smartphone"><path className="primary" d="M8 2h8a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4c0-1.1.9-2 2-2z"/><path className="secondary" d="M12 20a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/></svg>
										Check Latest App Version
									</button>
									
								</span>
								<div className='my-auto'>
									to see if this still an issue. 
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}

	const renderPostTitle = () => {
		// Temporary function to get today's date and display it.
		const getDate = (): string => {
			var today = new Date()
			var dd = String(today.getDate()).padStart(2, '0')
			var mm = String(today.getMonth() + 1).padStart(2, '0')
			var yyyy = today.getFullYear()

			return mm + '/' + dd + '/' + yyyy
		}

		return (
			<div className="bg-gray-100 px-3 py-1">
				<h2 className='text-base font-bold'>{post.title}</h2>
				<div className='-mt-1 text-xs uppercase text-gray-500 font-semibold '>
					{getDate()}
				</div>
				<p className='mt-1 text-xs leading-tight flex-wrap'>
					{post.title} 
				</p>
				<div className="bg-gray-300 px-4 mt-3 w-full h-0.5"></div>
			</div>
		)
	}

	const renderToolBar = () => {
		const buttonContainerClassName = 'w-full h-16 my-1 flex flex-col'
		const buttonClassName = 'focus:outline-none  border-gray-400 active:shadow-sm active:bg-gray-300 w-10 h-10 rounded-full mx-auto'
		const unSelectedButtonClassName = 'bg-white shadow-lg' + ' ' + buttonClassName
		const selectedButtonClassName = 'bg-gray-400' + ' ' + buttonClassName

		const handleButtonClick = (state: DisplayState) => {
			if (state === displayState) {
				setDisplayState('None')
			} else {
				setDisplayState(state)
			}
		}

		return (
			<div className='flex-shrink-0 mr-3'>
				<div className='rounded-full flex-shrink-0'>
					<div className='w-full flex-col'> 
						<div className={buttonContainerClassName}>
							<button onClick={() => {handleButtonClick('Attachment')}} className={displayState === 'Attachment' ? selectedButtonClassName : unSelectedButtonClassName} style={{borderWidth: '1px'}}>
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 mx-auto icon-attach"><path className="secondary" d="M20.12 11.95l-6.58 6.59a5 5 0 1 1-7.08-7.07l6.59-6.6a3 3 0 0 1 4.24 4.25l-6.58 6.59a1 1 0 1 1-1.42-1.42l6.59-6.58a1 1 0 0 0-1.42-1.42l-6.58 6.59a3 3 0 0 0 4.24 4.24l6.59-6.58a5 5 0 0 0-7.08-7.08l-6.58 6.6a7 7 0 0 0 9.9 9.9l6.59-6.6a1 1 0 0 0-1.42-1.4z"/></svg>
							</button>
							<a className=" text-xs text-center font-semibold text-gray-900" style={{fontSize: '10px'}}>Attachments</a>
						</div>
						<div className={buttonContainerClassName}>
							<button onClick={() => {handleButtonClick('Simulator')}} className={displayState === 'Simulator' ? selectedButtonClassName : unSelectedButtonClassName} style={{borderWidth: '1px'}}>
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 mx-auto icon-device-smartphone"><path className="primary" d="M8 2h8a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4c0-1.1.9-2 2-2z"/><path className="secondary" d="M12 20a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/></svg>
							</button>
							<a className=" text-xs text-center font-semibold text-gray-900" style={{fontSize: '10px'}}>Simulator</a>
						</div>
						<div className={buttonContainerClassName}>
							<button className={unSelectedButtonClassName} style={{borderWidth: '1px'}}>
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 mx-auto icon-user"><path className="primary" d="M12 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10z"/><path className="secondary" d="M21 20v-1a5 5 0 0 0-5-5H8a5 5 0 0 0-5 5v1c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2z"/></svg>
							</button>
							<a className=" text-xs text-center font-semibold text-gray-900" style={{fontSize: '10px'}}>Assign to</a>
						</div>
						<div className={buttonContainerClassName}>
							<button className={unSelectedButtonClassName} style={{borderWidth: '1px'}}>
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 mx-auto icon-flag"><path className="primary" d="M3 15a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h8a1 1 0 0 1 .7.3L13.42 5H21a1 1 0 0 1 .9 1.45L19.61 11l2.27 4.55A1 1 0 0 1 21 17h-8a1 1 0 0 1-.7-.3L10.58 15H3z"/><rect width="2" height="20" x="2" y="2" className="secondary" rx="1"/></svg>
							</button>
							<a className=" text-xs text-center font-semibold text-gray-900" style={{fontSize: '10px'}}>Flag</a>
						</div>					
					</div>
				</div>
			</div>
		)
	}

	const renderSimulator = () => {
		return (
			<div className='h-full mb-3 mr-3'>
				<div className='w-full h-8 flex'>
					<div className=' pb-1 mx-auto flex flex-row p-0.5'>
						<button className="inline-flex items-center px-2.5 mr-1 border text-xs border-transparent font-medium leading-4 rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 mr-1 icon-view-visible"><path className="primary" d="M17.56 17.66a8 8 0 0 1-11.32 0L1.3 12.7a1 1 0 0 1 0-1.42l4.95-4.95a8 8 0 0 1 11.32 0l4.95 4.95a1 1 0 0 1 0 1.42l-4.95 4.95zM11.9 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10z"/><circle cx="12" cy="12" r="3" className="secondary"/></svg>
							Visual Diff
						</button>
						<span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium leading-5 bg-indigo-100 text-indigo-800">
							<svg className="-ml-0.5 mr-1.5 h-2 w-2 text-indigo-400" fill="currentColor" viewBox="0 0 8 8">
								<circle cx="4" cy="4" r="3" />
							</svg>
							v 1.0.1.b
						</span>
					</div>
				</div>

				<div className='flex-shrink-0 flex-col' style={{height: '583px', width: '281px'}}> 
					<div className='h-full w-full object-contain flex relative'>
						<div className='h-full w-full absolute z-0'>
							<img className="h-full w-full object-contain" src='iphonexBlack.png'></img>
						</div>	
						<div className=' mx-auto my-auto z-10 overflow-hidden' style={{width: '92.1%', height: '96.5%', borderRadius: '2.2rem'}}>
							<img className='h-full w-full mx-auto object-contain' src={window.URL.createObjectURL(post.image)}></img>
						</div>
						
					</div>							
				</div>
			</div>
		)
	}

	const renderAttachment = () => {
		return (
			<div className='flex-shrink-0 h-full mb-3 mr-3 w-64 flex-col relative rounded-md' style={{height: '583px', width: '281px'}}> 
				<div className='h-full'>
					<div className='w-full h-8 flex'>
						<div className=' pb-1 mx-auto flex flex-row p-0.5'>
							<button className="inline-flex items-center px-2.5 mr-1 border text-xs border-transparent font-medium leading-4 rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 mr-1 icon-view-visible"><path className="primary" d="M17.56 17.66a8 8 0 0 1-11.32 0L1.3 12.7a1 1 0 0 1 0-1.42l4.95-4.95a8 8 0 0 1 11.32 0l4.95 4.95a1 1 0 0 1 0 1.42l-4.95 4.95zM11.9 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10z"/><circle cx="12" cy="12" r="3" className="secondary"/></svg>
								Visual Diff
							</button>
							{/* <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium leading-5 bg-indigo-100 text-indigo-800">
								<svg className="-ml-0.5 mr-1.5 h-2 w-2 text-indigo-400" fill="currentColor" viewBox="0 0 8 8">
									<circle cx="4" cy="4" r="3" />
								</svg>
								v 1.0.1.b
							</span> */}
						</div>
					</div>
					<div className='h-full w-full object-contain flex relative bg-gray-300 shadow-lg'>
						<div className='h-full w-full absolute z-0 rounded-lg'>
							{/* <img className="h-full w-full object-contain" src='iphonexBlack.png'></img> */}
						</div>	
						<div className=' mx-auto my-auto z-10 overflow-hidden' style={{width: '92.1%', height: '96.5%', borderRadius: '2.2rem'}}>
							<img className='h-full w-full mx-auto object-contain' src={window.URL.createObjectURL(post.image)}></img>
						</div>
						
						
					</div>
						
				</div>
			</div>
		)
	}

	const renderScreenshot = () => {
		return (
			<div className='flex-shrink-0 h-full mb-3 w-64 flex-col relative rounded-md' style={{height: '583px', width: '281px'}}> 
				<div className='h-full'>
					<div className='w-full h-8 flex'>
						<div className=' pb-1 mx-auto flex flex-row p-0.5'>
							
							<span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium leading-5 bg-indigo-100 text-indigo-800">
								<svg className="-ml-0.5 mr-1.5 h-2 w-2 text-indigo-400" fill="currentColor" viewBox="0 0 8 8">
									<circle cx="4" cy="4" r="3" />
								</svg>
								v 1.0.1.beta
							</span>
						</div>
					</div>
					<div className='h-full w-full object-contain flex relative bg-gray-300 shadow-lg'>
						<div className='h-full w-full absolute z-0 rounded-lg'>
							{/* <img className="h-full w-full object-contain" src=''></img> */}
						</div>	
						<div className=' mx-auto my-auto z-10 overflow-hidden' style={{width: '92.1%', height: '96.5%', borderRadius: '2.2rem'}}>
							<img className='h-full w-full mx-auto object-contain' src={window.URL.createObjectURL(post.image)}></img>
						</div>
						
						
					</div>
						
				</div>
			</div>
		)
	}

    return (
        <div className="flex flex-col w-full">
            <div className='flex-auto relative overflow-hidden'>
				{ renderWarningMessage() }
				<div className='overflow-scroll flex-auto h-full flex flex-col relative'> 
					{ renderPostTitle() }
					<div className='my-auto h-full flex flex-row pl-2 pr-2'> 
						{ renderToolBar() }
						{ displayState === 'Simulator' ? renderSimulator() : <></> }
						{ displayState === 'Attachment' ? renderAttachment() : <></> }
						{ renderScreenshot() }
						<div className='overflow-hidden px-3'>
							<div className='bg-white shadow-xl rounded-lg p-3 w-auto'>
								<h2 className='text-base font-bold'>{'titlu'}</h2>
								<div className='-mt-1 text-xs uppercase text-gray-500 font-semibold '>
									{ 'data crearii' }
								</div>
								<p className='mt-1 text-xs leading-tight flex-wrap'>
									{ "The fox jumped on. The fox jumped on the rabbit. The fox jumped on the moose." }
								</p>
							</div>
						</div>
					</div> 					
				</div>  
			</div>
        </div>
    )
}

export default PostView