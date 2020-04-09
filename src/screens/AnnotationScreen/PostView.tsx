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
            <div className='bg-white h-auto shadow-xl mt-3 rounded-lg p-3 w-96'>
                <h2 className='text-base font-bold'>{title}</h2>
                <div className='-mt-1 text-xs uppercase text-gray-500 font-semibold '>
                    { dateCreated }
                </div>
                <p className='mt-1 text-xs leading-tight'>
                    { text }
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
            <div className='h-full flex-auto flex flex-row'>
                <div className='hidden flex-shrink-0 bg-gray-100 rounded-full shadow-lg h-64 ml-3 mt-3 w-16'></div>
                <DeviceScreenshot src={window.URL.createObjectURL(post.image)}/>
                <div className='flex-auto h-full flex flex-col ml-3 mr-3'> 
                    { renderPostText(post.title, post.text, "21/02/2020 10:30PM EST") }
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