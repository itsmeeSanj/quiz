import React from "react";

import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Questions from "./components/Questions";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import FinishedScreen from "./components/FinishedScreen";
import Footer from "./components/Footer";
import Timer from "./components/Timer";
import { useQuiz } from "./context/QuizeProvider";
// import BankAccount from "./BankAccount";

export default function App() {
  const {
    questions,
    status,
    index,
    answer,
    points,
    highscore,
    secondsRemaining,
    numQuestions,
    maxPossiblePoints,
    dispatch,
  } = useQuiz();

  return (
    <div className='app'>
      {/* <DateCounter /> */}
      <Header />

      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen num={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              i={index + 1}
              numQuestion={questions.length}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />

            <Questions
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />

            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                numQuestions={numQuestions}
                index={index}
              />
            </Footer>
          </>
        )}

        {status === "finished" && (
          <>
            <FinishedScreen
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              highScore={highscore}
            />
            <button
              className='btn btn-ui'
              onClick={() =>
                dispatch({
                  type: "reset",
                })
              }
            >
              Restart Quiz
            </button>
          </>
        )}
      </Main>

      {/*  */}

      {/* <BankAccount /> */}
    </div>
  );
}
