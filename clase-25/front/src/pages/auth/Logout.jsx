import { useContext } from 'react'
import { Navigate } from 'react-router'
import { useLogout } from '../../context/session.context'

export default function Logout() {
  
  const logout = useLogout()
  logout()

  return <Navigate to="/login" />
}
