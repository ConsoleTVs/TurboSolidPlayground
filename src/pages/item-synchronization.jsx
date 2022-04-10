import Card from '../components/card'
import { createTurboResource, TurboContext } from 'turbo-solid'
import { Show, createSignal, Suspense, useContext, createEffect } from 'solid-js'
import freshCache from '../middlewares/freshCache'
import Button from '../components/button'
import Code from '../components/code'

const EditPost = () => {
  const [post, { isRefetching, refetch, mutate }] = createTurboResource(() => '/posts/1')
  const [title, setTitle] = createSignal('')
  const [body, setBody] = createSignal('')

  createEffect(() => {
    const resolvedPost = post()
    if (resolvedPost) {
      setTitle(resolvedPost.title)
      setBody(resolvedPost.body)
    }
  })

  function handle(e) {
    e.preventDefault()
    mutate({ title: title(), body: body() })
  }

  return (
    <Card>
      <Suspense fallback={<div>Fetching data...</div>}>
        <Show when={post()}>
          <form
            class="flex flex-col space-y-3"
            onSubmit={handle}>
            <input
              value={title()}
              onInput={(e) => setTitle(e.currentTarget.value)}
              type="text"
              class="border rounded-lg px-4 py-1"
              placeholder="Post title"
            />
            <input
              value={body()}
              onInput={(e) => setBody(e.currentTarget.value)}
              type="text"
              class="border rounded-lg px-4 py-1"
              placeholder="Post body"
            />
            <div class="pt-3 flex space-x-3">
              <Button
                type="submit"
                disabled={isRefetching()}
                classList={{ 'opacity-50': isRefetching() }}>
                Edit Post
              </Button>
              <Button
                onClick={() => refetch()}
                disabled={isRefetching()}
                classList={{ 'opacity-50': isRefetching() }}>
                Refetch
              </Button>
            </div>
          </form>
        </Show>
      </Suspense>
    </Card>
  )
}

const Post = () => {
  const [post] = createTurboResource(() => '/posts/1')

  return (
    <Card>
      <Suspense fallback={<div>Fetching data...</div>}>
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

const postCode = `const Post = () => {
  const options = {
    transition: true,
    refetchOnFocus: false,
    refetchOnConnect: false,
  }
  // Automatically updates when refetched or mutated
  // from a diferent part of your code.
  const [post] = createTurboResource(() => '/posts/1')

  return (
    <Card>
      <Suspense fallback={<div>Fetching data...</div>}>
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
    transition: true,
    refetchOnFocus: false,
    refetchOnConnect: false,
  }

  return (
    <div class="container mx-auto">
      <div class="mb-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card footer={<p class="font-semibold">Total fetchings: {fetches()}</p>}>
          <div class="flex flex-col space-y-3">
            <h1 class="font-semibold text-xl">Item Synchronization</h1>
            <p class="text-slate-500">
              When using Turbo Solid, all the same keys will be synchronized and therefore all of
              them will react to changes, either by refretches or mutations.
            </p>
            <p class="text-slate-500">
              Below you'll see an edit form for a post and a refetch button. When mutating or
              refetching the post, all the posts shown should update.
            </p>
          </div>
        </Card>
        <Card>
          <Code>{postCode}</Code>
        </Card>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TurboContext.Provider value={configuration}>
          <EditPost />
          <Post />
          <Post />
          <Post />
        </TurboContext.Provider>
      </div>
    </div>
  )
}

export default freshCache(Page)
