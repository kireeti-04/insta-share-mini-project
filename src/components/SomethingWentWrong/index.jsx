import './index.css'

const SomethingWentWrongView = ({onRetry: handleRetryClick = () => {}}) => {
  return (
    <section className="somethingWrong-page">
      <img
        src="https://res.cloudinary.com/danbzhmg7/image/upload/v1785998241/somethingWrong_hsggkw.png"
        alt="something Wrong"
      />
      <h3>Something went wrong. Please try again</h3>
      <button type="button" onClick={handleRetryClick}>
        Try again
      </button>
    </section>
  )
}

export default SomethingWentWrongView