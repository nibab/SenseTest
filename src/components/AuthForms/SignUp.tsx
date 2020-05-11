import React, { useState, useRef } from 'react'
import InputField from './InputField'
import { AuthState } from '../../types'
import ValidationErrorBubble from '../ValidationErrorBubble'
import { Auth } from 'aws-amplify'
import Log from '../../utils/Log'
import Header from './Header'
import { useHistory } from 'react-router-dom'
import { UsersClient } from '../../clients/UsersClient'

type SignUpProps = {
    handleStateChange: (authState: AuthState, userObject: any, userPassword: string, userFullName: string) => void
}

const SignUp = (props: SignUpProps) => {
    const [error, setError] = useState<string>()
    const emailRef = useRef<HTMLInputElement>(null)
    const nameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const history = useHistory()

    const [signingUp, setSigningUp] = useState(false)

    const signUp = (e: any) => {
		e.preventDefault()
		const username = (emailRef.current?.value)?.toLowerCase()
        const password = passwordRef.current?.value
        const name = nameRef.current?.value
        
       
		if (username === undefined || password === undefined || name === undefined) {
			return
		}

        setSigningUp(true)

		Auth.signUp({username, password, attributes: {'custom:name': name}})
			.then(user => {
                setSigningUp(false)
                props.handleStateChange('signUpConfirm', user, password, name)
			}).catch(e => {
				Log.error(e)
				setError(e.message)
				setSigningUp(false)
			});
	}

    const renderForm = () => {
		return (
			<form onSubmit={signUp}>
				<InputField onInputChange={() => setError(undefined)} name={"Email address"} ref={emailRef} type={'email'} />
                <div className='mt-5'>	
					<InputField onInputChange={() => setError(undefined)} name={"Name"} ref={nameRef} type={'text'} />
				</div>
                <div className='mt-5'>	
					<InputField onInputChange={() => setError(undefined)} name={"Password"} ref={passwordRef} type={'password'} />
				</div>

				<ValidationErrorBubble errorText={error} />
				
				<div className="mt-5">
					<span className="block w-full rounded-md shadow-sm">
						<button type="submit" className={`${signingUp? 'spinner': ''} flex justify-center w-full px-4 py-2 text-sm font-medium text-white transition duration-150 ease-in-out bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700`}>
						Sign Up
						</button>
					</span>
				</div>
			</form>
		)
    }
    
    return (
		<div className="flex flex-col justify-center min-h-screen bg-gray-50 sm:px-6 lg:px-8">
			<Header text={"Sign up"} />
			<p className="mt-2 text-sm font-semibold leading-5 text-center text-gray-600 max-w">
				Or
				<a onClick={() => history.push('/login')} className="ml-1 font-medium text-indigo-600 transition duration-150 ease-in-out cursor-pointer hover:text-indigo-500 focus:outline-none focus:underline">
					sign in here if you have an account
				</a>
			</p>
			<div className="mt-4 sm:mx-auto sm:w-full sm:max-w-md">
				<div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
					{renderForm()}
				</div>
			</div>
		</div>
	)
}

type ConfirmSignUpProps = {
    handleStateChange: (authState: AuthState, userObject: any) => void
    userObject: any
    userPassword: string
    userFullName: string
}

export const SignUpConfirm = (props: ConfirmSignUpProps) => {
    const [error, setError] = useState<string>()
    const codeRef = useRef<HTMLInputElement>(null)
    const [loading, setLoading] = useState(false)

    const confirmSignUp = (e: any) => {
		e.preventDefault()
        const code = codeRef.current?.value
        
		if (code === undefined) {
			return
		}

        setLoading(true)

        Auth.confirmSignUp(props.userObject.user.username, code)
            // The order here needs to be preserved because the createUser call needs credentials
			.then(status => {
                return Auth.signIn(props.userObject.user.username, props.userPassword)
			}).then((user) => {
                return UsersClient.createUser({userName: props.userFullName})
            }).then((user) => {
                setLoading(false)
                props.handleStateChange('signedIn', props.userObject)
            }).catch(e => {
				Log.error(e)
				setError(e.message)
				setLoading(false)
			});
	}

    const renderForm = () => {
		return (
			<form onSubmit={confirmSignUp}>
				<InputField onInputChange={() => setError(undefined)} name={"Code"} ref={codeRef} type={'text'} />

				<ValidationErrorBubble errorText={error} />
				
				<div className="mt-5">
					<span className="block w-full rounded-md shadow-sm">
						<button type="submit" className={`${loading? 'spinner': ''} flex justify-center w-full px-4 py-2 text-sm font-medium text-white transition duration-150 ease-in-out bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700`}>
						Confirm
						</button>
					</span>
				</div>
			</form>
		)
    }

    return (
		<div className="flex flex-col justify-center min-h-screen bg-gray-50 sm:px-6 lg:px-8">
			<Header text={"Confirmation Code"} />
            <p className="mt-2 text-sm font-semibold leading-5 text-center text-gray-600 max-w">
				Check your e-mail. We just sent you a confirmation code.
				
			</p>
			
			<div className="mt-4 sm:mx-auto sm:w-full sm:max-w-md">
				<div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
					{renderForm()}
				</div>
			</div>
		</div>
	)
}



export default SignUp