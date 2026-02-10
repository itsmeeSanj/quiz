import React from "react";

import { useQuiz } from "../context/QuizeProvider";

function StartScreen() {
  const { numQuestions, dispatch } = useQuiz();
  return (
    <div className='start'>
      <h2>Welcome to React Quiz!</h2>
      <h3>{numQuestions} question to test your mastery</h3>

      {/*  */}

      {/* Question selector */}

      {/*  */}
      <button
        className='btn btn-ui'
        disabled={numQuestions === 0}
        onClick={() => dispatch({ type: "start" })}
      >
        Let's Start
      </button>
    </div>
  );
}

export default StartScreen;
