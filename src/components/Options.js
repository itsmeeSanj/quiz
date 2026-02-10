import React from "react";

function Options({ question, dispatch, answer }) {
  const hasAnswer = answer !== null;

  // combine + shuffle options
  const options = React.useMemo(() => {
    return [...question.incorrect_answers, question.correct_answer].sort(
      () => Math.random() - 0.5,
    );
  }, [question]);

  return (
    <div className='options'>
      {options?.map((option) => {
        const isCorrect = option === question.correct_answer;
        const isSelected = option === answer;

        // hide buttons ONLY if correct answer selected
        // if (hasAnswer && answer === question.correct_answer && !isCorrect)
        //   return null;

        return (
          <button
            key={option}
            className={`btn btn-option 
  ${isSelected ? "answer" : ""}
              ${hasAnswer && isCorrect ? "correct" : ""}
              ${hasAnswer && isSelected && !isCorrect ? "wrong" : ""}`}
            disabled={hasAnswer}
            onClick={() => dispatch({ type: "newAnswer", payload: option })}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

export default Options;
