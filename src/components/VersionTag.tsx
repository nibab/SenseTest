import React from 'react'
import Transition from '../utils/Transition'
import AppBuildTable, { AppBuildRow } from './AppBuildTable'
import { AppBuild, DeviceType, deviceTypePretty } from '../types'


type VersionTagProps = {
    appBuild: AppBuild
}

const VersionTag = (props: VersionTagProps) => {
    return(
        <span className="font-mono inline-flex flex-shrink-0 items-center px-2.5 py-0.5 rounded-md text-xs font-bold leading-5 bg-indigo-100 text-indigo-800">
            <svg className="-ml-0.5 mr-1.5 h-2 w-2 text-indigo-400" fill="currentColor" viewBox="0 0 8 8">
                <circle cx="4" cy="4" r="3" />
            </svg>
            {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 mr-1 icon-tag"><path className="primary" d="M2.59 13.41A1.98 1.98 0 0 1 2 12V7a5 5 0 0 1 5-5h4.99c.53 0 1.04.2 1.42.59l8 8a2 2 0 0 1 0 2.82l-8 8a2 2 0 0 1-2.82 0l-8-8zM7 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/><path className="secondary" d="M12 18l6-6-4-4-6 6.01L12 18z"/></svg> */}
            { "v " + props.appBuild.version }
        </span>
    )
}

type DeviceTagProps = {
    deviceType: DeviceType
}

export const DeviceTag = (props: DeviceTagProps) => {
    return(
        <span className="font-mono inline-flex flex-shrink-0 items-center px-2.5 py-0.5 rounded-md text-xs font-bold leading-5 bg-cool-gray-200 text-cool-gray-800">
            {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 mr-1 icon-tag"><path className="primary" d="M2.59 13.41A1.98 1.98 0 0 1 2 12V7a5 5 0 0 1 5-5h4.99c.53 0 1.04.2 1.42.59l8 8a2 2 0 0 1 0 2.82l-8 8a2 2 0 0 1-2.82 0l-8-8zM7 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/><path className="secondary" d="M12 18l6-6-4-4-6 6.01L12 18z"/></svg> */}
            <svg className="-ml-0.5 mr-1.5 h-2 w-2 text-cool-gray-400" fill="currentColor" viewBox="0 0 8 8">
                <circle cx="4" cy="4" r="3" />
            </svg>
            { deviceTypePretty(props.deviceType) }
        </span>
    )
}


type VersionTagSelectorProps = {
    currentVersion: string
    show: boolean
    appBuild: AppBuild
}

const VersionTagSelector = (props: VersionTagSelectorProps) => {
    return (
        // <Transition show={props.show} appear={props.show}>
        <div className="relative inline-block text-left">
            <div>
                <span className="rounded-md shadow-sm">
                <button type="button" className="inline-flex justify-center w-full px-4 py-1 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800">
                    {"version " + props.currentVersion}
                    <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
                    </svg>
                </button>
                </span>
            </div>
            <Transition
                show={props.show}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <div className="absolute right-0 z-50 p-3 mt-2 origin-top-right bg-white rounded-md shadow-lg">
                    <AppBuildTable>
                        <AppBuildRow appBuild={props.appBuild} submitterName={'vase'} ></AppBuildRow>
                    </AppBuildTable>
                </div>
                {/* <div className="absolute right-0 z-50 w-56 mt-2 origin-top-right rounded-md shadow-lg">
                    <div className="bg-white rounded-md shadow-xs">
                    <div className="py-1">
                        <a href="#" className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900">Edit</a>
                        <a href="#" className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900">Duplicate</a>
                    </div>
                    <div className="border-t border-gray-100"></div>
                    <div className="py-1">
                        <a href="#" className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900">Archive</a>
                        <a href="#" className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900">Move</a>
                    </div>
                    <div className="border-t border-gray-100"></div>
                    <div className="py-1">
                        <a href="#" className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900">Share</a>
                        <a href="#" className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900">Add to favorites</a>
                    </div>
                    <div className="border-t border-gray-100"></div>
                    <div className="py-1">
                        <a href="#" className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900">Delete</a>
                    </div>
                    </div>
                </div> */}
            </Transition>
        </div>
        // </Transition>
    )
   
}

export default VersionTag