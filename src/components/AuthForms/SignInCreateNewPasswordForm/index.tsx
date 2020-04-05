import React, { useRef } from 'react'
import { AuthState } from '../../../types'
import { Auth } from 'aws-amplify'
import InputField from '../InputField'

type SignInCreateNewPasswordFormProps = {
	userObject: any
	handleStateChange: (authState: AuthState) => void
}

const SignInCreateNewPasswordForm = ({ userObject, handleStateChange}: SignInCreateNewPasswordFormProps) => {
	const repeatPasswordRef = useRef<HTMLInputElement>(null)
	const passwordRef = useRef<HTMLInputElement>(null)

	const completeSignIn = (e: any) => {
		e.preventDefault()
		const repeatPassword = repeatPasswordRef.current?.value
		const password = passwordRef.current?.value

		if (repeatPassword === undefined || password === undefined) {
			return
		}

		// the array of required attributes, e.g ['email', 'phone_number']
		const { requiredAttributes } = userObject.challengeParam; 
		Auth.completeNewPassword(
			userObject,               // the Cognito User Object
			password,       // the new password
			// OPTIONAL, the required attributes
			{
				email: requiredAttributes.email,
			}
		).then((user: any)=> {
			// at this time the user is logged in if no MFA required
			console.log(user);
		}).catch(e => {
			console.log(e);
		})
	}

	return (
		<form onSubmit={completeSignIn}>
			<InputField name={"Password"} ref={passwordRef} type={'password'} />
			<InputField name={"Repeat Password"} ref={repeatPasswordRef} type={'email'} />

			<div className="mt-6">
				<span className="block w-full rounded-md shadow-sm">
					<button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
					Save Password
					</button>
				</span>
			</div>
		</form>
	)
}

export default SignInCreateNewPasswordForm