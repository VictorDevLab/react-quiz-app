function FinishScreen({ points, totalPossiblePoints }) {
  const perecent = (points / totalPossiblePoints) * 100;
  return (
    <div>
      <p className="result">
        Your score is {points} / {totalPossiblePoints} ({Math.ceil(perecent)}) %
      </p>
    </div>
  );
}

export default FinishScreen;
