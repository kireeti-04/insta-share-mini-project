import './index.css'

const FailureView = ({handleRetry}) => {
  return (
    <section className="error-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <p className="failure-description">
        Something went wrong. Please try again
      </p>
      <button type="button" onClick={handleRetry} className="retry-button">
        Try again
      </button>
    </section>
  )
}

export default FailureView
