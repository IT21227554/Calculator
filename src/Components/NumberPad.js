import React, { useReducer } from "react";
import Digit from "./Digit";
import Operations from "./Operation";
import { ACTIONS } from "../GLOBAL_VARIABLES/Actions";
import "../Styles.css";

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.NUMBER:
      return {
        ...state,
        current: `${state.current || ""}${action.payload}`,
      };
    case ACTIONS.CHOOSE_OPERAND:
      if (state.current === "")
        return {
          ...state,
          operation: action.payload,
        };

      return {
        ...state,
        current: "",
        previous: state.current,
        operation: action.payload,
      };
    case ACTIONS.CLEAR:
      return {
        ...state,

        current: "",
        previous: "",
        operation: "",
      };
    case ACTIONS.DELETE:
      return { ...state, current: state.current.slice(0, -1) };
    case ACTIONS.DECIMAL:
      return { ...state, current: state.current + "." };
    case ACTIONS.EQUAL:
      let calculated = checkOperation(state, state.operation);
      return {
        ...state,
        operation: action.payload,
        previous: calculated,
        current: "",
      };

    default:
      return state;
  }
};

const checkOperation = (state, payload) => {
  let prev = Number(state.previous);
  let curr = Number(state.current);

  switch (payload) {
    case "+":
      return prev + curr;
    case "-":
      return prev - curr;
    case "×":
      return prev * curr;
    case "÷":
      return prev / curr;
    default:
      return curr;
  }
};

export default function NumberPad() {
  const [{ current, previous, operation }, dispatch] = useReducer(reducer, {});

  const clearButtonHandler = () => dispatch({ type: ACTIONS.CLEAR });
  const deleteButtonHandler = () => dispatch({ type: ACTIONS.DELETE });
  const equalButtonHandler = () => dispatch({ type: ACTIONS.EQUAL });
  const decimalButtonHandler = () => dispatch({ type: ACTIONS.DECIMAL });

  return (
    <div className='calculator-grid'>
      <div className='output'>
        <div className='previous-operand'>
          {previous} {operation}
        </div>
        <div className='current-operand'>{current}</div>
      </div>
      <button className='span-two' onClick={clearButtonHandler}>
        AC
      </button>
      <button onClick={deleteButtonHandler}>DEL</button>

      <Operations operand='÷' dispatch={dispatch} />

      <Digit digit='1' dispatch={dispatch} />
      <Digit digit='2' dispatch={dispatch} />
      <Digit digit='3' dispatch={dispatch} />

      <Operations operand='×' dispatch={dispatch} />

      <Digit digit='4' dispatch={dispatch} />
      <Digit digit='5' dispatch={dispatch} />
      <Digit digit='6' dispatch={dispatch} />

      <Operations operand='+' dispatch={dispatch} />

      <Digit digit='7' dispatch={dispatch} />
      <Digit digit='8' dispatch={dispatch} />
      <Digit digit='9' dispatch={dispatch} />

      <Operations operand='-' dispatch={dispatch} />
      <button onClick={decimalButtonHandler}>.</button>

      <Digit digit='0' dispatch={dispatch} />

      <button onClick={equalButtonHandler} className='span-two'>
        =
      </button>
    </div>
  );
}
