function Progress(numQuestions, index) {
  return (
    <header className="progress">
      <progress max={numQuestions} value={index} />
      <p></p>
      <p></p>
    </header>
  );
}

export default Progress;
