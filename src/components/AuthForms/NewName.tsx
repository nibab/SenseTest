import React, { useRef, useState } from 'react'
import { Auth } from 'aws-amplify'
import InputField from './InputField'
import { AuthState } from '../../types'
import ValidationErrorBubble from '../ValidationErrorBubble'
import Header from './Header'
import { UsersClient } from '../../clients/UsersClient'

type NewNameProps = {
	handleStateChange: (authState: AuthState) => void
}

const NewName = ({ handleStateChange }: NewNameProps) => {
	const userName = useRef<HTMLInputElement>(null)
	const [loading, setIsLoading] = useState(false)
	const [error, setError] = useState<string>()

	const setName = (e: any) => {
		e.preventDefault()
		const name = userName.current?.value

		if (name === undefined) {
			return
		}
		        
		setIsLoading(true)
		UsersClient.createUser({userName: name}).then(() => {
			return Auth.currentAuthenticatedUser()
        }).then((user) =>  {
            return Auth.updateUserAttributes(user, {
                'custom:name': name
            })
        }).then(() => {
            setIsLoading(false)
            handleStateChange('signedIn')
        }).catch((error) => {
            setError(e.message)
            setIsLoading(false)
        })
	}

	const renderForm = () => {
		return (
			<form onSubmit={setName}>
				<InputField onInputChange={() => setError(undefined)} ref={userName} placeholder={'e.g. John Smith'} type={'text'} />
				
				<ValidationErrorBubble errorText={error} />
				
				<div className="mt-3">
					<span className="block w-full rounded-md shadow-sm">
						<button type="submit" className={`${loading? 'spinner': ''} flex justify-center w-full px-4 py-2 text-sm font-medium text-white transition duration-150 ease-in-out bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700`}>
                            Continue
						</button>
					</span>
				</div>
			</form>
		)
	}

	return (
		<div className="flex flex-col justify-center min-h-screen bg-gray-50 sm:px-6 lg:px-8">
			<Header text={"How should we greet you?"} />
			<div className="mt-4 sm:mx-auto sm:w-full sm:max-w-md">
				<div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
					{renderForm()}
				</div>
			</div>
		</div>
	)
}

export default NewName