import React, {  useReducer } from 'react';
import DigitButton from './components/DigitButton'
import OperationButton from './components/OperationButton'
import './styles.css';

// Create properties for type values to prevent spelling errors. Property typos will be caught by VSCode
export const ACTIONS = {
  APPEND_DIGIT: "append-digit",
  DELETE_DIGIT: "delete-digit",
  CLEAR: "clear",
  CHOOSE_OPERATION: "choose-operation",
  EVALUATE: "evalutate"
}


function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.APPEND_DIGIT:
      // Edge cases for 0's and .'s
      if (payload.digit === "0" && state.currentOperand === "0") return state
      if (payload.digit !== "0" && state.currentOperand === "0") return {...state, currentOperand: payload.digit}
      if (payload.digit === "." && state.currentOperand.includes(".")) return state
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`
      }
    case ACTIONS.CHOOSE_OPERATION:
      console.log(state);
      if (state.currentOperand == null && state.previousOperand == null) {
        return state
      }
      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null
        }
      }

      return {
        ...state,
        currentOperand: null,
        previousOperand: evaluate(state),
        operation: payload.operation
      }
    case ACTIONS.CLEAR:
      return {};
    default:
      return state;
  }
}

function evaluate({ currentOperand, previousOperand, operation}) {
  // Values must be converted from strings to numbers for calculations
  const previous = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(previous) || isNaN(current)) return "";
  let computation =  "";

  switch (operation) {
    case "+":
      computation = previous + current;
      break;
    case "-":
      computation = previous - current;
      break;
    case "*":
      computation = previous * current;
      break;
    case "/":
      computation = previous / current;
      break;
    default:
      throw new Error();
  }

  return computation.toString();
}

function App() {

  // useReducer() replaces useState() to juggle multiple states at once
  // Parameters: 1. reducer is my custom function scoped globally 2. default state values
  // Helps separate state management from the rendering logic of the components
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(reducer, {})

  return (
    <div className="calc-grid">
      <div className="output">
        <div className="previous-operand">{previousOperand} {operation}</div>
        <div className="current-operand">{currentOperand}</div>
      </div>
      <button className="span-two" onClick={() => dispatch({ type: ACTIONS.CLEAR })}>AC</button>
      <button>DEL</button>
      <OperationButton operation="/" dispatch={dispatch} />
      <DigitButton digit="1" dispatch={dispatch} />
      <DigitButton digit="2" dispatch={dispatch} />
      <DigitButton digit="3" dispatch={dispatch} />
      <button>*</button>
      <DigitButton digit="4" dispatch={dispatch} />
      <DigitButton digit="5" dispatch={dispatch} />
      <DigitButton digit="6" dispatch={dispatch} />
      <button>+</button>
      <DigitButton digit="7" dispatch={dispatch} />
      <DigitButton digit="8" dispatch={dispatch} />
      <DigitButton digit="9" dispatch={dispatch} />
      <button>-</button>
      <DigitButton digit="." dispatch={dispatch} />
      <DigitButton digit="0" dispatch={dispatch} />
      <button className="span-two">=</button>
    </div>
  )
}

export default App;