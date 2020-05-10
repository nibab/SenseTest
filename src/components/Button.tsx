import React from 'react'

type ButtonClass = 'PRIMARY' | 'SECONDARY'

type ButtonProps = {
    onClick: () => void
    buttonClass: ButtonClass
}

const Button: React.StatelessComponent<ButtonProps> = ({onClick, buttonClass, children}) => {
    const buttonClassName = ((): string => {
        switch (buttonClass) {
            case 'PRIMARY':
                return 'inline-flex items-center shadow-sm px-3 text-sm py-1 my-autotext-sm font-bold text-white transition duration-150 ease-in-out bg-indigo-600 rounded-md hover:bg-indigo-500 hover:text-gray-200 focus:outline-none focus:border-indigo-300 focus:shadow-outline-indigo active:text-gray-200 active:bg-indigo-400'    
            case 'SECONDARY':
                return  'inline-flex items-center shadow-sm px-3 text-sm py-1 my-autotext-sm font-bold text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-indigo active:text-gray-800 active:bg-gray-50'
        }
    })()
    
    return (
        <button onClick={() => onClick()} className={buttonClassName}>
            {children}
        </button>
    )
}

export default Button