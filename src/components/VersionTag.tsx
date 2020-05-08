import React from 'react'


type VersionTagProps = {
    version: string
}

const VersionTag = (props: VersionTagProps) => {
    return(
        <span className="font-mono inline-flex flex-shrink-0 items-center px-2.5 py-0.5 rounded-md text-xs font-bold leading-5 bg-indigo-100 text-indigo-800">
            <svg className="-ml-0.5 mr-1.5 h-2 w-2 text-indigo-400" fill="currentColor" viewBox="0 0 8 8">
                <circle cx="4" cy="4" r="3" />
            </svg>
            {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 mr-1 icon-tag"><path className="primary" d="M2.59 13.41A1.98 1.98 0 0 1 2 12V7a5 5 0 0 1 5-5h4.99c.53 0 1.04.2 1.42.59l8 8a2 2 0 0 1 0 2.82l-8 8a2 2 0 0 1-2.82 0l-8-8zM7 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/><path className="secondary" d="M12 18l6-6-4-4-6 6.01L12 18z"/></svg> */}
            { "v " + props.version }
        </span>
    )
}

export default VersionTag