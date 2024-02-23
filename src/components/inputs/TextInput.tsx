import { ChangeEvent, ReactNode } from "react";
import Label from "./Label";

export const TextInput = (props: {
  name: string;
  label: string;
  value: string;
  changeHandler: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void;
  area?: boolean;
  className?: string;
  button?: ReactNode;
}) => {
  return (
    <div id={props.name + "InputField"} className="space-y-2">
      <Label htmlFor={props.name + "Input"}>{props.label}</Label>
      {props.area ? (
        <textarea
          className={
            "rounded-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 " +
            props.className
          }
          id={"ConfigInput"}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          style={{ height: "27.5rem" }}
          value={props.value}
          onChange={props.changeHandler}
        />
      ) : props.button ? (
        <div className="flex">
          <input
            id={props.name + "Input"}
            className={
              "rounded-s-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 " +
              props.className
            }
            value={props.value}
            onChange={props.changeHandler}
          />
          {props.button}
        </div>
      ) : (
        <input
          id={props.name + "Input"}
          className={
            "rounded-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 " +
            props.className
          }
          value={props.value}
          onChange={props.changeHandler}
        />
      )}
    </div>
  );
};
export default TextInput;
