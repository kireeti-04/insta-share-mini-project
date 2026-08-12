import './index.css'
import {useEffect, useState} from 'react'
import Cookies from 'js-cookie'
import apiStatusConstants from '../../constants/APIConstants.js'
import FailureView from '../FailureView'
import SearchNotFound from '../SearchNotFound'
import Post from '../Post'
import SomethingWentWrong from '../SomethingWentWrong'

import {Audio} from 'react-loader-spinner'

const PostList = props => {
  const {searchInput: queryText} = props

  const [currentApiStatus, setCurrentApiStatus] = useState(
    apiStatusConstants.initial,
  )
  const [postsList, setPostsList] = useState([])

  const fetchPostsData = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl =
      queryText === ''
        ? 'https://apis.ccbp.in/insta-share/posts'
        : `https://apis.ccbp.in/insta-share/posts?search=${queryText}`
    const fetchOptions = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    try {
      const apiResponse = await fetch(apiUrl, fetchOptions)
      const fetchedData = await apiResponse.json()

      if (apiResponse.ok) {
        const updatedPostsData = fetchedData.posts.map(eachPostItem => ({
          id: eachPostItem.post_id,
          userId: eachPostItem.user_id,
          userName: eachPostItem.user_name,
          profilePic: eachPostItem.profile_pic,
          postDetails: eachPostItem.post_details,
          likesCount: eachPostItem.likes_count,
          comments: eachPostItem.comments,
          createdAt: eachPostItem.created_at,
        }))
        setPostsList(updatedPostsData)
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
    fetchPostsData()
  }, [queryText])

  const handleRetry = () => {
    setCurrentApiStatus(apiStatusConstants.inProgress)
    fetchPostsData()
  }

  const renderSearchResultsView = () => (
    <section className="posts-section">
      <h3 className="search-title">Search Results</h3>
      <ul className="posts-search-section">
        {postsList.map(singlePost => (
          <Post key={singlePost.id} postData={singlePost} />
        ))}
      </ul>
    </section>
  )

  const renderDefaultPostsView = () => (
    <section className="posts-section">
      {postsList.map(singlePost => (
        <Post key={singlePost.id} postData={singlePost} />
      ))}
    </section>
  )

  const renderLoadingView = () => (
    <section>
      <div className="loader-container" data-testid="loader">
        <Audio color="skyblue" height={40} width={40} />
      </div>
    </section>
  )

  const renderNoSearchResultsView = () => (
    <section>
      <SearchNotFound />
    </section>
  )

  const renderSuccessView = () => (
    <>
      {queryText === '' ? renderDefaultPostsView() : renderSearchResultsView()}
    </>
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
        return postsList.length === 0
          ? renderNoSearchResultsView()
          : renderSuccessView()
      case apiStatusConstants.failure:
        return renderFailureView()
      default:
        return renderErrorView()
    }
  }

  return <>{renderMainContent()}</>
}

export default PostList