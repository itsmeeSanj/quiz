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
  const { status, dispatch } = useQuiz();

  return (
    <div className='app'>
      {/* <DateCounter /> */}
      <Header />

      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen />}
        {status === "active" && (
          <>
            <Progress />

            <Questions />

            <Footer>
              <Timer />
              <NextButton />
            </Footer>
          </>
        )}

        {status === "finished" && (
          <>
            <FinishedScreen />
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
