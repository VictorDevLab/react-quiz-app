import { createContext, useContext, useEffect, useReducer } from "react";
import Error from "../components/Error";

const QuizContext = createContext();

const SECS_PER_QUESTION = 30;

const initialState = {
  questions: [],
  //loading, ready, error, active,finished.
  status: "loading",
  //index of question you are on
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secondsRemaining: null,
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
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    }
    case "newAnswer": {
      //get the current question, and  give points
      const answeredQuestion = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload.answer,
        points:
          action.payload.answer === answeredQuestion.correctOption
            ? state.points + answeredQuestion.points
            : state.points,
      };
    }
    case "nextQuestion": {
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    }
    case "finishQuiz": {
      return {
        ...state,
        status: "finished",
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };
    }
    case "restart": {
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
      };
    }
    case "tick": {
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    }
    default:
      throw new Error("action unknown");
  }
}

function QuizProvider({ children }) {
  //so basically everything you have in the initial state should be destructured.
  //nested destructuring.. WOW WOW Learnt this today
  const [
    { questions, status, index, answer, points, highScore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);
  //normal destructuring
  // const {questions, status} = state

  const numQuestions = questions.length;
  const totalPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );
  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "dataReceived", payload: { questions: data } });
      })
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highScore,
        secondsRemaining,
        numQuestions,
        totalPossiblePoints,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function UseQuiz() {
  const context = useContext(QuizContext);
  if (!context) throw new Error("Context was used outside the provider");
  return context;
}

export { QuizProvider, UseQuiz };
