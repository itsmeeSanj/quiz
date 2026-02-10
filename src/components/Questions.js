import React from "react";

import { useQuiz } from "../context/QuizeProvider";
import Options from "./Options";

function Questions() {
  const { questions, index, answer, dispatch } = useQuiz();

  // guard #1: questions not ready
  if (!Array.isArray(questions) || questions.length === 0) {
    return <p>Loading questions...</p>;
  }

  // guard #2: index out of bounds
  const question = questions[index];
  if (!question) return null; // safety guard

  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} dispatch={dispatch} answer={answer} />
    </div>
  );
}

export default Questions;
