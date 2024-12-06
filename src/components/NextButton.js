function NextButton({ dispatch, answer }) {
  console.log("answer", answer);
  if (answer === null) return null;
  return (
    <button
      className='btn btn-ui'
      onClick={() =>
        dispatch({
          type: "next",
        })
      }
    >
      Next
    </button>
  );
}

export default NextButton;
