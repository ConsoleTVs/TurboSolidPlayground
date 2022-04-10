import Card from '../components/card'
import { createTurboResource, TurboContext } from 'turbo-solid'
import {
  Show,
  Switch,
  Match,
  createSignal,
  Suspense,
  useContext,
  createEffect,
  createMemo,
} from 'solid-js'
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

  const [updating, setUpdating] = createSignal(false)
  async function handle(e) {
    e.preventDefault()
    mutate({ title: title(), body: body() })
    setUpdating(true)
    await new Promise((r) => setTimeout(r, 2000))
    setUpdating(false)
    refetch()
  }
  const isDisabled = createMemo(() => updating() || isRefetching())

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
            <div class="pt-3">
              <Button
                type="submit"
                classList={{ 'opacity-50': isDisabled() }}
                disabled={isDisabled()}>
                <Switch fallback="Edit post">
                  <Match when={updating()}>(fake) Updating on server...</Match>
                  <Match when={isRefetching()}>Refetching...</Match>
                </Switch>
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
  const [post, { mutate }] = createTurboResource(() => '/posts/1', options)

  function handle() {
    mutate({ title: 'foo', body: 'bar' })
  }

  return (
    <Card>
      <Suspense fallback={<div>Fetching data...</div>}>
        <Show when={post()}>
          <div>
            <h1>{post().title}</h1>
            <p>{post().body}</p>
            <button onClick={handle}>Mutate</button>
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
            <h1 class="font-semibold text-xl">Optimistic Mutation</h1>
            <p class="text-slate-500">
              When using Turbo Solid, you can manually mutate keys on demand. This mutation is often
              the result of an optimistic value being placed in the cache while certain action is
              being performed on the server. For example, you may have an edit post page where after
              the user has entered the new details for the post, you'll make a post request to your
              API to update it in your database. Before making the request, you could optimistcally
              mutate the value of the post to start reflecting the new changes before the API
              processes the data. The mutated data is automatically set to stale and any incoming
              refetch will take precedence for it.
            </p>
            <p class="text-slate-500">
              Below you'll see an edit form for a post. The post will be optimistically mutated
              after the post is saved and a fake request will be started that will invalidate the
              current post, forcing a refetch afterwards.
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
        </TurboContext.Provider>
      </div>
    </div>
  )
}

export default freshCache(Page)
