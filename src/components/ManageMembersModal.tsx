import React, { useState, useEffect } from 'react'
import Transition from '../utils/Transition'
import InviteeSection, { CurrentInvitee } from './InviteeSection'
import { ProjectMember, Project } from '../types'
import { DataLayerClient } from '../clients/DataLayerClient'
import { UsersClient } from '../clients/UsersClient'
import uuid from 'uuid'
import Log from '../utils/Log'

type ManageMembersModalProps = {
    onCancel: () => void
    onResolve: () => void
    show: boolean
    project: Project
}

const ManageMembersModal = (props: ManageMembersModalProps) => {
    const [members, setMembers] = useState<ProjectMember[]>()
    const [membersLoading, setMembersLoading] = useState(false)
    const [sendInvitesButtonLoading, setSendInvitesButtonLoading] = useState(false)
    const [sendInvitesButtonActive, setSendInvitesButtonActive] = useState(false)
    const [currentInvitees, setCurrentInvitees] = useState<CurrentInvitee[]>([])
    const [inviteSectionKey, setInviteSectionKey] = useState(uuid())

    const rendeMembers = () => {
        let items: JSX.Element[] = []
        members?.forEach((member) => {
            items.push(renderItem(member))
        })
		return items
    }
    
    useEffect(() => {
        setMembersLoading(true)
        DataLayerClient.getProjectInfo(props.project.id).then( async (project) => {
            setMembers(project.members)
            setMembersLoading(false)
        })
       
    }, [])

    useEffect(() => {
        if (currentInvitees.length === 0) {
            setSendInvitesButtonActive(false)
        } else {
            setSendInvitesButtonActive(true)
        }
    }, [currentInvitees])

    const renderTableHeader = () => {
        const common = 'mt-4 pt-1 mb-1 flex flex-row '
        const className = 'relative text-xs font-medium text-gray-500 bg-white border-t border-b'  + ' ' + common
        
        return (
            <div className={className}>
				{/* <span className="top-0 left-0 flex items-center justify-center flex-shrink-0 block w-6 h-4 my-auto mr-1 text-xs font-bold text-white bg-red-400 rounded-full">12</span> */}
				<div className='w-full my-auto truncate '>
					User Email						
				</div>
                <div className='flex'>
					{/* {
						//post.status === 'RESOLVED' && 
						<span className="my-auto font-bold uppercase ml-1 bg-green-100 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium leading-4 text-green-800">
							Resolved
						</span>
					}  */}
				</div>
            </div>

        )
    }

	const renderItem = (member: ProjectMember) => {
		const common = 'mb-1 pt-1 pb-1 flex flex-row '
		const notSelectedClassName = 'bg-white border-b font-medium relative text-gray-700'  + ' ' + common

		const className = notSelectedClassName

		return (
			<div key={member.id} className={className}>
				{/* <span className="top-0 left-0 flex items-center justify-center flex-shrink-0 block w-6 h-4 my-auto mr-1 text-xs font-bold text-white bg-red-400 rounded-full">12</span> */}
				<div className='w-full my-auto text-sm truncate '>
					{ member.email }							
				</div>
				<div className='flex'>
					{
						// <span className="my-auto font-bold uppercase ml-1 bg-green-100 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium leading-4 text-green-800">
						// 	Pending
						// </span>
					}
				</div>	
			</div>
		)	
    }
    
    const renderSendInvitesButton = () => {
        const className = "inline-flex justify-center w-full px-4 py-2 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo sm:text-sm sm:leading-5"
        const inactiveButtonClass = "inline-flex justify-center w-full px-4 py-2 text-base font-medium leading-6 text-white border border-transparent bg-indigo-300 rounded-md shadow-sm cursor-not-allowed sm:text-sm sm:leading-5"
        const loadingClassName = className + " spinner "

        const onClick = () => {
            setSendInvitesButtonLoading(true)
            const arrayOfPromises: Promise<any>[] = []
            const newMembers = members? [...members]: []
            currentInvitees.forEach((invitee) => {
                
                const anyFound = newMembers.filter((member) => member.email === invitee.email)
                if (anyFound.length === 0) {
                    newMembers?.push({...invitee, id: uuid(), name: invitee.email})
                    const response = UsersClient.createAndInviteUser({userEmail: invitee.email, projectId: props.project.id})
                    arrayOfPromises.push(response)
                }
                
            })

            arrayOfPromises.reduce((promiseChain, currentTask) => {
                return promiseChain.then(chainResults =>
                    currentTask.then(currentResult => {
                        return [ ...chainResults, currentResult ]
                    })
                );
            }, Promise.resolve([])).catch((err) => {
                Log.error("There was an error with one of the promises.")
            }).then(arrayOfResults => {
                // Adding a user to a project is supposed to fail gracefully. If a user already exists in a project, nothing is
                // going to happen. If a user with the said email already exists, nothing is going to happen, besides that 
                // user getting an email with a link to the project.
                setSendInvitesButtonLoading(false)
                setMembers(newMembers)
                setCurrentInvitees([])
                setInviteSectionKey(uuid()) // this forces a re-render of the invite section to clear all current invitees
            })
           
        }

        const buttonClass = (() => {
            if (sendInvitesButtonLoading) {
                return loadingClassName
            } else if (sendInvitesButtonActive) {
                return className
            } else {
                return inactiveButtonClass
            }
        })()

        return (
            <button onClick={() => onClick()} disabled={!sendInvitesButtonActive || sendInvitesButtonLoading} type="button" className={buttonClass}>
                Send Invites
            </button>
        )
    }

    return (
        <Transition show={props.show} appear={props.show}>
            <div className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center">
                <Transition
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >

                
                    <div className="fixed inset-0 transition-opacity">
                        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                    </div>

                    <Transition
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-300"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="relative px-4 pt-5 pb-4 overflow-hidden transition-all transform bg-white rounded-lg shadow-xl sm:max-w-lg sm:w-full sm:p-6">
                            <div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
                                <button onClick={() => {props.onCancel()}} type="button" className="text-gray-400 transition duration-150 ease-in-out hover:text-gray-500 focus:outline-none focus:text-gray-500">
                                    <svg className="w-6 h-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                                    </svg>
                                </button>
                            </div>
                            <div className="sm:flex sm:items-start">
                            
                            <div className="mt-3 text-center w-96 sm:mt-0 sm:text-left">
                                <h3 className="text-lg font-medium leading-6 text-gray-900">
                                Members
                                </h3>
                                <div className={`${membersLoading ? 'spinner' : ''}`}>
                                { renderTableHeader() }
                                { rendeMembers() }
                                </div>

                                
                                <div className="mt-2">
                                    <InviteeSection key={inviteSectionKey} onInviteesChange={(curr) => {setCurrentInvitees(curr)}}></InviteeSection>
                               
                                </div>
                            </div>
                            </div>
                            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                            <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                                { renderSendInvitesButton() }
                            </span>
                            </div>
                        </div>
                    </Transition>
                </Transition>    
            </div>
        </Transition>
    )
}

export default ManageMembersModal