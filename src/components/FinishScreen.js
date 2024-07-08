function FinishScreen({ points, totalPossiblePoints, highScore }) {
  const perecent = (points / totalPossiblePoints) * 100;
  return (
    <div>
      <p className="result">
        Your score is {points} / {totalPossiblePoints} ({Math.ceil(perecent)}) %
      </p>
      <p className="highscore">(HighScore: {highScore} points)</p>
    </div>
  );
}

export default FinishScreen;
