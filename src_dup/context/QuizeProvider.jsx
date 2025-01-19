import { createContext } from "react";

const QuizContext = createContext();

function QuizeProvider({ children }) {
  return <QuizContext.Provider value={{}}>{children}</QuizContext.Provider>;
}

function useQuiz() {
  const value = useQuiz(QuizContext);

  if (value === undefined)
    throw new Error("Quiz context was used outside of QuizeProvider");

  return value;
}

export { QuizeProvider, useQuiz };
