import React, { forwardRef } from 'react'

type InputFieldType = 'email' | 'password'
type InputFieldProps = {
	name: string
	type: InputFieldType
	//ref: React.RefObject<HTMLInputElement>
}
const InputField = forwardRef<HTMLInputElement, InputFieldProps>((props, ref) => {
	return (
		<div>
			<label id={props.type} className="block text-sm font-medium leading-5 text-gray-700">
				{props.name}
			</label>
			<div className="mt-1 rounded-md shadow-sm">
				<input id={props.type} ref={ref} type={props.type} required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
			</div>
		</div>
	)
})

export default InputField