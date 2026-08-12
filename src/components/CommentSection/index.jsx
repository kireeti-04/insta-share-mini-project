import {Link} from 'react-router-dom'

const CommentSection = ({comments = [], caption = '', authorName = ''}) => {
  return (
    <div className="comments-section">
      {caption && (
        <p className="post-caption">
          <span className="caption-author">{authorName}</span> {caption}
        </p>
      )}

      <ul className="comments-list">
        {comments.map((eachComment, index) => {
          const name = eachComment.user_name || eachComment.userName || 'user'
          const text = eachComment.comment || ''
          const userId = eachComment.user_id || eachComment.userId
          const commentId = eachComment.id || eachComment.comment_id

          return (
            <li key={commentId ?? index} className="comment-item">
              <p className="comment-text">
                {userId ? (
                  <Link to={`/users/${userId}`} className="comment-user">
                    {name}
                  </Link>
                ) : (
                  <span className="comment-user">{name}</span>
                )}{' '}
                {text}
              </p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default CommentSection