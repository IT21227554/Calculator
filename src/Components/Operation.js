import React from "react";
import { ACTIONS } from "../GLOBAL_VARIABLES/Actions";

export default function Operations({ operand, dispatch }) {
  const handleOperationClick = () => {
    dispatch({ type: ACTIONS.CHOOSE_OPERAND, payload: operand });
  };

  return <button onClick={handleOperationClick}>{operand}</button>;
}
