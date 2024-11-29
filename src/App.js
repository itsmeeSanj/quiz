// import DateCounter from "./DateCounter";
import React from "react";

import Header from "./Header";
import Main from "./Main";

const initialState = {
  questions: [],

  // loading, error, ready, active, finished
  status: "loading",
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived": {
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    }
    case "dataFailed": {
      return {
        ...state,
        status: "error",
      };
    }
    default:
      throw new Error("Action unknown");
  }
}

export default function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  React.useEffect(
    function () {
      async function QuestionFetch() {
        try {
          const res = await fetch(`http://localhost:8000/questions`);
          const data = await res.json();
          dispatch({
            type: "dataReceived",
            payload: data,
          });
        } catch (error) {
          dispatch({
            type: "dataFailed",
          });
        }
      }
      QuestionFetch();
    },
    [state]
  );

  return (
    <div className='app'>
      {/* <DateCounter /> */}
      <Header />

      <Main>
        <div className='main'>
          <p>1/15</p>
          <p>Question?</p>
        </div>
      </Main>
    </div>
  );
}
