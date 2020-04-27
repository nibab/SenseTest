import React, { Component } from 'react';
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
import { rootReducer } from './store'
import { Provider } from 'react-redux'
import TeamScreen from './screens/TeamScreen';
import ProjectsScreen from './screens/ProjectsScreen';
import AppBuildScreen from './screens/AppBuildScreen';

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

class App extends Component<{}, AppState> {
  state = {
    authState: {
      isLoggedIn: false,
      isLoading: true
    }
  };

  componentDidMount = () => {
    AmplifyAuth.currentAuthenticatedUser({
        bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    }).then((user: object) => {
      console.log(user);
      this.setState({ authState: { isLoggedIn: true, isLoading: false } })
    }).catch((err: object) => {
      console.log(err)
      this.setState({ authState: { isLoggedIn: false, isLoading: false } })
    })
  }

  signOut = () => {
    AmplifyAuth.signOut()
      .then(data => console.log(data))
      .catch(err => console.log(err));
    this.setState({ authState: { isLoggedIn: false, isLoading: false }})
  }

  handleUserSignIn = () => {
    this.setState({ authState: { isLoggedIn: true, isLoading: false } });
  };

  renderContent = (isLoggedIn: boolean, isLoading: boolean) => {
    return (
      <Switch>
        <Route path='/login' render={(props) => (
          <AuthForm onUserSignIn={this.handleUserSignIn} />
        )}/>
        <ProtectedRoute
          path='/projects'
          isLoggedIn={isLoggedIn}
          isLoading={isLoading}
          component={ProjectsScreen}
        ></ProtectedRoute>
        <ProtectedRoute
          path='/project/:id'
          isLoggedIn={isLoggedIn}
          isLoading={isLoading}
          component={AnnotationScreen}
        ></ProtectedRoute>
        <ProtectedRoute
          path='/builds'
          isLoggedIn={isLoggedIn}
          isLoading={isLoading}
          component={AppBuildScreen}
        ></ProtectedRoute>
        <ProtectedRoute
          path='/team'
          isLoggedIn={isLoggedIn}
          isLoading={isLoading}
          component={TeamScreen}
        ></ProtectedRoute>
        <ProtectedRoute
          exact
          path='/settings'
          isLoggedIn={isLoggedIn}
          isLoading={isLoading}
          component={SettingsScreen}
        ></ProtectedRoute>
        <ProtectedRoute
          exact
          path='/onboarding'
          isLoggedIn={isLoggedIn}
          isLoading={isLoading}
          component={OnboardingScreen}
        ></ProtectedRoute>          
        <Route path='/'>
          {isLoggedIn || isLoading ?
            (<Redirect to='/annotate'/>) :
            (<AuthForm onUserSignIn={this.handleUserSignIn} />)
          }
        </Route>
      </Switch>
    )
  }

  renderRouter = (isLoggedIn: boolean, isLoading: boolean) => {
    return (
      <Router>
        <div className="flex flex-col w-screen h-screen font-sans antialiased bg-white">
          {/* <div className={`${!isLoggedIn ? 'hidden' : ''} flex-shrink-0 flex h-16 w-full flex-row`}>
            <NavBar width={256} signOut={this.signOut}/>
          </div>  
           */}
          
          <Provider  store={store}>
            {this.renderContent(isLoggedIn, isLoading)}
          </Provider>
          
        </div>  
      </Router>
    )
  }

  render() {

    const { isLoggedIn, isLoading } = this.state.authState;
    return (
      <>
        {this.renderRouter(isLoggedIn, isLoading)}
      </>
    );  
  }
}

export default App;
