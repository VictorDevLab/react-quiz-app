import { useEffect } from "react";

function Timer({ dispatch, secondsRemaining }) {
  //must place the timer in one of the components that mounts when the game starts
  const mins = Math.floor(secondsRemaining / 60);
  //cool stuff huh?
  const secs = secondsRemaining % 60;
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

  return (
    <div className="timer">
      {mins < 10 && "0"}
      {mins} : {secs < 10 && "0"}
      {secs}
    </div>
  );
}

export default Timer;
