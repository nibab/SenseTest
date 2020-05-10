import React, { useEffect, useState } from 'react'
import { Post, AppBuild, Project, postTagGraphQLToLocalType, deviceTypePretty, DeviceType } from '../../../types'
import Attachment from './Attachment'
import PostScreenshot from '../../../components/PostScreenshot'
import { AppBuildClient } from '../../../clients/AppBuildClient'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { addPost } from '../../../store/post/actions'
import { DataLayerClient } from '../../../clients/DataLayerClient'
import ResolvePostModal from './ResolvePostModal'
import Transition from '../../../utils/Transition'
import { AnalyticsClient } from '../../../utils/PRAnalytics'
import { useSelector } from '../../../store'
import NewSimulatorModal from '../../../components/NewSimulatorModal'
import Simulator from '../../../components/Simulator'
import VersionTag, { DeviceTag } from '../../../components/VersionTag'

type PostViewProps = {
	post: Post
	project: Project
}

type DisplayState = 'None' | 'Create_Simulator' | 'Simulator' | 'Attachment'

const PostView = (props: PostViewProps) => {
	const [displayState, setDisplayState] = useState<DisplayState>('None')
	const [simulatorParams, setSimulatorParams] = useState<{
		appBuild: AppBuild
		deviceType: DeviceType
	}>()
	
	const [warningVisible, setWarningVisible] = useState(true)
	const [currentAppBuild, setCurrentAppBuild] = useState<AppBuild>()

	const [postStatusButtonLoading, setPostStatusButtonLoading] = useState<boolean>(false)
	const [displayResolvePostModal, setDisplayResolvePostModal] = useState(false)
	const authState = useSelector(state => state.auth)
	const dispatch = useDispatch()

    useEffect(() => {
		setDisplayState('None')
		setWarningVisible(true)
	}, [props.post])

	useEffect(() => {
		AppBuildClient.getCurrentAppBuildForProjectId(props.project.id).then((appBuild) => setCurrentAppBuild(appBuild))
	}, [])
	
	const renderWarningMessage = () => {
		if (warningVisible) {
			return (
				<div className="absolute bottom-0 z-40 w-full">
					<div className='relative text-yellow-700 '>
						<button onClick={() => setWarningVisible(false)} className='absolute right-0 z-50 mx-2 w-7 h-7 '>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="mx-auto fill-current icon-close"><path className="" fillRule="evenodd" d="M15.78 14.36a1 1 0 0 1-1.42 1.42l-2.82-2.83-2.83 2.83a1 1 0 1 1-1.42-1.42l2.83-2.82L7.3 8.7a1 1 0 0 1 1.42-1.42l2.83 2.83 2.82-2.83a1 1 0 0 1 1.42 1.42l-2.83 2.83 2.83 2.82z"/>
							</svg>
						</button>
						<div className="relative p-4 mx-2 my-1 bg-yellow-100 rounded-md shadow-xl">
							<div className="flex">
								<div className="flex-shrink-0">
									<svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
									<path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
									</svg>
								</div>
								<div className="ml-3">
									<h3 className="text-sm font-medium leading-5 text-yellow-800">
									Warning
									</h3>
									<div className="relative flex flex-row w-full mt-1 text-sm leading-5">
										<div className='my-auto '>
											There have been <b>2</b> new app versions since this post was created.
										</div>
										<span className="inline-flex mx-1 rounded-md shadow-sm">
											<button type="button" className="inline-flex items-center px-2 py-1 text-xs font-medium leading-4 text-white transition duration-150 ease-in-out bg-indigo-600 border border-transparent rounded hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700">
												<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 mr-1 icon-device-smartphone"><path className="primary" d="M8 2h8a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4c0-1.1.9-2 2-2z"/><path className="secondary" d="M12 20a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/></svg>
												Check Latest App Version
											</button>
											
										</span>
										<div className='my-auto'>
											to see if this still an issue. 
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)
		} else {
			return (<></>)
		}
	}

	const renderToolbar = () => {
		const buttonContainerClassName = 'w-full h-18 my-1 flex flex-col'
		const buttonClassName = 'focus:outline-none active:shadow-sm active:bg-gray-300 w-12 h-12 rounded-full mx-auto'
		const unSelectedButtonClassName = 'bg-white shadow-lg border-gray-400 ' + ' ' + buttonClassName
		const selectedButtonClassName = 'bg-gray-200' + ' ' + buttonClassName

		const handleButtonClick = (state: DisplayState) => {
			if (state === displayState) {
				setDisplayState('None')
			} else {
				setDisplayState(state)
			}
			if (state === 'Simulator') {
				AnalyticsClient.record('OPENED_SIMULATOR_ON_ISSUE_PAGE', authState)
			}
		}

		const handleRunSimulator = (deviceType: DeviceType, appBuild: AppBuild) => {
			setSimulatorParams({
				deviceType: deviceType,
				appBuild: appBuild
			})
			setDisplayState('Simulator')
		}

		return (
			<>	
				<NewSimulatorModal onRun={(deviceType, appBuild) =>  handleRunSimulator(deviceType, appBuild)} project={props.project} show={displayState === 'Create_Simulator'} onCancel={() => setDisplayState('None')}/>
				<div className='flex-shrink-0 mx-1'>
					<div className='flex-shrink-0 rounded-full'>
						<div className='flex-col w-full'> 
							{/* <div className={buttonContainerClassName}>
								<button onClick={() => {handleButtonClick('Attachment')}} className={displayState === 'Attachment' ? selectedButtonClassName : unSelectedButtonClassName} style={{borderWidth: '1px'}}>
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 mx-auto icon-attach"><path className="secondary" d="M20.12 11.95l-6.58 6.59a5 5 0 1 1-7.08-7.07l6.59-6.6a3 3 0 0 1 4.24 4.25l-6.58 6.59a1 1 0 1 1-1.42-1.42l6.59-6.58a1 1 0 0 0-1.42-1.42l-6.58 6.59a3 3 0 0 0 4.24 4.24l6.59-6.58a5 5 0 0 0-7.08-7.08l-6.58 6.6a7 7 0 0 0 9.9 9.9l6.59-6.6a1 1 0 0 0-1.42-1.4z"/></svg>
								</button>
								<a className="text-xs font-semibold text-center text-gray-900 " style={{fontSize: '10px'}}>Attachments</a>
							</div> */}
							<div className={buttonContainerClassName}>
								<button onClick={() => {handleButtonClick('Create_Simulator')}} className={unSelectedButtonClassName} style={{borderWidth: '1px'}}>
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-8 mx-auto icon-device-smartphone"><path className="primary" d="M8 2h8a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4c0-1.1.9-2 2-2z"/><path className="secondary" d="M12 20a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/></svg>
								</button>
								<a className="mt-0.5 font-bold text-center text-gray-900 text-xs " style={{fontSize: '13px'}}>Simulator</a>
							</div>
						</div>
					</div>
				</div>
			</>
		)
	}

	const resolvePost = () => {
		setDisplayResolvePostModal(false)
		setPostStatusButtonLoading(true)
		DataLayerClient.updatePostStatus(props.post, 'RESOLVED').then(() => {
			dispatch(addPost({...props.post, status: 'RESOLVED'}))
			setPostStatusButtonLoading(false)
			AnalyticsClient.record('RESOLVED_ISSUE', authState)
		})
	}

	const reopenPost = () => {
		setPostStatusButtonLoading(true)
		DataLayerClient.updatePostStatus(props.post, 'OPEN').then(() => {
			dispatch(addPost({...props.post, status: 'OPEN'}))
			setPostStatusButtonLoading(false)
		})
	}
	

	const renderPostTitle = () => {
		// Temporary function to get today's date and display it.
		const getDate = (): string => {
			var today = new Date()
			var dd = String(today.getDate()).padStart(2, '0')
			var mm = String(today.getMonth() + 1).padStart(2, '0')
			var yyyy = today.getFullYear()

			return mm + '/' + dd + '/' + yyyy
		}

		const renderTags = () => {
			if (props.post.tags?.includes('BLOCKER') && props.post.status !== 'RESOLVED') {
				return (
					<span className="my-auto font-bold uppercase mx-0.5 bg-red-100 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium leading-4 bg-red-100 text-red-800">
						Blocker
					</span>
				)
			}
				
		}

		const renderResolveButton = () => {
			const buttonClassName = 'inline-flex items-center shadow-sm px-3 text-sm py-1 my-autotext-sm font-bold text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50'

			if (props.post.status === 'RESOLVED') {
				return (<>
					<span className="my-auto font-bold uppercase mx-2 bg-green-100 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium leading-4 text-green-800">
						Resolved
					</span>
					<button onClick={() => reopenPost()} className={buttonClassName}>
						{/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 mx-auto mr-1 icon-check"><circle cx="12" cy="12" r="10" className="checkmark"/><path className="secondary" d="M10 14.59l6.3-6.3a1 1 0 0 1 1.4 1.42l-7 7a1 1 0 0 1-1.4 0l-3-3a1 1 0 0 1 1.4-1.42l2.3 2.3z"/></svg> */}
						{ postStatusButtonLoading ? <div className='spinner'>Reopen</div> : 'Reopen'}
					</button>
				</>)
			}
			
			return (
				<button onClick={() => setDisplayResolvePostModal(true)} className={buttonClassName}>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 mx-auto mr-1 icon-check"><circle cx="12" cy="12" r="10" className="checkmark"/><path className="secondary" d="M10 14.59l6.3-6.3a1 1 0 0 1 1.4 1.42l-7 7a1 1 0 0 1-1.4 0l-3-3a1 1 0 0 1 1.4-1.42l2.3 2.3z"/></svg>
					{ postStatusButtonLoading ? <div className='spinner'>Resolve</div> : 'Resolve'}
				</button>
			)
		}

		const currentBuildArray = props.project.appBuilds.filter((appBuild) => 
			appBuild.id === props.post.appBuildId
		)
		const appBuild = currentBuildArray[0]

		return (
			<div className="p-1.5 mx-2 mt-1 border rounded-md bg-gray-100">
				<div className="flex-shrink-0 block group focus:outline-none ">
					<div className="flex flex-col mx-1 ">
						
						<div className='flex flex-row w-full pt-1.5 pb-1.5 border-b'>
							<div className="flex flex-row w-full my-auto">
								
								<div className='mr-1'>
									<h2 className="font-medium leading-3 text-gray-800 text-md group-hover:text-gray-900">
										{ props.post.title }
									</h2>
									<p className="h-3 text-xs font-medium text-gray-500 transition duration-150 ease-in-out font group-focus:underline">
										{  props.post.dateCreated !== null ? moment(props.post.dateCreated).fromNow(): ''}
									</p>
									<div className='flex flex-row mt-1.5'>
										<DeviceTag deviceType={props.post.deviceType} />
										<div className='pl-2 pr-2'> 
											{appBuild && <VersionTag appBuild={appBuild} />}
										</div>
										
										{ renderTags() }
									</div>
									
									{/* <img className="inline-block object-center w-8 h-8 rounded-full" src={'newsScreenshot.png'} alt="" /> */}
								</div>
							</div>
							<div className='flex flex-row my-auto'>
								{/* { renderTags() } */}
								{/* <button className=" my-auto whitespace-no-wrap inline-flex items-center mr-2 inline-flex items-center px-2.5 py-1 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150">
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 mx-auto mr-1 icon-user"><path className="primary" d="M12 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10z"/><path className="secondary" d="M21 20v-1a5 5 0 0 0-5-5H8a5 5 0 0 0-5 5v1c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2z"/></svg>
									Assign to
								</button>
								<button className=" my-auto inline-flex items-center mr-2 inline-flex items-center px-2.5 py-1 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150">
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 mx-auto mr-1 icon-flag"><path className="primary" d="M3 15a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h8a1 1 0 0 1 .7.3L13.42 5H21a1 1 0 0 1 .9 1.45L19.61 11l2.27 4.55A1 1 0 0 1 21 17h-8a1 1 0 0 1-.7-.3L10.58 15H3z"/><rect width="2" height="20" x="2" y="2" className="secondary" rx="1"/></svg>
									Status
								</button> */}
								{ renderResolveButton() }
							</div>
							
								
						</div>
						<div className='mt-1'>
							
							<p className='h-4 my-auto text-xs font-bold text-gray-600 uppercase'>
								Repro Steps:
							</p>
							<p className='text-sm'>
								{ props.post.text.length === 0 ? 'none provided' : props.post.text}
							</p>
							
						</div>
						

						
					</div>
				</div>
			</div>
		)
	}


    return (
        <div className="flex flex-col w-full">
			{/* { renderWarningMessage() } */}
           	<div className='relative flex flex-col flex-auto h-full'> 
			   	{ <ResolvePostModal show={displayResolvePostModal} onCancel={() => setDisplayResolvePostModal(false)} onResolve={() => resolvePost()}></ResolvePostModal>}
				{ renderPostTitle() }
				<div className='flex flex-row pt-2 pb-1 pl-2 pr-2 overflow-scroll'> 				
					{ renderToolbar() }	
				{ displayState === 'Simulator'  && simulatorParams?.appBuild !== undefined ? <div className="ml-3"><Simulator project={props.project} deviceType={'IPHONE_X'} mode={'VIEW'} appBuild={simulatorParams?.appBuild}/></div> : <></> }
					{ displayState === 'Attachment' ? <div className="ml-3"><Attachment deviceType={props.post.deviceType}/></div> : <></> }
					<div className='ml-3'>
						<PostScreenshot project={props.project} post={props.post} />
					</div>
				</div>
			</div>
        </div>
    )
}

export default PostView