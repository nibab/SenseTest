import React from 'react'

export const ReleaseStatusBar = () => {
	return (
		<div className="bg-whiteflex flex-col">
			<div className="mx-auto w-full flex justify-center h-10 relative">
				<div className='h-full w-full absolute flex'>
					<div className="flex flex-auto right-0 my-auto z-0 overflow-hidden justify-end pr-2">

						<img className="relative z-30 inline-block h-8 w-8 rounded-full text-white shadow-solid" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
						<img className="relative z-20 -ml-2 inline-block h-8 w-8 rounded-full text-white shadow-solid" src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
						<img className="relative z-10 -ml-2 inline-block h-8 w-8 rounded-full text-white shadow-solid" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80" alt="" />
						<img className="relative mr-0 z-0 -ml-2 inline-block h-8 w-8 rounded-full text-white shadow-solid" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
						<div className="bg-blue-500 rounded-full w-10 -ml-1 flex h-6=8 text-sm font-semibold items-center justify-center text-gray-300" style={{fontSize: '13px'}}> 
							+15
						</div>
					</div>
				</div>
				<div className="flex my-auto">
					Release progress
				</div>
			</div>
		</div>
	)
}