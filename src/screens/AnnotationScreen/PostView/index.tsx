import React, { useEffect, useState } from 'react'
import { Post } from '../../../types'
import { PostViewSimulator as Simulator } from '../../../components/Simulator/PostViewSimulator'
import Attachment from './Attachment'
import PostScreenshot from '../../../components/PostScreenshot'

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
			<div className="absolute bottom-0 z-40 w-full ">
				<div className="p-4 mx-2 my-1 bg-yellow-100 rounded-md shadow-xl">
					<div className="flex">
						<div className="flex-shrink-0">
							<svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
							<path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
							</svg>
						</div>
						<div className="ml-3">
							<h3 className="text-sm font-medium leading-5 text-yellow-800">
							Warning
							</h3>
							<div className="relative flex flex-row w-full mt-1 text-sm leading-5 text-yellow-700 ">
								<div className='my-auto '>
									There have been <b>2</b> new app versions since this post was created.
								</div>
								<span className="inline-flex mx-1 rounded-md shadow-sm">
									<button type="button" className="inline-flex items-center px-2 py-1 text-xs font-medium leading-4 text-white transition duration-150 ease-in-out bg-indigo-600 border border-transparent rounded hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700">
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

	// const renderPostTitle = () => {
	// 	// Temporary function to get today's date and display it.
	// 	const getDate = (): string => {
	// 		var today = new Date()
	// 		var dd = String(today.getDate()).padStart(2, '0')
	// 		var mm = String(today.getMonth() + 1).padStart(2, '0')
	// 		var yyyy = today.getFullYear()

	// 		return mm + '/' + dd + '/' + yyyy
	// 	}

	// 	return (
	// 		<div className="pt-2 pb-1 mx-3 bg-gray-100">
	// 			<h2 className='text-base font-bold'>{post.title}</h2>
	// 			<div className='-mt-1 text-xs font-semibold text-gray-500 uppercase '>
	// 				{getDate()}
	// 			</div>
	// 			<p className='flex-wrap mt-1 text-xs leading-tight'>
	// 				{post.title} 
	// 			</p>
	// 			<div className="bg-gray-300 px-4 mt-3 w-full h-0.5"></div>
	// 		</div>
	// 	)
	// }

	const renderToolbar = () => {
		const buttonContainerClassName = 'w-full h-16 my-1 flex flex-col'
		const buttonClassName = 'focus:outline-none active:shadow-sm active:bg-gray-300 w-10 h-10 rounded-full mx-auto'
		const unSelectedButtonClassName = 'bg-white shadow-lg border-gray-400 ' + ' ' + buttonClassName
		const selectedButtonClassName = 'bg-gray-200' + ' ' + buttonClassName

		const handleButtonClick = (state: DisplayState) => {
			if (state === displayState) {
				setDisplayState('None')
			} else {
				setDisplayState(state)
			}
		}

		return (
			<div className='flex-shrink-0 mr-3'>
				<div className='flex-shrink-0 rounded-full'>
					<div className='flex-col w-full'> 
						<div className={buttonContainerClassName}>
							<button onClick={() => {handleButtonClick('Attachment')}} className={displayState === 'Attachment' ? selectedButtonClassName : unSelectedButtonClassName} style={{borderWidth: '1px'}}>
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 mx-auto icon-attach"><path className="secondary" d="M20.12 11.95l-6.58 6.59a5 5 0 1 1-7.08-7.07l6.59-6.6a3 3 0 0 1 4.24 4.25l-6.58 6.59a1 1 0 1 1-1.42-1.42l6.59-6.58a1 1 0 0 0-1.42-1.42l-6.58 6.59a3 3 0 0 0 4.24 4.24l6.59-6.58a5 5 0 0 0-7.08-7.08l-6.58 6.6a7 7 0 0 0 9.9 9.9l6.59-6.6a1 1 0 0 0-1.42-1.4z"/></svg>
							</button>
							<a className="text-xs font-semibold text-center text-gray-900 " style={{fontSize: '10px'}}>Attachments</a>
						</div>
						<div className={buttonContainerClassName}>
							<button onClick={() => {handleButtonClick('Simulator')}} className={displayState === 'Simulator' ? selectedButtonClassName : unSelectedButtonClassName} style={{borderWidth: '1px'}}>
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 mx-auto icon-device-smartphone"><path className="primary" d="M8 2h8a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4c0-1.1.9-2 2-2z"/><path className="secondary" d="M12 20a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/></svg>
							</button>
							<a className="text-xs font-semibold text-center text-gray-900 " style={{fontSize: '10px'}}>Simulator</a>
						</div>
						<div className={buttonContainerClassName}>
							<button className={unSelectedButtonClassName} style={{borderWidth: '1px'}}>
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 mx-auto icon-user"><path className="primary" d="M12 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10z"/><path className="secondary" d="M21 20v-1a5 5 0 0 0-5-5H8a5 5 0 0 0-5 5v1c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2z"/></svg>
							</button>
							<a className="text-xs font-semibold text-center text-gray-900 " style={{fontSize: '10px'}}>Assign to</a>
						</div>
						<div className={buttonContainerClassName}>
							<button className={unSelectedButtonClassName} style={{borderWidth: '1px'}}>
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 mx-auto icon-flag"><path className="primary" d="M3 15a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h8a1 1 0 0 1 .7.3L13.42 5H21a1 1 0 0 1 .9 1.45L19.61 11l2.27 4.55A1 1 0 0 1 21 17h-8a1 1 0 0 1-.7-.3L10.58 15H3z"/><rect width="2" height="20" x="2" y="2" className="secondary" rx="1"/></svg>
							</button>
							<a className="text-xs font-semibold text-center text-gray-900 " style={{fontSize: '10px'}}>Flag</a>
						</div>					
					</div>
				</div>
			</div>
		)
	}

	const renderPostTitle = () => {
		return (
			<div className="p-3 mx-2 mt-1 border-2 rounded-md bg-cool-gray-50">
				{/* <h2 className='text-base font-bold'>{post.title}</h2>
				<div className='-mt-1 text-xs font-semibold text-gray-500 uppercase '>
					2/20/20
				</div>
				<p className='flex-wrap mt-1 text-xs leading-tight'>
					{ post.text }
				</p> */}
				<div className="flex-shrink-0 block group focus:outline-none ">
					<div className="flex items-center">
						<div className=''>
							<img className="inline-block w-8 h-8 rounded-full" src={'newsScreenshot.png'} alt="" />
						</div>
						<div className="ml-2 ">
							<h2 className="pt-2 font-medium leading-3 text-gray-800 text-md group-hover:text-gray-900">
								{ post.title }
							</h2>
							<p className="text-xs font-normal leading-5 text-gray-500 transition duration-150 ease-in-out font group-hover:text-gray-700 group-focus:underline">
								{ '2/20/20' }
							</p>
						</div>
					</div>
				</div>
			</div>
		)
	}


    return (
        <div className="flex flex-col w-full">
			{ renderWarningMessage() }
           <div className='relative flex flex-col flex-auto h-full'> 
				{ renderPostTitle() }
				<div className='flex flex-row pt-1 pb-1 pl-2 pr-2 overflow-scroll'> 				
					{ renderToolbar() }	
					{ displayState === 'Simulator' ? <Simulator/> : <></> }
					{ displayState === 'Attachment' ? <Attachment/> : <></> }
					<div className='ml-3'>
						<PostScreenshot post={post} />
					</div>
					
				</div>
			</div>
        </div>
    )
}

export default PostView