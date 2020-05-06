import React, { useState } from 'react'
import { Post, Project } from '../../../types'
import { useHistory } from 'react-router-dom'
import ManageMembersModal from '../../../components/ManageMembersModal'

type PostToolbarProps = {
	currentPost: Post | undefined
	setCurrentPost: (post: Post | undefined) => void
	setDisplayCreateNewPost: (displayCreateNewPost: boolean) => void
	posts: Record<string, Post>
	project: Project
}

export const PostToolbar = ({ currentPost, setCurrentPost, setDisplayCreateNewPost, posts, project}: PostToolbarProps) => {
	const [displayManageMembers, setDisplayManageMembers] = useState(false)

	const history = useHistory()

	const renderRunSimulatorButton = () => {
		const buttonClassName = "inline-flex items-center w-full px-5 py-2 my-auto text-sm font-medium text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md shadow-sm cursor-pointer hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50"

		return (
			<div className='w-full pt-1 '>
				<div onClick={() => {setDisplayCreateNewPost(true); setCurrentPost(undefined); }} className={buttonClassName}>
					
					<div className='inline-flex mx-auto '>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="mr-1 w-7 icon-device-smartphone"><path className="primary" d="M8 2h8a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4c0-1.1.9-2 2-2z"/><path className="secondary" d="M12 20a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/></svg>
						<h2 className='my-auto font-bold'>View App</h2> 
					</div>
					
				</div>
			</div>
		)
	}
	
	const renderHeader = () => {
		return (
			<div id='menu' className='flex flex-col flex-shrink-0 '>
				<div className='pt-3 border-b '>
					<div className="flex flex-row flex-shrink-0 px-3 pb-2 border-gray-200 ">
						<div className="flex-shrink-0 block group focus:outline-none ">
							<div className="flex items-center">
								<div className=''>
									<img className="inline-block rounded-md w-11 h-11" src={process.env.PUBLIC_URL + '/appIcon.png'} alt="" />
								</div>
								<div className="ml-1.5">
									<p className="pt-1 text-sm font-bold leading-3 text-gray-700 group-hover:text-gray-900">
										{project.name}
									</p>
									<span className="inline-flex items-center flex-shrink-0 px-2 py-0.5 mt-1 font-mono text-xs font-bold leading-5 text-indigo-800 bg-indigo-100 rounded-md ">
										<svg className="-ml-0.5 mr-1.5 h-2 w-2 text-indigo-400" fill="currentColor" viewBox="0 0 8 8">
											<circle cx="4" cy="4" r="3" />
										</svg>
										{/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 mr-1 icon-tag"><path className="primary" d="M2.59 13.41A1.98 1.98 0 0 1 2 12V7a5 5 0 0 1 5-5h4.99c.53 0 1.04.2 1.42.59l8 8a2 2 0 0 1 0 2.82l-8 8a2 2 0 0 1-2.82 0l-8-8zM7 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/><path className="secondary" d="M12 18l6-6-4-4-6 6.01L12 18z"/></svg> */}
										{ "v " + project.currentAppBuild.version }
									</span>
								</div>
								
							</div>
						</div>
						{/* <div className='flex justify-end w-full my-auto cursor-pointer'>
							<div className='flex flex-row p-1 text-gray-600 hover:text-gray-800'>
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 icon-add"><path className="secondary" fillRule="evenodd" d="M17 11a1 1 0 0 1 0 2h-4v4a1 1 0 0 1-2 0v-4H7a1 1 0 0 1 0-2h4V7a1 1 0 0 1 2 0v4h4z"/></svg>
								<a className='my-auto text-xs font-bold tracking-tight uppercase'>New Version</a>
							</div>							
						</div> */}
						<div className='flex justify-end w-full'>
							<button onClick={() => {setDisplayCreateNewPost(true); setCurrentPost(undefined) }} className='inline-flex items-center px-5 py-2 my-auto text-sm font-medium text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md shadow-sm cursor-pointer hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50'>
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 mx-auto mr-1 icon-check"><circle cx="12" cy="12" r="10" className="checkmark"/><path className="secondary" d="M10 14.59l6.3-6.3a1 1 0 0 1 1.4 1.42l-7 7a1 1 0 0 1-1.4 0l-3-3a1 1 0 0 1 1.4-1.42l2.3 2.3z"/></svg>

								<h2 className='font-bold'>Approve</h2>
							</button>
						</div>
						
					</div>
					<div className='flex justify-center w-full pt-1 my-auto bg-gray-200 cursor-pointer'>
						<div className='flex flex-row p-1 text-gray-600 hover:text-gray-800'>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 icon-add"><path className="secondary" fillRule="evenodd" d="M17 11a1 1 0 0 1 0 2h-4v4a1 1 0 0 1-2 0v-4H7a1 1 0 0 1 0-2h4V7a1 1 0 0 1 2 0v4h4z"/></svg>
							<a className='my-auto text-xs font-bold tracking-tight uppercase'>Upload New App Version</a>
						</div>							
					</div>
				</div>
				
				<div className='px-3 pt-2 pb-9 '>
					{/* <div className='p-3'>
						<div onClick={() => {setDisplayCreateNewPost(true); setCurrentPost(undefined) }} className='inline-flex items-center py-2 mx-auto text-gray-700 whitespace-no-wrap transition ease-in-out bg-white rounded-md cursor-pointer px-9 text-md hover:bg-gray-200 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 duration-15'>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="mx-auto mr-1 w-7 icon-device-smartphone"><path className="primary" d="M8 2h8a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4c0-1.1.9-2 2-2z"/><path className="secondary" d="M12 20a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/></svg>
							<h2 className='mx-auto font-bold text-gray-800 '>Run Simulator</h2>
						</div>
					</div> */}
					{ currentPost !== undefined ? renderRunSimulatorButton() : <></> }
					

					<div className='w-full pt-1 '>
						<ManageMembersModal project={project} show={displayManageMembers} onCancel={()=>{setDisplayManageMembers(false)}} onResolve={() => {}} />

						<div onClick={() => {setDisplayManageMembers(true) }} className='inline-flex items-center w-full px-5 py-2 my-auto text-sm font-medium text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md shadow-sm cursor-pointer hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50'>
							
							<div className='inline-flex mx-auto '>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="mr-2 w-7 icon-user-group"><path className="primary" d="M12 13a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v3a1 1 0 0 1-1 1h-8a1 1 0 0 1-1-1 1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-3a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3zM7 9a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm10 0a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/><path className="secondary" d="M12 13a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm-3 1h6a3 3 0 0 1 3 3v3a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-3a3 3 0 0 1 3-3z"/></svg>
								<h2 className='my-auto font-bold'>Manage Members</h2> 
							</div>
							
						</div>
					</div>
				</div>

				

				

				{/* <div  onClick={() => setDisplayCreateNewPost(true)} className="relative flex flex-row pt-1 pb-1 pr-3 mx-2 mt-2 font-bold text-gray-700 rounded-lg cursor-pointer hover:bg-gray-200"> */}
					{/* <div className='my-auto mr-1'>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="mx-auto w-7 icon-device-smartphone"><path className="primary" d="M8 2h8a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4c0-1.1.9-2 2-2z"/><path className="secondary" d="M12 20a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/></svg>

					</div>

					<div className='w-full my-auto text-sm truncate'>
						Review App
					</div> */}

					
				{/* </div> */}
				
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
		const selectedClassName = 'bg-cool-gray-200 shadow-sm font-extrabold text-gray-800 ' + ' ' + common
		const notSelectedClassName = 'bg-white hover:bg-gray-200 font-medium relative text-gray-700'  + ' ' + common

		const className = currentPost !== undefined && post.id === currentPost.id ? selectedClassName : notSelectedClassName

		return (
			<div key={post.id} onClick={() => {setDisplayCreateNewPost(false); setCurrentPost(post);}} className={className}>
				{/* <span className="top-0 left-0 flex items-center justify-center flex-shrink-0 block w-6 h-4 my-auto mr-1 text-xs font-bold text-white bg-red-400 rounded-full">12</span> */}
				<div className='w-full my-auto text-sm truncate '>
					{ post.title }							
				</div>
				<div className='flex'>
					{
						post.tags?.includes('BLOCKER') && post.status !== 'RESOLVED' && 
						<span className="inline-flex items-center px-2 py-0.5 ml-1 text-xs font-bold text-red-800 bg-red-100 uppercase rounded">
							Blocker
						</span>
					}
					{
						post.status === 'RESOLVED' && 
						<span className="my-auto font-bold uppercase ml-1 bg-green-100 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium leading-4 text-green-800">
							Resolved
						</span>
					}
				</div>	
			</div>
		)	
	}

	const renderCreateNewButton = () => {
		const onClickHomeLogo = () => {
			history.push('/projects')
		}

		return (
			<div className='bottom-0 flex flex-col flex-shrink-0 h-16 text-gray-700 border-t'>
				
				<div onClick={() => onClickHomeLogo()} className="flex flex-row h-full pl-3 pr-3 mx-2 mx-auto cursor-pointer">
					{/* <div className='my-auto mr-1'>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="mx-auto w-7 icon-device-smartphone"><path className="primary" d="M8 2h8a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4c0-1.1.9-2 2-2z"/><path className="secondary" d="M12 20a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/></svg>

					</div> */}

					<img className="object-contain p-2 transition duration-100 ease-in-out filter-grayscale hover:filter-none" src={process.env.PUBLIC_URL + '/logo.png'} />

					
				</div>
			</div>
		)
	}

	const renderNoPosts = () => {
		return (
			<div className='w-full h-48 px-3'>
				<div className='w-full p-5 my-auto text-center rounded-lg bg-teal-50'>
					<p className="mt-1 text-lg font-bold text-gray-800">
						{/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="mx-auto w-14 icon-box"><g><path className="secondary" d="M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7c0-1.1.9-2 2-2zm4 5a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2H9z"/><path className="primary" d="M4 3h16a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5c0-1.1.9-2 2-2z"/></g></svg> */}
						<svg className="w-10 mx-auto text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
							<path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
						</svg>
						No issues found !
					</p>
					<p className="mt-1 text-sm font-medium text-gray-700">
						You can create a new issue by starting the aplication in the simulator and taking a screenshot.
					</p>
				</div>
			</div>
		)
	}

	return (
		<div className='flex flex-col flex-shrink-0 h-screen my-auto overflow-scroll border border-t-0 border-b-0 border-l-0 w-84 bg-gray-50'>
			{ renderHeader() }

			<div id='issues' className='flex flex-col h-full'>
				<div className='w-full h-6 mb-2'>
					<h2 className='px-3 text-xs font-normal font-medium tracking-wider text-gray-600 uppercase '>Issues</h2>
				</div>
				<div className='h-full overflow-scroll '>
					{ posts === undefined || Object.keys(posts).length === 0 ? renderNoPosts(): renderPosts() }
				</div>
			</div>
			{ renderCreateNewButton() }
		</div>
	)
}