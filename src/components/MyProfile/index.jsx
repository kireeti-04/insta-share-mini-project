import Header from '../Header'
import Profile from '../Profile'
import apiStatusConstants from '../../constants/APIConstants.js'
import FailureView from '../FailureView'
import SomethingWentWrong from '../SomethingWentWrong'

import {Audio} from 'react-loader-spinner'
import Cookies from 'js-cookie'

import {useEffect, useState} from 'react'

const MyProfile = () => {
  const [profileData, setProfileData] = useState({
    stories: [],
    posts: [],
  })
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)

  const fetchProfileData = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const profileApiUrl = 'https://apis.ccbp.in/insta-share/my-profile'
    const requestOptions = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    try {
      const response = await fetch(profileApiUrl, requestOptions)

      if (response.ok) {
        const responseData = await response.json()
        const formattedProfileData = {
          id: responseData.profile.id,
          name: responseData.profile.user_name,
          userImg: responseData.profile.profile_pic,
          followers: responseData.profile.followers_count,
          following: responseData.profile.following_count,
          posts: responseData.profile.posts,
          postsCount: responseData.profile.posts_count,
          bio: responseData.profile.user_bio,
          stories: responseData.profile.stories,
          userId: responseData.profile.user_id,
        }
        setProfileData(formattedProfileData)
        setApiStatus(apiStatusConstants.success)
      } else {
        setApiStatus(apiStatusConstants.failure)
      }
    } catch (error) {
      setApiStatus(apiStatusConstants.failure)
    }
  }

  useEffect(() => {
    setApiStatus(apiStatusConstants.inProgress)
    fetchProfileData()
  }, [])

  const altTexts = {
    imgalt: 'my profile',
    storyalt: 'my story',
    postalt: 'my post',
  }

  const handleRetry = () => {
    setApiStatus(apiStatusConstants.inProgress)
    fetchProfileData()
  }

  const renderLoadingView = () => (
    <section>
      <div className="loader-container" data-testid="loader">
        <Audio color="skyblue" height={60} width={60} />
      </div>
    </section>
  )

  const renderSuccessView = () => (
    <article>
      <Header />
      <Profile details={profileData} key={profileData.id} alt={altTexts} />
    </article>
  )

  const renderFailureView = () => (
    <article>
      <FailureView handleRetry={handleRetry} />
    </article>
  )

  const renderSomethingWentWrongView = () => (
    <article>
      <SomethingWentWrong onRetry={handleRetry} />
    </article>
  )

  const renderProfileContent = () => {
    switch (apiStatus) {
      case apiStatusConstants.initial:
        return renderLoadingView()
      case apiStatusConstants.inProgress:
        return renderLoadingView()
      case apiStatusConstants.success:
        return renderSuccessView()
      case apiStatusConstants.failure:
        return renderFailureView()
      default:
        return renderSomethingWentWrongView()
    }
  }

  return <>{renderProfileContent()}</>
}

export default MyProfile