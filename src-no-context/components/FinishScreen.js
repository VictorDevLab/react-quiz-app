function FinishScreen({ points, totalPossiblePoints, highScore, dispatch }) {
  const perecent = (points / totalPossiblePoints) * 100;
  return (
    <div>
      <p className="result">
        Your score is {points} / {totalPossiblePoints} ({Math.ceil(perecent)}) %
      </p>
      <p className="highscore">(HighScore: {highScore} points)</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart
      </button>
    </div>
  );
}

export default FinishScreen;
