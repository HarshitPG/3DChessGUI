import { useState } from "react";
import { chess } from "../context/GameContext.jsx";

const PgnTable = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const pgnValues = chess.history({ verbose: true });
  const moveTos = pgnValues.map((move) => move.san);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const moveTosContainerlg = document.getElementById("moveTosContainerlg");

  if (moveTosContainerlg) {
    moveTosContainerlg.innerHTML = "";
    moveTos.forEach((move, index) => {
      if (index % 2 === 0) {
        const div = document.createElement("div");
        div.className =
          "grid grid-cols-3 gap-4 p-4 cursor-pointer bg-gray-700 ";
        div.innerHTML = `<div className=" grid grid-flow-row  ">${
          index / 2 + 1
        }  </div><div className=" justify-center  "> ${move}</div>`;
        moveTosContainerlg.appendChild(div);
        // div.classList.add("move-container");
      } else {
        const previousDiv = moveTosContainerlg.lastChild;
        if (previousDiv) {
          previousDiv.innerHTML += `<div className=" w justify-center ">  ${move}</div>`;
        }
      }
    });
  }

  return (
    <>
      {/* <button className="fixed z-40 top-4 left-4 p-2 bg-gray-800 text-white rounded-full">
        Toggle PGN Table
      </button> */}

      <div
        onClick={toggleDrawer}
        id="drawer-swipe"
        className={`fixed z-40 lg:max-w-[15%] lg:min-w-[15%]  md:max-w-[25%] md:min-w-[25%] max-h-[25%] overflow-y-auto shadow-md  bg-gray-900 bg-opacity-50  backdrop-filter backdrop-blur-sm transition-transform bottom-14 right-0 scrollbar-none ${
          isDrawerOpen ? "translate-y-14" : "translate-y-full"
        }`}
        tabIndex="-1"
        aria-labelledby="drawer-swipe-label"
      >
        <div
          className="pt-6  lg:pl-[25%]  md:pl-[20%] font-spaceGrotesk-bold cursor-pointer "
          data-drawer-toggle="drawer-swipe"
        >
          <span
            className="absolute w-8 h-1 -translate-x-1/2 bg-gray-300 rounded-lg top-3 left-1/2  "
            onClick={toggleDrawer}
          ></span>
          <h5
            id="drawer-swipe-label"
            className="inline-flex items-center text-base text-white-500 font-medium"
          >
            <svg
              className="w-4 h-4 me-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 18"
            ></svg>
            PGN Table
          </h5>
        </div>
        <div className="grid grid-rows-3 gap-4 p-4 lg:grid-rows-4 overflow-y-scroll scrollbar-none font-spaceGrotesk-semibold ">
          <div id="moveTosContainerlg" className="grid grid-cols-1 gap-4"></div>
        </div>
      </div>
    </>
  );
};

export default PgnTable;
