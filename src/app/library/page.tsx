"use client";

// load data
import { useSessionContext } from "../../data/session";
// load components
import LibraryRow from "../../components/LibraryRow";
import LibraryConfigInput from "../../components/inputs/LibraryConfiguration";

const Library = () => {
  const Session = useSessionContext();

  // const check = arr.some((e) => e.name === obj.name);

  return (
    <main className="space-y-16 lg:p-16 md:p-8 p-4">
      {Session.providerLoaded ? (
        Session.libraryLoaded && Session.configLoaded ? (
          <div className="md:flex gap-8 wrap space-y-8 md:space-y-0">
            <div className="basis-1/2 space-y-16 grow overflow-x-scroll">
              <h1>Library</h1>
              {!Session.library.some(
                (config) =>
                  JSON.stringify(config) === JSON.stringify(Session.config)
              ) ? (
                <LibraryRow config={Session.config} exists={false} />
              ) : null}
              {Session.library.map((config, index) => (
                <LibraryRow config={config} key={index} exists={true} />
              ))}
            </div>
            <div>
              <LibraryConfigInput />
            </div>
          </div>
        ) : (
          <>
            <p>Loading Library & Configuration</p>
          </>
        )
      ) : (
        <p>The context provider has failed to load</p>
      )}
    </main>
  );
}

export default Library;
