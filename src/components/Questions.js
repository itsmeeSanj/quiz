import React from "react";
import Options from "./Options";

function Questions({ question }) {
  console.log(question);
  return (
    <div>
      <h4>{question.question}</h4>

      <Options option={question.options} />
    </div>
  );
}

export default Questions;
