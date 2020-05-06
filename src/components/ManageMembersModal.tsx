import React from 'react'
import Transition from '../utils/Transition'

type ManageMembersModalProps = {
    onCancel: () => void
    onResolve: () => void
    show: boolean
}

const ManageMembersModal = (props: ManageMembersModalProps) => {
    return (
        <Transition show={props.show} appear={props.show}>
            <div className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center">
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
                        <div className="relative px-4 pt-5 pb-4 overflow-hidden transition-all transform bg-white rounded-lg shadow-xl sm:max-w-lg sm:w-full sm:p-6">
                            <div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
                                <button type="button" className="text-gray-400 transition duration-150 ease-in-out hover:text-gray-500 focus:outline-none focus:text-gray-500">
                                    <svg className="w-6 h-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                                    </svg>
                                </button>
                            </div>
                            <div className="sm:flex sm:items-start">
                            
                            <div className="mt-3 text-center sm:mt-0 sm:text-left">
                                <h3 className="text-lg font-medium leading-6 text-gray-900">
                                Deactivate account
                                </h3>
                                <div className="mt-2">
                                <p className="text-sm leading-5 text-gray-500">
                                    Are you sure you want to deactivate your account? All of your data will be permanantly removed from our servers forever. This action cannot be undone.
                                </p>
                                </div>
                            </div>
                            </div>
                            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                            <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                                <button type="button" className="inline-flex justify-center w-full px-4 py-2 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red sm:text-sm sm:leading-5">
                                Deactivate
                                </button>
                            </span>
                            <span className="flex w-full mt-3 rounded-md shadow-sm sm:mt-0 sm:w-auto">
                                <button type="button" className="inline-flex justify-center w-full px-4 py-2 text-base font-medium leading-6 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline sm:text-sm sm:leading-5">
                                Cancel
                                </button>
                            </span>
                            </div>
                        </div>
                    </Transition>
                </Transition>    
            </div>
        </Transition>
    )
}

export default ManageMembersModal