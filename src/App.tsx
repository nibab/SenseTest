import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  RouteProps
} from 'react-router-dom';
import Amplify, { Auth as AmplifyAuth } from 'aws-amplify';
import awsconfig from './aws-exports.js';
import './App.css';
import OnboardingScreen from './screens/OnboardingScreen';
import SettingsScreen from './screens/SettingsScreen';
import AuthForm from './components/AuthForm';
import { bool } from 'aws-sdk/clients/signer';
import ZeplinAuth from './utils/ZeplinAuth';
import AnnotationScreen from './screens/AnnotationScreen';
import { createStore } from 'redux'
import { rootReducer, useSelector } from './store'
import { Provider, useDispatch } from 'react-redux'
import TeamScreen from './screens/TeamScreen';
import ProjectsScreen from './screens/ProjectsScreen';
import AppBuildScreen from './screens/AppBuildScreen';
import { login } from './store/authentication/actions';
import Log from './utils/Log';
import NotFound from './screens/ProjectNotFound';
import uuid from 'uuid';
import HelpWidget from './components/HelpWidget';

export const currentAuthConfig = Amplify.configure(awsconfig);
export const SNAPTEST_API_NAME = "SnapTestAPI";
ZeplinAuth.configure('1') // Hardcoding project id for now.

// STORE
let store = createStore(rootReducer)

// LOGGING
if (process.env.NODE_ENV !== 'production') {
  localStorage.setItem('debug', 'prerelease-react-app:*');
}

interface ProtectedRouteProps extends RouteProps {
  isLoggedIn: boolean,
  isLoading: boolean,
}

const ProtectedRoute = (props: ProtectedRouteProps) => (
  props.isLoggedIn || props.isLoading ? (
    <Route {...props}/>
  ) : (
    <Redirect to='/login'/>
  )
);

type AppState = {
  authState: {
    isLoggedIn: bool,
    isLoading: bool
  }
}

const Main = () => {
  const dispatch = useDispatch()
  const authSelector = useSelector(state => state.auth)
  const [isLoading, setIsLoading] = useState(true)

  const getUserInfoAndSetLogin = (currentUser: any) => {
    const userName = currentUser["attributes"]['custom:name']
    const userEmail = currentUser["attributes"]['email']
    dispatch(login({userName: userName, email: userEmail}))
  }

  useEffect(() => {
    setIsLoading(true)
    AmplifyAuth.currentAuthenticatedUser({
      bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    }).then(async () => {
      const user = await AmplifyAuth.currentUserInfo()
      getUserInfoAndSetLogin(user)
      setIsLoading(false)
    }).catch((err: object) => {
      setIsLoading(false)
      Log.error(JSON.stringify(err))
    })
  }, [])

  const renderContent = (isLoggedIn: boolean, isLoading: boolean) => {
    return (
      <Switch>
        <Route path='/login'>
          {isLoggedIn || isLoading ?
            (<Redirect to='/projects'/>) :
            <AuthForm key={uuid()} onUserSignIn={async () => {const user = await AmplifyAuth.currentUserInfo(); getUserInfoAndSetLogin(user)}} />
          }
        </Route>
        <Route path='/signUp'>
          {isLoggedIn || isLoading ?
            (<Redirect to='/projects'/>) :
            <AuthForm key={uuid()} initialState={'signUp'} onUserSignIn={async () => {const user = await AmplifyAuth.currentUserInfo(); getUserInfoAndSetLogin(user)}} />
          }
        </Route>
        <ProtectedRoute
          isLoggedIn={isLoggedIn}
          isLoading={isLoading}
          path='/projects'
          component={ProjectsScreen}
        ></ProtectedRoute>
        <ProtectedRoute
          isLoggedIn={isLoggedIn}
          isLoading={isLoading}
          path='/project/:id'
          component={AnnotationScreen}
        ></ProtectedRoute>
        <ProtectedRoute
          isLoggedIn={isLoggedIn}
          isLoading={isLoading}
          path='/builds'
          component={AppBuildScreen}
        ></ProtectedRoute>
        <ProtectedRoute
          isLoggedIn={isLoggedIn}
          isLoading={isLoading}
          path='/team'
          component={TeamScreen}
        ></ProtectedRoute>
        <ProtectedRoute
          isLoggedIn={isLoggedIn}
          isLoading={isLoading}
          path='/settings'
          component={SettingsScreen}
        ></ProtectedRoute>
        <ProtectedRoute
          isLoggedIn={isLoggedIn}
          isLoading={isLoading}
          path='/onboarding'
          component={OnboardingScreen}
        ></ProtectedRoute>
        <ProtectedRoute
          isLoggedIn={isLoggedIn}
          isLoading={isLoading}
          path='/notFound'
          component={NotFound}
        ></ProtectedRoute>            
        <ProtectedRoute 
          path='/'
          isLoggedIn={isLoggedIn}
          isLoading={isLoading}
        >
          <Redirect to='/projects'/>
        </ProtectedRoute>
      </Switch>
    )
  }

  const renderRouter = (isLoggedIn: boolean, isLoading: boolean) => {
    return (
      <Router>
        <div className="flex flex-col w-screen h-screen antialiased bg-white font-grotesk">
          {/* <div className={`${!isLoggedIn ? 'hidden' : ''} flex-shrink-0 flex h-16 w-full flex-row`}>
            <NavBar width={256} signOut={this.signOut}/>
          </div>  
           */}
          { renderContent(isLoggedIn, isLoading) }
          { isLoggedIn && <HelpWidget></HelpWidget>}
        </div>  
      </Router>
    )
  }

  return (
    <>
      { isLoading ? <></> : renderRouter(authSelector.authenticated, isLoading)}
    </>
  )
}

const App = () => {
  return (
    <Provider  store={store}>
      <Main/>
    </Provider>
  )
}

export default App;
