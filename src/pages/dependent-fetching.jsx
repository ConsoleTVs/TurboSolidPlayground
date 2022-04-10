import Card from '../components/card'
import { createTurboResource, TurboContext } from 'turbo-solid'
import { Show, createSignal, Suspense, useContext, createContext, createEffect } from 'solid-js'
import freshCache from '../middlewares/freshCache'
import Code from '../components/code'
import Button from '../components/button'

const ActivePost = createContext([() => {}, () => {}])

const EditPost = () => {
  const [id, setId] = useContext(ActivePost, [() => {}, () => {}])
  const [local, setLocal] = createSignal(id())

  createEffect(() => {
    setLocal(id())
  })

  function handle(e) {
    e.preventDefault()
    setId(local())
  }

  return (
    <Card>
      <Suspense fallback={<div>Fetching data...</div>}>
        <form
          class="flex flex-col space-y-3"
          onSubmit={handle}>
          <label class="flex flex-col">
            <span class="mb-1">Post ID</span>
            <input
              value={local()}
              onChange={(e) => {
                const parsed = parseInt(e.currentTarget.value)
                if (parsed > 0 && parsed <= 50) setLocal(parsed)
              }}
              type="number"
              min="1"
              max="50"
              class="border rounded-lg px-4 py-1"
              placeholder="Post ID"
            />
          </label>
          <div>
            <Button type="submit">Update post ID</Button>
          </div>
        </form>
      </Suspense>
    </Card>
  )
}

const Post = () => {
  const [id] = useContext(ActivePost)
  const [post] = createTurboResource(() => `/posts/${id()}`)

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
  const [id] = useContext(ActivePost)
  const [post] = createTurboResource(() => '/posts/' + id(), options)

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
  const [id, setId] = createSignal(1)

  function fetcher(key, { signal }) {
    return new Promise(async function (resolve, reject) {
      signal.addEventListener('abort', () => {
        reject(new Error('aborted'))
      })
      await new Promise((r) => setTimeout(r, 1000))
      setFetches((f) => f + 1)
      resolve({
        title: `Post title for ${key}`,
        body: `This is the body of the post with the key ${key}.`,
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
            <h1 class="font-semibold text-xl">Dependent Fetching</h1>
            <p class="text-slate-500">
              When using Turbo Solid, your resource keys can dynamically depend on other reactive
              signals. When any of the signals change, a refetching will be triggered to the new
              resolved key. If that key resolved to falsy (undefined, false, or throws) it won't
              fetch.
            </p>
            <p class="text-slate-500">
              Below you'll see an input to change the post ID to fetch. It is very minimal and will
              just change a few text but the idea is that the refetching should happen
              automatically.
            </p>
          </div>
        </Card>
        <Card>
          <Code>{postCode}</Code>
        </Card>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TurboContext.Provider value={configuration}>
          <ActivePost.Provider value={[id, setId]}>
            <EditPost />
            <Post />
          </ActivePost.Provider>
        </TurboContext.Provider>
      </div>
    </div>
  )
}

export default freshCache(Page)
