import './index.css'
import { useState } from 'react'
import Cookie from 'js-cookie'
import { useNavigate, Navigate } from 'react-router-dom'

const Login = () => {
  const [enteredUsername, setEnteredUsername] = useState('')
  const [enteredPassword, setEnteredPassword] = useState('')
  const [showSubmitError, setShowSubmitError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const navigate = useNavigate()

  const onChangeUsername = event => {
    setEnteredUsername(event.target.value)
  }

  const onChangePassword = event => {
    setEnteredPassword(event.target.value)
  }

  const onSubmitFailure = errorText => {
    setShowSubmitError(true)
    setErrorMessage(errorText)
  }

  const onSubmitSuccess = jwtToken => {
    Cookie.set('jwt_token', jwtToken, { expires: 30 })
    navigate('/', { replace: true })
  }

  const handleFormSubmit = async event => {
    event.preventDefault()
    const loginApiUrl = 'https://apis.ccbp.in/login'
    const userCredentials = { username: enteredUsername, password: enteredPassword }

    const fetchOptions = {
      method: 'POST',
      body: JSON.stringify(userCredentials),
    }

    const apiResponse = await fetch(loginApiUrl, fetchOptions)
    const responseData = await apiResponse.json()

    if (apiResponse.ok) {
      onSubmitSuccess(responseData.jwt_token)
    } else {
      onSubmitFailure(responseData.error_msg)
    }
  }

  const token = Cookie.get('jwt_token')
  if (token !== undefined) {
    return <Navigate to="/" replace />
  }

  return (
    <section className="main">
      <img
        alt="website login"
        className="login-img"
        src="https://res.cloudinary.com/danbzhmg7/image/upload/v1785896945/login-img_eoera2.png"
      />
      <div className="form">
        <div className="logo-form">
          <img
            src="https://res.cloudinary.com/danbzhmg7/image/upload/v1785905009/logo_gtr4id.png"
            alt="website logo"
            className="logo"
          />
          <h3>Insta Share</h3>
        </div>
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="username">USERNAME</label>
          <input
            id="username"
            placeholder="Enter username"
            type="text"
            onChange={onChangeUsername}
            value={enteredUsername}
          />
          <label htmlFor="password">PASSWORD</label>
          <input
            id="password"
            placeholder="Enter password"
            type="password"
            onChange={onChangePassword}
            value={enteredPassword}
          />
          {showSubmitError && <p className="error">*{errorMessage}</p>}
          <button className="login" type="submit">
            Login
          </button>
        </form>
      </div>
    </section>
  )
}

export default Login