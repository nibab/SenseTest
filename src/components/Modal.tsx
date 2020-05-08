
import React from 'react'
import Transition from '../utils/Transition'

type ModalProps = {
    show: boolean
}

const Modal: React.StatelessComponent<ModalProps> = ({show, children}) => {
    return (
        <Transition show={show} appear={show}>
            <div className="fixed inset-x-0 bottom-0 z-50 p-4 px-4 overflow-scroll sm:inset-0 sm:flex sm:justify-center">
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
                        {children}

                    </Transition>

                </Transition>    
            </div>
        </Transition>
    )
    
}

export default Modal