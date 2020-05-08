import React, { useState, useEffect, useRef, ReactNode } from 'react'
import Transition from '../utils/Transition'
import InviteeSection, { CurrentInvitee } from './InviteeSection'
import { ProjectMember, Project, AppBuild } from '../types'
import { DataLayerClient } from '../clients/DataLayerClient'
import { UsersClient } from '../clients/UsersClient'
import uuid from 'uuid'
import Log from '../utils/Log'
import VersionTag from './VersionTag'
import moment from 'moment'
import DropZone from './DropZone'
import { AppBuildClient } from '../clients/AppBuildClient'
import { AssetStorageClient } from '../clients/AssetStorageClient'
import { AnalyticsClient } from '../utils/PRAnalytics'
import { useSelector } from '../store'
import AppBuildTable, {AppBuildRow} from './AppBuildTable'

type NewRevisionsModalProps = {
    onCancel: () => void
    onResolve: () => void
    show: boolean
    project: Project
}

const NewRevisionModal = (props: NewRevisionsModalProps) => {
    const versionRef = useRef<HTMLInputElement>(null)
    const [appBuildsLoading, setAppBuildsLoading] = useState(false)
    const [dropZoneKeyId, setDropZoneKeyId] = useState<string>()

    const [confirmButtonLoading, setConfirmButtonLoading] = useState(false)
    const [confirmButtonActive, setConfirmButtonActive] = useState(false)
    const [appBundleUploaded, setAppBundleUploaded] = useState(false)

    const [currentAppBuild, setCurrentAppBuild] = useState<AppBuild>()
    const [revisions, setRevisions] = useState<AppBuild[]>([])

    const [newAppBuildId, setNewAppBuildId] = useState<string>()

    const authState = useSelector(state => state.auth)

    useEffect(() => {
        setAppBuildsLoading(true)
        setNewAppBuildId(uuid())
        DataLayerClient.getProjectInfo(props.project.id).then( async (project) => {
            const currentAppBuild = project.currentAppBuild
            if (currentAppBuild !== undefined) {                
                const currentBuildArray = project.appBuilds.filter((appBuild) => 
                    appBuild.id === currentAppBuild.id
                )
                setCurrentAppBuild(currentBuildArray[0])
            }
            
            setRevisions(project.appBuilds.slice(1, project.appBuilds.length))
            setAppBuildsLoading(false)
        })
       
    }, [])

    const onRequiredInputChange = () => {
        const versionNameFilled = versionRef.current?.value !== undefined &&  versionRef.current?.value !== ''

        if (versionNameFilled && appBundleUploaded) {
            setConfirmButtonActive(true)
        } else {
            setConfirmButtonActive(false)
        }
    }

    const getSubmitterName = (appBuild: AppBuild): string => {
        const userId = appBuild.uploadedByUserId
        const projectMembers = props.project.members
        const projectMembersWithUserId = projectMembers.filter((member) => member.id === userId)
        if (projectMembersWithUserId.length === 0) {
            return 'not available'
        } else {
            return  projectMembersWithUserId[0].name
        }
    }

    const renderCurrentAppBuild = () => {
        
        if (currentAppBuild) {
            return (
                <AppBuildTable>
                    <AppBuildRow appBuild={currentAppBuild} submitterName={getSubmitterName(currentAppBuild)}></AppBuildRow>
                </AppBuildTable>                
            )
        }
       
    }

    const renderRevisions = () => {
        let items: JSX.Element[] = []
        revisions?.forEach((revision) => {
            items.push(<AppBuildRow appBuild={revision} submitterName={getSubmitterName(revision)}></AppBuildRow>)
        })
        if (revisions && revisions.length > 0) {
            return (
                <AppBuildTable>
                    { items }
                </AppBuildTable>
            ) 
        } else {
            return (
                <div className='w-full p-3 my-auto text-center border border-dashed rounded-lg bg-gray-50'>
                    <div className='font-bold text-gray-400'>No revisions have been submitted yet</div> 
                </div>
            )
           
        }
         
    }

    const renderConfirmBuildUpload = () => {
        const className = "inline-flex justify-center w-full px-4 py-2 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo sm:text-sm sm:leading-5"
        const inactiveButtonClass = "inline-flex justify-center w-full px-4 py-2 text-base font-medium leading-6 text-white border border-transparent bg-indigo-300 rounded-md shadow-sm cursor-not-allowed sm:text-sm sm:leading-5"
        const loadingClassName = className + " spinner "

        const onClick = () => {
            setConfirmButtonLoading(true)
            AssetStorageClient.getDownloadUrl(newAppBuildId!).then((url) => {
                return AppBuildClient.createAppBuildClient({
                    appBuildId: uuid(),
                    assetId: newAppBuildId!,
                    appName: props.project.name,
                    assetUrl: url,
                    appVersion: (versionRef.current?.value)!,
                    projectId: props.project.id
                })
            }).then((appBuild) => {
                setRevisions([...revisions, appBuild])
                setDropZoneKeyId(uuid()) // Hack to update the dropzone box
                setConfirmButtonLoading(false)
                if (versionRef.current === undefined || versionRef.current === null) return
                versionRef.current.value = ''
                // On required input change is not triggered so have to manually turn off the button
                // this kind of sucks
                setConfirmButtonActive(false)
                setAppBundleUploaded(false)
                AnalyticsClient.record('UPLOAD_NEW_REVISION', authState)
            }).catch(() => {
                setConfirmButtonLoading(false)
                setConfirmButtonActive(false)
                setAppBundleUploaded(false)
            })
            
        }

        const buttonClass = (() => {
            if (confirmButtonLoading) {
                return loadingClassName
            } else if (confirmButtonActive) {
                return className
            } else {
                return inactiveButtonClass
            }
        })()

        return (
            <button onClick={() => onClick()} disabled={!confirmButtonActive || confirmButtonLoading} type="button" className={buttonClass}>
                Submit 
            </button>
        )
    }

    const renderCloseButton = () => {
        return (
            <button onClick={() => {props.onCancel()}} type="button" className="text-gray-400 transition duration-150 ease-in-out hover:text-gray-500 focus:outline-none focus:text-gray-500">
                <svg className="w-6 h-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
            </button>
        )
    }

    return (
        <Transition show={props.show} appear={props.show}>
            <div className="fixed inset-x-0 bottom-0 z-50 p-4 px-4 overflow-scroll sm:inset-0 sm:flex sm:justify-center">
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
                        <div className="relative px-4 pt-5 pb-4 my-auto transition-all transform bg-white rounded-lg shadow-xl sm:p-6">
                            <div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
                                {renderCloseButton()}
                            </div>
                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:text-left">
                                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                                        Current App Version
                                    </h3>
                                    <div className={`mt-0.5 ${appBuildsLoading ? 'spinner' : ''}`}>
                                
                                        {renderCurrentAppBuild()}
                                    </div>
                                    <h3 className="mt-6 text-lg font-medium leading-6 text-gray-900">
                                        Revisions 
                                    </h3>
                                    <div className="w-full text-xs font-semibold text-gray-500 text-wrap">(new app versions that have been submitted since the original release creation)</div>
                                    <div className={`mt-0.5 ${appBuildsLoading ? 'spinner' : ''}`}>
                                
                                        {renderRevisions()}
                                    </div>

                                    <div className="grid grid-cols-1">
                                        <div className="col-span-3 mt-3">
                                            <div className='block text-sm font-medium leading-5 text-gray-700'>New Revision</div>
                                                
                                                <div className="mt-1 rounded-md shadow-sm">
                                                <input ref={versionRef} placeholder={'e.g. 1.0.0alpha'} onChange={() => onRequiredInputChange()} className="block w-full transition duration-150 ease-in-out form-input sm:text-sm sm:leading-5" />
                                            </div>
                                            { newAppBuildId && <DropZone key={dropZoneKeyId} projectId={props.project.id} bundleId={newAppBuildId} onBundleUploaded={() => {setAppBundleUploaded(true)}} /> }
                                    
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-3 sm:flex sm:flex-row-reverse">
                                <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                                    { renderConfirmBuildUpload() }
                                </span>
                            </div>
                        </div>
                    </Transition>

                </Transition>    
            </div>
        </Transition>
    )
}

export default NewRevisionModal