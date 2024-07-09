import { useEffect } from "react";

function Timer({ dispatch, secondsRemaining }) {
  //must place the timer in one of the components that mounts when the game starts

  useEffect(
    function () {
      //id is generated for every interval?
      const id = setInterval(() => {
        dispatch({ type: "tick" });
      }, 1000);
      return () => clearInterval(id);
    },

    [dispatch]
  );

  return <div className="timer">{secondsRemaining}</div>;
}

export default Timer;
