import './index.css'
import {Link} from 'react-router-dom'

const UserStory = props => {
  const {stories: storyDetails} = props
  const {
    userName: storyUserName,
    userId: storyUserId,
    imgUrl: storyImgUrl,
  } = storyDetails
  return (
    <li className="stories">
      <Link to={`/users/${storyUserId}`}>
        <img src={storyImgUrl} className="storyimg" alt="user story" />
      </Link>
      <p className="story-user-name">{storyUserName}</p>
    </li>
  )
}

export default UserStory