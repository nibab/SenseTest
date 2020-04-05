import React, { forwardRef, useEffect, useState } from 'react'

type InputFieldType = 'email' | 'password'
type InputFieldProps = {
	name: string
	type: InputFieldType
	error?: string 
	onInputChange?: () => void
	//ref: React.RefObject<HTMLInputElement>
}
const InputField = forwardRef<HTMLInputElement, InputFieldProps>((props, ref) => {
	const [validationError, setValidationError] = useState<string>()

	useEffect(() => {
		const err = props.error
		if (err !== undefined) {
			setValidationError(err)
		}
	}, [props.error])

	const onInputChange = () => {
		if (validationError) {
			setValidationError(undefined)
		}
		if (props.onInputChange) {
			props.onInputChange()
		}
	}

	return (
		<div>
			<label id={props.type} className="block text-sm font-medium leading-5 text-gray-700">
				{props.name}
			</label>
			<div className={`mt-1 relative rounded-md shadow-sm`}>
				<input onChange={() => onInputChange()} id={props.type} ref={ref} type={props.type} required className={`appearance-none block w-full px-3 py-2 border ${validationError ? 'border-red-300' : 'border-gray-300 '} rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5`} />
				<div className={`${ validationError ? '' : 'hidden'} absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none`}>
					<svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
						<path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
					</svg>
				</div>
			</div>
			<p className={`${ validationError ? '' : 'hidden'} mt-2 text-sm text-red-600`}>{validationError}</p>
		</div>
	)
})

export default InputField