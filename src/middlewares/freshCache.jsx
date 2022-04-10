import { abort, forget } from 'turbo-solid'

export default function freshCache(Component) {
  return (props) => {
    // Abort all pending resolvers.
    abort()
    // Forget all the cached items.
    forget()

    return <Component {...props} />
  }
}
