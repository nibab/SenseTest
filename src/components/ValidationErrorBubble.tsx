import React from 'react'

type ValidationErrorBubbleProps = {
	errorText: string | undefined
}

const ValidationErrorBubble = ({ errorText }: ValidationErrorBubbleProps) => {
	if (errorText) {
		return (<>
			<div className={`mt-3 relative rounded-md shadow-sm bg-red-100`}>
				<div className={`appearance-none block w-full px-3 py-2  rounded-md placeholder-gray-400 transition duration-150 ease-in-out sm:text-sm sm:leading-5`}>
					<p className={`text-sm font-medium text-red-600 pr-5`}>{errorText}</p>
				</div>
				<div className={`absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none`}>
					<svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
						<path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
					</svg>
				</div>
			</div>
			</>
		)
	} else {
		return (<></>)
	}
}

export default ValidationErrorBubble