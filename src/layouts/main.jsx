import "tailwindcss/tailwind.css";
import "@fontsource/ibm-plex-sans/400.css";
import "@fontsource/ibm-plex-sans/400-italic.css";
import "@fontsource/ibm-plex-sans/500.css";
import "@fontsource/ibm-plex-sans/600.css";
import "@fontsource/ibm-plex-sans/700.css";
import github from "../assets/github.png";
import { Link, NavLink } from "solid-app-router";

const PageLink = (props) => {
  return (
    <NavLink
      href={props.href}
      end={props.end}
      class="hover:bg-slate-50 py-2 px-4 rounded-md"
      activeClass="bg-slate-50"
    >
      {props.children}
    </NavLink>
  );
};

const Layout = (props) => {
  return (
    <div class="min-h-screen flex flex-col bg-slate-50">
      <header class="py-6 bg-white border-b">
        <div class="container mx-auto">
          <div class="flex justify-between items-center">
            <div className="flex space-x-3 items-center">
              <div class="w-16 h-16 bg-black text-white flex items-center justify-center font-bold text-5xl rounded-md">
                λ
              </div>
              <div class="flex flex-col">
                <span class="text-3xl font-bold">Turbo Solid</span>
                <span class="text-sm font-medium">Examples Playground</span>
              </div>
            </div>
            <div class="flex space-x-6 items-center">
              <Link href="https://erik.cat/post/turbo-solid-lightweight-asynchronous-data-management-for-solid">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 opacity-25 hover:opacity-100 transition-opacity"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                </svg>
              </Link>
              <Link href="https://github.com/StudioLambda/TurboSolid">
                <img
                  class="h-8 opacity-25 hover:opacity-100 transition-opacity"
                  src={github}
                  alt="Github Logo"
                />
              </Link>
            </div>
          </div>
          <div class="flex space-x-1 mt-12">
            <PageLink href="/" end>
              Home
            </PageLink>
            <PageLink href="/request-dedupe">Request deduping</PageLink>
            <PageLink href="/predictable-refetch">Predictable refetch</PageLink>
            <PageLink href="/cached-items">Cached items</PageLink>
            <PageLink href="/optimistic-mutation">Optimistic mutation</PageLink>
            <PageLink href="/item-synchronization">
              Item synchronization
            </PageLink>
            <PageLink href="/signaled-refetch">Signaled Refetch</PageLink>
          </div>
        </div>
      </header>
      <main class="flex-grow my-12">{props.children}</main>
      <footer class="my-12 container mx-auto">
        Copyright &copy; {new Date().getFullYear()} &mdash; Èrik C. Forés. All
        Rights Reserved.
      </footer>
    </div>
  );
};

export default Layout;
