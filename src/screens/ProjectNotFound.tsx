import React from 'react'
import Button from '../components/Button'
import { useHistory } from 'react-router-dom'

const NotFound = () => {
    const history = useHistory()

    return (
        <div className='flex w-full h-full bg-gray-100'>
            <div className='w-screen h-screen bg-gray-100'>
                <div className='flex flex-row w-full p-3 bg-white shadow-sm'>
                    <div className='justify-center flex-shrink-0 w-48 my-auto'>
                        <img className="object-contain p-2 transition duration-100 ease-in-out cursor-pointer filter-grayscale hover:filter-none" src={process.env.PUBLIC_URL + '/logo.png'} />
                    </div>
                    <div className='w-full '>
                    </div>
                    
                </div>
                <div className='flex flex-col w-full h-full p-5 py-8 text-center '>
                    <div className="justify-center mx-auto mt-1 text-lg font-bold text-gray-800 ">
                        {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="mx-auto w-14 icon-box"><g><path className="secondary" d="M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7c0-1.1.9-2 2-2zm4 5a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2H9z"/><path className="primary" d="M4 3h16a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5c0-1.1.9-2 2-2z"/></g></svg> */}
                        <svg className="w-32 mx-auto text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-32 icon-help"><path d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20z"/><path className="secondary" d="M12 19.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm1-5.5a1 1 0 0 1-2 0v-1.41a1 1 0 0 1 .55-.9L14 10.5C14.64 10.08 15 9.53 15 9c0-1.03-1.3-2-3-2-1.35 0-2.49.62-2.87 1.43a1 1 0 0 1-1.8-.86C8.05 6.01 9.92 5 12 5c2.7 0 5 1.72 5 4 0 1.3-.76 2.46-2.05 3.24L13 13.2V14z"/></svg>
                        </svg>
                        <h1 className="px-2 pt-5 text-5xl font-extrabold leading-tight text-gray-900">Not found</h1>
                        <h3 className="px-2 pt-2 font-mono text-2xl font-extrabold leading-tight text-gray-600">The page you are looking for is not available</h3>

                    </div>
                    <div className='mt-10'>
                        <button className="inline-flex items-center px-6 py-3 text-lg font-bold text-gray-700 whitespace-no-wrap transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md shadow-sm my-autotext-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-indigo active:text-gray-800 active:bg-gray-50" onClick={() => {history.push('/projects')}}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-8 my-auto mr-2 icon-home"><path className="primary" d="M9 22H5a1 1 0 0 1-1-1V11l8-8 8 8v10a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-4a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v4a1 1 0 0 1-1 1zm3-9a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/><path className="secondary" d="M12.01 4.42l-8.3 8.3a1 1 0 1 1-1.42-1.41l9.02-9.02a1 1 0 0 1 1.41 0l8.99 9.02a1 1 0 0 1-1.42 1.41l-8.28-8.3z"/></svg>

                            Go Home
                        </button>
                    </div>
                   
                </div>
               
            </div>
        </div>	
    )
}

export default NotFound