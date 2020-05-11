import React, { useEffect, useState } from 'react';
import { AuthState } from '../types';
import SignInCreateNewPassword from './AuthForms/SignInCreateNewPassword';
import SignIn from './AuthForms/SignIn';
import NewName from './AuthForms/NewName';
import Attachment from '../screens/AnnotationScreen/PostView/Attachment';
import Button from './Button';
import SignUp, {SignUpConfirm} from './AuthForms/SignUp';

type AuthProps = {
    onUserSignIn: (userObject: any) => void
    initialState?: AuthState

}

const AuthForm = (props: AuthProps) => {
    const [userObject, setUserObject] = useState()
    const [currentState, setCurrentState] = useState<AuthState | undefined>(props.initialState)
    const [userPassword, setUserPassword] = useState<string>()
    const [userFullName, setUserFullName] = useState<string>()

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
                    <img className="object-contain p-2 transition duration-100 ease-in-out cursor-pointer filter-grayscale hover:filter-none" src={process.env.PUBLIC_URL + '/logo.png'} />
                </div>
                <div className='w-full '>
                {/* <button onClick={() => onTestButtonClick()} className='bg-red-200'> CLICK ME</button> */}
                </div>            
            </div>
            <div className=''>
           

                {currentState === undefined && <SignIn handleStateChange={(authState, userObject) => {
                    setUserObject(userObject)
                    setCurrentState(authState)
                }} />}


                {currentState === 'signedUpAfterInvite' &&   
                    <SignInCreateNewPassword userObject={userObject} handleStateChange={(authState) => {
                        setCurrentState(authState)
                    }} />
                }

                {currentState === 'signUp' && <SignUp handleStateChange={(authState, userObject, userPassword, userFullName) => {
                    setCurrentState(authState)
                    setUserObject(userObject)
                    setUserPassword(userPassword)
                    setUserFullName(userFullName)
                }}></SignUp>}

                {currentState === 'signUpConfirm' && userPassword && userFullName && <SignUpConfirm userFullName={userFullName} userPassword={userPassword} userObject={userObject} handleStateChange={(authState, userObject) => {
                    setCurrentState(authState)
                }}></SignUpConfirm>}

                {currentState === 'firstSignIn' &&
                    <NewName handleStateChange={(authState) => {
                        setCurrentState(authState)
                    }} />
                }           
            </div>
        </div>
    );

}

export default AuthForm;
