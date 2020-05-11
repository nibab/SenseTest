import React, { useState } from 'react'
import Transition from '../utils/Transition'

const HelpWidget = () => {
    const [showToolTip, setShowToolTip] = useState(false)

    return (
    <div className="fixed bottom-0 right-0 z-40 inline-block inline p-3">

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

        <div onMouseEnter={() => setShowToolTip(true)} onMouseLeave={() => setShowToolTip(false)} className="flex justify-end flex-grow-0">
        
            <div className="w-12 text-gray-400 bg-gray-100 border border-gray-300 rounded-full shadow-sm cursor-pointer focus:outline-none hover:bg-gray-200 active:bg-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-full"><path className="secondary" d="M12 19.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm1-5.5a1 1 0 0 1-2 0v-1.41a1 1 0 0 1 .55-.9L14 10.5C14.64 10.08 15 9.53 15 9c0-1.03-1.3-2-3-2-1.35 0-2.49.62-2.87 1.43a1 1 0 0 1-1.8-.86C8.05 6.01 9.92 5 12 5c2.7 0 5 1.72 5 4 0 1.3-.76 2.46-2.05 3.24L13 13.2V14z"/></svg>
            </div>
        </div>
       
    </div>
    )
}

export default HelpWidget