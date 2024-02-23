import React from 'react';

export const Button = (props: {
  onClick: () => any;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <button
      className={
        "text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-sm px-5 transform active:scale-90 transition-transform py-2.5 " +
        props.className
      }
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};
export default Button;
