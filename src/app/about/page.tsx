import Link from "next/link";
import { Footer } from "../../components/Footer";

export default function About() {
  return (
    <main className="space-y-16 lg:p-16 md:p-8 p-4">
      <nav>
        <Link href="/" className="hover:underline">
          Editor
        </Link>{" "}
        &middot;{" "}
        <Link href="/library" className="hover:underline">
          Library
        </Link>{" "}
        &middot; <span>About</span>
      </nav>
      <div className="space-y-8 w-full max-w-3xl">
        <h1 className="text-3xl font-bold">About this project</h1>
        <Footer />
        <p>
          This tool was born from the need to generate color scales based on a
          key color. There are multiple tools similar to this one but none of
          them fit my exact needs. Namely, this app is heavily inspired by{" "}
          <a
            href="https://hihayk.github.io/scale/"
            target="_blank"
            className="text-blue-700 hover:underline"
          >
            hihayk&apos;s color scale tool
          </a>{" "}
          and{" "}
          <a
            href="https://colorcolor.in/"
            target="_blank"
            className="text-blue-700 hover:underline"
          >
            Color x Color
          </a>
          . This project would not have been possible without them.
        </p>
        <h2 className="text-2xl font-bold">Data Management</h2>
        <p>
          I believe that data should be owned by the user, so I don&apos;t plan
          to add something like accounts to store data on a server. This app
          makes use of{" "}
          <a
            className="text-blue-700 hover:underline"
            href="https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage"
            target="_blank"
          >
            Browser Local Storage
          </a>
          . This is simi persistant data storage in the browser. Your data will
          not persist across browsers or devices, and can be accidentally
          deleted by clearing certain browser data. I am however looking into{" "}
          <a
            href="https://remotestorage.io/"
            target="_blank"
            className="text-blue-700 hover:underline"
          >
            RemoteStorage
          </a>
          .
        </p>
        <h2 className="text-2xl font-bold">Privacy</h2>
        <p>
          This app collects no data in itself, but I do use{" "}
          <a
            href="https://plausible.io/"
            target="_blank"
            className="text-blue-700 hover:underline"
          >
            Plausible Analytics
          </a>{" "}
          to gauge interest in this project.
        </p>
        <h2 className="text-2xl font-bold">Colophon</h2>
        <p>
          This site is made with{" "}
          <a
            href="https://nextjs.org/"
            target="_blank"
            className="text-blue-700 hover:underline"
          >
            NextJS
          </a>
          . Color manipulation is handled by{" "}
          <a
            href="https://www.npmjs.com/package/color"
            target="_blank"
            className="text-blue-700 hover:underline"
          >
            Color
          </a>
          , and the easing functions are imported from{" "}
          <a
            href="https://www.npmjs.com/package/js-easing-functions"
            target="_blank"
            className="text-blue-700 hover:underline"
          >
            js-easing-functions
          </a>
          .
        </p>
      </div>
    </main>
  );
}
