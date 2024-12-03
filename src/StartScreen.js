import React from "react";

function StartScreen({ num }) {
  return (
    <div className='start'>
      <h2>Welcome to React Quiz!</h2>
      <h3>{num} question to test your mastery</h3>
      <button className='btn btn-ui'>Let's Start</button>
    </div>
  );
}

export default StartScreen;
