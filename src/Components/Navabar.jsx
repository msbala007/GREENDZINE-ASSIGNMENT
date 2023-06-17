import React from "react";
import { Link } from "react-router-dom";

const Navabar = () => {
  return (
    <>
      <header className="top-0 sticky z-50 bg-gray-100 flex justify-end items-center h-12">
        <div className="flex justify-center items-center h-12 xl:mr-52 sm:mr-6 space-x-8 ">
          <Link to="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
              />
            </svg>
          </Link>
          <div>
            <img
              src="data:image/jpeg;base64,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"
              className="w-10 h-10 rounded-full object-cover"
            />
          </div>
          <div className="space-x-6">
            <button
              id="dropdownDefaultButton"
              data-dropdown-toggle="dropdown"
              class=" font-medium rounded-lg text-sm mr-6 text-center inline-flex items-center"
              type="button"
            >
              irfan
              <svg
                class="w-4 h-4 ml-2"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>

            <div
              id="dropdown"
              class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
            />
          </div>
        </div>
      </header>
    </>
  );
};

export default Navabar;
