import './index.css'

import {FaSearch} from 'react-icons/fa'
import {Link, useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import {useState} from 'react'

const Header = props => {
  const {onSearchPosts = () => {}} = props

  const [userQuery, setUserQuery] = useState('')

  const navigate = useNavigate()

  const handleLogout = () => {
    Cookies.remove('jwt_token')
    navigate('/login', {replace: true})
  }

  const triggerSearch = () => {
    onSearchPosts(userQuery)
  }

  const handleInputChange = event => {
    setUserQuery(event.target.value)
  }

  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      triggerSearch()
    }
  }

  return (
    <nav className="header-navbar">
      <div className="logo-container">
        <Link to="/" className="logo-link">
          <img
            src="https://res.cloudinary.com/danbzhmg7/image/upload/v1785905009/logo_gtr4id.png"
            alt="website logo"
            className="website-logo"
          />
        </Link>
        <h1 className="website-title">Insta Share</h1>
      </div>
      <div className="header-navigation-controls">
        <div className="search-bar-container">
          <input
            type="search"
            className="search-input-field"
            placeholder="Search Caption"
            value={userQuery}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <button
            type="button"
            className="search-submit-button"
            data-testid="searchIcon"
            onClick={triggerSearch}
          >
            <FaSearch className="search-icon-symbol" />
          </button>
        </div>
        <ul className="nav-links-list">
          <li className="nav-link-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-link-item">
            <Link to="/my-profile" className="nav-link">
              Profile
            </Link>
          </li>
          <li className="nav-link-item">
            <button
              type="button"
              className="logout-action-button"
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Header