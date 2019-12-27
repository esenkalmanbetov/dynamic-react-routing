import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom'

// const Algorithm = () => <h2>Algorithm</h2>

const Algorithm = ({ routes }) => (
  <div>
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

const RouteWithSubRoutes = (route) => (
  <Route path={route.path} render={(props) => (
    <route.component {...props} routes={route.routes} />
  )} />
)
const routes = [
  {
    path: '/algorithm',
    component: Algorithm,
    routes: [
      {
        path: '/algorithm/problems',
        component: Problems
      },
      {
        path: '/algorithm/submissions',
        component: Submissions
      }
    ]
  },
  {
    path: '/db',
    component: Db,
    routes: [
      {
        path: '/db/problems',
        component: Problems
      },
      {
        path: '/db/submissions',
        component: Submissions
      }
    ]
  }
]

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <ul>
            <li><Link to="/db">Db</Link></li>
            <li><Link to="/algorithm">Algorithm</Link></li>
          </ul>

          {routes.map((route) => (
            <RouteWithSubRoutes key={route.path} {...route} />
          ))}
        </div>
      </Router>
    )
  }
}

export default App;
