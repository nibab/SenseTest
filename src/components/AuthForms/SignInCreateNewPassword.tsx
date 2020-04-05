import React from 'react'
import { AuthState } from '../../types'
import Header from './Header'
import SignInForm from './SignInForm'

type SignInCreateNewPasswordProps = {
	userObject: any
	handleStateChange: (authState: AuthState) => void
}

const SignInCreateNewPassword = ({ userObject, handleStateChange }: SignInCreateNewPasswordProps) => {
	return (
		<div className="min-h-screen bg-gray-50 flex flex-col justify-center sm:px-6 lg:px-8">
			<Header text={"Create New Password"} />
			<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
				<div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
					<SignInCreateNewPassword userObject={userObject} handleStateChange={handleStateChange} />
				</div>
			</div>
		</div>
	)
}

export default SignInCreateNewPassword