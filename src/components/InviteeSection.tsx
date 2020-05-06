import React, { useState, useRef, useEffect } from 'react'

export type RecentCollaborator = {
    email: string
    userId: string
}

export type CurrentInvitee = {
    email: string
    userId?: string
}

type InviteeSectionProps = {
    recentCollaborators?: Record<string, RecentCollaborator>,
    onInviteesChange: (invitees: CurrentInvitee[]) => void
}

const emailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)

const InviteeSection = (props: InviteeSectionProps) => {
    const [recentCollaborators, setRecentCollaborators] = useState<Record<string, RecentCollaborator>>()
    const [currentInvitees, setCurrentInvitees] = useState<Record<string, CurrentInvitee>>()
    const inviteInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        const _currentInvitees: typeof currentInvitees = {}
        //_currentInvitees[testInvitee.email] = testInvitee
        //setCurrentInvitees(_currentInvitees)

        // const _recentCollaborators: typeof recentCollaborators = {}
        // _recentCollaborators[testCollaborator.email] = testCollaborator
        // setRecentCollaborators(_recentCollaborators)
    }, [])

    useEffect(() => {
        if (currentInvitees !== undefined) {
            props.onInviteesChange( Object.values(currentInvitees))
        }
    }, [currentInvitees])
    
    const renderCurrentInvitees = () => {
        const removeInvitee = (inviteeId: string) => {

            const currentInviteesCopy = currentInvitees ? {...currentInvitees} : {}
            if (currentInviteesCopy[inviteeId] !== undefined) delete currentInviteesCopy[inviteeId]
            setCurrentInvitees(currentInviteesCopy)
        }

        const items: JSX.Element[] = []
        if (currentInvitees !== undefined) {
            Object.keys(currentInvitees).forEach((inviteeId) => {
                const invitee = currentInvitees[inviteeId]
                items.push(
                    <div className="mt-1 bg-gray-100 align-top whitespace-no-wrap inline-flex items-center mr-1 pl-2.5 text-sm font-medium rounded text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue ">
                        <h2 className='mr-1 text-gray-700'><a>{invitee.email}</a></h2>
                        <div onClick={() => removeInvitee(inviteeId)} className='transition ease-in-out cursor-pointer active:text-gray-800 active:bg-gray-100 duration-15'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className=" m-0.5 w-5  icon-close"><path className="secondary" fillRule="evenodd" d="M15.78 14.36a1 1 0 0 1-1.42 1.42l-2.82-2.83-2.83 2.83a1 1 0 1 1-1.42-1.42l2.83-2.82L7.3 8.7a1 1 0 0 1 1.42-1.42l2.83 2.83 2.82-2.83a1 1 0 0 1 1.42 1.42l-2.83 2.83 2.83 2.82z"/></svg>
                        </div>
                    </div>
                )
            })
        }

        return (
            <div className='w-full'>
                <div className='inline-block inline mt-3'>
                    {items}    
                </div>
            </div>
            
        )
    }

    const onAddInviteeButton = () => {
        if (inviteInputRef.current === undefined || inviteInputRef.current === null || inviteInputRef.current?.value === '') return
        const newEmail = (inviteInputRef.current.value).replace(/\s/g, "") //trim whitespaces
        if (!emailRegex.test(newEmail)) return

        const currentInviteesCopy = currentInvitees ? {...currentInvitees} : {}
        currentInviteesCopy[newEmail] = {
            email: newEmail
        }
        setCurrentInvitees(currentInviteesCopy)
        inviteInputRef.current.value = ''
    }

    const renderRecentCollaborators = () => {
        const onRecentCollaboratorAddedAsInvitee = (collaboratorId: string) => {
            const currentInviteesCopy = currentInvitees ? {...currentInvitees} : {}
            const collaboratorObject = recentCollaborators![collaboratorId]

            currentInviteesCopy[collaboratorObject.email] = {
                email: collaboratorObject.email,
                userId: collaboratorObject.userId
            }
            setCurrentInvitees(currentInviteesCopy)

            const currentCollaboratorsCopy = recentCollaborators ? {...recentCollaborators} : {}
            if (currentCollaboratorsCopy[collaboratorId] !== undefined) delete currentCollaboratorsCopy[collaboratorId]
            setRecentCollaborators(currentCollaboratorsCopy)
        }

        const items: JSX.Element[] = []

        if (recentCollaborators !== undefined) {
            Object.keys(recentCollaborators).forEach((collaboratorId) => {
                const collaborator = recentCollaborators[collaboratorId]
                items.push(
                    <div className="mt-1 my-auto align-top bg-gray-100 whitespace-no-wrap inline-flex items-center mr-1 pl-2.5 pr-1 text-sm font-medium rounded text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue ">
                        <h2 className='mr-1 text-gray-700'><a>{collaborator.email}</a></h2>
                        <div onClick={() => onRecentCollaboratorAddedAsInvitee(collaboratorId)} className='transition ease-in-out cursor-pointer active:text-gray-800 active:bg-gray-100 duration-15'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="m-0.5 w-5 icon-add"><path className="secondary" fillRule="evenodd" d="M17 11a1 1 0 0 1 0 2h-4v4a1 1 0 0 1-2 0v-4H7a1 1 0 0 1 0-2h4V7a1 1 0 0 1 2 0v4h4z"/></svg> 
                        </div>
                    </div>
                )
            })
        }

        return (
            <>{ items.length > 0 && <div className='w-full'>
                <div className='flex-col inline-block mt-2'>
                    <p className="text-xs text-gray-500 ">Recent collaborators</p>
                    {items}
                </div>
            </div>} 
            </>
        )
    }

    return (
        <div className="mt-6 border-gray-200 ">
            <fieldset className="mt-6">
                <label className="block text-sm font-medium leading-5 text-gray-700 ">
                    Invite 
                </label>

                <div className='flex flex-row mt-2 mb-1 text-sm leading-tight text-gray-700 bg-white border rounded-md font'>
                    <input ref={inviteInputRef} type={'email'} className='flex-wrap  w-full h-full p-2 m-0.5 outline-none focus:outline-none'>
                        
                    </input>
                    <div onClick={onAddInviteeButton} className='inline-flex items-center h-8 px-2 py-1 my-auto mt-1 mb-1 ml-1 mr-1 text-xs font-medium leading-4 text-indigo-600 transition duration-150 ease-in-out bg-white border border-indigo-500 rounded cursor-pointer hover:text-indigo-800 hover:border-indigo-700 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:text-indigo-500'>
                        Add
                    </div>
                </div>
                { renderCurrentInvitees() }
                { renderRecentCollaborators() }
            </fieldset>
        </div> 
    )
}

export default InviteeSection