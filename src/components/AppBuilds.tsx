import React, { useEffect, useState } from 'react'
import { AppBuild, Project } from '../types'
import AppBuildTable, { AppBuildRow } from './AppBuildTable'

type AppBuildProps = {
    isLoading: boolean
    currentAppBuild?: AppBuild
    revisions: AppBuild[]
    project: Project
    selectable?: boolean
    onSelected?: (appBuild: AppBuild) => void
}

const AppBuilds = (props: AppBuildProps) => {
    const [selected, setSelected] = useState<AppBuild | undefined>(props.currentAppBuild)

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

    useEffect(() => {}, [props.revisions, props.isLoading, props.revisions])

    useEffect(() => {
        setSelected(props.currentAppBuild)
        if (props.onSelected && props.currentAppBuild) props.onSelected(props.currentAppBuild)
    }, [])

    const setSelectedAndPropagate = (appBuild?: AppBuild) => {
        setSelected(appBuild)
        if (props.onSelected && appBuild) props.onSelected(appBuild) 
    }

    const renderCurrentAppBuild = () => {
        
        if (props.currentAppBuild) {
            return (
                <AppBuildTable selectable={props.selectable}>
                    <AppBuildRow 
                        onSelect={() => setSelectedAndPropagate(props.currentAppBuild)} 
                        selected={props.selectable ? selected?.id === props.currentAppBuild.id : undefined} 
                        appBuild={props.currentAppBuild} submitterName={getSubmitterName(props.currentAppBuild)}
                    />
                </AppBuildTable>                
            )
        }
       
    }

    const renderRevisions = () => {
        let items: JSX.Element[] = []
        props.revisions?.forEach((revision) => {
            items.push(
                <AppBuildRow 
                    onSelect={() => setSelectedAndPropagate(revision)} 
                    selected={props.selectable ? selected?.id === revision.id : undefined} 
                    appBuild={revision} 
                    submitterName={getSubmitterName(revision)}
                ></AppBuildRow>
            )
        })
        if (props.revisions && props.revisions.length > 0) {
            return (
                <AppBuildTable selectable={props.selectable}>
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

    return (
        <>
            <h3 className="font-mono text-sm font-bold leading-6 text-gray-900">
                Current App Version
            </h3>
            <div className={`${props.isLoading ? 'spinner' : ''}`}>
        
                {renderCurrentAppBuild()}
            </div>
            <h3 className="mt-6 font-mono text-sm font-bold leading-6 text-gray-900">
                Revisions 
            </h3>
            <div className="w-full font-mono text-xs font-medium text-gray-500 text-wrap">(new app versions that have been submitted since the original release creation)</div>
            <div className={`${props.isLoading ? 'spinner' : ''}`}>
        
                {renderRevisions()}
            </div>
        </>
    )
}

export default AppBuilds