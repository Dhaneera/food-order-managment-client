import { useState } from "react";

const ConfirmationModal = (props:any) => {


  return (
    <div className="relative">
        <div className="w-screen absolute z-10 h-screen backdrop-blur-md bg-white/75 flex items-center justify-center ">
          <div
            id="default-modal"
            tabIndex={-1}
            className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full"
          >
            <div className="relative p-4 w-full max-w-2xl motion-preset-fade motion-duration-1000">
              {/* Modal Content */}
              <div className="relative bg-white rounded-lg shadow ">
                {/* Header */}
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
                  <h3 className="text-xl font-semibold text-gray-900 ">
                    Change status 
                  </h3>
                  <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "onClick={()=>props.setVisible(false)}
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

                {/* Body */}
                <div className="p-4 md:p-5 space-y-4 flex flex-col gap-5">
                  <p className="text-base leading-relaxed text-black font-bold">
                    This action will make sure this user can order food without paying any amount
                  </p>
                  <p className="text-base leading-relaxed text-gray-500 ">
                   Are you sure about this action This action is irriversable and a one time action only if clicked in case of an accident please close this modal. If you want to undo the change click on the delete icon and register he user again
                  </p>
                  <button className='bg-red-500 border-2 border-white text-white px-8 py-2 rounded-lg hover:bg-red-600'onClick={props.clickEvent}>Confirm This Action</button>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default ConfirmationModal;
