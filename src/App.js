import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  useParams,
  Switch,
  withRouter
} from 'react-router-dom'

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

const Nav = () => (
  <ul>
    <li><Link to="/db">Db</Link></li>
    <li><Link to="/algorithm">Algorithm</Link></li>
  </ul>
)

const SubNav = props => (
  <ul>
    <li><Link to={`/${props.slug}/problems`}>Problems</Link></li>
    <li><Link to={`/${props.slug}/submissions`}>Submissions</Link></li>
  </ul>
)

const Algorithm = ({ routes }) => (
  <div>
    <Nav />
    <h2>Algorithm</h2>
    <SubNav slug="algorithm" />
    <Switch>
      {routes.map((route) => (
        <RouteWithSubRoutes key={route.path} {...route} />
      ))}
    </Switch>
  </div>
)

const Db = ({ routes }) => (
  <div>
    <Nav />
    <h2>Db</h2>
    <SubNav slug="db" />
    <Switch>
      {routes.map((route) => (
        <RouteWithSubRoutes key={route.path} {...route} />
      ))}
    </Switch>
  </div>
)

const Problems = () => <h3>Problems</h3>

const Problem = () => {
  const { id } = useParams()
  return (
    <h4>Id: {id}</h4>
  )
}

const Submissions = () => <h3>Submissions</h3>

const Submission = () => {
  const { id } = useParams()
  return (
    <h4>Id: {id}</h4>
  )
}

class Login extends React.Component {
  state = {
    redirectToReferrer: false
  }
  login = () => {
    fakeAuth.authenticate(() => {
      this.setState(() => ({
        redirectToReferrer: true
      }))
    })
  }
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer } = this.state

    if (redirectToReferrer === true) {
      return <Redirect to={from} />
    }

    return (
      <div>
        <p>You must log in to view the page</p>
        <button onClick={this.login}>Log in</button>
      </div>
    )
  }
}

const NotFound = () => {
  return (
    <div>
      <h3>
        Not Found Page
      </h3>
    </div>
  )
}

const PrivateRoute = (route) => {
  return (
    <Route exact={route.exact || false} path={route.path} render={(props) => (
      fakeAuth.isAuthenticated === true
        ? <route.component {...props} routes={route.routes} />
        : <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
    )} />
  )
}

const RouteWithSubRoutes = route => route.protected ?
  (
    <PrivateRoute {...route} />
  )
  :
  (
    <Route exact={route.exact || false} path={route.path} render={(props) => (
      <route.component {...props} routes={route.routes} />
    )} />
  )

const AuthButton = withRouter(({ history }) => (
  fakeAuth.isAuthenticated ? (
    <p>
      Welcome! <button onClick={() => {
        fakeAuth.signout(() => history.push('/'))
      }}>Sign out</button>
    </p>
  ) : (
      <p>You are not logged in.</p>
    )
))

class CustomRoute {
  constructor(arg) {
    return {
      ...arg
    }
  }
}

const subRoutes = (preffix) => {

  return [
    new CustomRoute({
      path: `/${preffix}/problems`,
      component: Problems,
      exact: true
    }),
    new CustomRoute({
      path: `/${preffix}/problems/:id`,
      component: Problem
    }),
    new CustomRoute({
      path: `/${preffix}/submissions`,
      component: Submissions,
      exact: true
    }),
    new CustomRoute({
      path: `/${preffix}/submissions/:id`,
      component: Submission
    }),
    new CustomRoute({
      path: `/${preffix}/*`,
      component: NotFound
    }),
  ]
}

const routes = [
  new CustomRoute({
    path: '/algorithm',
    component: Algorithm,
    routes: subRoutes('algorithm')
  }),
  new CustomRoute({
    path: '/db',
    component: Db,
    routes: subRoutes('db'),
    protected: true
  }),
  new CustomRoute({
    path: '/login',
    component: Login
  }),
  new CustomRoute({
    component: NotFound
  }),
]

// DONE
// Make protected and public pages

// DONE
// handle two type not found page
// 1. for route
// 2. for subRoutes

// DONE
// Make dynamic sidebar (navs)

class App extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <AuthButton />

            <Switch>
              <Route exact path="/">
                <Redirect to="/algorithm" />
              </Route>
              {routes.map((route) => (
                <RouteWithSubRoutes key={route.path} {...route} />
              ))}
            </Switch>
          </div>
        </Router>
      </div>
    )
  }
}

export default App;
