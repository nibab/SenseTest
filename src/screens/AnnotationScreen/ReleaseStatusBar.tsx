import React from 'react'

export const ReleaseStatusBar = () => {
	return (
		<div className='relative flex-auto '>
			<div className="absolute sticky z-30 w-full px-2 pt-2">
				<div className='flex flex-col w-full bg-gray-200shadow-md '> 
					<div className="relative flex justify-center w-full h-10 mx-auto">
						<div className='absolute flex w-full h-full'>
							<div className="right-0 z-0 flex justify-end flex-auto my-auto overflow-hidden">
	
								<img className="relative z-30 inline-block w-8 h-8 text-white rounded-full shadow-solid" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
								<img className="relative z-20 inline-block w-8 h-8 -ml-2 text-white rounded-full shadow-solid" src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
								<img className="relative z-10 inline-block w-8 h-8 -ml-2 text-white rounded-full shadow-solid" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80" alt="" />
								<img className="relative z-0 inline-block w-8 h-8 mr-0 -ml-2 text-white rounded-full shadow-solid" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
								<div className="bg-blue-500 rounded-full w-10 -ml-1 flex h-6=8 text-sm font-semibold items-center justify-center text-gray-100" style={{fontSize: '13px'}}> 
									+15
								</div>
							</div>
						</div>
						<div className="flex flex-row my-auto text-xs font-semibold text-gray-700 uppercase ">
							Release progress
							<div className='flex flex-row h-2 my-auto ml-4 w-96'>
								<div className='w-1/3 h-2 bg-green-500 rounded-full rounded-r-none'></div>
								<div className='w-full h-2 bg-red-500 rounded-full rounded-l-none'></div>
							</div>
							
						</div>
					</div>
				</div>

			</div>
		</div>
	)
}