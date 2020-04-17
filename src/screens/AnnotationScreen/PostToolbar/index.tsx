import React from 'react'
import { Post } from '../../../types'

type PostToolbarProps = {
	currentPost: Post | undefined
	setCurrentPost: (post: Post | undefined) => void
	setDisplayCreateNewPost: (displayCreateNewPost: boolean) => void
	posts: Record<string, Post>
}

export const PostToolbar = ({ currentPost, setCurrentPost, setDisplayCreateNewPost, posts}: PostToolbarProps) => {
	
	const renderHeader = () => {
		return (
			<div id='menu' className='flex-shrink-0 flex flex-col pb-5 '>
				<div className="flex-shrink-0 flex border-b border-gray-200 px-4 py-2 hover:bg-gray-200 cursor-pointer">
					<div className="flex-shrink-0 group block focus:outline-none ">
						<div className="flex items-center">
						<div className='bg-red-400'>
							<img className="inline-block h-8 w-8 rounded-md" src="appIcon.png" alt="" />
						</div>
						<div className="ml-2">
							<p className="text-sm leading-3 pt-2 font-medium text-gray-700 group-hover:text-gray-900">
							App.ly
							</p>
							<p className="text-xs leading-5 font-medium text-gray-500 group-hover:text-gray-700 group-focus:underline transition ease-in-out duration-150">
							V 0.1.1bet
							</p>
						</div>
						</div>
					</div>
				</div>
				
				<div className="cursor-pointer mx-2 hover:bg-gray-200 rounded-lg font-normal pl-3 pr-3 pt-1 mt-2 pb-1 flex flex-row relative text-gray-700">
					<div className='my-auto'>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 mr-2 icon-notification"><circle cx="12" cy="19" r="3" className="secondary"/><path className="primary" d="M10.02 4.28L10 4a2 2 0 1 1 3.98.28A7 7 0 0 1 19 11v5a1 1 0 0 0 1 1 1 1 0 0 1 0 2H4a1 1 0 0 1 0-2 1 1 0 0 0 1-1v-5a7 7 0 0 1 5.02-6.72z"/></svg>
					</div>

					<div className='my-auto w-full text-sm my-auto  truncate'>
						Notifications							
					</div>
					
				</div>
				<div className="cursor-pointer mx-2 hover:bg-gray-200 rounded-lg font-normal pl-3 pr-3  pt-1 pb-1 flex flex-row relative text-gray-700">
					<div className='my-auto h-full'>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 mr-2 icon-cog"><path className="primary" d="M6.8 3.45c.87-.52 1.82-.92 2.83-1.17a2.5 2.5 0 0 0 4.74 0c1.01.25 1.96.65 2.82 1.17a2.5 2.5 0 0 0 3.36 3.36c.52.86.92 1.8 1.17 2.82a2.5 2.5 0 0 0 0 4.74c-.25 1.01-.65 1.96-1.17 2.82a2.5 2.5 0 0 0-3.36 3.36c-.86.52-1.8.92-2.82 1.17a2.5 2.5 0 0 0-4.74 0c-1.01-.25-1.96-.65-2.82-1.17a2.5 2.5 0 0 0-3.36-3.36 9.94 9.94 0 0 1-1.17-2.82 2.5 2.5 0 0 0 0-4.74c.25-1.01.65-1.96 1.17-2.82a2.5 2.5 0 0 0 3.36-3.36zM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/><circle cx="12" cy="12" r="2" className="secondary"/></svg>
					</div>

					<div className='flex w-full text-sm my-auto  truncate'>
						Settings 							
					</div>
					
				</div>
			</div>
		)
	}



	const renderActiveItem = () => {

	}	

	const renderPosts = () => {
		let items: JSX.Element[] = []
		for (let post in posts) {
			items.push(renderItem(posts[post]))
		}
		return items
	}

	const renderItem = (post: Post) => {
		const common = 'mb-1 mx-2 pl-3 pr-3 pt-1 pb-1 flex flex-row rounded-lg cursor-pointer'
		const selectedClassName = 'bg-blue-100 shadow-sm font-medium text-blue-800 ' + ' ' + common
		const notSelectedClassName = 'hover:bg-gray-200 font-normal relative text-gray-700'  + ' ' + common

		const className = currentPost !== undefined && post.id === currentPost.id ? selectedClassName : notSelectedClassName

		return (
			<div onClick={() => {setDisplayCreateNewPost(false); setCurrentPost(post)}} className={className}>
				{/* <span className="flex-shrink-0 my-auto mr-1 top-0 left-0 block h-4 w-6 rounded-full text-white bg-red-400 flex items-center justify-center text-xs font-bold">12</span> */}
				<div className=' my-auto w-full text-sm truncate'>
					{ post.title }							
				</div>
				<div className='flex'>
					<span className="ml-1 bg-red-100 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium leading-4 bg-red-100 text-red-800">
						Blocker
					</span>
				</div>	
			</div>
		)	
	}

	const renderCreateNewButton = () => {
		return (
			<div id='createNew' onClick={() => setDisplayCreateNewPost(true)} className='border-t flex-shrink-0 flex flex-col h-12 bottom-0 text-gray-700 hover:bg-gray-200 hover:text-blue-800'>
				
				<div className="cursor-pointer h-full mx-2  font-medium pl-3 pr-3 flex flex-row">
					<div className='my-auto'>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 mr-1 icon-add"><path className="primary" fill-rule="evenodd" d="M17 11a1 1 0 0 1 0 2h-4v4a1 1 0 0 1-2 0v-4H7a1 1 0 0 1 0-2h4V7a1 1 0 0 1 2 0v4h4z"/></svg>
					</div>

					<div className='my-auto w-full text-sm my-auto  truncate'>
						Create New							
					</div>
					
				</div>
			</div>
		)
	}

	return (
		<div className='flex-shrink-0 shadow-lg bg-white w-3/12 h-screen overflow-scroll my-auto flex flex-col'>
			{ renderHeader() }

			<div id='issues' className='flex flex-col h-full'>
				<div className='w-full h-6 mb-4'>
					<h2 className='font-normal p-3 font-medium uppercase text-xs text-gray-600 tracking-wider'>Issues</h2>
				</div>
				<div className='h-full overflow-scroll'>
					{ renderPosts() }
				</div>
			</div>
			{ renderCreateNewButton() }
		</div>
	)
}