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
			<div id='menu' className='flex flex-col flex-shrink-0 pb-2 '>
				<div className="flex flex-shrink-0 px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-200">
					<div className="flex-shrink-0 block group focus:outline-none ">
						<div className="flex items-center">
						<div className='bg-red-400'>
							<img className="inline-block w-8 h-8 rounded-md" src="appIcon.png" alt="" />
						</div>
						<div className="ml-2">
							<p className="pt-2 text-sm font-medium leading-3 text-gray-700 group-hover:text-gray-900">
							App.ly
							</p>
							<p className="text-xs font-medium leading-5 text-gray-500 transition duration-150 ease-in-out group-hover:text-gray-700 group-focus:underline">
							V 0.1.1bet
							</p>
						</div>
						</div>
					</div>
				</div>

				<div  onClick={() => setDisplayCreateNewPost(true)} className="relative flex flex-row pt-1 pb-1 pr-3 mx-2 mt-2 font-bold text-gray-700 rounded-lg cursor-pointer hover:bg-gray-200">
					<div className='my-auto mr-1'>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="mx-auto w-7 icon-device-smartphone"><path className="primary" d="M8 2h8a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4c0-1.1.9-2 2-2z"/><path className="secondary" d="M12 20a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/></svg>

					</div>

					<div className='w-full my-auto text-sm truncate'>
						Review App
					</div>
				</div>
				
				{/* <div className="relative flex flex-row pt-1 pb-1 pl-3 pr-3 mx-2 mt-2 font-normal text-gray-700 rounded-lg cursor-pointer hover:bg-gray-200">
					<div className='my-auto'>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 mr-2 icon-notification"><circle cx="12" cy="19" r="3" className="secondary"/><path className="primary" d="M10.02 4.28L10 4a2 2 0 1 1 3.98.28A7 7 0 0 1 19 11v5a1 1 0 0 0 1 1 1 1 0 0 1 0 2H4a1 1 0 0 1 0-2 1 1 0 0 0 1-1v-5a7 7 0 0 1 5.02-6.72z"/></svg>
					</div>

					<div className='w-full my-auto text-sm truncate'>
						Notifications							
					</div>
					
				</div>
				<div className="relative flex flex-row pt-1 pb-1 pl-3 pr-3 mx-2 font-normal text-gray-700 rounded-lg cursor-pointer hover:bg-gray-200">
					<div className='h-full my-auto'>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 mr-2 icon-cog"><path className="primary" d="M6.8 3.45c.87-.52 1.82-.92 2.83-1.17a2.5 2.5 0 0 0 4.74 0c1.01.25 1.96.65 2.82 1.17a2.5 2.5 0 0 0 3.36 3.36c.52.86.92 1.8 1.17 2.82a2.5 2.5 0 0 0 0 4.74c-.25 1.01-.65 1.96-1.17 2.82a2.5 2.5 0 0 0-3.36 3.36c-.86.52-1.8.92-2.82 1.17a2.5 2.5 0 0 0-4.74 0c-1.01-.25-1.96-.65-2.82-1.17a2.5 2.5 0 0 0-3.36-3.36 9.94 9.94 0 0 1-1.17-2.82 2.5 2.5 0 0 0 0-4.74c.25-1.01.65-1.96 1.17-2.82a2.5 2.5 0 0 0 3.36-3.36zM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/><circle cx="12" cy="12" r="2" className="secondary"/></svg>
					</div>

					<div className='flex w-full my-auto text-sm truncate'>
						Settings 							
					</div>
					
				</div>

				<div className="relative flex flex-row pt-1 pb-1 pl-3 pr-3 mx-2 font-normal text-gray-700 rounded-lg cursor-pointer hover:bg-gray-200">
					<div className='h-full my-auto'>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 mr-2 icon-link"><path className="secondary" d="M19.48 13.03l-.02-.03a1 1 0 1 1 1.75-.98A6 6 0 0 1 16 21h-4a6 6 0 1 1 0-12h1a1 1 0 0 1 0 2h-1a4 4 0 1 0 0 8h4a4 4 0 0 0 3.48-5.97z"/><path className="primary" d="M4.52 10.97l.02.03a1 1 0 1 1-1.75.98A6 6 0 0 1 8 3h4a6 6 0 1 1 0 12h-1a1 1 0 0 1 0-2h1a4 4 0 1 0 0-8H8a4 4 0 0 0-3.48 5.97z"/></svg>
					</div>

					<a className='flex w-full my-auto text-sm truncate'>
						Share App Link 							
					</a>
					
				</div> */}
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
		const notSelectedClassName = 'bg-white hover:bg-gray-200 font-normal relative text-gray-700'  + ' ' + common

		const className = currentPost !== undefined && post.id === currentPost.id ? selectedClassName : notSelectedClassName

		return (
			<div key={post.id} onClick={() => {setDisplayCreateNewPost(false); setCurrentPost(post)}} className={className}>
				{/* <span className="top-0 left-0 flex items-center justify-center flex-shrink-0 block w-6 h-4 my-auto mr-1 text-xs font-bold text-white bg-red-400 rounded-full">12</span> */}
				<div className='w-full my-auto text-sm font-semibold truncate '>
					{ post.title }							
				</div>
				<div className='flex'>
					{
						post.tags?.includes('BLOCKER') && 
						<span className="ml-1 bg-red-100 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium leading-4 bg-red-100 text-red-800">
							Blocker
						</span>
					}
				</div>	
			</div>
		)	
	}

	const renderCreateNewButton = () => {
		return (
			<div className='bottom-0 flex flex-col flex-shrink-0 h-16 text-gray-700 border-t hover:bg-gray-200 hover:text-blue-800'>
				
				<div className="flex flex-row h-full pl-3 pr-3 mx-2 mx-auto cursor-pointer">
					{/* <div className='my-auto mr-1'>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="mx-auto w-7 icon-device-smartphone"><path className="primary" d="M8 2h8a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4c0-1.1.9-2 2-2z"/><path className="secondary" d="M12 20a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/></svg>

					</div> */}

					<img className="object-contain p-2" src={'logo.png'} style={{filter: 'grayscale(100%)'}}/>

					
				</div>
			</div>
		)
	}

	return (
		<div className='flex flex-col flex-shrink-0 w-3/12 h-screen my-auto overflow-scroll shadow-lg bg-gray-50'>
			{ renderHeader() }

			<div id='issues' className='flex flex-col h-full'>
				<div className='w-full h-6 mb-4'>
					<h2 className='p-3 text-xs font-normal font-medium tracking-wider text-gray-600 uppercase'>Issues</h2>
				</div>
				<div className='h-full overflow-scroll'>
					{ renderPosts() }
				</div>
			</div>
			{ renderCreateNewButton() }
		</div>
	)
}