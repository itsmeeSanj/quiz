import { useQuiz } from "../context/QuizeProvider";

function Progress() {
  const { index, answer, points, numQuestions, maxPossiblePoints } = useQuiz();
  return (
    <div className='progress'>
      <progress max={numQuestions} value={index + Number(answer !== null)} />
      <p>
        Question <strong>{index}</strong>/{numQuestions}
      </p>

      <p>
        <strong>{points}</strong> / {maxPossiblePoints}
      </p>
    </div>
  );
}

export default Progress;
