import React from 'react'

type HeaderProps = {
	text: string
}

const Header = ({text}: HeaderProps) => {
	return (
		<div className="sm:mx-auto sm:w-full sm:max-w-md">
			{/* <div className='justify-center flex-shrink-0 mx-auto my-auto w-96'>
				<img className="object-contain p-2 transition duration-100 ease-in-out cursor-pointer filter-grayscale " src='logo.png' />
			</div> */}
			<h2 className="text-3xl font-extrabold leading-9 text-center text-gray-900">
				{text}
			</h2>
			{/* <p className="mt-2 text-sm leading-5 text-center text-gray-600 max-w">
				Or
				<a href="#" className="font-medium text-indigo-600 transition duration-150 ease-in-out hover:text-indigo-500 focus:outline-none focus:underline">
					start your 14-day free trial
				</a>
			</p> */}
		</div>

	)
}

export default Header