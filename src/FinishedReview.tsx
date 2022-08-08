import React from "react";

export function FinishedReview(props: {
  right: number;
  wrong: number;
  reset: () => void;
  retry: () => void;
}) {
  function allAgain() {
    props.reset();
  }
  function retry() {
    props.retry();
  }
  return (
    <div>
      You answered {props.right} out of {props.right + props.wrong} cards
      correctly.
      <button onClick={allAgain}>All again!</button>
      <button onClick={retry}>Retry wrong ones! </button>
    </div>
  );
}
