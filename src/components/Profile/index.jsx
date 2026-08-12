import './index.css'
import {BsGrid3X3} from 'react-icons/bs'
import {BiCamera} from 'react-icons/bi'

const Profile = props => {
  const {details: profileDetails, alt: altTextConfig} = props
  const {
    name: profileName,
    userImg: avatarUrl,
    followers: followersCount,
    following: followingCount,
    posts: postsList,
    postsCount: totalPostsCount,
    bio: userBio,
    stories: storiesList,
    userId: uniqueUserId,
  } = profileDetails
  const {
    imgalt: profileImageAlt,
    storyalt: storyImageAlt,
    postalt: postImageAlt,
  } = altTextConfig

  return (
    <section className="myprofile">
      <section className="profile-con">
        <img className="profile-img" src={avatarUrl} alt={profileImageAlt} />
        <div>
          <h1 className="profile-name">{profileName}</h1>
          <div className="counts">
            <p>
              <span className="profile-text-bold">{totalPostsCount}</span> posts
            </p>
            <p>
              <span className="profile-text-bold">{followersCount}</span>{' '}
              followers
            </p>
            <p>
              <span className="profile-text-bold">{followingCount}</span>{' '}
              following
            </p>
          </div>
          <p className="profile-text-bold">{uniqueUserId}</p>
          <p>{userBio}</p>
        </div>
      </section>
      <ul className="stories-border">
        {storiesList.map(singleStory => (
          <li key={singleStory.id}>
            <img
              className="stories-img"
              alt={storyImageAlt}
              src={singleStory.image}
            />
          </li>
        ))}
      </ul>
      <hr />
      <br />
      {postsList.length === 0 ? (
        <section>
          <BiCamera data-testid="noPosts" />
          <h2>No Posts Yet</h2>
        </section>
      ) : (
        <section className="user-posts-con">
          <div className="posts-header">
            <BsGrid3X3 />
            <h3 className="user-posts-title">Posts</h3>
          </div>
          <ul className="user-posts-border">
            {postsList.map(singlePost => (
              <li key={singlePost.id}>
                <img
                  className="posts-img"
                  src={singlePost.image}
                  alt={postImageAlt}
                />
              </li>
            ))}
          </ul>
        </section>
      )}
    </section>
  )
}

export default Profile