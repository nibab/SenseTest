import React, { useRef, useState, useEffect } from 'react'
import { AuthState } from '../../../types'
import { Auth } from 'aws-amplify'
import InputField from '../InputField'
import Log from '../../../utils/Log'

type SignInCreateNewPasswordFormProps = {
	userObject: any
	handleStateChange: (authState: AuthState) => void
}

type ValidationErrorBubbleProps = {
	errorText: string | undefined
}

const ValidationErrorBubble = ({ errorText }: ValidationErrorBubbleProps) => {
	if (errorText) {
		return (<>
			<div className={`mt-3 relative rounded-md shadow-sm`}>
				<div className={`appearance-none block w-full px-3 py-2 border border-red-300 rounded-md placeholder-gray-400 transition duration-150 ease-in-out sm:text-sm sm:leading-5`}>
					<p className={`text-sm text-red-600 pr-5`}>{errorText}</p>
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

const SignInCreateNewPasswordForm = ({ userObject, handleStateChange}: SignInCreateNewPasswordFormProps) => {
	const repeatPasswordRef = useRef<HTMLInputElement>(null)
	const passwordRef = useRef<HTMLInputElement>(null)
	const [error, setError] = useState<string>()

	const completeSignIn = (e: any) => {
		setError(undefined)
		e.preventDefault()
		const repeatPassword = repeatPasswordRef.current?.value
		const password = passwordRef.current?.value

		if (repeatPassword === undefined || password === undefined) {
			return
		}

		if (repeatPassword !== password) {
			setError("Passwords don't match.")
			return
		}

		// the array of required attributes, e.g ['email', 'phone_number']
		const { requiredAttributes } = userObject.challengeParam; 
		Auth.completeNewPassword(
			userObject, // the Cognito User Object
			password,   // the new password
			// OPTIONAL, the required attributes
			{
				email: requiredAttributes.email,
			}
		).then((user: any)=> {
			// at this time the user is logged in if no MFA required
			Log.info(`Managed to switch to permanent password for user ${user}`)
			handleStateChange('signedIn')
		}).catch(e => {
			if (e.message === "Password does not conform to policy: Password not long enough") {
				setError("Make your password at least 8 characters long.")
			} else {
				setError(e.message)
			}
			Log.error(`Error when trying to create permanent password: ${e.message}`, "SignInCreateNewPasswordForm")
		})
	}

	return (
		<form onSubmit={completeSignIn}>
			<InputField name={"Password"} ref={passwordRef} type={'password'} onInputChange={() => setError(undefined)}/>
			<div className='mt-3'>
				<InputField name={"Repeat Password"} ref={repeatPasswordRef} type={'password'} onInputChange={() => setError(undefined)} />
			</div>
			
			<ValidationErrorBubble errorText={error}/>

			<div className="mt-6">
				<span className="block w-full rounded-md shadow-sm">
					<button type="submit" className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white transition duration-150 ease-in-out bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700">
					Save Password
					</button>
				</span>
			</div>
		</form>
	)
}

export default SignInCreateNewPasswordForm