import { useContext, useState } from "react";
import { Modal3dChessContext } from "../context/Model3dContext";
import { Box, Button, Flex, Heading } from "@radix-ui/themes/dist/cjs/index.js";

function Modal3dChess() {
  const { closeModal, setDuration, setSide } = useContext(Modal3dChessContext);
  const [fields, setFields] = useState({});
  const [changesMade, setChangesMade] = useState(true);

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
      closeModal();
    }
  };

  return (
    <Box
      style={{ background: "var(--gray-a2)", borderRadius: "var(--radius-3)" }}
      role="dialog"
      aria-labelledby="modalTitle"
      className="p-6"
    >
      <div align="center" role="document">
        <Heading id="modalTitle" className="">
          3D Chess Game Settings
        </Heading>
        <form
          name="userRegistrationForm"
          onSubmit={submituserRegistrationForm}
          aria-describedby="formDescription"
        >
          <div id="formDescription" className="">
            Play with [AI] Options:
          </div>
          <fieldset className="m-4">
            <legend className="py-2">Choose game duration</legend>
            <Flex align="center" gap="4">
              <label>
                <Button
                  size={fields.duration === 1 ? "3" : "2"}
                  color="gray"
                  variant="outline"
                  highContrast
                  onClick={() => {
                    handleChange({
                      target: { name: "duration", value: 1 },
                    });
                    setDuration(1);
                    setChangesMade(true);
                  }}
                >
                  1 min
                </Button>
              </label>

              <label>
                <Button
                  size={fields.duration === 3 ? "3" : "2"}
                  color="gray"
                  variant="outline"
                  highContrast
                  onClick={() => {
                    handleChange({
                      target: { name: "duration", value: 3 },
                    });
                    setDuration(3);
                    setChangesMade(true);
                  }}
                >
                  3 min
                </Button>
              </label>

              <label>
                <Button
                  size={fields.duration === 10 ? "3" : "2"}
                  color="gray"
                  variant="outline"
                  highContrast
                  onClick={() => {
                    handleChange({
                      target: { name: "duration", value: 10 },
                    });
                    setChangesMade(true);
                    setDuration(10);
                  }}
                >
                  10 min
                </Button>
              </label>

              <label>
                <Button
                  size={fields.duration === 30 ? "3" : "2"}
                  color="gray"
                  variant="outline"
                  highContrast
                  onClick={() => {
                    handleChange({
                      target: { name: "duration", value: 30 },
                    });
                    setChangesMade(true);
                    setDuration(30);
                  }}
                >
                  30 min
                </Button>
              </label>
            </Flex>
          </fieldset>

          <fieldset className="m-4">
            <legend className="py-2">Choose your side</legend>
            <Flex align="center" gap="4">
              <label>
                <input
                  type="radio"
                  name="side"
                  value="white"
                  checked={fields.side === "white"}
                  onChange={(e) => {
                    handleChange(e);
                    setSide("white");
                  }}
                />
                White
              </label>
              <label>
                <input
                  type="radio"
                  name="side"
                  value="black"
                  checked={fields.side === "black"}
                  onChange={(e) => {
                    handleChange(e);
                    setSide("black");
                  }}
                />
                Black
              </label>
              <label>
                <input
                  type="radio"
                  name="side"
                  value="random"
                  checked={fields.side === "random"}
                  onChange={(e) => {
                    handleChange(e);
                    setSide(getRandomSide());
                  }}
                />
                Random
              </label>
            </Flex>
          </fieldset>

          {changesMade && (
            <Button type="submit" variant="classic" color="gray" highContrast>
              Confirm
            </Button>
          )}
        </form>
      </div>
    </Box>
  );
}

export default Modal3dChess;
