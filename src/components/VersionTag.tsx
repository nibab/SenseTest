import React from 'react'


type VersionTagProps = {
    version: string
}

const VersionTag = (props: VersionTagProps) => {
    return(
        <span className="ml-2 inline-flex flex-shrink-0 items-center px-2.5 py-0.5 rounded-md text-sm font-medium leading-5 bg-indigo-100 text-indigo-800">
            <svg className="-ml-0.5 mr-1.5 h-2 w-2 text-indigo-400" fill="currentColor" viewBox="0 0 8 8">
                <circle cx="4" cy="4" r="3" />
            </svg>
            { "v " + props.version }
        </span>
    )
}

export default VersionTag