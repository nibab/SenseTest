import React from 'react'
import VersionTag from '../../../components/VersionTag'

const Attachment = () => {
	const renderTag = () => {
		return (
			<div className='flex w-full h-8 '>
				<div className=' pb-1 mx-auto flex flex-row p-0.5'>
					<span className="mr-1 inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium leading-5 bg-gray-100 text-gray-800">
						Attachment
					</span>
					<VersionTag version={"v 1.0.0b"} />
				</div> 
			</div>
		)
	}

	const renderButtons = () => {
		return (
			<div className='flex w-full h-8 my-1'>
				<div className='mx-auto flex flex-row p-0.5'>
					<button className="inline-flex items-center mr-1 inline-flex items-center px-2.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 mr-1 icon-view-visible"><path className="primary" d="M17.56 17.66a8 8 0 0 1-11.32 0L1.3 12.7a1 1 0 0 1 0-1.42l4.95-4.95a8 8 0 0 1 11.32 0l4.95 4.95a1 1 0 0 1 0 1.42l-4.95 4.95zM11.9 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10z"/><circle cx="12" cy="12" r="3" className="secondary"/></svg>
						Visual Diff
					</button>
				</div>
			</div>
		)
	}

	const renderScreen = () => {
		return (
			<div className='flex-col flex-shrink-0 w-64 mb-3 ' style={{height: '583px', width: '281px'}}> 
				<div className='relative flex object-contain w-full h-full'>
					<div className='absolute z-0 w-full h-full'>
						<img className="object-contain w-full h-full" src='iphonexBlack.png'></img>
					</div>	
					<div className='z-10 mx-auto my-auto overflow-hidden ' style={{width: '92.1%', height: '96.5%', borderRadius: '2.2rem'}}>
						<img className='object-contain w-full h-full mx-auto' src='newsScreenshot.png'></img>
					</div>
				</div>							
			</div>
		)
	}

	return (
		<div className='flex flex-col '>
			{ renderTag() }
			<div className='pb-3 pl-3 pr-3 border-2 border-gray-400 border-dashed rounded-lg'>
				<div className='h-full '>
					{ renderButtons() }
					{ renderScreen() }
				</div>
			</div>
		</div>
	)
}

export default Attachment