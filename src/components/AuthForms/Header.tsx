import React from 'react'

type HeaderProps = {
	text: string
}

const Header = ({text}: HeaderProps) => {
	return (
		<div className="sm:mx-auto sm:w-full sm:max-w-md">
			{/* <img className="mx-auto h-12 w-auto" src="/img/logos/workflow-mark-on-white.svg" alt="Workflow" /> */}
			<h2 className="text-center text-3xl leading-9 font-extrabold text-gray-900">
				{text}
			</h2>
			{/* <p className="mt-2 text-center text-sm leading-5 text-gray-600 max-w">
				Or
				<a href="#" className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150">
					start your 14-day free trial
				</a>
			</p> */}
		</div>

	)
}

export default Header