import React, { Component, useEffect, useState } from 'react';
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
import NavBar from './components/NavBar';
import AuthForm from './components/AuthForm';
import { bool } from 'aws-sdk/clients/signer';
import ZeplinAuth from './utils/ZeplinAuth';
import { Layout } from 'antd';
import AnnotationScreen from './screens/AnnotationScreen';
import { createStore } from 'redux'
import { rootReducer, useSelector } from './store'
import { Provider, useDispatch } from 'react-redux'
import TeamScreen from './screens/TeamScreen';
import ProjectsScreen from './screens/ProjectsScreen';
import AppBuildScreen from './screens/AppBuildScreen';
import { login } from './store/authentication/actions';

const { Header, Content, Footer, Sider } = Layout;

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
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    AmplifyAuth.currentAuthenticatedUser({
      bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    }).then((user: object) => {
      console.log(user);
      dispatch(login())
      //this.setState({ authState: { isLoggedIn: true, isLoading: false } })
    }).catch((err: object) => {
      //dispatch(login())
      console.log(err)
      //this.setState({ authState: { isLoggedIn: false, isLoading: false } })
    })
  }, [])

  // signOut = () => {
  //   AmplifyAuth.signOut()
  //     .then(data => console.log(data))
  //     .catch(err => console.log(err));
  //   this.setState({ authState: { isLoggedIn: false, isLoading: false }})
  // }

  // handleUserSignIn = () => {
  //   this.setState({ authState: { isLoggedIn: true, isLoading: false } });
  // };

  const renderContent = (isLoggedIn: boolean, isLoading: boolean) => {
    return (
      <Switch>
        <Route path='/login'>
          {isLoggedIn || isLoading ?
            (<Redirect to='/projects'/>) :
            <AuthForm onUserSignIn={() => {dispatch(login())}} />
          }
        </Route>
        <Route
          path='/projects'
          component={ProjectsScreen}
        ></Route>
        <Route
          path='/project/:id'
          component={AnnotationScreen}
        ></Route>
        <Route
          path='/builds'
          component={AppBuildScreen}
        ></Route>
        <Route
          path='/team'
          component={TeamScreen}
        ></Route>
        <Route
          path='/settings'
          component={SettingsScreen}
        ></Route>
        <Route
          path='/onboarding'
          component={OnboardingScreen}
        ></Route>          
        <Route path='/'>
          {isLoggedIn || isLoading ?
            (<Redirect to='/projects'/>) :
            (<AuthForm onUserSignIn={() => dispatch(login())} />)
          }
        </Route>
      </Switch>
    )
  }

  const renderRouter = (isLoggedIn: boolean, isLoading: boolean) => {
    return (
      <Router>
        <div className="flex flex-col w-screen h-screen font-sans antialiased bg-white">
          {/* <div className={`${!isLoggedIn ? 'hidden' : ''} flex-shrink-0 flex h-16 w-full flex-row`}>
            <NavBar width={256} signOut={this.signOut}/>
          </div>  
           */}
          { 
            //isLoggedIn ? 
            renderContent(isLoggedIn, isLoading) //: 
            //<Redirect to='/login'>
            //å<AuthForm onUserSignIn={() => {dispatch(login())}} />//</Redirect>
          }
        </div>  
      </Router>
    )
  }

  return (
    <>
      { renderRouter(authSelector.authenticated, isLoading) }
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
