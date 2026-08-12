import './index.css'
import PostActions from '../PostActions'
import {Link} from 'react-router-dom'

const Post = props => {
  const {postData} = props
  const {
    id: postId,
    userName: authorName,
    profilePic: authorProfileImage,
    postDetails: mediaInfo,
    userId: authorId,
    createdAt: publishTime,
    likesCount: totalLikes,
    comments: userComments,
  } = postData

  return (
    <li className="posts-con">
      <Link to={`/users/${authorId}`} className="anchortags-posts">
        <div className="posts-user">
          <img
            className="posts-profile"
            src={authorProfileImage}
            alt="post author profile"
          />
          <h4>{authorName}</h4>
        </div>
      </Link>
      <img className="posts-details-img" alt="post" src={mediaInfo.image_url} />
      <div className="posts-text-con">
        <PostActions postId={postId} likesCount={totalLikes} />
        <p>{mediaInfo.caption}</p>
        <ul>
          {userComments.map((commentItem, index) => (
            <li
              className="comments-list-li"
              key={commentItem.comment_id || `${commentItem.user_id}-${index}`}
            >
              <span className="bold-text-posts">{commentItem.user_name} </span>
              <p>{commentItem.comment}</p>
            </li>
          ))}
        </ul>
        <p className="light-text-posts">{publishTime}</p>
      </div>
    </li>
  )
}

export default Post