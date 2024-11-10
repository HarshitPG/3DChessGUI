import { Button } from "@radix-ui/themes/dist/cjs/index.js";
import React from "react";

// eslint-disable-next-line react/prop-types
const ModalGameOver = ({ gameResult, subGameResult, handleResetGame }) => {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-900 bg-opacity-75  duration-500 ease-in-out">
      <div className="relative top-1/2 -translate-y-1/2 mx-auto p-4 shadow-md bg-gray-200 backdrop-filter backdrop-blur-sm bg-opacity-10 ">
        <div align="center" role="document" className="my-8">
          <p id="modalTitle" className="font-spaceGrotesk-bold text-5xl">
            Game Over
          </p>
          <div className="font-spaceGrotesk-semibold text-3xl my-4">
            {gameResult}
          </div>
          <div className="font-spaceGrotesk-regular text-xl my-4">
            {subGameResult}
          </div>
          <Button
            size="4"
            type="submit"
            variant="solid"
            color="gray"
            highContrast
            onClick={handleResetGame}
          >
            <p className="font-spaceGrotesk-bold text-xl  "> New Match</p>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ModalGameOver;
