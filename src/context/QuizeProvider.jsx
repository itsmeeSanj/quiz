import React, { createContext, useContext } from "react";

const QuizContext = createContext();

const SECS_PER_QUESTION = 30;

const initialState = {
  questions: [],
  // loading, error, ready, active, finished
  status: "loading",
  index: 0, // current position
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
  questionLimit: 5,
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
    case "start": {
      if (!Array.isArray(state.questions) || state.questions.length === 0) {
        return state;
      }

      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    }
    case "newAnswer": {
      const question = state.questions.at(state.index);
      const isCorrect = action.payload === question.correct_answer;

      return {
        ...state,

        // answer: action.payload,
        // points: isCorrect ? state.points + 10 : state.points,
        // correctCount: isCorrect ? state.correctCount + 1 : state.correctCount,

        answer: action.payload,
        points: isCorrect ? state.points + 10 : state.points,
        correctCount: isCorrect ? state.correctCount + 1 : state.correctCount,
      };
    }
    case "next": {
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    }
    case "finish": {
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    }
    case "reset": {
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
      };
    }
    case "tick": {
      if (state.secondsRemaining === null) return state;

      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining - 1 <= 0 ? "finished" : state.status,
        // state.secondsRemaining === 0 ? "finished" : state.status,
      };
    }

    case "setQuestionLimit": {
      return {
        ...state,
        questionLimit: action.payload,
      };
    }

    default:
      throw new Error("Action unknown");
  }
}

function QuizeProvider({ children }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const {
    questions,
    status,
    index,
    answer,
    points,
    highscore,
    secondsRemaining,
    questionLimit,
  } = state; //destructure

  // const numQuestions = questions.length;
  const numQuestions = Array.isArray(questions) ? questions.length : 0;
  // const maxPossiblePoints = questions.reduce(
  //   (prev, cur) => prev + cur.points,
  //   0,
  // );

  const maxPossiblePoints = numQuestions * 10;

  // const res = await fetch("http://localhost:8000/questions");
  React.useEffect(
    function () {
      async function fetchApi() {
        try {
          const res = await fetch(
            `https://opentdb.com/api.php?amount=${questionLimit}`,
          );
          const data = await res.json();
          dispatch({
            type: "dataReceived",
            payload: data.results,
          });
        } catch (error) {
          dispatch({
            type: "dataFailed",
          });
        }
      }
      fetchApi();
    },
    [questionLimit],
  );

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highscore,
        secondsRemaining,
        numQuestions,
        maxPossiblePoints,
        questionLimit,

        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const value = useContext(QuizContext);

  if (value === undefined)
    throw new Error("Quiz context was used outside of QuizeProvider");

  return value;
}

export { QuizeProvider, useQuiz };
