function NextButton({ dispatch, answer, numQuestions, index }) {
  //mutually exculusive

  //when the user has not selected an answer, no button will be displayed
  if (answer === null) return null;
  if (answer !== null && index < numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );
  if (index === numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finishQuiz" })}
      >
        Finish
      </button>
    );
}

export default NextButton;
