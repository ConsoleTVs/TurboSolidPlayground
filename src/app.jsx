/* @refresh reload */
import { lazy } from "solid-js";
import { render } from "solid-js/web";
import { Router, Routes, Route } from "solid-app-router";
import { TurboContext } from "turbo-solid";
import Layout from "./layouts/main";

const Index = lazy(() => import("./pages/index"));
const RequestDedupe = lazy(() => import("./pages/request-dedupe"));

const App = () => {
  const configuration = {};
  return (
    <TurboContext.Provider value={configuration}>
      <Router>
        <Layout>
          <Suspense>
            <Routes>
              <Route path="/" element={Index} />
              <Route path="/request-dedupe" element={RequestDedupe} />
              <Route path="*all" element={<div>Not Found</div>} />
            </Routes>
          </Suspense>
        </Layout>
      </Router>
    </TurboContext.Provider>
  );
};

render(() => <App />, document.getElementById("root"));
