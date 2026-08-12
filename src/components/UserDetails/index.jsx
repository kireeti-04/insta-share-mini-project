import Header from '../Header'
import Profile from '../Profile'
import apiStatusConstants from '../../constants/APIConstants.js'
import FailureView from '../FailureView'
import SomethingWentWrong from '../SomethingWentWrong'

import {Audio} from 'react-loader-spinner'

import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'
import {useParams} from 'react-router-dom'

const UserDetails = () => {
  const [userProfileData, setUserProfileData] = useState({
    stories: [],
    posts: [],
  })
  const [currentApiStatus, setCurrentApiStatus] = useState(
    apiStatusConstants.initial,
  )

  const {id: userIdParam} = useParams()

  const fetchUserData = async () => {
    const jwtToken = Cookies.get('jwt_token')

    const userApiUrl = `https://apis.ccbp.in/insta-share/users/${userIdParam}`
    const fetchOptions = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    try {
      const apiResponse = await fetch(userApiUrl, fetchOptions)

      if (apiResponse.ok) {
        const responseData = await apiResponse.json()

        const formattedUserData = {
          id: responseData.user_details.id,
          name: responseData.user_details.user_name,
          userImg: responseData.user_details.profile_pic,
          followers: responseData.user_details.followers_count,
          following: responseData.user_details.following_count,
          posts: responseData.user_details.posts,
          postsCount: responseData.user_details.posts_count,
          bio: responseData.user_details.user_bio,
          stories: responseData.user_details.stories,
          userId: responseData.user_details.user_id,
        }
        setUserProfileData(formattedUserData)
        setCurrentApiStatus(apiStatusConstants.success)
      } else {
        setCurrentApiStatus(apiStatusConstants.failure)
      }
    } catch (error) {
      setCurrentApiStatus(apiStatusConstants.failure)
    }
  }

  useEffect(() => {
    setCurrentApiStatus(apiStatusConstants.inProgress)
    fetchUserData()
  }, [userIdParam])

  const accessibilityAltTexts = {
    imgalt: 'user profile',
    storyalt: 'user story',
    postalt: 'user post',
  }

  const handleRetry = () => {
    setCurrentApiStatus(apiStatusConstants.inProgress)
    fetchUserData()
  }

  const renderLoadingView = () => (
    <section>
      <div className="loader-container" data-testid="loader">
        <Audio color="gold" height={15} width={15} />
      </div>
    </section>
  )

  const renderSuccessView = () => (
    <section>
      <Header />
      <Profile details={userProfileData} alt={accessibilityAltTexts} />
    </section>
  )

  const renderFailureView = () => (
    <article>
      <FailureView handleRetry={handleRetry} />
    </article>
  )

  const renderErrorView = () => (
    <article>
      <SomethingWentWrong onRetry={handleRetry} />
    </article>
  )

  const renderMainContent = () => {
    switch (currentApiStatus) {
      case apiStatusConstants.initial:
        return renderLoadingView()
      case apiStatusConstants.inProgress:
        return renderLoadingView()
      case apiStatusConstants.success:
        return renderSuccessView()
      case apiStatusConstants.failure:
        return renderFailureView()
      default:
        return renderErrorView()
    }
  }

  return <>{renderMainContent()}</>
}

export default UserDetails