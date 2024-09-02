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

//The component then renders a <div> with the class name "options". Inside this div, the question.options array is mapped to render a button for each option. Each button has a class name based on its index, whether it's the user's selected answer, whether the question has been answered, and whether the selected option is correct or wrong. The button is disabled if the question has been answered. When a button is clicked, it dispatches a new action to the Redux store with the type "newAnswer" and the selected answer index as the payload.