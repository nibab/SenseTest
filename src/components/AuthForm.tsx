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
    const [currentState, setCurrentState] = useState<AuthState| null>(null)

    useEffect(() => {
        if (currentState === 'signedIn') {
            props.onUserSignIn(userObject)
        }
    }, [currentState])

    const onTestButtonClick = () => {
        const states: AuthState[] = ['signedUpAfterInvite', 'firstSignIn' ]
        if (currentState === null) {
            setCurrentState('signedUpAfterInvite')
        }
        if (currentState === 'signedUpAfterInvite') {
            setCurrentState('firstSignIn')
        }
    }

    return (
        <div className='relative'>
            <div className='absolute flex flex-row w-full h-20 bg-white shadow-md'>
                <div className='justify-center flex-shrink-0 w-48 my-auto'>
                    <img className="object-contain p-2 transition duration-100 ease-in-out cursor-pointer" src='logo.png' />
                </div>
                <div className='w-full '>
                {/* for debugging */}
                <button onClick={() => onTestButtonClick()} className='bg-red-200'> CLICK ME</button>
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
