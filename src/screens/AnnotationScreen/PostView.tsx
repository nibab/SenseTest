import React, { useEffect } from 'react'
import { Post } from '../../types'
import { DeviceScreenshot } from './Screenshot'

type PostViewProps = {
    post: Post
}

const PostView = ({ post }: PostViewProps) => {
    useEffect(() => {

    }, [post])

    const renderPostText = (title: string, text: string, dateCreated: string) => {
        return (
            <div className='bg-white shadow-xl rounded-lg p-3 w-96'>
                <h2 className='text-base font-bold'>{title}</h2>
                <div className='-mt-1 text-xs uppercase text-gray-500 font-semibold '>
                    { dateCreated }
                </div>
                <p className='mt-1 text-xs leading-tight flex-wrap'>
                    { "The fox jumped on. The fox jumped on the rabbit. The fox jumped on the moose." }
                </p>
            </div>
        )
    }

    const renderComments = () => {
        return (
            <div className='bg-gray-100 hidden flex flex-col p-3 shadow-xl mt-3 rounded-lg h-auto overflow-y-scroll mb-3'>
                <div className='flex-shrink-0 bg-gray-200 w-auto h-12 rounded-lg'></div>
                <div className='flex-shrink-0 bg-gray-200 w-auto mt-1 h-48 rounded-lg'></div> 
                <div className='flex-shrink-0 bg-gray-200 w-auto mt-1 rounded-lg'>
                    asdads dasds asdads dasds asdads dasds asdads dasds asdads dasds asdads dasds asdads dasds asdads dasds
                    asdads dasds asdads dasds asdads dasds asdads dasds asdads dasds asdads dasds asdads dasds asdads dasds

                    asdads dasds asdads dasds asdads dasds asdads dasds asdads dasds asdads dasds asdads dasds asdads dasds

                </div> 
                <div className='flex-shrink-0 bg-gray-200 w-auto mt-1 h-32 rounded-lg'></div>  
                <div className='flex-shrink-0 bg-gray-200 w-auto mt-1 h-32 rounded-lg'></div> 
            </div>
        )
	}
	
	const renderToolBar = () => {
		return (
			<div className='rounded-full flex-shrink-0 w-16 p-1'>
				<div id='button-container' className='w-full flex-col'> 
					<div className='w-full h-16 my-1 flex flex-col'>
						<button className="focus:outline-none  border-gray-400 shadow-lg active:shadow-sm active:bg-gray-300 w-10 h-10 bg-gray-100 rounded-full mx-auto" style={{borderWidth: "1px"}}>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 mx-auto icon-edit"><path className="primary" d="M4 14a1 1 0 0 1 .3-.7l11-11a1 1 0 0 1 1.4 0l3 3a1 1 0 0 1 0 1.4l-11 11a1 1 0 0 1-.7.3H5a1 1 0 0 1-1-1v-3z"/><rect width="20" height="2" x="2" y="20" className="secondary" rx="1"/></svg>
						</button>
						<a className=" text-xs text-center font-semibold text-gray-900" style={{fontSize: '10px'}}>Annotate</a>
					</div>
					<div className='w-full h-16 my-1 flex flex-col'>
						<button className="focus:outline-none  border-gray-400 shadow-lg active:shadow-sm active:bg-gray-300 w-10 h-10 bg-gray-100 rounded-full mx-auto" style={{borderWidth: "1px"}}>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 mx-auto icon-chat-group"><path className="primary" d="M20.3 12.04l1.01 3a1 1 0 0 1-1.26 1.27l-3.01-1a7 7 0 1 1 3.27-3.27zM11 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/><path className="secondary" d="M15.88 17.8a7 7 0 0 1-8.92 2.5l-3 1.01a1 1 0 0 1-1.27-1.26l1-3.01A6.97 6.97 0 0 1 5 9.1a9 9 0 0 0 10.88 8.7z"/></svg>				
						</button>
						<a className=" text-xs text-center font-semibold text-gray-900" style={{fontSize: '10px'}}>Messages</a>
					</div>
					<div className='w-full h-16 my-1 flex flex-col'>
						<button className="focus:outline-none  border-gray-400 shadow-lg active:shadow-sm active:bg-gray-300 w-10 h-10 bg-gray-100 rounded-full mx-auto" style={{borderWidth: "1px"}}>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 mx-auto icon-user"><path className="primary" d="M12 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10z"/><path className="secondary" d="M21 20v-1a5 5 0 0 0-5-5H8a5 5 0 0 0-5 5v1c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2z"/></svg>
						</button>
						<a className=" text-xs text-center font-semibold text-gray-900" style={{fontSize: '10px'}}>Assign to</a>
					</div>
					<div className='w-full h-16 my-1 flex flex-col'>
						<button className="focus:outline-none  border-gray-400 shadow-lg active:shadow-sm active:bg-gray-300 w-10 h-10 bg-gray-100 rounded-full mx-auto" style={{borderWidth: "1px"}}>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 mx-auto icon-flag"><path className="primary" d="M3 15a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h8a1 1 0 0 1 .7.3L13.42 5H21a1 1 0 0 1 .9 1.45L19.61 11l2.27 4.55A1 1 0 0 1 21 17h-8a1 1 0 0 1-.7-.3L10.58 15H3z"/><rect width="2" height="20" x="2" y="2" className="secondary" rx="1"/></svg>
						</button>
						<a className=" text-xs text-center font-semibold text-gray-900" style={{fontSize: '10px'}}>Flag</a>
					</div>					
				</div>
			</div>
		)
	}

    const renderPostView = () => {
        return (
            <div className='h-full flex-auto flex flex-row'>
                <div className='hidden flex-shrink-0 bg-gray-100 rounded-full shadow-lg h-64 ml-3 w-16'></div>
                
                <div className='flex-auto h-full flex flex-col '> 
					<div className='my-auto flex w-screen flex-row justify-center'> 
						<div className='overflow-hidden mr-3 '>
							{ renderToolBar() }
						</div>
						<DeviceScreenshot src={window.URL.createObjectURL(post.image)}/>
						<div className='overflow-hidden ml-3 '>
							{ renderPostText(post.title, post.text, "21/02/2020 10:30PM EST") }
						</div>
					</div> 
					{/* This is here to act as a pad placeholder for the screenshot navigator. */}
					<div className="flex-shrink-0 h-10 w-full"></div>                  
                </div>  
            </div>
        )
    }

    return (
        <>
            { renderPostView() }
        </>
    )
}

export default PostView