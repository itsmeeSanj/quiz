function Progress({ i, numQuestion, points, maxPossiblePoints, answer }) {
  return (
    <div className='progress'>
      <progress max={numQuestion} value={i + Number(answer !== null)} />
      <p>
        Question <strong>{i}</strong>/{numQuestion}
      </p>

      <p>
        <strong>{points}</strong> / {maxPossiblePoints}
      </p>
    </div>
  );
}

export default Progress;
