import React, { useRef, useState } from 'react'
import { Auth } from 'aws-amplify'
import InputField from './InputField'
import { AuthState } from '../../types'
import ValidationErrorBubble from '../ValidationErrorBubble'
import Header from './Header'

type NewNameProps = {
	handleStateChange: (authState: AuthState, userObject: any) => void
}

const NewName = ({ handleStateChange }: NewNameProps) => {
	const emailRef = useRef<HTMLInputElement>(null)
	const passwordRef = useRef<HTMLInputElement>(null)
	const [signingIn, setSigningIn] = useState(false)
	const [error, setError] = useState<string>()

	const signIn = (e: any) => {
		e.preventDefault()
		const email = emailRef.current?.value
		const password = passwordRef.current?.value
		setSigningIn(true)

		if (email === undefined || password === undefined) {
			return
		}

		Auth.signIn(email, password)
			.then(user => {
				if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
					handleStateChange('signedUpAfterInvite', user)
					return
				}
				handleStateChange('signedIn', user)
				setSigningIn(false)
			}).catch(e => {
				console.log(e);
				setError(e.message)
				setSigningIn(false)
			});
	}

	const renderForm = () => {
		return (
			<form onSubmit={signIn}>
				<InputField onInputChange={() => setError(undefined)} name={"Name"} ref={emailRef} type={'name'} />
				
				<ValidationErrorBubble errorText={error} />
				


				<div className="mt-3">
					<span className="block w-full rounded-md shadow-sm">
						<button type="submit" className={`${signingIn? 'spinner': ''} flex justify-center w-full px-4 py-2 text-sm font-medium text-white transition duration-150 ease-in-out bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700`}>
                            Continue
						</button>
					</span>
				</div>
			</form>
		)
	}

	return (
		<div className="flex flex-col justify-center min-h-screen bg-gray-50 sm:px-6 lg:px-8">
			<Header text={"What is your name?"} />
			<div className="mt-4 sm:mx-auto sm:w-full sm:max-w-md">
				<div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
					{renderForm()}
				</div>
			</div>
		</div>
	)
}

export default NewName