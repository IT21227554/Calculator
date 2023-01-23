import React from "react";
import { ACTIONS } from "../GLOBAL_VARIABLES/Actions";

export default function Digit({ digit, dispatch }) {
  const handleDigitClick = () => {
    dispatch({ type: ACTIONS.NUMBER, payload: digit });
  };

  return <button onClick={handleDigitClick}>{digit}</button>;
}
