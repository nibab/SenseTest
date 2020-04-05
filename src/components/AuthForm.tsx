import React, { Component } from 'react';
import { Authenticator, SignUp, ConfirmSignUp, RequireNewPassword } from 'aws-amplify-react';
import { UsernameAttributes } from 'aws-amplify-react/lib-esm/Auth/common/types';
import { History } from 'history';
import { Redirect } from "react-router-dom"
import { AuthState, isAuthState } from '../types';
import SignInCreateNewPassword from './AuthForms/SignInCreateNewPassword';
import SignIn from './AuthForms/SignIn';

const signUpConfig = {
  hiddenDefaults: ['username', 'phone_number'],
  signUpFields: [
    {
      label: 'Email',
      key: 'email', // !!!
      required: true,
      displayOrder: 1,
      type: 'email',
      custom: false,
      placeholder: 'cezar@snaptest.app'
    },
    {
      label: 'Password',
      key: 'password',
      required: true,
      displayOrder: 2,
      type: 'password',
      placeholder: 'abcdef',
      custom: false
    }
  ]
}

type AuthProps = {
  onUserSignIn: Function,
}

type AuthStateHistory = {
  currentState: AuthState | null,
  previousState: AuthState | null,
  userObject: any 
}

class AuthForm extends Component<AuthProps, AuthStateHistory> {
  state = {
    currentState: null,
    previousState: null,
    userObject: undefined
  }

  handleStateChange = (state: AuthState) => {
    console.log(state);
    const previousState = this.state.currentState;
    this.setState({currentState: state, previousState })

    if (state === 'signedIn') {
      this.props.onUserSignIn();
    }

    
  };

  render() {
    if (this.state.currentState === 'signedIn' && this.state.previousState === 'signedUp') {
      // Go to onboarding
    } else if (this.state.currentState === 'signedIn') {
      console.log('Navigate to home')
      return (
        <Redirect to="/" />
      )
      //this.props.history.push('/')
    }

    return (
      <div>
        {/* <Authenticator authState={'requireNewPassword'} hideDefault={true} usernameAttributes={UsernameAttributes.EMAIL}
          onStateChange={(authState, data) => {
            if (isAuthState(authState)) {
              this.handleStateChange(authState) 
            }
        }}> */}

            { this.state.currentState === null && <SignIn handleStateChange={(authState, userObject) => {
              this.handleStateChange(authState)
              this.setState({ userObject: userObject})
            }}/>}
            
            { this.state.currentState === 'signedUpAfterInvite' && 
              <SignInCreateNewPassword userObject={this.state.userObject} handleStateChange={(authState) => {
                this.handleStateChange(authState)
            }}/>}

            {/* <SignUp signUpConfig={signUpConfig}/>
            <ConfirmSignUp/> */}

        {/* </Authenticator> */}
      </div>
    );
  }
}

export default AuthForm;
