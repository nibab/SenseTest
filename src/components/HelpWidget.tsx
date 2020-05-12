import React, { useState } from 'react'
import Transition from '../utils/Transition'
import Modal from './Modal'

const HelpWidget = () => {
    const [showToolTip, setShowToolTip] = useState(false)
    const [showTutorialModal, setShowTutorialModal] = useState(false)
    
    return (
    <div className="fixed bottom-0 right-0 z-40 inline-block inline p-3">
        <HelpModal show={showTutorialModal} onCancel={() => setShowTutorialModal(false)}></HelpModal>
        <Transition
            show={showToolTip}
            enter="ease-out duration-150"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
            <div>
                <div className="relative p-2 px-3 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg">
                    Click for tutorial videos and other helpful tips.
                </div>
                <div className="flex justify-end mb-0.5">
                    <div className="w-12 h-2">
                        <svg xmlns="http://www.w3.org/2000/svg"  className="h-3 mx-auto text-gray-200 " viewBox="0 0 255 255"><polygon className="fill-current" points="0,0 127.5,127.5 255,0"/></svg>
                    </div>  
                </div>
            </div>
            
        </Transition>

        <div onClick={() => setShowTutorialModal(true)}  onMouseEnter={() => setShowToolTip(true)} onMouseLeave={() => setShowToolTip(false)} className="flex justify-end flex-grow-0">
        
            <div className="w-12 text-gray-400 bg-gray-100 border border-gray-300 rounded-full shadow-sm cursor-pointer focus:outline-none hover:bg-gray-200 active:bg-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-full"><path className="secondary" d="M12 19.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm1-5.5a1 1 0 0 1-2 0v-1.41a1 1 0 0 1 .55-.9L14 10.5C14.64 10.08 15 9.53 15 9c0-1.03-1.3-2-3-2-1.35 0-2.49.62-2.87 1.43a1 1 0 0 1-1.8-.86C8.05 6.01 9.92 5 12 5c2.7 0 5 1.72 5 4 0 1.3-.76 2.46-2.05 3.24L13 13.2V14z"/></svg>
            </div>
        </div>
       
    </div>
    )
}

type HelpModalProps = {
    onCancel: () => void
    show: boolean
}

const HelpModal = (props: HelpModalProps) => {
    const links = ["Create new project", "Create new annotation", "Invite members", "Verify fix"]
    const [currentLink, setCurrentLink] = useState("Create new project")

    const renderLinks = () => {
        const common = "mt-1 bg-gray-100 shadow-sm transition ease-in-out duration-15 align-top whitespace-no-wrap inline-flex items-center mr-1 p-2.5 px-5 text-sm font-medium rounded "
        const unselectedClass = common +  " cursor-pointer border text-gray-700 bg-white hover:text-indigo-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue"
        const selectedClass = common + "text-indigo-700 border border-indigo-600"

        const items: JSX.Element[] = []
        links.forEach((link) => {
            if (currentLink === link) {
                items.push(
                    <div className={selectedClass}>
                        <h2 className='mr-1'><a>{link}</a></h2>
                    </div>
                )
            } else {
                items.push(
                    <div onClick={() => setCurrentLink(link)} className={unselectedClass}>
                        <h2 className='mr-1'><a>{link}</a></h2>
                    </div>
                )
            }
            
        })

        return (
            <div className='w-full p-2'>
                <div className='flex-col inline-block inline mt-3'>
                    {items}    
                </div>
            </div>
            
        )
    }


    const renderCloseButton = () => {
        return (
            <button onClick={() => {props.onCancel()}} type="button" className="text-gray-400 transition duration-150 ease-in-out hover:text-gray-500 focus:outline-none focus:text-gray-500">
                <svg className="w-6 h-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
            </button>
        )
    }

    return (
        <Modal show={props.show}>
            <div className="relative px-4 pt-5 pb-4 my-auto transition-all transform bg-white rounded-lg shadow-xl sm:w-2/3 sm:p-6">
                <div className="flex justify-center w-full pb-2">
                    <label className="block my-auto font-bold leading-5 text-gray-700 whitespace-no-wrap text-md ">
                        {currentLink} 
                    </label>
                    <div className="flex justify-end w-full">
                        {renderCloseButton() }
                    </div>
                    
                </div>
                <div className="w-full">
                    <div className='relative' style={{ paddingBottom: '56.25%'}} >
                        <iframe className='absolute w-full h-full' src="https://www.youtube.com/embed/WkEMSGpD5zA" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </div>
                    <div className='bg-gray-200 rounded-b-md'>
                        {renderLinks()}
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default HelpWidget