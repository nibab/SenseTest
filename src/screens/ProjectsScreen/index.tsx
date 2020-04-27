import React, { useState, useEffect } from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import { createProject } from '../../graphql/mutations'
import { CreateProjectInput, CreateProjectMutation, GetProjectQuery } from "../../API"
import { v4 as uuidv4 } from 'uuid'
import { Project, AppBuild, Post} from '../../types'
import Log from '../../utils/Log'
import { getProject } from '../../graphql/queries'
import { TypeConverter } from '../../convertTypes'

type ReleaseCardProps = {
	project: Project
}

const TEST_APP_BUILD: AppBuild = {
	id: '1',
	project: '1',
	name: '1',
	assetId: '2',
	appetizeKey: '1',
	createdAt: 'now',
	version: '12',
	uploadedByUserId: '1'
}

const ReleaseCard = (props: ReleaseCardProps) => {
	const countBlockers = () => {
		return props.project.posts.filter((post) => post.tags?.includes('BLOCKER')).length
	}


	const renderFooter = () => {
		return (
			<div className="flex flex-row p-1 mx-auto">
				<div className='my-auto whitespace-no-wrap inline-flex items-center mr-1 inline-flex items-center pr-2.5 py-1 text-xs font-medium rounded text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-15'>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="mr-1 w-7 icon-important "><path className="primary" d="M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20z"/><path className="secondary" d="M12 18a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm1-5.9c-.13 1.2-1.88 1.2-2 0l-.5-5a1 1 0 0 1 1-1.1h1a1 1 0 0 1 1 1.1l-.5 5z"/></svg>
					<h2 className='mr-4 text-xs text-gray-800 uppercase '><a className='font-bold'>{countBlockers()}</a> Blockers</h2>
				</div>
				<div className="my-auto whitespace-no-wrap inline-flex items-center mr-1 inline-flex items-center px-2.5 py-1 text-xs font-medium rounded text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-15">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="mr-1 w-7 icon-user-group"><path className="primary" d="M12 13a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v3a1 1 0 0 1-1 1h-8a1 1 0 0 1-1-1 1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-3a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3zM7 9a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm10 0a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/><path className="secondary" d="M12 13a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm-3 1h6a3 3 0 0 1 3 3v3a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-3a3 3 0 0 1 3-3z"/></svg>
					<h2 className='mr-4 text-xs text-gray-800 uppercase'><a className='font-bold'>8</a> members</h2>
				</div>
				
				<div className="my-auto whitespace-no-wrap inline-flex items-center mr-1 inline-flex items-center px-2.5 py-1 text-xs font-medium rounded text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="mr-1 w-7 icon-tag"><path className="primary" d="M2.59 13.41A1.98 1.98 0 0 1 2 12V7a5 5 0 0 1 5-5h4.99c.53 0 1.04.2 1.42.59l8 8a2 2 0 0 1 0 2.82l-8 8a2 2 0 0 1-2.82 0l-8-8zM7 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/><path className="secondary" d="M12 18l6-6-4-4-6 6.01L12 18z"/></svg>
					<h2 className='inline-block mr-4 text-xs text-gray-800 uppercase '><a className='font-bold'>{props.project.appBuilds.length}</a> app versions</h2>
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
					<button type="button" className="inline-flex items-center px-4 py-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700">
						View
					</button>
				</div>
			</div>

			{ renderFooter() }
		</div>
	)
}

const ProjectsScreen = () => {
	const [currentProjects, setCurrentProjects] = useState<string[]>()
	const [currentProject, setCurrentProject] = useState<Project>()

	useEffect(() => {
		getProjectInfo().then((project) => setCurrentProject(project))

	}, [])


	const getAllProjects = async () => {
		
	}

	const createNewProject = (): Promise<Project> => {
		return new Promise(async (resolve, reject) => {
			const createProjectInput: CreateProjectInput = {
				name: 'TestProject',
				id: uuidv4() 
			}
	
			try {
				const createProjectResult = await API.graphql(
					graphqlOperation(createProject, {input: createProjectInput})
				) as { data: CreateProjectMutation }
	
				const newProject = createProjectResult.data.createProject!
				// Create project that can be displayed in the app.
				const _newProject: Project = {
					id: newProject.id,
					name: newProject.name,
					posts: [],
					appBuilds: [],
					currentAppBuild: TEST_APP_BUILD
				}

				Log.info(`Succeeded in creating project ${JSON.stringify(_newProject)}.`, "ProjectsScreen")
				resolve(_newProject)
			} catch (err) {
				Log.error(`There was an error creating a project ${JSON.stringify(err)}.`, "ProjectsScreen")
				reject()
			}
		})
		
	}

	const getAppBuilds = (projectQuery: GetProjectQuery): AppBuild[] => {
		const _project = projectQuery.getProject
		if (_project === null) return []
		
		const _appBuilds = _project.appBuilds?.items
		const appBuilds: AppBuild[] = []
		_appBuilds?.forEach((appBuild) => {
			if (appBuild !== null) {
				const appBuildOfLocalType: AppBuild = {
					id: appBuild.id,
					project: appBuild.project.id,
					name: appBuild.name,
					version: appBuild.version,
					assetId: appBuild.assetId,
					appetizeKey: appBuild.appetizeKey,
					uploadedByUserId: appBuild.uploadedByUserId,
					createdAt: appBuild.createdAt !== null ? appBuild.createdAt : 'unknown'

				}
				appBuilds.push(appBuildOfLocalType)
			}
		})
		return appBuilds
	}

	const getProjectInfo = async (): Promise<Project> => {
		return new Promise(async (resolve, reject) => {
			const projectQuery = await API.graphql(graphqlOperation(getProject, {id: '68134e24-ed27-494e-b0bb-8a14f2b3167f'})) as {data: GetProjectQuery}
			//console.log(project.data)
			const _project = projectQuery.data.getProject
			const posts = TypeConverter.getPostsFromProjectQuery(projectQuery.data)
			
			if (_project !== undefined && _project !== null) {
				const appBuilds = getAppBuilds(projectQuery.data)
				const currentAppBuild = await TypeConverter.getCurentAppBuildFromProjectQuery(projectQuery.data)
				const project: Project = {
					id: _project.id,
					name: _project.name,
					appBuilds: appBuilds,
					posts: posts,
					currentAppBuild: currentAppBuild !== undefined ? currentAppBuild : TEST_APP_BUILD
				}
				resolve(project)
			} else {
				reject()
			}
		})
	}

	return (
		<div className='w-screen h-screen font-sans bg-gray-100'>
			<div className='w-full h-20 bg-white shadow-md'>
				<div className='w-64 h-full'>
					<img className="object-contain p-2 transition duration-100 ease-in-out cursor-pointer filter-grayscale hover:filter-none" src='logo.png' />
				</div>
			</div>
			<div className="h-full max-w-2xl pt-6 mx-auto sm:px-6 lg:px-8">
				<div className="h-full max-w-3xl mx-auto ">
					<h1 className="px-2 text-3xl font-bold leading-tight text-gray-900">
						Releases
					</h1>
					<div className='h-full px-2 pt-6 mx-auto overflow-scroll'>
						<div className='inline-flex items-center px-4 py-1 my-auto mb-5 mr-5 text-xs font-medium text-gray-700 whitespace-no-wrap transition ease-in-out bg-gray-200 rounded rounded-full cursor-pointer hover:bg-gray-300 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 duration-15'>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-10 h-10 mr-1 icon-add"><path className="secondary" fill-rule="evenodd" d="M17 11a1 1 0 0 1 0 2h-4v4a1 1 0 0 1-2 0v-4H7a1 1 0 0 1 0-2h4V7a1 1 0 0 1 2 0v4h4z"/></svg>
							<h2 className='mr-4 text-lg font-semibold text-gray-800 '>Create New</h2>
						</div>
						<div className='flex flex-col justify-center mt-1 '>
							<h2 className='mb-3 text-sm font-semibold tracking-wide text-gray-500 uppercase'>Current</h2>
							{currentProject !== undefined && <ReleaseCard project={currentProject } /> } 
							<h2 className='mt-10 mb-3 text-sm font-semibold tracking-wide text-gray-500 uppercase text-md'>Previous</h2>
							{/* <ReleaseCard /> */}
						</div>
					</div>
				</div>	
			</div>
		</div>	
	)
}

export default ProjectsScreen