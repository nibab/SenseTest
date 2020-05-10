import React, { useState, useEffect, useRef } from 'react'
import uuid from 'uuid'
import {useDropzone, DropzoneOptions } from 'react-dropzone'
import { AssetStorageClient } from '../../clients/AssetStorageClient'
import Log from '../../utils/Log'
import { DataLayerClient } from '../../clients/DataLayerClient'
import { AppBuildClient } from '../../clients/AppBuildClient'
import { UsersClient } from '../../clients/UsersClient'
import InviteeSection, { CurrentInvitee } from '../InviteeSection'
import DropZone from '../DropZone'
import { AnalyticsClient } from '../../utils/PRAnalytics'
import { useSelector } from '../../store'

type CreateProjectModalProps = {
    onCancel: () => void
    onSubmit: (projectId: string) => void
}

// const testCollaborator: RecentCollaborator = {
//     email: 'czbabin@gmail.com',
//     userId: '1'
// }

// const testInvitee: CurrentInvitee = {
//     email: 'invitee@gmail.com'
// }


const CreateProjectModal = (props: CreateProjectModalProps) => {
    const [currentInvitees, setCurrentInvitees] = useState<CurrentInvitee[]>([])
    // Refs
    const appNameRef = useRef<HTMLInputElement>(null)
    const versionRef = useRef<HTMLInputElement>(null)
    const [confirmAppBundleUploaded, setAppBundleUploaded] = useState(false)
    const [confirmButtonActive, setConfirmButtonActive] = useState(false)
    const [confirmButtonLoading, setConfirmButtonLoading] = useState(false)
    
    const [projectId, setProjectId] = useState<string>()
    const [bundleId, setBundleId] = useState<string>()
    const authState = useSelector(state => state.auth)

    useEffect(() => {
        setProjectId(uuid())
        setBundleId(uuid())
    }, [])

    const onRequiredInputChange = () => {
        const appNameFilled = appNameRef.current?.value !== undefined && appNameRef.current?.value !== ''
        const versionNameFilled = versionRef.current?.value !== undefined &&  versionRef.current?.value !== ''
        const appBuildUploaded = confirmAppBundleUploaded

        if (appNameFilled && versionNameFilled && appBuildUploaded) {
            setConfirmButtonActive(true)
        } else {
            setConfirmButtonActive(false)
        }
    }

    useEffect(() => {
        onRequiredInputChange()
    }, [appNameRef, versionRef, confirmAppBundleUploaded])

    const onConfirmButtonClicked = () => {
        // Both inputs are forced unwrapped since otherwise confirm button is not active
        const appName = (appNameRef.current?.value)!
        const appVersion = (versionRef.current?.value)!
        const appBuildId = uuid()
        setConfirmButtonLoading(true)
        DataLayerClient.createNewProject(projectId!, appName, appBuildId).then((project) => {
           return AssetStorageClient.getDownloadUrl(bundleId!)
        }).then((url) => {
            return AppBuildClient.createAppBuildClient({
                appBuildId: appBuildId,
                projectId: projectId!,
                assetId: bundleId!,
                appName: appName,
                appVersion: appVersion,
                assetUrl: url
            })
        }).then(async () => {
            if (currentInvitees !== undefined) {
                const arrayOfPromises: Promise<any>[] = []
                currentInvitees.forEach(async (invitee) => {
                    const response = UsersClient.createAndInviteUser({userEmail: invitee.email, projectId: projectId!})
                    arrayOfPromises.push(response)
                    AnalyticsClient.record('INVITED_USER', authState)
                })
                Promise.all(arrayOfPromises).then(() => {
                    setConfirmButtonLoading(false)
                    props.onSubmit(projectId!)
                    AnalyticsClient.record('CREATED_PROJECT', authState)
                    Log.info("Created new project.")
                }).catch(() => {
                    setConfirmButtonLoading(false)
                    props.onSubmit(projectId!)
                    Log.error("Created new project with some errors.")
                })
            }
        })
    }

    const renderButtons = () => {
        const activeButtonClass = "inline-flex justify-center w-full px-4 py-2 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo sm:text-sm sm:leading-5"
        const inactiveButtonClass = "inline-flex justify-center w-full px-4 py-2 text-base font-medium leading-6 text-white border border-transparent bg-indigo-300 rounded-md shadow-sm cursor-not-allowed sm:text-sm sm:leading-5"

        const renderConfirmButton = () => {
            return(
                <button onClick={() => onConfirmButtonClicked()} type="button" disabled={!confirmButtonActive} className={confirmButtonActive ? activeButtonClass : inactiveButtonClass}>
                    { confirmButtonLoading ? <div className='spinner'></div> : 'Create'}
                </button>
            )
        }

        return (
            <div className="px-1 mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <span className="flex w-full rounded-md shadow-sm sm:col-start-2">
                    { renderConfirmButton() }
                </span>
                <span className="flex w-full mt-3 rounded-md shadow-sm sm:mt-0 sm:col-start-1">
                    <button onClick={props.onCancel} type="button" className="inline-flex justify-center w-full px-4 py-2 text-base font-medium leading-6 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline sm:text-sm sm:leading-5">
                        Cancel
                    </button>
                </span>
            </div>
        )
    }

 
    return(
            <div className="fixed inset-x-0 bottom-0 px-4 pb-6 sm:inset-0 sm:p-0 sm:flex sm:items-center sm:justify-center">
            {/* Background overlay, show/hide based on modal state.
        
            Entering: "ease-out duration-300"
                From: "opacity-0"
                To: "opacity-100"
            Leaving: "ease-in duration-200"
                From: "opacity-100"
                To: "opacity-0" */}
            <div className="fixed inset-0 transition-opacity">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
        
            {/* Modal panel, show/hide based on modal state.
        
            Entering: "ease-out duration-300"
                From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                To: "opacity-100 translate-y-0 sm:scale-100"
            Leaving: "ease-in duration-200"
                From: "opacity-100 translate-y-0 sm:scale-100"
                To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" */}
            <div className="px-4 pt-5 pb-4 overflow-hidden transition-all transform bg-white rounded-lg shadow-xl sm:max-w-lg sm:w-full sm:p-6">
                <div>
                
                    <div className='flex flex-row '> 
                        <div className="flex-auto h-full px-1 overflow-scroll ">
                            <form>
                                <div>
                                <div>
                                <div>
                                    <h3 className="font-mono text-lg font-bold leading-6 text-gray-900">
                                        Create Release
                                    </h3>
                                </div>
                                <div className="grid grid-cols-1 row-gap-6 col-gap-4 mt-3 sm:grid-cols-6">
                                    <div className="sm:col-span-3">
                                        <label className="block font-mono text-xs font-semibold leading-5 text-gray-700">
                                            App Name
                                        </label>
                                        <div className="mt-1 rounded-md shadow-sm">
                                        <input ref={appNameRef} onChange={() => onRequiredInputChange()} className="block w-full transition duration-150 ease-in-out form-input sm:text-sm sm:leading-5" />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-3">
                                        <label  className="block font-mono text-xs font-semibold leading-5 text-gray-700">
                                            Version
                                        </label>
                                        <div className="mt-1 rounded-md shadow-sm">
                                        <input ref={versionRef} onChange={() => onRequiredInputChange()} className="block w-full transition duration-150 ease-in-out form-input sm:text-sm sm:leading-5" />
                                        </div>
                                    </div>
                            
                                    
                                    <div className="sm:col-span-6">
                                        { projectId && bundleId && <DropZone title={'.app build'} projectId={projectId} bundleId={bundleId} onBundleUploaded={() => setAppBundleUploaded(true)}/>}
                                    </div>
                                </div>
                                </div>
                                
                                <InviteeSection onInviteesChange={(curr) => setCurrentInvitees(curr)}></InviteeSection>     
                                </div>
                            
                            </form>
                        </div>
                            
                        
                    </div>

                </div>
                { renderButtons() }
            </div>
        </div>
    )
}

export default CreateProjectModal