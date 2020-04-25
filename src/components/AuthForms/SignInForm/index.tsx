import React, { useRef, forwardRef, useState } from 'react'
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
	const [signingIn, setSigningIn] = useState(false)

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
				setSigningIn(false)
			});
	}

	return (
		<form onSubmit={signIn}>
			<InputField name={"Email address"} ref={emailRef} type={'email'} />
			<div className='mt-3'>	
				<InputField name={"Password"} ref={passwordRef} type={'password'} />
			</div>
			
			<div className="flex items-center justify-between mt-6">
				<div className="flex items-center">
					<input id="remember_me" type="checkbox" className="w-4 h-4 text-indigo-600 transition duration-150 ease-in-out form-checkbox" />
					<label id="remember_me" className="block ml-2 text-sm leading-5 text-gray-900">
					Remember me
					</label>
				</div>

				<div className="text-sm leading-5">
					<a href="#" className="font-medium text-indigo-600 transition duration-150 ease-in-out hover:text-indigo-500 focus:outline-none focus:underline">
					Forgot your password?
					</a>
				</div>
			</div>

			<div className="mt-6">
				<span className="block w-full rounded-md shadow-sm">
					<button type="submit" className={`${signingIn? 'spinner': ''} flex justify-center w-full px-4 py-2 text-sm font-medium text-white transition duration-150 ease-in-out bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700`}>
					Sign in
					</button>
				</span>
			</div>
		</form>
	)
}

export default SignInForm