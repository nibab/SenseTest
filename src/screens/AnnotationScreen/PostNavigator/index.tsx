import React from 'react'

export const PostNavigator = () => {
	return (
		<div className='flex flex-col w-4/12 h-screen pt-1 my-auto overflow-scroll bg-white shadow-lg'>
				
			<div id='menu' className='flex flex-col flex-shrink-0 pb-5 '>
				<div className="flex flex-shrink-0 px-4 py-2 border-b border-gray-200 ">
					<div className="flex-shrink-0 block group focus:outline-none ">
						<div className="flex items-center">
						<div className=''>
							<img className="inline-block w-8 h-8 rounded-md" src="appIcon.png" alt="" />
						</div>
						<div className="ml-2 ">
							<p className="pt-2 text-sm font-medium leading-3 text-gray-700 group-hover:text-gray-900">
							App.ly
							</p>
							<p className="text-xs font-medium text-gray-500 transition duration-150 ease-in-out group-hover:text-gray-700 group-focus:underline">
							V 0.1.1beta
							</p>
						</div>
						</div>
					</div>
				</div>
				
				<div className="relative flex flex-row pt-1 pb-1 pl-3 pr-3 mx-2 mt-2 font-normal text-gray-700 rounded-lg cursor-pointer hover:bg-gray-200">
					<div className='my-auto'>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 mr-2 icon-notification"><circle cx="12" cy="19" r="3" className="secondary"/><path className="primary" d="M10.02 4.28L10 4a2 2 0 1 1 3.98.28A7 7 0 0 1 19 11v5a1 1 0 0 0 1 1 1 1 0 0 1 0 2H4a1 1 0 0 1 0-2 1 1 0 0 0 1-1v-5a7 7 0 0 1 5.02-6.72z"/></svg>
					</div>

					<a className='w-full my-auto text-sm truncate'>
						Notifications						
					</a>
					
				</div>
				<div className="relative flex flex-row pt-1 pb-1 pl-3 pr-3 mx-2 font-normal text-gray-700 rounded-lg cursor-pointer hover:bg-gray-200">
					<div className='h-full my-auto'>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 mr-2 icon-cog"><path className="primary" d="M6.8 3.45c.87-.52 1.82-.92 2.83-1.17a2.5 2.5 0 0 0 4.74 0c1.01.25 1.96.65 2.82 1.17a2.5 2.5 0 0 0 3.36 3.36c.52.86.92 1.8 1.17 2.82a2.5 2.5 0 0 0 0 4.74c-.25 1.01-.65 1.96-1.17 2.82a2.5 2.5 0 0 0-3.36 3.36c-.86.52-1.8.92-2.82 1.17a2.5 2.5 0 0 0-4.74 0c-1.01-.25-1.96-.65-2.82-1.17a2.5 2.5 0 0 0-3.36-3.36 9.94 9.94 0 0 1-1.17-2.82 2.5 2.5 0 0 0 0-4.74c.25-1.01.65-1.96 1.17-2.82a2.5 2.5 0 0 0 3.36-3.36zM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/><circle cx="12" cy="12" r="2" className="secondary"/></svg>
					</div>

					<a className='flex w-full my-auto text-sm truncate'>
						Settings 							
					</a>
					
				</div>
			</div>

			<div id='issues' className='flex flex-col h-full'>
				<div className='w-full h-6 mb-4'>
					<h2 className='p-3 text-xs font-normal font-medium tracking-wider text-gray-600 uppercase'>Issues</h2>
				</div>
				<div className='h-full overflow-scroll'>
					<div className="flex flex-row pt-1 pb-1 pl-3 pr-3 mx-2 mb-1 font-medium bg-blue-100 rounded-lg shadow-sm cursor-pointer">
						<a className='w-full my-auto text-sm text-blue-800 truncate'>
							The title becomes too big when streetched out by							
						</a>
						<div className='flex '>
							<span className="ml-1 bg-red-100 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium leading-4 bg-red-100 text-red-800">
								Blocker
							</span>
							
						</div>
					</div>
					<div className="relative flex flex-row pt-1 pb-1 pl-3 pr-3 mx-2 font-normal rounded-lg cursor-pointer hover:bg-gray-200">
						{/* <span className="top-0 left-0 flex items-center justify-center flex-shrink-0 block w-6 h-4 my-auto mr-1 text-xs font-bold text-white bg-red-400 rounded-full">12</span> */}
						<a className='w-full my-auto text-sm text-gray-700 truncate '>
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

			<div id='createNew' className='bottom-0 flex flex-col flex-shrink-0 h-12 text-gray-700 border-t hover:bg-gray-200 hover:text-blue-800'>
				
				<div className="flex flex-row h-full pl-3 pr-3 mx-2 font-medium cursor-pointer">
					<div className='my-auto'>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 mr-1 icon-add"><path className="primary" fill-rule="evenodd" d="M17 11a1 1 0 0 1 0 2h-4v4a1 1 0 0 1-2 0v-4H7a1 1 0 0 1 0-2h4V7a1 1 0 0 1 2 0v4h4z"/></svg>
					</div>

					<a className='w-full my-auto text-sm truncate'>
						Create New							
					</a>
					
				</div>
			</div>
		</div>
	)
}