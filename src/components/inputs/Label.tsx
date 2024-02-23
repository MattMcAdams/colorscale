import React from "react";

export const Label = (props: {
  htmlFor: string;
  children: React.ReactNode;
}) => {
  return (
    <label
      htmlFor={props.htmlFor}
      className="block mb-2 text-sm font-bold text-gray-900 font-mono"
    >
      {props.children}
    </label>
  );
};
export default Label;
