

import React, { useState, useEffect } from 'react'
import Modal from './Modal'
import AppBuildTable from './AppBuildTable'
import AppBuilds from './AppBuilds'
import { AppBuild, Project, DeviceType as LocalDeviceType, deviceTypePretty, allDeviceTypes } from '../types'
import { DataLayerClient } from '../clients/DataLayerClient'
import { DeviceType } from '../API'

type NewSimulatorModalProps = {
    show: boolean
    onCancel: () => void
    onRun: (deviceType: LocalDeviceType, appBuild: AppBuild) => void
    project: Project
}

const NewSimulatorModal = (props: NewSimulatorModalProps) => {

    const [appBuildsLoading, setAppBuildsLoading] = useState(false)
    const [currentAppBuild, setCurrentAppBuild] = useState<AppBuild>()
    const [selectedAppBuild, setSelectedAppBuild] = useState<AppBuild>()

    const [revisions, setRevisions] = useState<AppBuild[]>([])


    useEffect(() => {
        setAppBuildsLoading(true)
        DataLayerClient.getProjectInfo(props.project.id).then( async (project) => {
            const currentAppBuild = project.currentAppBuild
            if (currentAppBuild !== undefined) {                
                const currentBuildArray = project.appBuilds.filter((appBuild) => 
                    appBuild.id === currentAppBuild.id
                )
                setCurrentAppBuild(currentBuildArray[0])
            }
            
            setRevisions(project.appBuilds.filter(build => build.id !== currentAppBuild?.id))
            setAppBuildsLoading(false)
        })
       
    }, [])

    const renderCloseButton = () => {
        return (
            <button onClick={() => {props.onCancel()}} type="button" className="text-gray-400 transition duration-150 ease-in-out hover:text-gray-500 focus:outline-none focus:text-gray-500">
                <svg className="w-6 h-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
            </button>
        )
    }

    const [currentDeviceType, setCurrentDeviceType] = useState<LocalDeviceType>('IPHONE_X')

    const renderDevices = () => {
        const common = "mt-1 bg-gray-100  transition ease-in-out duration-15 align-top whitespace-no-wrap inline-flex items-center mr-1 p-2.5 px-5 text-sm font-medium rounded "
        const unselectedClass = common +  " cursor-pointer border text-gray-700 bg-white hover:text-indigo-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue"
        const selectedClass = common + "text-indigo-700 border border-indigo-600"

        const items: JSX.Element[] = []
        allDeviceTypes.forEach((deviceType) => {
            if (currentDeviceType === deviceType) {
                items.push(
                    <div className={selectedClass}>
                        <h2 className='mr-1'><a>{deviceTypePretty(deviceType)}</a></h2>
                    </div>
                )
            } else {
                items.push(
                    <div onClick={() => setCurrentDeviceType(deviceType)} className={unselectedClass}>
                        <h2 className='mr-1'><a>{deviceTypePretty(deviceType)}</a></h2>
                    </div>
                )
            }
            
        })
        

        return (
            <div className='w-full'>
                <div className='inline-block inline mt-3'>
                    {items}    
                </div>
            </div>
            
        )
    }

    return (
        <Modal show={props.show}>
            <div className="relative px-4 pt-5 pb-4 my-auto transition-all transform bg-white rounded-lg shadow-xl sm:p-6">
                <div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
                    {renderCloseButton()}
                </div>

                <div className='mt-2'>
                    <AppBuilds onSelected={(appBuild) => setSelectedAppBuild(appBuild)} selectable={true} revisions={revisions} currentAppBuild={currentAppBuild} isLoading={appBuildsLoading} project={props.project} />

                </div>
                <h3 className="mt-6 font-mono text-sm font-bold leading-6 text-gray-900">
                    Choose device
                </h3>
                { renderDevices() }
                <div className="mt-8 sm:mt-4 sm:flex sm:flex-row-reverse">
                    <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                        <button onClick={() => props.onRun(currentDeviceType, selectedAppBuild!)} type="button" className="inline-flex justify-center w-full px-4 py-2 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo sm:text-sm sm:leading-5">
                            Run
                        </button>
                    </span>
                </div>
            
            </div>
           
        </Modal>
    )
}

export default NewSimulatorModal