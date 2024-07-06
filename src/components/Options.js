function Options({ question, answer, dispatch }) {
  //this kind of abstraction

  const hasAnswered = answer !== null;

  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            hasAnswered
              ? index === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          disabled={hasAnswered}
          key={option}
          onClick={() =>
            dispatch({ type: "newAnswer", payload: { answer: index } })
          }
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
