import React from 'react'

export const PostNavigator = () => {
	return (
		<div className='shadow-lg bg-white w-4/12 pt-1 h-screen overflow-scroll my-auto flex flex-col'>
				
			<div id='menu' className='flex-shrink-0 flex flex-col pb-5 '>
				<div className="flex-shrink-0 flex border-b border-gray-200 px-4 py-2 ">
					<div className="flex-shrink-0 group block focus:outline-none ">
						<div className="flex items-center">
						<div className=''>
							<img className="inline-block h-8 w-8 rounded-md" src="appIcon.png" alt="" />
						</div>
						<div className="ml-2 ">
							<p className="text-sm leading-3 pt-2 font-medium text-gray-700 group-hover:text-gray-900">
							App.ly
							</p>
							<p className="text-xs font-medium text-gray-500 group-hover:text-gray-700 group-focus:underline transition ease-in-out duration-150">
							V 0.1.1beta
							</p>
						</div>
						</div>
					</div>
				</div>
				
				<div className="cursor-pointer mx-2 hover:bg-gray-200 rounded-lg font-normal pl-3 pr-3 pt-1 mt-2 pb-1 flex flex-row relative text-gray-700">
					<div className='my-auto'>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 mr-2 icon-notification"><circle cx="12" cy="19" r="3" className="secondary"/><path className="primary" d="M10.02 4.28L10 4a2 2 0 1 1 3.98.28A7 7 0 0 1 19 11v5a1 1 0 0 0 1 1 1 1 0 0 1 0 2H4a1 1 0 0 1 0-2 1 1 0 0 0 1-1v-5a7 7 0 0 1 5.02-6.72z"/></svg>
					</div>

					<a className='my-auto w-full text-sm my-auto  truncate'>
						Notifications							
					</a>
					
				</div>
				<div className="cursor-pointer mx-2 hover:bg-gray-200 rounded-lg font-normal pl-3 pr-3  pt-1 pb-1 flex flex-row relative text-gray-700">
					<div className='my-auto h-full'>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 mr-2 icon-cog"><path className="primary" d="M6.8 3.45c.87-.52 1.82-.92 2.83-1.17a2.5 2.5 0 0 0 4.74 0c1.01.25 1.96.65 2.82 1.17a2.5 2.5 0 0 0 3.36 3.36c.52.86.92 1.8 1.17 2.82a2.5 2.5 0 0 0 0 4.74c-.25 1.01-.65 1.96-1.17 2.82a2.5 2.5 0 0 0-3.36 3.36c-.86.52-1.8.92-2.82 1.17a2.5 2.5 0 0 0-4.74 0c-1.01-.25-1.96-.65-2.82-1.17a2.5 2.5 0 0 0-3.36-3.36 9.94 9.94 0 0 1-1.17-2.82 2.5 2.5 0 0 0 0-4.74c.25-1.01.65-1.96 1.17-2.82a2.5 2.5 0 0 0 3.36-3.36zM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/><circle cx="12" cy="12" r="2" className="secondary"/></svg>
					</div>

					<a className='flex w-full text-sm my-auto  truncate'>
						Settings 							
					</a>
					
				</div>
			</div>

			<div id='issues' className='flex flex-col h-full'>
				<div className='w-full h-6 mb-4'>
					<h2 className='font-normal p-3 font-medium uppercase text-xs text-gray-600 tracking-wider'>Issues</h2>
				</div>
				<div className='h-full overflow-scroll'>
					<div className="cursor-pointer bg-blue-100 shadow-sm mx-2 rounded-lg font-medium pl-3 pr-3 pt-1 pb-1 mb-1 flex flex-row">
						<a className='my-auto w-full text-blue-800 text-sm truncate'>
							The title becomes too big when streetched out by							
						</a>
						<div className=' flex'>
							<span className="ml-1 bg-red-100 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium leading-4 bg-red-100 text-red-800">
								Blocker
							</span>
							
						</div>
					</div>
					<div className="cursor-pointer mx-2 hover:bg-gray-200 rounded-lg font-normal pl-3 pr-3 pt-1 pb-1 flex flex-row relative">
						{/* <span className="flex-shrink-0 my-auto mr-1 top-0 left-0 block h-4 w-6 rounded-full text-white bg-red-400 flex items-center justify-center text-xs font-bold">12</span> */}
						<a className=' my-auto w-full text-sm text-gray-700 truncate'>
							The title becomes too big when streetched out by							
						</a>
						<div className='flex'>
							<span className="ml-1 bg-red-100 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium leading-4 bg-red-100 text-red-800">
								Blocker
							</span>
							
						</div>	
					</div>
					
				</div>
			</div>

			<div id='createNew' className='border-t flex-shrink-0 flex flex-col h-12 bottom-0 text-gray-700 hover:bg-gray-200 hover:text-blue-800'>
				
				<div className="cursor-pointer h-full mx-2  font-medium pl-3 pr-3 flex flex-row">
					<div className='my-auto'>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 mr-1 icon-add"><path className="primary" fill-rule="evenodd" d="M17 11a1 1 0 0 1 0 2h-4v4a1 1 0 0 1-2 0v-4H7a1 1 0 0 1 0-2h4V7a1 1 0 0 1 2 0v4h4z"/></svg>
					</div>

					<a className='my-auto w-full text-sm my-auto  truncate'>
						Create New							
					</a>
					
				</div>
			</div>
		</div>
	)
}