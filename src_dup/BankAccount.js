import React from "react";

const initialState = {
  balance: 0,
  loan: 0,
  isActive: false,
};

function reducer(state, action) {
  if (action.type !== "openAccount" && !state.isActive) return state;

  switch (action.type) {
    case "openAccount":
      return {
        ...state,
        balance: 500,
        isActive: true,
      };
    case "deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
      };
    case "withdraw":
      if (state.loan < 0) return state;
      return {
        ...state,
        balance: state.balance - action.payload,
      };
    case "loan":
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload,
        balance: state.balance + action.payload,
      };
    case "payloan":
      return {
        ...state,
        loan: 0,
        balance: state.balance - action.loan,
      };
    case "close":
      if (state.loan > 0 || state.balance !== 0) return state;
      return initialState;

    default:
      throw new Error("unknown");
  }
}

function BankAccount() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const { balance, loan, isActive } = state;

  return (
    <div className='App'>
      <h1>useReducer Bank Account</h1>
      <p>Balance: {balance}</p>
      <p>Loan: {loan}</p>

      <p>
        <button
          onClick={() =>
            dispatch({
              type: "openAccount",
            })
          }
          disabled={isActive}
        >
          Open account
        </button>
      </p>
      <p>
        <button
          onClick={() =>
            dispatch({
              type: "deposit",
              payload: 150,
            })
          }
          disabled={!isActive}
        >
          Deposit 150
        </button>
      </p>
      <p>
        <button
          onClick={() =>
            dispatch({
              type: "withdraw",
              payload: 50,
            })
          }
          disabled={!isActive}
        >
          Withdraw 50
        </button>
      </p>
      <p>
        <button
          onClick={() =>
            dispatch({
              type: "loan",
              payload: 5000,
            })
          }
          disabled={!isActive}
        >
          Request a loan of 5000
        </button>
      </p>
      <p>
        <button
          onClick={() =>
            dispatch({
              type: "payloan",
            })
          }
          disabled={!isActive}
        >
          Pay loan
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: "close" })}
          disabled={!isActive}
        >
          Close account
        </button>
      </p>
    </div>
  );
}

export default BankAccount;
