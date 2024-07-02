import { useReducer } from "react";

const initialState = { count: 0, step: 1 };

function reducer(state, action) {
  console.log(state, action);

  //we need to return an object with the same shape/format as the original state
  switch (action.type) {
    case "inc":
      return { ...state, count: state.count + state.step };
    case "dec":
      return { ...state, count: state.count - state.step };
    // not adding state cause we  are just returning what the user enters(..spreading then replacing the data property you want to change)
    case "setCount":
      return { ...state, count: action.payload };
    case "setStep":
      return { ...state, step: action.payload };
    case "reset":
      return initialState;
    default:
      throw new Error("Unknown action");
  }
}

function DateCounter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  //destructure the state to use the values in the rest of the code
  const { count, step } = state;

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    dispatch({ type: "dec" });
  };

  const inc = function () {
    dispatch({ type: "inc" });
  };

  const defineCount = function (e) {
    dispatch({ type: "setCount", payload: Number(e.target.value) });
  };

  const defineStep = function (e) {
    dispatch({ type: "setStep", payload: Number(e.target.value) });
  };

  const reset = function () {
    dispatch({ type: "reset" });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="1"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button style={{ cursor: "pointer" }} onClick={dec}>
          -
        </button>
        <input value={count} onChange={defineCount} />
        <button style={{ cursor: "pointer" }} onClick={inc}>
          +
        </button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button style={{ cursor: "pointer" }} onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
}
export default DateCounter;
