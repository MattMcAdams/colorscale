import { useState, ChangeEvent } from "react";
import { useSessionContext } from "../../data/session";
import Modal from "../../components/Modal";
import Button from "../inputs/Button";

export const LibraryConfig = () => {
  const Session = useSessionContext();
  const [isModalOpen, setModalOpen] = useState(false);
  const [libraryString, setLibraryString] = useState(
    localStorage.getItem("colorToolLibrary") || ""
  );

  const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (event.target.files) {
      fileReader.onloadend = () => {
        try {
          const data = JSON.parse(fileReader.result as string);
          console.log("data", data);
          Session.loadLibrary(fileReader.result as string);
        } catch (e) {
          console.error("Not valid JSON file!", e);
        }
      };
      fileReader.readAsText(event.target.files[0]);
    }
  };

  function rawConfigChange(e: ChangeEvent<HTMLTextAreaElement>) {
    let value = e.target.value;
    setLibraryString(value);
  }

  function applyConfig() {
    Session.loadLibrary(libraryString);
  }

  function loadConfig() {
    setLibraryString(localStorage.getItem("colorToolLibrary") || "");
  }

  return (
    <>
      <div className="gap-4 flex">
        <a
          href={`data:text/json;charset=utf-8,${encodeURIComponent(
            JSON.stringify(Session.library, null, 2)
          )}`}
          download="colorful.json"
          className="grow basis-1/3 inline-block text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-sm px-5 transform active:scale-90 transition-transform py-2.5 text-center"
        >
          Download JSON
        </a>
        <label className="grow basis-1/3 inline-block text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-sm px-5 transform active:scale-90 transition-transform py-2.5 text-center">
          Upload JSON
          <input
            className="hidden"
            type="file"
            accept=".json,application/json"
            placeholder="Upload JSON"
            onChange={onFileChange}
          />
        </label>
        <Button className="basis-1/3" onClick={() => setModalOpen(true)}>Raw JSON</Button>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        {/* <!-- Modal content --> */}
        <div className="relative">
          {/* <!-- Modal header --> */}
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900">
              Raw Library JSON
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
              onClick={() => setModalOpen(false)}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          {/* <!-- Modal body --> */}
          <div className="p-4 space-y-8">
            <textarea
              className="rounded-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5"
              id={"ConfigInput"}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              style={{ height: "35rem" }}
              value={libraryString}
              onChange={rawConfigChange}
            />
            <div className="flex space-x-2">
              <button
                className="grow text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 transform active:scale-90 transition-transform"
                onClick={applyConfig}
              >
                Apply Config
              </button>
              <button
                className="grow text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 transform active:scale-90 transition-transform"
                onClick={loadConfig}
              >
                Get Current
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default LibraryConfig;
