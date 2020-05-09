import React, { ReactNode } from 'react'

type ContainerProps = {
    tags: ReactNode
    header?: ReactNode
}

const Container: React.StatelessComponent<ContainerProps> = ({tags, header, children}) => {
    return (
        <div className='flex flex-col '>
            <div className='flex w-full h-8 font-mono'>
				<div className=' pb-1 mx-auto flex flex-row p-0.5'>
                    { tags }
                </div>
            </div>
			<div className='pb-3 pl-3 pr-3 border-2 border-gray-400 border-dashed rounded-lg '>
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