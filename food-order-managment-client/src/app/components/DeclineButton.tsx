import React from "react";
import Link from "next/link"; // Import the Next.js Link component
import { useParams } from "next/navigation";

const DeclineButton = ({ data, ...props }: any) => {

  let serialDa = encodeURIComponent(JSON.stringify(data));
  return (

    <button
      onClick={props.event}
      type="button"
      className="relative z-10 flex items-center justify-center gap-12 px-20 py-2 mx-auto text-lg font-semibold bg-gray-50 border-2 border-gray-50 rounded-full shadow-xl overflow-hidden group isolation-auto backdrop-blur-md lg:font-semibold before:absolute before:w-full before:aspect-square before:transition-all before:duration-700 before:rounded-full before:bg-red-400 before:-z-10 before:scale-0 before:hover:scale-150 before:hover:w-full before:-left-full before:hover:left-0 hover:text-gray-50"
    >
      Clear
      <svg
        className="w-8 h-8 p-2 border border-gray-700 rounded-full text-gray-50 rotate-45 group-hover:rotate-90 group-hover:border-none group-hover:bg-gray-50 ease-linear duration-300"
        viewBox="0 0 16 19"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
          className="fill-gray-800 group-hover:fill-gray-800"
        />
      </svg>
    </button>
  );
};

export default DeclineButton;