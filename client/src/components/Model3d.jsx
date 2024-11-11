import { useContext, useState } from "react";
import { Modal3dChessContext } from "../context/Model3dContext";
import { Box, Button, Flex, Heading } from "@radix-ui/themes/dist/cjs/index.js";

function Modal3dChess() {
  const { closeModal, setDuration, setSide } = useContext(Modal3dChessContext);
  const [fields, setFields] = useState({});
  const [changesMade, setChangesMade] = useState(false);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFields((prevFields) => ({
      ...prevFields,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const getRandomSide = () => (Math.random() < 0.48 ? "white" : "black");

  const validateForm = () => {
    return fields["duration"] && fields["side"];
  };

  const submituserRegistrationForm = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setChangesMade(true);
      // closeModal();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-900 bg-opacity-75  duration-300 ease-in-out">
      <div
        className="relative top-1/2 -translate-y-1/2 mx-auto p-4 shadow-md bg-gray-200 backdrop-filter backdrop-blur-sm bg-opacity-10 
"
      >
        <div align="center" role="document" className="my-10">
          <p
            id="modalTitle"
            className="font-spaceGrotesk-bold sm:text-5xl text-4xl"
          >
            3D Chess Game Settings
          </p>
          <form
            align="center"
            name="userRegistrationForm"
            onSubmit={submituserRegistrationForm}
            aria-describedby="formDescription"
          >
            <div id="formDescription" className="font-spaceGrotesk-light">
              Play with [AI] Options:
            </div>
            <fieldset className="m-4 font-spaceGrotesk-regular">
              <legend className="my-5 sm:text-3xl text-2xl font-spaceGrotesk-semibold ">
                Choose game duration
              </legend>
              <Flex justify="center" gap="3">
                <label>
                  <Button
                    size="3"
                    color="gray"
                    variant={fields.duration === 1 ? "surface" : "soft"}
                    highContrast
                    onClick={() => {
                      handleChange({
                        target: { name: "duration", value: 1 },
                      });
                      setDuration(1);
                      // setChangesMade(true);
                    }}
                  >
                    1 min
                  </Button>
                </label>

                <label>
                  <Button
                    size="3"
                    color="gray"
                    variant={fields.duration === 3 ? "surface" : "soft"}
                    highContrast
                    onClick={() => {
                      handleChange({
                        target: { name: "duration", value: 3 },
                      });
                      setDuration(3);
                      // setChangesMade(true);
                    }}
                  >
                    3 min
                  </Button>
                </label>

                <label>
                  <Button
                    size="3"
                    color="gray"
                    variant={fields.duration === 10 ? "surface" : "soft"}
                    highContrast
                    onClick={() => {
                      handleChange({
                        target: { name: "duration", value: 10 },
                      });
                      setDuration(10);
                      // setChangesMade(true);
                    }}
                  >
                    10 min
                  </Button>
                </label>

                <label>
                  <Button
                    size="3"
                    color="gray"
                    variant={fields.duration === 30 ? "surface" : "soft"}
                    highContrast
                    onClick={() => {
                      handleChange({
                        target: { name: "duration", value: 30 },
                      });
                      setDuration(30);
                      // setChangesMade(true);
                    }}
                  >
                    30 min
                  </Button>
                </label>
              </Flex>
            </fieldset>
            <fieldset className="m-4  font-spaceGrotesk-regular">
              <legend className="py-2 sm:text-3xl text-2xl font-spaceGrotesk-semibold">
                Choose your side
              </legend>
              <Flex justify="center" gap="4" className="sm:text-xl text-lg">
                <label>
                  <input
                    className="h-4 w-4 gap-1 cursor-pointer"
                    type="radio"
                    name="side"
                    value="white"
                    checked={fields.side === "white"}
                    onChange={(e) => {
                      handleChange(e);
                      setSide("white");
                    }}
                  />{" "}
                  White
                </label>
                <label>
                  <input
                    className="h-4 w-4 gap-1 cursor-pointer"
                    type="radio"
                    name="side"
                    value="black"
                    checked={fields.side === "black"}
                    onChange={(e) => {
                      handleChange(e);
                      setSide("black");
                    }}
                  />{" "}
                  Black
                </label>
                <label>
                  <input
                    className="h-4 w-4 gap-1 cursor-pointer"
                    type="radio"
                    name="side"
                    value="random"
                    checked={fields.side === "random"}
                    onChange={(e) => {
                      handleChange(e);
                      setSide(getRandomSide());
                    }}
                  />{" "}
                  Random
                </label>
              </Flex>
            </fieldset>
            <Button
              size="4"
              type="submit"
              variant="solid"
              color="gray"
              highContrast
              disabled={!validateForm()}
              onClick={(e) => {
                e.preventDefault();
                if (validateForm()) {
                  submituserRegistrationForm(e);
                  closeModal();
                }
              }}
            >
              <p className="font-spaceGrotesk-semibold "> Confirm</p>
            </Button>
          </form>
        </div>
        {/* </Box> */}
      </div>
    </div>
  );
}

export default Modal3dChess;
