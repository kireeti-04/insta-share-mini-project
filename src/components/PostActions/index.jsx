import {useState} from 'react'
import Cookies from 'js-cookie'
import './index.css'

import {BsHeart, BsFillShareFill} from 'react-icons/bs'
import {FcLike} from 'react-icons/fc'
import {FaRegComment} from 'react-icons/fa'

const PostActions = props => {
  const {postId: idOfPost, likesCount: initialLikesCount} = props

  const [isLiked, setIsLiked] = useState(false)
  const [totalLikes, setTotalLikes] = useState(initialLikesCount)

  const jwtToken = Cookies.get('jwt_token')

  const likeApiUrl = `https://apis.ccbp.in/insta-share/posts/${idOfPost}/like`
  const requestBody = {like_status: !isLiked}
  const requestOptions = {
    method: 'POST',
    headers: {Authorization: `Bearer ${jwtToken}`},
    body: JSON.stringify(requestBody),
  }

  const handleLikeToggle = async () => {
    try {
      const apiResponse = await fetch(likeApiUrl, requestOptions)

      if (apiResponse.ok) {
        setIsLiked(prevLikedState => !prevLikedState)
        setTotalLikes(prevLikes => (isLiked ? prevLikes - 1 : prevLikes + 1))
      }
    } catch (error) {
      // network failure: silently ignore or add error UI later
    }
  }

  return (
    <div>
      <div className="posts-icons">
        {isLiked ? (
          <button
            type="button"
            className="heart-button"
            onClick={handleLikeToggle}
            data-testid="unLikeIcon"
          >
            <FcLike />
          </button>
        ) : (
          <button
            type="button"
            className="heart-button"
            data-testid="likeIcon"
            onClick={handleLikeToggle}
          >
            <BsHeart />
          </button>
        )}
        <FaRegComment />
        <BsFillShareFill />
      </div>
      <p className="bold-text-posts">{totalLikes} likes</p>
    </div>
  )
}

export default PostActions