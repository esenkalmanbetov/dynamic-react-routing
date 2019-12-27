import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  useParams
} from 'react-router-dom'

const Nav = () => (
  <ul>
    <li><Link to="/db">Db</Link></li>
    <li><Link to="/algorithm">Algorithm</Link></li>
  </ul>
)

const Algorithm = ({ routes }) => (
  <div>
    <Nav />
    <h2>Algorithm</h2>
    <ul>
      <li><Link to="/algorithm/problems">Problems</Link></li>
      <li><Link to="/algorithm/submissions">Submissions</Link></li>
    </ul>

    {routes.map((route) => (
      <RouteWithSubRoutes key={route.path} {...route} />
    ))}
  </div>
)

const Db = ({ routes }) => (
  <div>
    <Nav />
    <h2>Db</h2>
    <ul>
      <li><Link to="/db/problems">Problems</Link></li>
      <li><Link to="/db/submissions">Submissions</Link></li>
    </ul>

    {routes.map((route) => (
      <RouteWithSubRoutes key={route.path} {...route} />
    ))}
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
    })
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
  })
]

// Make protected and public pages

// hanle two type not found page
// 1. for route
// 2. for subRoutes

// Make dynamic sidebar (navs)

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>

          {routes.map((route) => (
            <RouteWithSubRoutes key={route.path} {...route} />
          ))}

          <Route exact path="/">
            <Redirect to="/db" />
          </Route>
        </div>
      </Router>
    )
  }
}

export default App;
