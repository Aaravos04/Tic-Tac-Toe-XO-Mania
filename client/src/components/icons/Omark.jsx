import React from "react";

const Omark = (props) => {
  return (
    <svg
      width={props.size}
      height={props.size}
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M440 256A184 184 0 1 0 72 256a184 184 0 1 0 368 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"
        fill="currentColor"
      />
    </svg>
  );
};

export default Omark;
