import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
//to display every Question
import Question from "./Question";
import Progress from "./Progress";
//after the game is over
import FinishScreen from "./FinishScreen";
import NextButton from "./NextButton";
import Timer from "./Timer";
import Footer from "./Footer";
import { UseQuiz } from "../contexts/QuizContext";

export default function App() {
  const { status } = UseQuiz();

  return (
    <div className="app">
      <Header />
      {/* //for component composition */}
      <Main>
        {/* mutually exclusive, meaning only one will be true */}
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen />}
        {status === "active" && (
          <>
            <Progress />
            <Question />
            <Footer>
              <Timer />
              <NextButton />
            </Footer>
          </>
        )}
        {status === "finished" && <FinishScreen />}
      </Main>
    </div>
  );
}
