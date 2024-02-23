// Import dependencies
import { useState } from "react";
// Import data
import { useSessionContext } from "../../data/session";
// Import types
import type config from "../../types/config";
// Import components
import Modal from "../../components/Modal";
import Button from "../../components/inputs/Button";
import Label from "../inputs/Label";
import TextInput from "../inputs/TextInput";

export const AddToGroup = (props: { config: config }) => {
  const Session = useSessionContext();

  let defaultGroup = "";
  if (Session.library.groups.length > 0) {
    defaultGroup = Session.library.groups[0].id;
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(defaultGroup);
  const [newGroupName, setNewGroupName] = useState("");

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  function groupChangeHandler(e: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedGroup(e.target.value);
  }

  function createGroup() {
    if (newGroupName !== "") {
      Session.createGroup(newGroupName);
      if (Session.library.groups.length > 0) {
        setSelectedGroup(Session.library.groups[Session.library.groups.length - 1].id);
      }
      setNewGroupName("");
    }
  }

  function save() {
    Session.addToGroup(props.config.id ? props.config.id : "", selectedGroup);
    closeModal();
  }

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {/* <!-- Modal content --> */}
        <div className="relative">
          {/* <!-- Modal header --> */}
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900">
              Add to Group
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
              onClick={closeModal}
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
            <div>
              <Label htmlFor="GroupInput">Group</Label>
              <select
                name="Group"
                id="GroupInput"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                value={selectedGroup}
                onChange={groupChangeHandler}
              >
                {Session.library.groups.map((group, key) => (
                  <option key={key} value={group.id}>
                    {group.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <TextInput
                name="NewGroup"
                label="Create new group"
                value={newGroupName}
                changeHandler={(e) => setNewGroupName(e.target.value)}
                button={<Button onClick={createGroup} className="rounded-s-none">Create</Button>}
              />
            </div>
            {selectedGroup !== "" ? (
              <Button onClick={save}>
                Save
              </Button>
            ) : null}
          </div>
        </div>
      </Modal>
      <Button onClick={openModal}>Add to Group</Button>
    </>
  );
};
