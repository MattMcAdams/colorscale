import { useState, ChangeEvent } from "react";
import { useSessionContext } from "../../data/session";
import Button from "../inputs/Button";

export const LibraryConfig = () => {
  const Session = useSessionContext();
  const [data, setData] = useState(Session.library);

  const readFileOnUpload = (uploadedFile: Blob) => {
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      try {
        const data = JSON.parse(fileReader.result as string);
        console.log('data', data);
        Session.loadLibrary(fileReader.result as string);
      } catch (e) {
        console.error("Not valid JSON file!", e);
      }
    };
    if (uploadedFile !== undefined) fileReader.readAsText(uploadedFile);
  };

  const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      readFileOnUpload(event.target.files[0]);
    }
  };

  return (
    <div className="gap-4 flex w-80">
      <a
        href={`data:text/json;charset=utf-8,${encodeURIComponent(
          JSON.stringify(Session.library, null, 2)
        )}`}
        download="colorful.json"
        className="grow basis-1/2 inline-block text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-sm px-5 transform active:scale-90 transition-transform py-2.5"
      >
        Download JSON
      </a>
      <label className="grow basis-1/2 inline-block text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-sm px-5 transform active:scale-90 transition-transform py-2.5">
        Upload JSON
        <input
          className="hidden"
          type="file"
          accept=".json,application/json"
          placeholder="Upload JSON"
          onChange={onChange}
        />
      </label>
    </div>
  );
}

export default LibraryConfig;
