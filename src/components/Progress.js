import { UseQuiz } from "../contexts/QuizContext";

function Progress() {
  const { numQuestions, index, points, totalPossiblePoints } = UseQuiz()
  
  return (
    <header className="progress">
      <progress max={numQuestions} value={index} />
      <p>
        Question <strong>{index + 1}</strong> / {numQuestions}
      </p>
      <p>
        Points {points} / {totalPossiblePoints}
      </p>
    </header>
  );
}

export default Progress;
