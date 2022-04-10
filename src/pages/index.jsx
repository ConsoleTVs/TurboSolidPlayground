import Card from '../components/card'

const Page = () => {
  return (
    <div class="container mx-auto">
      <div class="bg-blue-100 border-2 border-blue-800 p-6 mb-6 rounded-md">
        This is a showcase / demo page for some of the features of <code>turbo-solid</code>. There's
        more features available so please make sure to give the documentation a read if it's of your
        interest.
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <div class="flex flex-col space-y-3">
            <h1 class="font-semibold text-xl">Suspense Support</h1>
            <p class="text-slate-600">
              Using solid's resources under the hood to get Suspense support out of the box.
            </p>
          </div>
        </Card>
        <Card>
          <div class="flex flex-col space-y-3">
            <h1 class="font-semibold text-xl">Under 3KB (gzip)</h1>
            <p class="text-slate-600">
              Because bundle size matters, the total size does not go above 3KB.{' '}
              <a
                href="https://bundlephobia.com/package/turbo-solid"
                class="text-blue-800">
                Check it out
              </a>
            </p>
          </div>
        </Card>
        <Card>
          <div class="flex flex-col space-y-3">
            <h1 class="font-semibold text-xl">Additional Controls</h1>
            <p class="text-slate-600">
              Get more control with the extra signals provided and everything on{' '}
              <code>turbo-query</code>
            </p>
          </div>
        </Card>
        <Card>
          <div class="flex flex-col space-y-3">
            <h1 class="font-semibold text-xl">Request Dedupe</h1>
            <p class="text-slate-600">
              Avoid having extra fetchings to your data. Automatically handled based on item
              expiration time.
            </p>
          </div>
        </Card>
        <Card>
          <div class="flex flex-col space-y-3">
            <h1 class="font-semibold text-xl">Predictable Refetch</h1>
            <p class="text-slate-600">
              Automatically refetches the data if the user gets back to the application after having
              left it.
            </p>
          </div>
        </Card>
        <Card>
          <div class="flex flex-col space-y-3">
            <h1 class="font-semibold text-xl">Cache Items</h1>
            <p class="text-slate-600">
              Automatically make use of an internal cache to avoid extra requests when refetching.
              The cache can also expire.
            </p>
          </div>
        </Card>
        <Card>
          <div class="flex flex-col space-y-3">
            <h1 class="font-semibold text-xl">Optimistic Mutations</h1>
            <p class="text-slate-600">
              Handle optimistic updates of your items to have fresh UI while sending your data to
              the server.
            </p>
          </div>
        </Card>
        <Card>
          <div class="flex flex-col space-y-3">
            <h1 class="font-semibold text-xl">Item Synchronization</h1>
            <p class="text-slate-600">
              Automatically synchronize all your items in the page without any additional code.
            </p>
          </div>
        </Card>
        <Card>
          <div class="flex flex-col space-y-3">
            <h1 class="font-semibold text-xl">Dependent Fetching</h1>
            <p class="text-slate-600">
              Reactivity lives on the fetching as well. Make your keys depend on any other data and
              it will automatically refetch.
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Page
