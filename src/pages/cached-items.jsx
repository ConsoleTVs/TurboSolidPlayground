import Card from '../components/card'
import { createTurboResource, TurboContext } from 'turbo-solid'
import { Show, createSignal, Suspense, useContext, createMemo } from 'solid-js'
import freshCache from '../middlewares/freshCache'
import Button from '../components/button'
import Code from '../components/code'

const Post = () => {
  const [post, { refetch, isRefetching, createStale }] = createTurboResource(() => '/posts/1')
  const [isStale, staleIn] = createStale(100)
  const staleInSeconds = createMemo(() =>
    (staleIn() / 1000).toLocaleString('en', {
      useGrouping: false,
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    })
  )

  return (
    <Card>
      <Suspense fallback={<div>Fetching data...</div>}>
        <Show when={post()}>
          <div class="flex flex-col space-y-3">
            <h1 class="font-semibold text-xl">{post().title}</h1>
            <p class="text-slate-500">{post().body}</p>
            <Show
              when={!isStale()}
              fallback={
                <span class="font-bold text-red-500">
                  Data has expired and is now stale. Any refetch will require a fetch.
                </span>
              }>
              <span class="font-bold text-green-500">
                Data currently valid, any refetch will be immediate from the cache.
              </span>
              <span class="font-bold text-yellow-500">
                Will be stale in {staleInSeconds()} seconds
              </span>
            </Show>
            <div>
              <Button
                disabled={isRefetching()}
                classList={{ 'opacity-50': isRefetching() }}
                onClick={() => refetch()}>
                Refetch
              </Button>
            </div>
          </div>
        </Show>
      </Suspense>
    </Card>
  )
}

const code = `const Post = () => {
  const options = {
    transition: true,
    refetchOnFocus: false,
    refetchOnConnect: false,
    expiration: () => 5000,
  }
  const [post, { refetch, isRefetching, createStale }] = createTurboResource(
    () => '/posts/1',
    options,
  )
  const [isStale, staleIn] = createStale(100)
  const staleInSeconds = createMemo(() =>
    (staleIn() / 1000).toLocaleString('en', {
      useGrouping: false,
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    })
  )

  return (
    <Card>
      <Suspense fallback={<div>Fetching data...</div>}>
        <Show when={post()}>
          <div>
            <h1>{post().title}</h1>
            <p>{post().body}</p>
            <Show
              when={!isStale()}
              fallback={
                <span>
                  Data has expired and is now stale.
                  Any refetch will require a fetch.
                </span>
              }>
              <span>
                Data currently valid, any refetch will be
                immediate from the cache.
              </span>
              <span>
                Will be stale in {staleInSeconds()} seconds
              </span>
            </Show>
            <div>
              <Button
                disabled={isRefetching()}
                onClick={() => refetch()}>
                Refetch
              </Button>
            </div>
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
        body: `Fetched on ${new Date().toString()}`,
      })
    })
  }

  const configuration = {
    ...useContext(TurboContext),
    fetcher,
    transition: true,
    refetchOnFocus: false,
    refetchOnConnect: false,
    expiration: () => 5000,
  }

  return (
    <div class="container mx-auto">
      <div class="mb-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card footer={<p class="font-semibold">Total fetchings: {fetches()}</p>}>
          <div class="flex flex-col space-y-3">
            <h1 class="font-semibold text-xl">Cached Items</h1>
            <p class="text-slate-500">
              When using Turbo Solid, your resource keys are cached for a specified period of time.
              During this time, any forced refetchings will always return a cached version of the
              item. When the period has elapsed, the item is then considered expired and stale. Any
              forced refetchings will always return a fresh instance of the data, while new
              resources asking for the data will get a stale value and then a background fetch will
              be performed. This allows for immediate responses back to the UI while keeping the
              data up to date.
            </p>
            <p class="text-slate-500">
              Below you'll see a button to perform a refetch of the current resource. This
              refetching will be immediate if the data is valid and currently cached, while forcing
              a fetch if it's expired.
            </p>
          </div>
        </Card>
        <Card>
          <Code>{code}</Code>
        </Card>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TurboContext.Provider value={configuration}>
          <Post />
        </TurboContext.Provider>
      </div>
    </div>
  )
}

export default freshCache(Page)
