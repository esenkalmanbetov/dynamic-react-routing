import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  useParams,
  Switch
} from 'react-router-dom'

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

const Login = () => <h3>Login</h3>

const NotFound = () => {
  return (
    <div>
      <h3>
        Not Found Page
      </h3>
    </div>
  )
}

const RouteWithSubRoutes = (route) => (
  <Route exact={route.exact || false} path={route.path} render={(props) => (
    <route.component {...props} routes={route.routes} />
  )} />
)

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
    routes: subRoutes('db')
  }),
  new CustomRoute({
    path: '/login',
    component: Login
  }),
  new CustomRoute({
    component: NotFound
  }),
]


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
      <Router>
        <div>

          <Switch>
            <Route exact path="/">
              <Redirect to="/db" />
            </Route>
            {routes.map((route) => (
              <RouteWithSubRoutes key={route.path} {...route} />
            ))}
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;
