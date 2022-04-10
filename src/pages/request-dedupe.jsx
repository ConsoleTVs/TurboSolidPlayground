import { createTurboResource, TurboContext } from 'turbo-solid'
import { createSignal, Suspense, useContext } from 'solid-js'
import { Link } from 'solid-app-router'
import Code from '../components/code'
import Card from '../components/card'
import freshCache from '../middlewares/freshCache'

const Post = () => {
  const [post] = createTurboResource(() => '/posts/1')

  return (
    <Card>
      <Suspense fallback={<div>Fetching post...</div>}>
        <Show when={post()}>
          <div class="flex flex-col space-y-3">
            <h1 class="font-semibold text-xl">{post().title}</h1>
            <p class="text-slate-500">{post().body}</p>
          </div>
        </Show>
      </Suspense>
    </Card>
  )
}

const pageString = `const Post = () => {
  const options = {
    transition: false,
    refetchOnFocus: false,
    refetchOnConnect: false,
  }
  const [post] = createTurboResource(
    () => '/posts/1',
    options,
  )

  return (
    <Card>
      <Suspense fallback={<div>Fetching post...</div>}>
        <Show when={post()}>
          <div>
            <h1>{post().title}</h1>
            <p>{post().body}</p>
          </div>
        </Show>
      </Suspense>
    </Card>
  )
}`

const Page = () => {
  const [fetches, setFetches] = createSignal(0)

  function fetcher(key, { signal }) {
    return new Promise(async function (resolve, reject) {
      signal.addEventListener('abort', () => {
        reject(new Error('aborted'))
      })
      await new Promise((r) => setTimeout(r, 1000))
      setFetches((f) => f + 1)
      resolve({
        title: 'Lorem ipsum dolor sit amet',
        body: 'Consectetur adipiscing elit. Duis in lacinia justo. Proin in sem in est blandit auctor. Pellentesque molestie arcu eu malesuada porta. Donec aliquet lobortis leo sed tempus. In id ultricies mauris, at elementum nibh. Aenean lobortis dui at diam pellentesque tempus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
      })
    })
  }

  const configuration = {
    ...useContext(TurboContext),
    fetcher,
    transition: false,
    refetchOnFocus: false,
    refetchOnConnect: false,
  }

  return (
    <div class="container mx-auto">
      <div class="mb-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card footer={<p class="font-semibold">Total fetchings: {fetches()}</p>}>
          <div class="flex flex-col space-y-3">
            <h1 class="font-semibold text-xl">Request Dedupe</h1>
            <p class="text-slate-500">
              When using Turbo Solid, the query has some measures to guarantee the minimum number of
              fetchings possible. While a fetching is resolving any calls to the same query key will
              not result in an additional fetching and instead will return the same promise that's
              being resolved. If the fetching has already been completed, it will use the cache
              instead, depending on its configuration. You can learn more about the cache in the{' '}
              <Link
                href="/cached-items"
                class="underline underline-offset-2">
                cache example
              </Link>
              .
            </p>
            <p class="text-slate-500">
              Below you'll see four diferent components deeper down in the tree that will attempt to
              load the same information using the same key.
            </p>
          </div>
        </Card>
        <Card>
          <Code>{pageString}</Code>
        </Card>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TurboContext.Provider value={configuration}>
          <Post />
          <Post />
          <Post />
          <Post />
        </TurboContext.Provider>
      </div>
    </div>
  )
}

export default freshCache(Page)
