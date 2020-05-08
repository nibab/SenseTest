import React, { useEffect } from 'react'
import { AppBuildClient } from '../clients/AppBuildClient'
import { AppBuild, Project } from '../types'
import moment from 'moment'
import VersionTag from './VersionTag'

type AppBuildTableProps = {
    selectable?: boolean
}

const AppBuildTable: React.StatelessComponent<AppBuildTableProps> = ({selectable, children}) => {
    return (
        <div className="flex flex-col">
            <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                <div className="inline-block min-w-full overflow-hidden align-middle ">
                <table className="min-w-full">
                    <thead className='border-b'>
                        <tr>
                            <th className="py-1 pr-6 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 ">
                            Version 
                            </th> 
                            <th className="py-1 pr-6 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 ">
                            Date 
                            </th> 
                            <th className="py-1 pr-6 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase whitespace-no-wrap border-b border-gray-200">
                            Submitted By 
                            </th> 
                            { selectable && <th className="pr-6 border-gray-200 py-1border-b"></th>}
                        </tr>
                    </thead>
                    <tbody>
                        { children }
                    </tbody>
                </table>
                </div>
            </div>
        </div>
    )
}

type AppBuildRowProps = {
    appBuild: AppBuild
    submitterName: string
    selected?: boolean
    onSelect?: () => void
}

export const AppBuildRow = (props: AppBuildRowProps) => {
    useEffect(() => {}, [props.selected])

    return (
        <tr className="bg-white border-b border-gray-200">
            <td className="py-1 pr-6 text-sm font-medium leading-5 text-gray-900 whitespace-no-wrap">
                <VersionTag appBuild={props.appBuild}></VersionTag>
            </td>
            <td className="py-1 pr-6 text-sm font-semibold leading-5 text-gray-800 whitespace-no-wrap">
                {moment(props.appBuild.createdAt).calendar() }
            </td>
            <td className="py-1 pr-6 text-sm font-semibold leading-5 text-gray-800 whitespace-no-wrap">
                {props.submitterName} 
            </td>
           
            { props.selected !== undefined && <td className="py-1 pr-6 text-sm font-medium leading-5 text-right whitespace-no-wrap">
                <input onClick={() => { props.onSelect && props.onSelect() }} checked={props.selected ? props.selected : false} id="comments" type="checkbox" className="w-4 h-4 text-indigo-600 transition duration-150 ease-in-out form-checkbox" />

             </td> }
        </tr>
    )
}

export default AppBuildTable