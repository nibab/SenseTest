import React, { useEffect, useState } from 'react';
import { AuthState } from '../types';
import SignInCreateNewPassword from './AuthForms/SignInCreateNewPassword';
import SignIn from './AuthForms/SignIn';
import NewName from './AuthForms/NewName';

type AuthProps = {
    onUserSignIn: (userObject: any) => void,
}

const AuthForm = (props: AuthProps) => {
    const [userObject, setUserObject] = useState()
    const [currentState, setCurrentState] = useState<AuthState| null>('firstSignIn')

    useEffect(() => {
        if (currentState === 'signedIn') {
            props.onUserSignIn(userObject)
        }
    }, [currentState])

    return (
        <div className='relative'>
            <div className='absolute flex flex-row w-full h-20 bg-white shadow-md'>
                <div className='justify-center flex-shrink-0 w-48 my-auto'>
                    <img className="object-contain p-2 transition duration-100 ease-in-out cursor-pointer" src='logo.png' />
                </div>
                <div className='w-full '>
                </div>
            </div>

            {currentState === null && <SignIn handleStateChange={(authState, userObject) => {
                setUserObject(userObject)
                setCurrentState(authState)
            }} />}

            {currentState === 'signedUpAfterInvite' &&
                <SignInCreateNewPassword userObject={userObject} handleStateChange={(authState) => {
                    setCurrentState(authState)
                }} />}

            {currentState === 'firstSignIn' &&
                <NewName handleStateChange={(authState) => {
                    setCurrentState(authState)
                }} />}
        </div>
    );

}

export default AuthForm;
