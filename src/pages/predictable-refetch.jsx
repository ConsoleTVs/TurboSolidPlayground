import Card from '../components/card'
import { createTurboResource, TurboContext } from 'turbo-solid'
import { Show, createSignal, Suspense, useContext, createMemo, Switch } from 'solid-js'
import freshCache from '../middlewares/freshCache'
import Code from '../components/code'

const Data = () => {
  const [data, { isRefetching, createFocusAvailable }] = createTurboResource(() => '/timed-data')
  const [isAvailable, availableIn] = createFocusAvailable(100)
  const availableInSeconds = createMemo(() =>
    (availableIn() / 1000).toLocaleString('en', {
      useGrouping: false,
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    })
  )

  return (
    <Card>
      <Suspense fallback={<div>Fetching data...</div>}>
        <Show when={data()}>
          <div class="flex flex-col space-y-3">
            <h1 class="font-semibold text-xl">Random number: {data().number}</h1>
            <p class="text-slate-500">Fetched on {data().date.toString()}</p>
            <Switch>
              <Match when={isRefetching()}>
                <p class="font-semibold">Refetching...</p>
              </Match>
              <Match when={!isAvailable()}>
                <p class="font-semibold">
                  <span>Focus refetching available in:</span>{' '}
                  <span class="text-red-500">{availableInSeconds()} seconds</span>
                </p>
              </Match>
              <Match when={isAvailable()}>
                <p class="font-semibold">
                  <span>Focus refetching available in:</span>{' '}
                  <span class="text-green-500">Available, try re-focusing this page</span>
                </p>
              </Match>
            </Switch>
          </div>
        </Show>
      </Suspense>
    </Card>
  )
}

const code = `const Data = () => {
  const options = {
    transition: true,
    refetchOnFocus: true,
    refetchOnConnect: true,
    focusInterval: 5000,
  }
  const [data, { isRefetching, createFocusAvailable }] = createTurboResource(
    () => '/timed-data',
    options,
  )
  const [isAvailable, availableIn] = createFocusAvailable(100)
  const availableInSeconds = createMemo(() =>
    (availableIn() / 1000).toLocaleString('en', {
      useGrouping: false,
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    })
  )

  return (
    <Card>
      <Suspense fallback={<div>Fetching data...</div>}>
        <Show when={data()}>
          <div>
            <h1>Random number: {data().number}</h1>
            <p>Fetched on {data().date.toString()}</p>
            <Switch>
              <Match when={isRefetching()}>
                <p>Refetching...</p>
              </Match>
              <Match when={!isAvailable()}>
                <p>
                  <span>Focus refetching available in:</span>{' '}
                  <span>{availableInSeconds()} seconds</span>
                </p>
              </Match>
              <Match when={isAvailable()}>
                <p>
                  <span>Focus refetching available in:</span>{' '}
                  <span>Available, try re-focusing this page</span>
                </p>
              </Match>
            </Switch>
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
        number: Math.floor(Math.random() * 1000),
        date: new Date(),
      })
    })
  }

  const configuration = {
    ...useContext(TurboContext),
    fetcher,
    transition: true,
    refetchOnFocus: true,
    refetchOnConnect: true,
    focusInterval: 5000,
  }

  return (
    <div class="container mx-auto">
      <div class="mb-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card footer={<p class="font-semibold">Total fetchings: {fetches()}</p>}>
          <div class="flex flex-col space-y-3">
            <h1 class="font-semibold text-xl">Predictable Refetch</h1>
            <p class="text-slate-500">
              When using Turbo Solid, you automatically get predictable refetching by default upon
              focus change and on network reconnect. Those features allow getting fresh data when
              the user enters back to the application.
            </p>
            <p class="text-slate-500">
              Below you'll see a component that loads data in. This data contains a random number an
              a datetime of when it was obtained. Try losing focus and re-gaining focus of this tab
              or the browser when the configured threshold is met.
            </p>
          </div>
        </Card>
        <Card>
          <Code>{code}</Code>
        </Card>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TurboContext.Provider value={configuration}>
          <Data />
        </TurboContext.Provider>
      </div>
    </div>
  )
}

export default freshCache(Page)
