import './index.css'

const SearchNotFoundView = () => {
  return (
    <section className="search-not-found">
      <img
        src="https://res.cloudinary.com/danbzhmg7/image/upload/v1785996506/notFound_uz2nxd.png"
        alt="search not found"
      />
      <h1>Search Not Found</h1>
      <p>Try different keyword or search again</p>
    </section>
  )
}

export default SearchNotFoundView
