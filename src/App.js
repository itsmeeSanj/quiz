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

  React.useEffect(function () {
    async function fetchApi() {
      try {
        const res = await fetch("http://localhost:8000/questions");
        const data = await res.json();
        console.log(data);
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
    fetchApi();
  }, []);

  return (
    <div className='app'>
      {/* <DateCounter /> */}
      <Header />

      <Main>
        <div className='main'>
          <p>1/15</p>
          <p>Questions?</p>
        </div>
      </Main>
    </div>
  );
}
