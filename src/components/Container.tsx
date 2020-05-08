import React, { ReactNode } from 'react'

type ContainerProps = {
    tag: string
    header?: ReactNode
}

const Container: React.StatelessComponent<ContainerProps> = ({tag, header, children}) => {
    return (
        <div className='flex flex-col '>
			<text className='font-mono text-xs' >{ tag }</text>
			<div className='pl-3 pr-3 border-2 border-gray-400 border-dashed rounded-lg '>
				<div className='h-full'>
                    <div className='flex w-full h-8 my-1'>
                        <div className='mx-auto p-0.5 flex'>
                            {header}
                        </div>
                    </div>  
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Container