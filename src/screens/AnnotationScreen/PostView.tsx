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

    const renderPostView = () => {
        return (
            <div className='bg-blue-500 h-full flex-auto flex flex-row'>
                <div className='hidden flex-shrink-0 bg-gray-100 rounded-full shadow-lg h-64 ml-3 mt-3 w-16'></div>
                
                <div className='bg-blue-300 flex-auto h-full flex flex-col '> 
					<div className='flex bg-gray-400 w-screen flex-row justify-center'> 
						<div className='flex-shrink-0 bg-green-800 w-10 flex-shrink-0 h-64 '></div>
						<DeviceScreenshot src={window.URL.createObjectURL(post.image)}/>
						<div className='overflow-hidden bg-green-300 ml-3 '>
							{ renderPostText(post.title, post.text, "21/02/2020 10:30PM EST") }
						</div>
					</div>
                    
                    { renderComments() }
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