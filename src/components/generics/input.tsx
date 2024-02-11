"use client";

const NumberInput = (props: {name: string, label: string, value: number, changeHandler: () => void}) => {

  return (
    <div id={props.name + "InputField"} className="space-y-2">
      <label
        htmlFor={props.name + "Input"}
        className="block mb-2 text-sm font-bold text-gray-900 font-mono"
      >
        {props.label}
      </label>
      <input
        className="rounded-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5"
        type="number"
        max="10"
        min="0"
        id={props.name + "Input"}
        value={props.value}
        onChange={props.changeHandler}
      />
    </div>
  );
};

export default NumberInput;
