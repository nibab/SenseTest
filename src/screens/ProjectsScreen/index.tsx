import React, { useState, useEffect } from 'react'
import { API, graphqlOperation, Auth } from 'aws-amplify'
import { createProject } from '../../graphql/mutations'
import { CreateProjectInput, CreateProjectMutation, GetProjectQuery } from "../../API"
import { v4 as uuidv4 } from 'uuid'
import { Project, AppBuild, Post} from '../../types'
import Log from '../../utils/Log'
import { getProject } from '../../graphql/queries'
import { TypeConverter } from '../../convertTypes'
import { useHistory } from 'react-router-dom'
import { DataLayerClient } from '../../clients/DataLayerClient'
import { logout } from '../../store/authentication/actions'
import { useDispatch } from 'react-redux'
import CreateProjectModal from '../../components/CreateProjectModal'
import { useSelector } from '../../store'

type ReleaseCardProps = {
	project: Project
}

const ReleaseCard = (props: ReleaseCardProps) => {
	const history = useHistory()

	const countBlockers = () => {
		return props.project.posts.filter((post) => post.tags?.includes('BLOCKER')).length
	}

	const onViewButtonClick = () => {
		return history.push(`/project/${props.project.id}`)
	}


	const renderFooter = () => {
		const blockers = countBlockers()
		const members = props.project.members.length
		const versions = props.project.appBuilds.length
		return (
			<div className="flex flex-row p-1 mx-auto">
				<div className='my-auto whitespace-no-wrap inline-flex items-center mr-1 inline-flex items-center pr-2.5 py-1 text-xs font-medium rounded text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-15'>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="mr-1 w-7 icon-important "><path className="primary" d="M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20z"/><path className="secondary" d="M12 18a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm1-5.9c-.13 1.2-1.88 1.2-2 0l-.5-5a1 1 0 0 1 1-1.1h1a1 1 0 0 1 1 1.1l-.5 5z"/></svg>
					<h2 className='mr-4 text-xs text-gray-800 uppercase '><a className='font-bold'>{blockers}</a> {`Blocker${blockers > 1 ? 's' : ''}`}</h2>
				</div>
				<div className="my-auto whitespace-no-wrap inline-flex items-center mr-1 inline-flex items-center px-2.5 py-1 text-xs font-medium rounded text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-15">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="mr-1 w-7 icon-user-group"><path className="primary" d="M12 13a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v3a1 1 0 0 1-1 1h-8a1 1 0 0 1-1-1 1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-3a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3zM7 9a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm10 0a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/><path className="secondary" d="M12 13a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm-3 1h6a3 3 0 0 1 3 3v3a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-3a3 3 0 0 1 3-3z"/></svg>
					<h2 className='mr-4 text-xs text-gray-800 uppercase'><a className='font-bold'>{members}</a> {`member${members > 1 ? 's' : ''}`}</h2>
				</div>
				
				<div className="my-auto whitespace-no-wrap inline-flex items-center mr-1 inline-flex items-center px-2.5 py-1 text-xs font-medium rounded text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="mr-1 w-7 icon-tag"><path className="primary" d="M2.59 13.41A1.98 1.98 0 0 1 2 12V7a5 5 0 0 1 5-5h4.99c.53 0 1.04.2 1.42.59l8 8a2 2 0 0 1 0 2.82l-8 8a2 2 0 0 1-2.82 0l-8-8zM7 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/><path className="secondary" d="M12 18l6-6-4-4-6 6.01L12 18z"/></svg>
					<h2 className='inline-block mr-4 text-xs text-gray-800 uppercase '><a className='font-bold'>{versions}</a>{` app version${versions > 1 ? 's' : ''}`}</h2>
				</div>
			</div>
		)
	}

	return (
		<div className='flex flex-col bg-white rounded-lg shadow-lg'>
			<div className='flex flex-row p-3 border border-2 border-t-0 border-l-0 border-r-0'>
				<div className='flex-shrink-0 w-16 h-16 bg-red-300 rounded-lg'>
					<img className="inline-block rounded-md" src="appIcon.png" alt="" />
				</div>
				<div className='w-full h-full my-auto ml-2'>
					<h1 className='font-semibold text-gray-800 text-md'>{props.project.name}</h1>
					<h2 className='-mt-1 text-sm font-medium text-gray-400 font'>February 20, 2020</h2>
				</div>
				<div className='my-auto '>
					<button onClick={() => onViewButtonClick()} type="button" className="inline-flex items-center px-4 py-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700">
						View
					</button>
				</div>
			</div>

			{ renderFooter() }
		</div>
	)
}

const ProjectsScreen = () => {
	//const [currentProjects, setCurrentProjects] = useState<string[]>()
	const [currentProjects, setCurrentProjects] = useState<Project[]>()
	const dispatch = useDispatch()
	const [createProjectModalVisible, setCreateProjectModalVisible] = useState(false)
	const [isLoading, setIsLoading] = useState(true)
	const auth = useSelector(state => state.auth)


	const getProjectsForUser = () => {
		// list projects - to show all projects that you have created
		// get user - to show all projects that you are a member of
	}

	const temp = async () => {
		const user = await Auth.currentAuthenticatedUser();
		const userInfo = await Auth.currentUserInfo();
		const name = userInfo['attributes']['custom:name']
		debugger
		const result = await Auth.updateUserAttributes(user, {
			'custom:name': 'Cezar Babin'
		});
	}

	useEffect(() => {
		setIsLoading(true)
		DataLayerClient.listProjects().then((projects) => {
			setCurrentProjects(projects)
			setIsLoading(false)
		}).catch((error) => {
			setIsLoading(false)
		})
	}, [])	

	const onSignOutButtonClick = async (e: any) => {
		await Auth.signOut().then(() => dispatch(logout()))
	}

	const renderReleases = () => {
		const items: JSX.Element[] = []
		currentProjects?.forEach((project) => {
			items.push(<><ReleaseCard project={project } /><div className='w-full h-5'></div> </>)
		})
		return items
	}

	return (
		<>
			{ createProjectModalVisible && <CreateProjectModal onCancel={() => setCreateProjectModalVisible(false)} />}
			<div className='w-screen h-screen font-sans bg-gray-100'>
				<div className='flex flex-row w-full h-20 bg-white shadow-md'>
					<div className='justify-center flex-shrink-0 w-48 my-auto'>
						<img className="object-contain p-2 transition duration-100 ease-in-out cursor-pointer filter-grayscale hover:filter-none" src='logo.png' />
					</div>
					<div className='w-full '>
					</div>
					<div className='flex flex-row self-end pr-5 my-auto'>
						<div className="inline-flex items-center px-5 py-2 my-auto text-sm font-medium text-gray-700 whitespace-no-wrap transition duration-150 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50">
							{/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 mx-auto mr-1 icon-user"><path className="primary" d="M12 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10z"/><path className="secondary" d="M21 20v-1a5 5 0 0 0-5-5H8a5 5 0 0 0-5 5v1c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2z"/></svg> */}
							{ auth.email }
						</div> 
						<button onClick={onSignOutButtonClick} className="inline-flex items-center px-5 py-2 my-auto font-medium text-gray-700 whitespace-no-wrap transition duration-150 ease-in-out bg-white border border-gray-300 rounded rounded-md text-md hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50">
							{/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 mx-auto mr-1 icon-user"><path className="primary" d="M12 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10z"/><path className="secondary" d="M21 20v-1a5 5 0 0 0-5-5H8a5 5 0 0 0-5 5v1c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2z"/></svg> */}
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 mx-auto mr-1.5 icon-door-exit"><path className="primary" d="M11 4h3a1 1 0 0 1 1 1v3a1 1 0 0 1-2 0V6h-2v12h2v-2a1 1 0 0 1 2 0v3a1 1 0 0 1-1 1h-3v1a1 1 0 0 1-1.27.96l-6.98-2A1 1 0 0 1 2 19V5a1 1 0 0 1 .75-.97l6.98-2A1 1 0 0 1 11 3v1z"/><path className="secondary" d="M18.59 11l-1.3-1.3c-.94-.94.47-2.35 1.42-1.4l3 3a1 1 0 0 1 0 1.4l-3 3c-.95.95-2.36-.46-1.42-1.4l1.3-1.3H14a1 1 0 0 1 0-2h4.59z"/></svg>
							Sign out
						</button>
					</div>
				</div>
				<div className="h-full max-w-2xl pt-6 mx-auto sm:px-6 lg:px-8">
					<div className="h-full max-w-3xl mx-auto ">
						<h1 className="px-2 text-3xl font-bold leading-tight text-gray-900">
							Releases
						</h1>
						<div className='h-full px-2 pt-6 mx-auto overflow-scroll'>
							<div onClick={() => {setCreateProjectModalVisible(true)}} className='inline-flex items-center px-4 py-1 my-auto mb-5 mr-5 text-xs font-medium text-gray-700 whitespace-no-wrap transition ease-in-out bg-gray-200 rounded rounded-full cursor-pointer hover:bg-gray-300 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 duration-15'>
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-10 h-10 mr-1 icon-add"><path className="secondary" fillRule="evenodd" d="M17 11a1 1 0 0 1 0 2h-4v4a1 1 0 0 1-2 0v-4H7a1 1 0 0 1 0-2h4V7a1 1 0 0 1 2 0v4h4z"/></svg>
								<h2 className='mr-4 text-lg font-semibold text-gray-800 '>Create New</h2>
							</div>
							<div className='flex flex-col justify-center mt-1 '>
								<h2 className='mb-3 text-sm font-semibold tracking-wide text-gray-500 uppercase'>Current</h2>
								{ isLoading && <div className="h-20 spinner-large"></div>}
								{ !isLoading && renderReleases() } 
								{/* <h2 className='mt-10 mb-3 text-sm font-semibold tracking-wide text-gray-500 uppercase text-md'>Previous</h2> */}
								{/* <ReleaseCard /> */}
							</div>
						</div>
					</div>	
				</div>
			</div>
		</>	
	)
}

export default ProjectsScreen