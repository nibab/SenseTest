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
import HomeScreen from './screens/HomeScreen';
import LandingScreen from './screens/LandingScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import SettingsScreen from './screens/SettingsScreen';
import RunScreen from './screens/RunScreen';
import RunsScreen from './screens/RunsScreen';
import TestsScreen from './screens/TestsScreen';
import TestExecutionScreen from './screens/TestExecutionScreen';
import NavBar from './components/NavBar';
import AuthForm from './components/AuthForm';
import { bool } from 'aws-sdk/clients/signer';
import ZeplinAuth from './utils/ZeplinAuth';
import { Layout } from 'antd';
import AnnotationScreen from './screens/AnnotationScreen';
import { AutoTestScreen } from './screens/AutoTestScreen';

const { Header, Content, Footer, Sider } = Layout;

export const currentAuthConfig = Amplify.configure(awsconfig);
export const SNAPTEST_API_NAME = "SnapTestAPI";
ZeplinAuth.configure('1') // Hardcoding project id for now.

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
    }).catch((err: object) => console.log(err));
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
          <AuthForm onUserSignIn={this.handleUserSignIn} history={props.history}/>
        )}/>
        <ProtectedRoute
          path='/annotate'
          isLoggedIn={isLoggedIn}
          isLoading={isLoading}
          component={AnnotationScreen}
        ></ProtectedRoute>
        <ProtectedRoute
          path='/autoTest'
          isLoggedIn={isLoggedIn}
          isLoading={isLoading}
          component={AutoTestScreen}
        ></ProtectedRoute>
        <ProtectedRoute
          path='/run/:runId/executions' // TODO: If the user navigates directly to this URL, the navigation context will be lost (won't have the TestExecutions loaded).
          isLoggedIn={isLoggedIn}
          isLoading={isLoading}
          component={TestExecutionScreen}
        ></ProtectedRoute>
        <ProtectedRoute
          exact
          path='/tests'
          isLoggedIn={isLoggedIn}
          isLoading={isLoading}
          component={TestsScreen}
        />
        <ProtectedRoute
        path='/run/:runId'
        isLoggedIn={isLoggedIn}
        isLoading={isLoading}
        component={RunScreen}
        />
        <ProtectedRoute
          exact
          path='/runs'
          isLoggedIn={isLoggedIn}
          isLoading={isLoading}
          component={RunsScreen}
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
            (<HomeScreen/>) :
            (<LandingScreen/>)
          }
        </Route>
      </Switch>
    )
  }

  renderRouter = (isLoggedIn: boolean, isLoading: boolean) => {
    return (
      <Router>
        <Layout>
          <Sider width={256}>
            <NavBar width={256} isLoggedIn={isLoggedIn} signOut={this.signOut}/>
          </Sider>
          <Layout>
            <Header>
              {/* <div style={{padding: "24px", backgroundColor: "#001529"}} /> */}   
            </Header>
            <Content style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}>
              {this.renderContent(isLoggedIn, isLoading)}
            </Content>
            <Footer style={{ textAlign: 'center', marginTop: '100px' }}>Isengard LLC ©2020</Footer>
          </Layout>
        </Layout>  
      </Router>
    )
  }

  render() {

    const { isLoggedIn, isLoading } = this.state.authState;
    return (
      <div>
        {this.renderRouter(isLoggedIn, isLoading)}
      </div>
      
    );  
  }
}

export default App;
