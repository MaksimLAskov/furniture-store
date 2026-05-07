import { Navigate } from 'react-router-dom'

function ProtectedRoute({ children }) {
  const isAdminAuth = localStorage.getItem('isAdminAuth') === 'true'

  if (!isAdminAuth) {
    return <Navigate to="/admin/login" replace />
  }

  return children
}

export default ProtectedRoute