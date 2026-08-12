// Write your code here
import './index.css'
import Header from '../Header'
import UserStories from '../UserStories'
import PostsList from '../PostsList'

import {useState} from 'react'

const Home = () => {
  const [searchInput, setSearchInput] = useState('')

  const onSearchPosts = value => {
    setSearchInput(value)
  }

  return (
    <section className="home-section">
      <Header onSearchPosts={onSearchPosts} />
      <UserStories />
      <PostsList searchInput={searchInput} />
    </section>
  )
}
export default Home
