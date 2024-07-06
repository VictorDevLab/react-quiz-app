import { useReducer, useEffect } from "react";

import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";

const initialState = {
  questions: [],
  //loading, ready, error, active, finished.
  status: "loading",
  //index of question you are on
  index: 0
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload.questions,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
   case "start": {
    return {
      ...state,
      status: "active",
    }
   }
    default:
      throw new Error("action unknown");
  }
}

export default function App() {
  //nested destructuring.. WOW WOW Learnt this today
  const [{ questions, status, index }, dispatch] = useReducer(reducer, initialState);
  //normal destructuring
  // const {questions, status} = state

 
  const numQuestions = questions.length;

  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "dataReceived", payload: { questions: data } })
      }
      )
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {/* mutually exclusive, meaning only one will be true */}
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen numQuestions={numQuestions} dispatch={dispatch} />}
        {status === "active" && <Question question={questions[index]} />}
      </Main>
    </div>
  );
}