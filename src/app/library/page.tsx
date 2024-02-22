"use client";

// load data
import { useSessionContext } from "../../data/session";
// load components
import LibraryRow from "../../components/library/row";
import LibraryConfigInput from "../../components/inputs/LibraryConfiguration";

const Library = () => {
  const Session = useSessionContext();

  return (
    <main className="space-y-16 lg:p-16 md:p-8 p-4">
      {Session.providerLoaded ? (
        Session.libraryLoaded && Session.configLoaded ? (
          <div className="md:flex gap-8 wrap space-y-8 md:space-y-0">
            <div className="basis-1/2 space-y-16 grow overflow-x-scroll">
              <div>
                <h1 className="text-3xl font-bold">Library</h1>
                <p>This is where you can organize and swap color palettes</p>
              </div>
              {Session.library.configs.map((config, key) => (
                <LibraryRow config={config} key={key} exists={true} />
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
