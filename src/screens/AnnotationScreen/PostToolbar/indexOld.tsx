import React from 'react'

const PostToolbar = () => {
	return (
		<div className='bg-blue-200 rounded-full flex-shrink-0 w-16 flex-col p-1'>
			<div id='button-container' className=' w-full h-full flex-col'> 
				<div className='w-full h-16 flex flex-col'>
					<button className="focus:outline-none border-gray-400 shadow-lg active:shadow-sm active:bg-gray-300 w-10 h-10 bg-gray-100 rounded-full mx-auto" style={{borderWidth: "1px"}}>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="mx-auto w-6 icon-camera"><path className="primary" d="M6.59 6l2.7-2.7A1 1 0 0 1 10 3h4a1 1 0 0 1 .7.3L17.42 6H20a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8c0-1.1.9-2 2-2h2.59zM19 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-7 8a5 5 0 1 0 0-10 5 5 0 0 0 0 10z"/><path className="secondary" d="M12 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/></svg>
					</button>
					<a className="text-center font-semibold text-gray-900" style={{fontSize: '10px'}}>Screenshot</a>
				</div>
				<div className='w-full h-16 my-1 flex flex-col'>
					<button className="focus:outline-none  border-gray-400 shadow-lg active:shadow-sm active:bg-gray-300 w-10 h-10 bg-gray-100 rounded-full mx-auto" style={{borderWidth: "1px"}}>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="mx-auto w-6 icon-videocam"><path className="secondary" d="M13.59 12l6.7-6.7A1 1 0 0 1 22 6v12a1 1 0 0 1-1.7.7L13.58 12z"/><rect width="14" height="14" x="2" y="5" className="primary" rx="2"/></svg>
					</button>
					<a className=" text-xs text-center font-semibold text-gray-900" style={{fontSize: '10px'}}>Record</a>
				</div>
				<div className='w-full h-16 my-1 flex flex-col'>
					<button className="focus:outline-none  border-gray-400 shadow-lg active:shadow-sm active:bg-gray-300 w-10 h-10 bg-gray-100 rounded-full mx-auto" style={{borderWidth: "1px"}}>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 mx-auto icon-user"><path className="primary" d="M12 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10z"/><path className="secondary" d="M21 20v-1a5 5 0 0 0-5-5H8a5 5 0 0 0-5 5v1c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2z"/></svg>
					</button>
					<a className=" text-xs text-center font-semibold text-gray-900" style={{fontSize: '10px'}}>Assign to</a>
				</div>
				<div className='w-full h-16 my-1 flex flex-col'>
					<button className="focus:outline-none  border-gray-400 shadow-lg active:shadow-sm active:bg-gray-300 w-10 h-10 bg-gray-100 rounded-full mx-auto" style={{borderWidth: "1px"}}>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 mx-auto icon-chat-group"><path className="primary" d="M20.3 12.04l1.01 3a1 1 0 0 1-1.26 1.27l-3.01-1a7 7 0 1 1 3.27-3.27zM11 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/><path className="secondary" d="M15.88 17.8a7 7 0 0 1-8.92 2.5l-3 1.01a1 1 0 0 1-1.27-1.26l1-3.01A6.97 6.97 0 0 1 5 9.1a9 9 0 0 0 10.88 8.7z"/></svg>				
					</button>
					<a className=" text-xs text-center font-semibold text-gray-900" style={{fontSize: '10px'}}>Messages</a>
				</div>
				<div className='w-full h-16 my-1 flex flex-col'>
					<button className="focus:outline-none  border-gray-400 shadow-lg active:shadow-sm active:bg-gray-300 w-10 h-10 bg-gray-100 rounded-full mx-auto" style={{borderWidth: "1px"}}>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 mx-auto icon-widget-add"><path className="primary" d="M5 13h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4c0-1.1.9-2 2-2zm10 0h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-4c0-1.1.9-2 2-2zM5 3h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2z"/><path className="secondary" d="M18 6h2a1 1 0 0 1 0 2h-2v2a1 1 0 0 1-2 0V8h-2a1 1 0 0 1 0-2h2V4a1 1 0 0 1 2 0v2z"/></svg>
					</button>
					<a className=" text-xs text-center font-semibold text-gray-900" style={{fontSize: '10px'}}>Publish</a>
				</div>
				<div className='w-full h-16 my-1 flex flex-col'>
					<button className="focus:outline-none  border-gray-400 shadow-lg active:shadow-sm active:bg-gray-300 w-10 h-10 bg-gray-100 rounded-full mx-auto" style={{borderWidth: "1px"}}>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 mx-auto icon-flag"><path className="primary" d="M3 15a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h8a1 1 0 0 1 .7.3L13.42 5H21a1 1 0 0 1 .9 1.45L19.61 11l2.27 4.55A1 1 0 0 1 21 17h-8a1 1 0 0 1-.7-.3L10.58 15H3z"/><rect width="2" height="20" x="2" y="2" className="secondary" rx="1"/></svg>
					</button>
					<a className=" text-xs text-center font-semibold text-gray-900" style={{fontSize: '10px'}}>Flag</a>
				</div>
				<div className='w-full h-16 my-1 flex flex-col'>
					<button className="focus:outline-none  border-gray-400 shadow-lg active:shadow-sm active:bg-gray-300 w-10 h-10 bg-gray-100 rounded-full mx-auto" style={{borderWidth: "1px"}}>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 mx-auto icon-device-smartphone"><path className="primary" d="M8 2h8a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4c0-1.1.9-2 2-2z"/><path className="secondary" d="M12 20a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/></svg>
					</button>
					<a className=" text-xs text-center font-semibold text-gray-900" style={{fontSize: '10px'}}>Compare</a>
				</div>
				<div className='w-full h-16 my-1 flex flex-col'>
					<button className="focus:outline-none  border-gray-400 shadow-lg active:shadow-sm active:bg-gray-300 w-10 h-10 bg-gray-100 rounded-full mx-auto" style={{borderWidth: "1px"}}>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 mx-auto icon-edit"><path className="primary" d="M4 14a1 1 0 0 1 .3-.7l11-11a1 1 0 0 1 1.4 0l3 3a1 1 0 0 1 0 1.4l-11 11a1 1 0 0 1-.7.3H5a1 1 0 0 1-1-1v-3z"/><rect width="20" height="2" x="2" y="20" className="secondary" rx="1"/></svg>
					</button>
					<a className=" text-xs text-center font-semibold text-gray-900" style={{fontSize: '10px'}}>Annotate</a>
				</div>
			</div>
		</div>
	)
}