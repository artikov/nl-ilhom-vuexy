// ** React Imports
import { createContext, useEffect, useState } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Axios
import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'

// ** Defaults
const defaultProvider = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve()
}
const AuthContext = createContext(defaultProvider)

const AuthProvider = ({ children }) => {
  // ** States
  const [user, setUser] = useState(defaultProvider.user)
  const [loading, setLoading] = useState(defaultProvider.loading)

  // ** Hooks
  const router = useRouter()
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
      const storedRefreshToken = window.localStorage.getItem(authConfig.storageRefreshTokenKeyName)

      if (storedToken) {
        setLoading(true)

        // Function to refresh the token
        const refreshAccessToken = async () => {
          try {
            const response = await axios.post(authConfig.refreshEndpoint, {
              refresh_token: storedRefreshToken
            })

            const newAccessToken = response.data.access
            window.localStorage.setItem(authConfig.storageTokenKeyName, newAccessToken)

            return newAccessToken
          } catch (error) {
            console.log('Error refreshing token:', error)
            throw error // You may want to handle this more gracefully based on your application's needs
          }
        }

        // Function to handle initial authentication
        const authenticateUser = async () => {
          try {
            const response = await axios.get(authConfig.meEndpoint, {
              headers: {
                Authorization: `Bearer ${storedToken}`
              }
            })

            setUser({
              id: 1,
              role: 'admin',
              fullName: 'John Doe',
              username: 'johndoe',
              ...response.data
            })

            setLoading(false)
          } catch (error) {
            console.log('Error verifying access token:', error)

            // Handle token expiration by refreshing the token
            if (authConfig.onTokenExpiration === 'refresh') {
              try {
                const newAccessToken = await refreshAccessToken()

                // Retry the original request with the new access token
                const response = await axios.get(authConfig.meEndpoint, {
                  headers: {
                    Authorization: `Bearer ${newAccessToken}`
                  }
                })

                setUser({
                  id: 1,
                  role: 'admin',
                  fullName: 'John Doe',
                  username: 'johndoe',
                  ...response.data
                })

                setLoading(false)
              } catch (refreshError) {
                console.log('Error refreshing token:', refreshError)
                handleLogout() // Log out the user if token refresh fails
              }
            } else {
              // Handle other scenarios (e.g., logout immediately)
              localStorage.removeItem('userData')
              localStorage.removeItem('refreshToken')
              localStorage.removeItem('accessToken')
              setUser(null)
              setLoading(false)

              if (!router.pathname.includes('login')) {
                router.replace('/login')
              }
            }
          }
        }

        await authenticateUser()
      } else {
        setLoading(false)
      }
    }

    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router])

  const handleLogin = (params, errorCallback) => {
    axios
      .post(authConfig.loginEndpoint, params)
      .then(async response => {
        params.rememberMe ? window.localStorage.setItem(authConfig.storageTokenKeyName, response.data.access) : null
        const returnUrl = router.query.returnUrl
        setUser({
          id: 1,
          role: 'admin',
          fullName: 'John Doe',
          username: 'johndoe',
          ...response.data
        })
        params.rememberMe
          ? window.localStorage.setItem(
              'userData',
              JSON.stringify({
                ...response.data
              })
            )
          : null
        const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
        router.replace(redirectURL)
      })
      .catch(err => {
        if (errorCallback) errorCallback(err)
      })
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('userData')
    window.localStorage.removeItem(authConfig.storageTokenKeyName)
    router.push('/login')
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
