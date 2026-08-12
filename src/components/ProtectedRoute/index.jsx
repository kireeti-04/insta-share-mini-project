import Cookie from 'js-cookie'
import {Navigate} from 'react-router-dom'

const ProtectedRoute = ({children: routeChildren}) => {
  const userJwtToken = Cookie.get('jwt_token')
  if (userJwtToken === undefined) {
    return <Navigate to="/login" replace />
  }

  return routeChildren
}

export default ProtectedRoute