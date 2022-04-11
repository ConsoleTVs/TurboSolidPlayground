/* @refresh reload */
import { lazy } from 'solid-js'
import { render } from 'solid-js/web'
import { Router, Routes, Route, Suspense } from 'solid-app-router'
import { TurboContext } from 'turbo-solid'
import Layout from './layouts/main'

const Index = lazy(() => import('./pages/index'))
const RequestDedupe = lazy(() => import('./pages/request-dedupe'))
const PredictableRefetch = lazy(() => import('./pages/predictable-refetch'))
const OptimisticMutation = lazy(() => import('./pages/optimistic-mutation'))
const ItemSynchronization = lazy(() => import('./pages/item-synchronization'))
const DependentFetching = lazy(() => import('./pages/dependent-fetching'))
const CachedItems = lazy(() => import('./pages/cached-items'))

const App = () => {
  const configuration = {}
  return (
    <TurboContext.Provider value={configuration}>
      <Router>
        <Layout>
          <Suspense>
            <Routes>
              <Route
                path="/"
                element={<Index />}
              />
              <Route
                path="/request-dedupe"
                element={<RequestDedupe />}
              />
              <Route
                path="/predictable-refetch"
                element={<PredictableRefetch />}
              />
              <Route
                path="/optimistic-mutation"
                element={<OptimisticMutation />}
              />
              <Route
                path="/item-synchronization"
                element={<ItemSynchronization />}
              />
              <Route
                path="/dependent-fetching"
                element={<DependentFetching />}
              />
              <Route
                path="/cached-items"
                element={<CachedItems />}
              />
              <Route
                path="*all"
                element={<div>Not Found</div>}
              />
            </Routes>
          </Suspense>
        </Layout>
      </Router>
    </TurboContext.Provider>
  )
}

render(() => <App />, document.getElementById('root'))
