"use client";

const CopyColorsButton = (props: {colors: string[]}) => {

  function copyToClipboard(whatever: string) {
    navigator.clipboard.writeText(whatever);
  }

  return (
    <button
      className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-sm px-5 me-2 mb-2 transform active:scale-90 transition-transform py-4"
      onClick={() => copyToClipboard(props.colors.join(", "))}
    >
      Copy All Colors
    </button>
  );
};

export default CopyColorsButton;
