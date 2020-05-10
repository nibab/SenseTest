import React from 'react'

type ButtonProps = {
    onClick: () => void
}

const Button: React.StatelessComponent<ButtonProps> = ({onClick, children}) => {
    const buttonClassName = 'inline-flex items-center shadow-sm px-3 text-sm py-1 my-autotext-sm font-bold text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50'

    return (
        <button onClick={() => onClick()} className={buttonClassName}>
            {children}
        </button>
    )
}

export default Button