import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";

const UserInfo = () => {
  const { me } = useSelector((state) => state.user);
  const [traceMenu, setTraceMenu] = useState("Tracers");

  const onLoadTracers = useCallback(() => {
    setTraceMenu("Tracers");
  });
  const onLoadTracings = useCallback(() => {
    setTraceMenu("Tracings");
  });

  return (
    <>
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-gray-900 text-left px-6 pb-1">
          {traceMenu}
        </h3>
        <div className="flex px-6">
          <button
            onClick={onLoadTracers}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-1 text-sm rounded-l"
          >
            Tracers
          </button>
          <button
            onClick={onLoadTracings}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-1 text-sm rounded-r"
          >
            Tracings
          </button>
        </div>
      </div>
      <div className="overflow-auto mt-5 w-full h-64 flex flex-col text-sm">
        {traceMenu === "Tracers"
          ? me?.Tracers.map((tracer) => (
              <div
                key={tracer.id}
                className="relative h-14 flex py-2 px-4 items-center border-t border-gray-100 text-gray-600  w-full hover:bg-gray-100 transition duration-150 "
              >
                <div className=" w-12 h-full p-1 flex justify-center items-center">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                    alt="tracer avatar"
                    className="rounded-full w-6 h-6 shadow-md"
                  />
                </div>
                <div className="flex justify-between items-center py-1 pl-2 pr-4 w-full h-full break-all overflow-hidden ">
                  {tracer.username}
                  <div className="flex items-center justify-between">
                    <span className="ml-3 text-gray-500 text-xs hidden sm:inline">
                      Added at 1999.99.99
                    </span>
                    <button className="focus:outline-none ml-3 text-white bg-red-700 hover:bg-red-800 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          : me?.Tracings.map((tracing) => (
              <div
                key={tracing.id}
                className="relative h-14 flex py-2 px-4 items-center border-t border-gray-100 text-gray-600  w-full hover:bg-gray-100 transition duration-150 "
              >
                <div className=" w-12 h-full p-1 flex justify-center items-center">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                    alt="tracing avatar"
                    className="rounded-full w-6 h-6 shadow-md"
                  />
                </div>
                <div className="flex justify-between items-center py-1 pl-2 pr-4 w-full h-full break-all overflow-hidden ">
                  {tracing.username}
                  <div className="flex items-center justify-between">
                    <span className="ml-3 text-gray-500 text-xs hidden sm:inline">
                      Added at 1999.99.99
                    </span>
                    <button className="focus:outline-none ml-3 text-white bg-red-700 hover:bg-red-800 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </>
  );
};

export default UserInfo;
