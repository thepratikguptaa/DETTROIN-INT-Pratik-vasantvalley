import { Component } from 'react'

/**
 * Last line of defence: a render error anywhere in the tree shows a usable
 * page with a way out, instead of a blank white screen.
 */
export class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    // In a real deployment this is where the error would go to monitoring.
    console.error('Unhandled UI error:', error, info)
  }

  render() {
    if (!this.state.hasError) return this.props.children

    return (
      <div className="grid min-h-screen place-items-center bg-crimson-950 px-6 text-center text-sand-100">
        <div className="max-w-md">
          <h1 className="font-display text-3xl text-sand-50">Something went wrong</h1>
          <p className="mt-4 leading-relaxed text-sand-200/85">
            The page failed to load. Reloading usually fixes it — if it doesn't, please write to
            info@vasantvalley.edu.in.
          </p>
          <button
            type="button"
            onClick={() => window.location.assign('/')}
            className="btn mt-8 bg-sand-50 text-crimson-800 hover:bg-white"
          >
            Reload the site
          </button>
        </div>
      </div>
    )
  }
}

export default ErrorBoundary
