import { Text } from "@react-three/drei";
import {
  useEffect,
  useState,
  useRef,
  useContext,
  useLayoutEffect,
} from "react";
import { Modal3dChessContext } from "../context/Model3dContext";

export const Clock = () => {
  const {
    showModal,
    side,
    duration,
    playerMovedRef,
    aiMovedRef,
    reset,
    pause,
  } = useContext(Modal3dChessContext);

  console.log("dur(2)", duration);

  const [isPausedAi, setIsPausedAi] = useState(true);
  const [isPausedPlayer, setIsPausedPlayer] = useState(true);

  const [secondsLeftAi, setSecondsLeftAi] = useState("0");
  const [secondsLeftPlayer, setSecondsLeftPlayer] = useState("0");

  const secondsLeftAiRef = useRef(secondsLeftAi);
  const secondsLeftPlayerRef = useRef(secondsLeftPlayer);

  const isPausedAiRef = useRef(isPausedAi);
  const isPausedPlayerRef = useRef(isPausedPlayer);

  useEffect(() => {
    secondsLeftAiRef.current = duration * 60;
    setSecondsLeftAi(secondsLeftAiRef.current);
    secondsLeftPlayerRef.current = duration * 60;
    setSecondsLeftPlayer(secondsLeftPlayerRef.current);
  }, [showModal, reset, duration]);

  function clockPlayer() {
    secondsLeftPlayerRef.current--;
    setSecondsLeftPlayer(secondsLeftPlayerRef.current);
  }

  function clockAi() {
    secondsLeftAiRef.current--;
    setSecondsLeftAi(secondsLeftAiRef.current);
  }

  //   useEffect(() => {
  //     if (showModal === false) {
  //       setIsPausedAi(false);
  //       isPausedAiRef.current = false;

  //       setIsPausedPlayer(false);
  //       isPausedPlayerRef.current = false;
  //     }
  //   }, [showModal]);
  useLayoutEffect(() => {
    if (showModal === false && side === "black") {
      setIsPausedAi(false);
      isPausedAiRef.current = false;

      setIsPausedPlayer(true);
      isPausedPlayerRef.current = true;
    }
  }, [aiMovedRef.current, playerMovedRef.current, showModal, reset]);

  useEffect(() => {
    if (
      showModal === false &&
      aiMovedRef.current === false &&
      playerMovedRef.current === true
    ) {
      setIsPausedAi(false);
      isPausedAiRef.current = false;

      setIsPausedPlayer(true);
      isPausedPlayerRef.current = true;
    }
  }, [aiMovedRef.current, playerMovedRef.current, showModal, reset]);

  useEffect(() => {
    if (
      showModal === false &&
      aiMovedRef.current === true &&
      playerMovedRef.current === false
    ) {
      setIsPausedAi(true);
      isPausedAiRef.current = true;

      setIsPausedPlayer(false);
      isPausedPlayerRef.current = false;
    }
  }, [aiMovedRef.current, playerMovedRef.current, showModal]);

  useEffect(() => {
    const intervalAi = setInterval(() => {
      if (isPausedAiRef.current) {
        return;
      }
      if (secondsLeftAiRef.current == 0) {
        return;
      }
      clockAi();
    }, 1000);
    return () => clearInterval(intervalAi);
  }, [isPausedAi]);

  useLayoutEffect(() => {
    if (showModal === false && pause === true) {
      setIsPausedAi(true);
      isPausedAiRef.current = true;

      setIsPausedPlayer(true);
      isPausedPlayerRef.current = true;
    }
    console.log("paused in 2dcontext");
  }, [aiMovedRef.current, playerMovedRef.current, showModal, pause]);

  useEffect(() => {
    const intervalPlayer = setInterval(() => {
      if (isPausedPlayerRef.current) {
        return;
      }
      if (secondsLeftPlayerRef.current == 0) {
        return;
      }
      clockPlayer();
    }, 1000);
    return () => clearInterval(intervalPlayer);
  }, [isPausedPlayer]);

  const totalSecondsAi = duration * 60;
  const minutesAi = Math.floor(secondsLeftAi / 60);
  let secondsAi = secondsLeftAi % 60;
  if (secondsAi < 10) secondsAi = "0" + secondsAi;

  const totalSecondsPlayer = duration * 60;
  const minutesPlayer = Math.floor(secondsLeftPlayer / 60);
  let secondsPlayer = secondsLeftPlayer % 60;
  if (secondsPlayer < 10) secondsPlayer = "0" + secondsPlayer;
  //   console.log("Ai clock:", aiMovedRef);
  //   console.log("Player Clock:", playerMovedRef);
  return (
    <>
      <group>
        <Text
          color="#357ca1"
          position-x={2.75}
          position-y={1}
          position-z={4.5}
          fontSize={1.25}
          lineHeight={1}
          rotation={[Math.PI / 6, Math.PI, 0]}
          font={"../public/fonts/SpaceGrotesk-Bold.otf"}
        >
          {minutesPlayer + ":" + secondsPlayer}
        </Text>
        <Text
          color="#357ca1"
          position-x={-2.5}
          position-y={1}
          position-z={4.5}
          fontSize={1.25}
          lineHeight={1}
          rotation={[Math.PI / 6, Math.PI, 0]}
          font={"../public/fonts/SpaceGrotesk-Bold.otf"}
        >
          {minutesAi + ":" + secondsAi}
        </Text>
      </group>
    </>
  );
};
