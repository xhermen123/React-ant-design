import * as React from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router';
import { createBrowserHistory } from 'history';
import * as _ from 'lodash';
import auth from './services/auth'; 
import Login from './containers/public/login';
import { Layout, Menu, Row, Col, Icon, Divider, Avatar, Alert } from 'antd';
import { Link } from 'react-router-dom';
import Signup from './containers/public/signup';
import SignupClient from './containers/public/signup-client';
import Sider from 'antd/lib/layout/Sider';
import Workstation from './containers/private/dashboard';
import TaskManager from './containers/private/task-manager';
import Clients from './containers/private/clients';
import Setting from './containers/private/setting';
import ClientDetail from './containers/private/client-detail';
import { connect } from 'net';
import CaseDetailSidenav from './components/Sidebar/CaseDetailSidenav';
import PrivateSidenav from './components/Sidebar/PrivateSidenav';
import ForgotPassword from './containers/public/forgot-password';
import Pricing from './containers/public/pricing';
import authService from './services/auth';
import AppAlert from './components/Alert';

const styles = require('./App.scss');

export const history = createBrowserHistory();
const { Content, Header, Footer } = Layout;

class PrivateRoute extends React.Component<{ component: any, path: any, exact: any } & any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
        collapsed: false
    };
  }

  logout() {
    localStorage.removeItem('auth');
    this.props.history.push('/')
  }

  render() {

    return (
      <Route
        path={this.props.path}
        exact
        render={props => (
          auth.isAuthenticated() ? (
            <Layout>
                <Header className="header" style={{ position: 'fixed', zIndex: 1, width: '100%', background: '#fff', padding: 0 }}>
                  <Row>
                    <Col span={4}>
                      <div className="logo">
                        <Link to=''>LOGO</Link>
                      </div>
                    </Col>
                    <Col span={20}>
                      <div className="header-nav-wrapper">
                        <Link to=''>GET HELP</Link>
                        <span className="logout-button" onClick={this.logout.bind(this)}>LOG OUT</span>
                      </div>
                    </Col>
                  </Row>
                </Header>
                <Layout style={{ margin: '64px 0px 0px', overflow: 'initial', minHeight: 'calc(100vh - 64px)', flexDirection: 'row' }}>
                  <PrivateSidenav
                      collapsed={this.state.collapsed}
                      path={this.props.path}
                    >
                  </PrivateSidenav>
                  <Content>
                    <this.props.component {...props} />
                  </Content>
                </Layout>
                
                {/* <Footer style={{ textAlign: 'center' }}>
                  Venue Genie ©2019 Created by Threeaccents
                </Footer> */}
              </Layout>
          ) : (
            <Redirect to={{ pathname: '/', state: { from: props.location } }}/>
          )
        )}
      />
    )
  }
};

let PrivateRouteWrapper = withRouter(PrivateRoute);

class PrivateNoMenuRoute extends React.Component<{ component: any, path: any, exact: any } & any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
        collapsed: false
    };
  }

  logout() {
    localStorage.removeItem('auth');
    this.props.history.push('/')
  }

  render() {
    return (
      <Route
        path={this.props.path}
        exact
        render={props => (
          auth.isAuthenticated() ? (
            <Layout>
                <Header className="header" style={{ position: 'fixed', zIndex: 1, width: '100%', background: '#fff', padding: 0 }}>
                  <Row>
                    <Col span={4}>
                      <div className="logo">
                        <Link to=''>LOGO</Link>
                      </div>
                    </Col>
                    <Col span={20}>
                      <div className="header-nav-wrapper">
                        <Link to=''>GET HELP</Link>
                        <span className="logout-button" onClick={this.logout.bind(this)}>LOG OUT</span>
                      </div>
                    </Col>
                  </Row>
                </Header>
                <Layout style={{ margin: '64px 0px 0px', overflow: 'initial', minHeight: 'calc(100vh - 64px)', flexDirection: 'row' }}>
                  <CaseDetailSidenav
                      collapsed={this.state.collapsed}
                    >
                  </CaseDetailSidenav>
                  <Content>
                    <this.props.component {...props} />
                  </Content>
                </Layout>
                
                {/* <Footer style={{ textAlign: 'center' }}>
                  Venue Genie ©2019 Created by Threeaccents
                </Footer> */}
              </Layout>
          ) : (
            <Redirect to={{ pathname: '/', state: { from: props.location } }}/>
          )
        )}
      />
    )
  }
};

let PrivateNoMenuRouteWrapper = withRouter(PrivateNoMenuRoute);

const ContentRoute = ({ component: Component, path, ...rest }: any) => (
  <Route
    {...rest}
    render={props => (
      auth.isAuthenticated() ? (
          <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/login', state: { from: props.location } }}/>
      )
    )}
  />
);

const AdminRoute = ({ component: Component, path, ...rest }: any) => (
  <Route
    {...rest}
    render={props => (
      auth.isAuthenticated() ? (
        <Layout>
          <Component {...props} />
        </Layout>
      ) : (
        <Redirect to={{ pathname: '/login', state: { from: props.location } }}/>
      )
    )}
  />
);

const SetupRoute = ({ component: Component, ...rest }: any) => (
  <Route
    {...rest}
    render={props => (
      auth.isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/login', state: { from: props.location } }}/>
      )
    )}
  />
);

let userJson = localStorage.getItem('user');

let id = 5;

if(auth.isAuthenticated()) {
  // id = JSON.parse(userJson)['role_id'];
}

var dashboardUrls = [
  'exchanges',
  'token-owner',
  'market-maker',
  'trader',
  'community'
];

const PublicRoute = ({ component: Component, blueHeader, ...rest }: any) => (
  <Route
    {...rest}
    render={props => (
      // auth.isAuthenticated() ? (
      //   <Redirect to={{ pathname: '/workstation', state: { from: props.location } }}/>
      // ) : (
          <Layout>
            <Header style={{ position: 'fixed', zIndex: 1, width: '100%', background: (blueHeader ? 'rgb(1, 63, 171)' : '#fff'), padding: 0 }}>
              <Row>
                <Col span={4}>
                  <div className="logo">
                    <Link to='' className={blueHeader ? 'white' : 'blue'}>LOGO</Link>
                  </div>
                </Col>
                <Col span={20}>
                  <div className="header-nav-wrapper">
                    <Link to='' className={blueHeader ? 'white' : 'blue'}>GET HELP</Link>
                    {
                      blueHeader && <Icon type="bell" theme="filled" />
                    }
                  </div>
                </Col>
              </Row>
            </Header>
            <Content style={{ margin: '88px 16px 0', overflow: 'initial', minHeight: 'calc(100vh - 88px)' }}>
              <Component {...props} />
            </Content>
            {/* <Footer style={{ textAlign: 'center' }}>
              Venue Genie ©2019 Created by Threeaccents
            </Footer> */}
          </Layout>
      // )
    )}
  />
);

export default () => (
  <div>
    <Switch>
      <PublicRoute path="/" exact component={Login}/>
      <PublicRoute path="/signup" exact component={Signup}/>
      <PublicRoute path="/signup-client/:id" exact component={SignupClient}/>
      <PublicRoute path="/forgot-password" exact component={ForgotPassword}/>
      <PublicRoute path="/pricing" exact component={Pricing} blueHeader={true}/>
      <PrivateRouteWrapper path="/workstation" exact component={Workstation}/>
      <PrivateRouteWrapper path="/task-manager" exact component={TaskManager}/>
      <PrivateRouteWrapper path="/clients" exact component={Clients}/>
      <PrivateRouteWrapper path="/setting" exact component={Setting}/>
      <PrivateNoMenuRouteWrapper path="/client-workstation" exact component={Workstation}/>
      <PrivateNoMenuRouteWrapper path="/case/:id/detail" exact component={ClientDetail} />
      {/* <AdminRoute path="/admin/data-dashboard" exact component={DataDashboard}/>
      <Route path="/public/blog/article/:slug" exact component={BlogArticle}/> */}
    </Switch>
    {/* <AppAlert className="alert-message"/> */}
    {/* <Alert message="Success" type="success" /> */}
  </div>
);

