import React from "react";

import { useQuiz } from "../context/QuizeProvider";

import Options from "./Options";

function Questions() {
  const { questions, answer, dispatch } = useQuiz();
  return (
    <div>
      <h4>{questions.question}</h4>
      <Options question={questions} dispatch={dispatch} answer={answer} />
    </div>
  );
}

export default Questions;
