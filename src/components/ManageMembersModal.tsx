import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import Transition from '../utils/Transition'
import InviteeSection, { CurrentInvitee } from './InviteeSection'
import { ProjectMember, Project } from '../types'
import { DataLayerClient } from '../clients/DataLayerClient'
import { UsersClient } from '../clients/UsersClient'
import uuid from 'uuid'
import Log from '../utils/Log'
import { AnalyticsClient } from '../utils/PRAnalytics'
import { useSelector } from '../store'
import Modal from './Modal'

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

    const firstUpdate = useRef(true);
    useLayoutEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false
            return
        } 
    });
    
    useEffect(() => {
        if (!firstUpdate.current && props.show) {
            setMembersLoading(true)
            DataLayerClient.getProjectInfo(props.project.id, false).then( async (project) => {
                setMembers(project.members)
                setMembersLoading(false)
            })
        }
    }, [props.show])

    useEffect(() => {
        if (currentInvitees.length === 0) {
            setSendInvitesButtonActive(false)
        } else {
            setSendInvitesButtonActive(true)
        }
    }, [currentInvitees])

    const renderTableHeader = () => {
        const common = 'mt-2 pt-1 mb-1 flex flex-row '
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
        <Modal show={props.show}>
            <div className="relative px-4 pt-5 pb-4 my-auto overflow-hidden transition-all transform bg-white rounded-lg shadow-xl w-72 sm:max-w-lg sm:w-full sm:p-6">
                <div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
                    <button onClick={() => {props.onCancel()}} type="button" className="text-gray-400 transition duration-150 ease-in-out hover:text-gray-500 focus:outline-none focus:text-gray-500">
                        <svg className="w-6 h-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    </button>
                </div>
                <div className="sm:flex sm:items-start">
                
                <div className="w-full mt-3 text-center sm:mt-0 sm:text-left">
                    <h3 className="font-mono text-sm font-bold leading-6 text-gray-900">
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
                <div className="mt-3 sm:flex sm:flex-row-reverse">
                    <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                        { renderSendInvitesButton() }
                    </span>
                </div>
            </div>
        </Modal>
    )
}

export default ManageMembersModal