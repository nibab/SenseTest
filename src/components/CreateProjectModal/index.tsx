import React, { useState, useEffect, useRef, useCallback } from 'react'
import InputField from '../AuthForms/InputField'
import uuid from 'uuid'
import {useDropzone, DropzoneOptions } from 'react-dropzone'
import { AssetStorageClient } from '../../clients/AssetStorageClient'
import Log from '../../utils/Log'
import { DropDownProps } from 'antd/lib/dropdown'
import { DataLayerClient } from '../../clients/DataLayerClient'
import { AppBuildClient } from '../../clients/AppBuildClient'
import { UsersClient } from '../../clients/UsersClient'

type CreateProjectModalProps = {
    onCancel: () => void
    onSubmit: (projectId: string) => void
}

type RecentCollaborator = {
    email: string
    userId: string
}

type CurrentInvitee = {
    email: string
    userId?: string
}

const testCollaborator: RecentCollaborator = {
    email: 'czbabin@gmail.com',
    userId: '1'
}

const testInvitee: CurrentInvitee = {
    email: 'invitee@gmail.com'
}

const emailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)

const CreateProjectModal = (props: CreateProjectModalProps) => {
    const [recentCollaborators, setRecentCollaborators] = useState<Record<string, RecentCollaborator>>()
    const [currentInvitees, setCurrentInvitees] = useState<Record<string, CurrentInvitee>>()
    // Refs
    const inviteInputRef = useRef<HTMLInputElement>(null)
    const appNameRef = useRef<HTMLInputElement>(null)
    const versionRef = useRef<HTMLInputElement>(null)
    const [confirmAppBundleUploaded, setAppBundleUploaded] = useState(false)
    const [confirmButtonActive, setConfirmButtonActive] = useState(false)
    const [confirmButtonLoading, setConfirmButtonLoading] = useState(false)
    
    const [projectId, setProjectId] = useState<string>()
    const [bundleId, setBundleId] = useState<string>()

    useEffect(() => {
        const _currentInvitees: typeof currentInvitees = {}
        //_currentInvitees[testInvitee.email] = testInvitee
        //setCurrentInvitees(_currentInvitees)

        const _recentCollaborators: typeof recentCollaborators = {}
        _recentCollaborators[testCollaborator.email] = testCollaborator
        setRecentCollaborators(_recentCollaborators)

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
    }, [inviteInputRef, appNameRef, versionRef, confirmAppBundleUploaded])

    const onConfirmButtonClicked = () => {
        // Both inputs are forced unwrapped since otherwise confirm button is not active
        const appName = (appNameRef.current?.value)!
        const appVersion = (versionRef.current?.value)!
        setConfirmButtonLoading(true)
        DataLayerClient.createNewProject(projectId!, appName).then((project) => {
           return AssetStorageClient.getDownloadUrl(bundleId!)
        }).then((url) => {
            return AppBuildClient.createAppBuildClient({
                projectId: projectId!,
                assetId: bundleId!,
                appName: appName,
                appVersion: appVersion,
                assetUrl: url
            })
        }).then(async () => {
            if (currentInvitees !== undefined) {
                Object.keys(currentInvitees).forEach(async (email) => {
                    const response = await UsersClient.createAndInviteUser({userEmail: email, projectId: projectId!})
                })
            }
            
            setConfirmButtonLoading(false)
            props.onSubmit(projectId!)
            Log.info("Created new project.")
        })
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
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="m-0.5 w-5 icon-add"><path className="secondary" fill-rule="evenodd" d="M17 11a1 1 0 0 1 0 2h-4v4a1 1 0 0 1-2 0v-4H7a1 1 0 0 1 0-2h4V7a1 1 0 0 1 2 0v4h4z"/></svg> 
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
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className=" m-0.5 w-5  icon-close"><path className="secondary" fill-rule="evenodd" d="M15.78 14.36a1 1 0 0 1-1.42 1.42l-2.82-2.83-2.83 2.83a1 1 0 1 1-1.42-1.42l2.83-2.82L7.3 8.7a1 1 0 0 1 1.42-1.42l2.83 2.83 2.82-2.83a1 1 0 0 1 1.42 1.42l-2.83 2.83 2.83 2.82z"/></svg>
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
                                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                                        Create Release
                                    </h3>
                                </div>
                                <div className="grid grid-cols-1 row-gap-6 col-gap-4 mt-3 sm:grid-cols-6">
                                    <div className="sm:col-span-3">
                                        <label className="block text-sm font-medium leading-5 text-gray-700">
                                            App Name
                                        </label>
                                        <div className="mt-1 rounded-md shadow-sm">
                                        <input ref={appNameRef} onChange={() => onRequiredInputChange()} className="block w-full transition duration-150 ease-in-out form-input sm:text-sm sm:leading-5" />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-3">
                                        <label  className="block text-sm font-medium leading-5 text-gray-700">
                                            Version
                                        </label>
                                        <div className="mt-1 rounded-md shadow-sm">
                                        <input ref={versionRef} onChange={() => onRequiredInputChange()} className="block w-full transition duration-150 ease-in-out form-input sm:text-sm sm:leading-5" />
                                        </div>
                                    </div>
                            
                                    
                                    <div className="sm:col-span-6">
                                        { projectId && bundleId && <DropZone projectId={projectId} bundleId={bundleId} onBundleUploaded={() => setAppBundleUploaded(true)}/>}
                                    </div>
                                </div>
                                </div>
                                
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

type DropZoneState = 'WAITING' | 'UPLOADING' | 'DONE' | 'ERROR'
type DropZoneProps = {
    projectId: string
    bundleId: string
    onBundleUploaded: () => void
}
const DropZone = (props: DropZoneProps) => {
    const onDrop: DropzoneOptions["onDrop"] = (acceptedFiles) => {
        console.log("BLEA dropped file")
        acceptedFiles.forEach((file) => {
            const reader = new FileReader()
      
            reader.onabort = () => console.log('file reading was aborted')
            reader.onerror = () => console.log('file reading has failed')
            reader.onload = () => {
                // Do whatever you want with the file contents
                const binaryStr = reader.result
                console.log(binaryStr)
            }

            setFileInputName(file.name)

            AssetStorageClient.createUploadUrl(props.bundleId, props.projectId).then((presignedUrlFields) => {
                Log.info("Presigned url for get " + presignedUrlFields)
                return AssetStorageClient.uploadDataToUrlWithProgress(file, presignedUrlFields, (p) => setCounter(p))
            }).then(() => {
                setVisualState('DONE')
                props.onBundleUploaded()
            }).catch(() => {
                console.log("Something bad happened")
            })

            reader.readAsArrayBuffer(file)
        })
       
        setVisualState('UPLOADING')
    }

    const {getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject} = useDropzone({onDrop})
    const [visualState, setVisualState] = useState<DropZoneState>('WAITING')
    const [counter, setCounter] = useState<number>(0)
    const progressBarRef = useRef<HTMLDivElement>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [fileInputName, setFileInputName] = useState<string>()

    const renderWaiting = () => {
        return (
            <>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="mx-auto w-14 icon-box"><g><path className="secondary" d="M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7c0-1.1.9-2 2-2zm4 5a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2H9z"/><path className="primary" d="M4 3h16a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5c0-1.1.9-2 2-2z"/></g></svg>
                <p className="mt-1 text-sm text-gray-600">
                    
                    <button type="button" className="mr-1 font-medium text-indigo-600 transition duration-150 ease-in-out hover:text-indigo-500 focus:outline-none focus:underline">
                    Upload a file
                    <input type="file" ref={fileInputRef} style={{display: "none"}} />
                    </button>
                    or drag and drop
                </p>
                <p className="mt-1 text-xs text-gray-500">
                    Upload a .zip or .tar.gz file containing your compressed .app bundle.
                </p>
            </>
        )
    }

    const renderUploading = () => {
        return (
            <div className='outline-none'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="mx-auto w-14 icon-box"><g><path className="secondary" d="M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7c0-1.1.9-2 2-2zm4 5a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2H9z"/><path className="primary" d="M4 3h16a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5c0-1.1.9-2 2-2z"/></g></svg>
                <p className="mt-1 text-sm text-gray-600">
                    File Uploading ...
                </p>
                <div className='w-full h-4 mt-1 bg-gray-300 rounded-full shadow-inner'>
                    <div ref={progressBarRef} className='h-4 bg-green-300 rounded-full shadow-inner' style={{width: `${counter}%`}}>
                    </div>
                </div> 
            </div>
        )
    }

    const renderDone = () => {
        return(
            <>
                <div className="flex items-center justify-center w-12 h-12 mx-auto bg-green-100 rounded-full outline-none">
                    <svg className="w-6 h-6 text-green-600" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                    </svg>
                </div>
                <p className="mt-1 font-bold text-gray-600 text-md">
                    Done Uploading
                </p>
                <p className="mt-1 text-sm text-gray-600">
                    { fileInputName }
                </p>
            </>
        )
    }
    
    return (
        <>
            <label className="block text-sm font-medium leading-5 text-gray-700">
                .app bundle
            </label>
            <div {...getRootProps()}>
                <div className={`flex justify-center px-6 pt-5 pb-6 mt-2 border-2 border-gray-300 ${ isDragActive ? 'bg-gray-200' : '' } border-dashed rounded-md`} > 
                    
                    
                    { visualState === 'WAITING' && <div className="text-center outline-none">
                        <input {...getInputProps()} />
                        { renderWaiting() }
                    </div> }
                    { visualState === 'UPLOADING' && <div className="w-10/12 text-center"> { renderUploading() }</div>}
                    { visualState === 'DONE' && <div className="w-10/12 text-center"> { renderDone() }</div> }
                </div>
            </div>
            
        </>
    )
}

export default CreateProjectModal