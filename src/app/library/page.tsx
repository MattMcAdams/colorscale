"use client";

// import dependencies
import { useRouter } from "next/navigation";
// import types
import type config from "../../types/config";
// load data
import { useSessionContext } from "../../data/session";
// load components
import ColorRow from "../../components/ColorRow";
import Button from "../../components/inputs/Button";
import { AddToGroup } from "../../components/library/AddToGroup";
import AdvColorInfoInput from "../../components/inputs/AdvColorInfoInput";
import { LibraryConfig } from "@/components/library/LibraryConfig";

const Library = () => {
  const Session = useSessionContext();
  const router = useRouter();

  function edit(config: config) {
    Session.loadConfig(JSON.stringify(config));
    router.push("/");
  }

  return (
    <>
      <main className="space-y-16 lg:p-16 md:p-8 p-4">
        {Session.providerLoaded ? (
          Session.libraryLoaded && Session.configLoaded ? (
            <div className="space-y-16 grow overflow-x-scroll">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold">Library</h1>
                <p>This is where you can organize and swap color palettes</p>
                <AdvColorInfoInput />
                <LibraryConfig />
              </div>
              <div>
                <div className="space-y-8">
                  {Session.library.groups.map((group, index) => (
                    <details
                      key={group.id || index}
                      className="space-y-8 [&_svg]:open:-rotate-180"
                      open
                    >
                      <summary className="flex cursor-pointer list-none items-center gap-4 justify-between">
                        <div className="flex gap-4 items-center">
                          <svg
                            className="rotate-0 transform text-blue-700 transition-all duration-300"
                            fill="none"
                            height="20"
                            width="20"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="4"
                            viewBox="0 0 24 24"
                          >
                            <polyline points="6 9 12 15 18 9"></polyline>
                          </svg>
                          <h2 className="text-2xl font-bold">{group.name}</h2>
                        </div>
                        <Button onClick={() => Session.deleteGroup(group.id)}>
                          Delete Group
                        </Button>
                      </summary>
                      {group.configIDs.map((id, index) => {
                        const config = Session.library.configs.find(
                          (config) => config.id === id
                        );
                        if (config) {
                          return (
                            <div key={config.id}>
                              <p>{config.name}</p>
                              <ColorRow config={config} />
                              <div className="flex gap-4">
                                <Button onClick={() => edit(config)}>
                                  Edit
                                </Button>
                                {index > 0 ? (
                                  <Button
                                    onClick={() =>
                                      Session.shiftGroup(group.id, index, index - 1)
                                    }
                                  >
                                    Move Up
                                  </Button>
                                ) : null}
                                {index + 1 < group.configIDs.length ? (
                                  <Button
                                    onClick={() =>
                                      Session.shiftGroup(group.id, index, index + 1)
                                    }
                                  >
                                    Move Down
                                  </Button>
                                ) : null}
                                <Button
                                  onClick={() =>
                                    Session.removeFromGroup(
                                      config.id as string,
                                      group.id
                                    )
                                  }
                                >
                                  Remove From Group
                                </Button>
                              </div>
                            </div>
                          );
                        } else {
                          return (
                            <div key={index}>
                              <p>Config not found</p>
                              <Button
                                onClick={() =>
                                  Session.removeFromGroup(id, group.id)
                                }
                              >
                                Remove From Group
                              </Button>
                            </div>
                          );
                        }
                      })}
                    </details>
                  ))}
                </div>
              </div>
              <div className="space-y-8">
                <h2 className="text-2xl font-bold">All Saved Palettes</h2>
                {Session.library.configs.map((config, index) => (
                  <div key={config.id || index}>
                    <p>{config.name}</p>
                    <ColorRow config={config} />
                    <div className="flex gap-4">
                      <Button onClick={() => edit(config)}>Edit</Button>
                      <AddToGroup config={config} />
                      {index > 0 ? (
                        <Button
                          onClick={() => Session.shiftLibrary(index, index - 1)}
                        >
                          Move Up
                        </Button>
                      ) : null}
                      {index + 1 < Session.library.configs.length ? (
                        <Button
                          onClick={() => Session.shiftLibrary(index, index + 1)}
                        >
                          Move Down
                        </Button>
                      ) : null}
                      <Button onClick={() => Session.deleteFromLibrary(config)}>
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
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
    </>
  );
}

export default Library;
