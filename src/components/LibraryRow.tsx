"use client";
import ColorRow from "./ColorRow";
import config from "../types/configObj";
import { useSessionContext } from "../data/session";
import { useRouter } from "next/navigation";
import LibraryConfigInput from "./inputs/LibraryConfiguration";

const LibraryRow = (props: { config: config, exists: boolean }) => {
  const Session = useSessionContext();
  const router = useRouter();

  function handleEdit() {
    Session.loadConfig(JSON.stringify(props.config));
    router.push("/");
  }

  return (
    <div id="LibraryRow">
        <ColorRow config={props.config} />
        <div className="flex gap-4">
          {props.exists ? (
            <button
              className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-sm px-5 transform active:scale-90 transition-transform py-2.5"
              onClick={() => Session.deleteFromLibrary(props.config)}
            >
              Delete
            </button>
          ) : (
            <button
              className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-sm px-5 transform active:scale-90 transition-transform py-2.5"
              onClick={() => Session.saveToLibrary(props.config)}
            >
              Save
            </button>
          )}
          <button
            className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-sm px-5 transform active:scale-90 transition-transform py-2.5"
            onClick={handleEdit}
          >
            Edit
          </button>
        </div>
      </div>
  );
};

export default LibraryRow;
