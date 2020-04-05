import React, { useRef, forwardRef } from 'react'
import { Auth } from 'aws-amplify'
import { AuthState } from '../../../types'
import InputField from '../InputField'
import Header from '../Header'

type SignInFormProps = {
	handleStateChange: (authState: AuthState, userObject: any) => void
}

const SignInForm = ({ handleStateChange }: SignInFormProps) => {
	const emailRef = useRef<HTMLInputElement>(null)
	const passwordRef = useRef<HTMLInputElement>(null)

	const signIn = (e: any) => {
		e.preventDefault()
		const email = emailRef.current?.value
		const password = passwordRef.current?.value

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
			}).catch(e => {
				console.log(e);
			});
	}

	return (
		<form onSubmit={signIn}>
			<InputField name={"Email address"} ref={emailRef} type={'email'} />
			<InputField name={"Password"} ref={passwordRef} type={'password'} />
			<div className="mt-6 flex items-center justify-between">
				<div className="flex items-center">
					<input id="remember_me" type="checkbox" className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out" />
					<label id="remember_me" className="ml-2 block text-sm leading-5 text-gray-900">
					Remember me
					</label>
				</div>

				<div className="text-sm leading-5">
					<a href="#" className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150">
					Forgot your password?
					</a>
				</div>
			</div>

			<div className="mt-6">
				<span className="block w-full rounded-md shadow-sm">
					<button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
					Sign in
					</button>
				</span>
			</div>
		</form>
	)
}

export default SignInForm