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
              </div>
              <div>
                <div className="space-y-8">
                  {Session.library.groups.map((group, key) => (
                    <div key={key} className="space-y-8">
                      <div className="flex justify-between gap-8">
                        <h2 className="text-2xl font-bold">{group.name}</h2>
                        <Button onClick={() => Session.deleteGroup(group.id)}>
                          Delete Group
                        </Button>
                      </div>
                        {group.configIDs.map((id, key) => {
                          const config = Session.library.configs.find(
                            (config) => config.id === id
                          );
                          if (config) {
                            return (
                              <div key={key}>
                                <p>{config.name}</p>
                                <ColorRow config={config} />
                                <div className="flex gap-4">
                                  <Button onClick={() => edit(config)}>
                                    Edit
                                  </Button>
                                  {group.id ? (
                                    <Button
                                      onClick={() =>
                                        Session.removeFromGroup(
                                          config.id,
                                          group.id
                                        )
                                      }
                                    >
                                      Remove From Group
                                    </Button>
                                  ) : null}
                                </div>
                              </div>
                            );
                          } else {
                            return (
                              <div key={key}>
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
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-8">
                <h2 className="text-2xl font-bold">All Saved Palettes</h2>
                {Session.library.configs.map((config, key) => (
                  <div key={key}>
                    <p>{config.name}</p>
                    <ColorRow config={config} />
                    <div className="flex gap-4">
                      <Button onClick={() => edit(config)}>Edit</Button>
                      <Button onClick={() => Session.deleteFromLibrary(config)}>
                        Delete
                      </Button>
                      <AddToGroup config={config} />
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
