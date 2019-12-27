import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
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
const Submissions = () => <h3>Submissions</h3>

const Login = () => <h3>Login</h3>

const RouteWithSubRoutes = (route) => (
  <Route path={route.path} render={(props) => (
    <route.component {...props} routes={route.routes} />
  )} />
)

class CustomRoute {
  constructor(arg) {
    this.path = arg.path
    this.component = arg.component
    this.routes = arg.routes
  }
}

const routes = [
  new CustomRoute({
    path: '/algorithm',
    component: Algorithm,
    routes: [
      new CustomRoute({
        path: '/algorithm/problems',
        component: Problems
      }),
      new CustomRoute({
        path: '/algorithm/submissions',
        component: Submissions
      })
    ]
  }),
  new CustomRoute({
    path: '/db',
    component: Db,
    routes: [
      new CustomRoute({
        path: '/db/problems',
        component: Problems
      }),
      new CustomRoute({
        path: '/db/submissions',
        component: Submissions
      })
    ]
  }),
  new CustomRoute({
    path: '/login',
    component: Login
  })
]

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
