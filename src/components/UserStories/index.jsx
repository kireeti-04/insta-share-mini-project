import UserStory from '../UserStory'
import './index.css'
import {reactSlickSettings} from '../../constants/UIConstants.js'
import apiStatusConstants from '../../constants/APIConstants.js'
import FailureView from '../FailureView'
import SomethingWentWrong from '../SomethingWentWrong'

import {Audio} from 'react-loader-spinner'

import Cookies from 'js-cookie'
import {useState, useEffect} from 'react'

import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const UserStories = () => {
  const [userStoriesList, setUserStoriesList] = useState([])
  const [currentApiStatus, setCurrentApiStatus] = useState(
    apiStatusConstants.initial,
  )

  const fetchUserStories = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const storiesApiUrl = 'https://apis.ccbp.in/insta-share/stories'
    const fetchOptions = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    try {
      const apiResponse = await fetch(storiesApiUrl, fetchOptions)

      if (apiResponse.ok) {
        const responseData = await apiResponse.json()
        const formattedStoriesData = responseData.users_stories.map(
          singleStoryItem => ({
            imgUrl: singleStoryItem.story_url,
            userId: singleStoryItem.user_id,
            userName: singleStoryItem.user_name,
          }),
        )
        setUserStoriesList(formattedStoriesData)
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
    fetchUserStories()
  }, [])

  const handleRetry = () => {
    setCurrentApiStatus(apiStatusConstants.inProgress)
    fetchUserStories()
  }

  const renderLoadingView = () => (
    <section>
      <div className="loader-container" data-testid="loader">
        <Audio color="skyblue" height={30} width={30} />
      </div>
    </section>
  )

  const renderSuccessView = () => (
    <section>
      <div className="stories-list">
        <Slider {...reactSlickSettings}>
          {userStoriesList.map(singleStory => (
            <UserStory stories={singleStory} key={singleStory.userId} />
          ))}
        </Slider>
      </div>
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

export default UserStories