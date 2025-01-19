import { useQuiz } from "../context/QuizeProvider";

function FinishedScreen() {
  const { points, highscore, maxPossiblePoints } = useQuiz();

  const percentage = (points / maxPossiblePoints) * 100;

  let emoji;
  if (percentage === 100) emoji = "😍";
  if (percentage < 100 && percentage >= 70) emoji = "😲";
  if (percentage < 70 && percentage >= 50) emoji = "👍";
  if (percentage < 50) emoji = "👎";

  return (
    <>
      <p className='result'>
        <span>{emoji}</span>You scored <strong>{points}</strong> out of{" "}
        {maxPossiblePoints} ({Math.ceil(percentage)}%)
      </p>

      <p className='highscore'>(Highscore: {highscore} points)</p>
    </>
  );
}

export default FinishedScreen;
