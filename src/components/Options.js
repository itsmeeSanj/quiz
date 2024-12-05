import React from "react";

function Options({ option }) {
  return (
    <div className='options'>
      {option.map((question, index) => (
        <button className='btn btn-option' key={index}>
          {question}
        </button>
      ))}
    </div>
  );
}

export default Options;
