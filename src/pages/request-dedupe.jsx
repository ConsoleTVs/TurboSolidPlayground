import Card from "../components/card";
import Button from "../components/button";
import { createTurboResource, TurboContext } from "turbo-solid";
import { createEffect, createSignal, useContext } from "solid-js";

const Post = () => {
  const [post] = createTurboResource(() => "/posts/1");

  return (
    <Card>
      <Show when={post()}>
        {(post) => (
          <div className="flex flex-col space-y-3">
            <h1 class="font-semibold text-xl">{post.title}</h1>
            <p class="text-slate-600">{post.body}</p>
            <div>
              <Button>Refetch</Button>
            </div>
          </div>
        )}
      </Show>
    </Card>
  );
};

const Page = () => {
  const configuration = useContext(TurboContext);
  const [fetches, setFetches] = createSignal(0);

  async function fetcher(key, { signal }) {
    await new Promise((r) => setTimeout(r, 1000));
    setFetches((f) => f + 1);
    console.log("Should have updated...");
    const base = "https://jsonplaceholder.typicode.com";
    const response = await fetch(base + key, { signal });
    return response.json();
  }

  createEffect(() => console.log(fetches()));

  return (
    <div class="container mx-auto">
      <div className="mb-12">
        <Card>Total fetchings: {fetches()}</Card>
      </div>
      <div className="grid grid-cols-2 gap-12">
        <TurboContext.Provider value={{ ...configuration, fetcher }}>
          <Post />
          <Post />
          <Post />
          <Post />
        </TurboContext.Provider>
      </div>
    </div>
  );
};

export default Page;
