import { Navigate } from 'react-router-dom'

// eslint-disable-next-line react/prop-types
function RequireAuth({ children }) {
  const registration = localStorage.getItem('registration')
  if (!registration) {
    return <Navigate to="/sign-in" replace />
  }

  return children
}

export default RequireAuth