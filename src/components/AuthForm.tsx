import React, { Component } from 'react';
import { Authenticator, SignIn, SignUp, ConfirmSignUp } from 'aws-amplify-react';
import { UsernameAttributes } from 'aws-amplify-react/lib-esm/Auth/common/types';
import { History } from 'history';

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
  history: History,
}

type AuthState = {
  currentState: string | null,
  previousState: string | null
}

class AuthForm extends Component<AuthProps, AuthState> {
  state = {
    currentState: null,
    previousState: null
  }
  handleStateChange = (state: string) => {
    console.log(state);
    const previousState = this.state.currentState;
    this.setState({currentState: state, previousState })

    if (state === 'signedIn') {
      this.props.onUserSignIn();
    }

    if (state === 'signedIn' && previousState === 'signedUp') {
      // Go to onboarding
    } else if (state === 'signedIn') {
      console.log('Navigate to home')
      this.props.history.push('/')
    }
  };
  render() {
    return (
      <div>
        <Authenticator hideDefault={true} usernameAttributes={UsernameAttributes.EMAIL}
          onStateChange={this.handleStateChange}>
            <SignIn/>
            <SignUp signUpConfig={signUpConfig}/>
            <ConfirmSignUp/>
        </Authenticator>
      </div>
    );
  }
}

export default AuthForm;
