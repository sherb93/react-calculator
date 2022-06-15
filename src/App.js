import React, {  useReducer } from 'react';
import DigitButton from './components/DigitButton'
import './styles.css';

export const ACTIONS = {
  APPEND_DIGIT: "append-digit",
  DELETE_DIGIT: "delete-digit",
  CLEAR: "clear",
  CHOOSE_OPERATION: "choose-operation",
  // ADDITION: "addition",
  // SUBTRACTION: "subtraction",
  // MULTIPLY: "multiply",
  // DIVIDE: "divide",
  EVALUATE: "evalutate"
}

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.APPEND_DIGIT:
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`
      }
    default:
      return state;
  }
}

function App() {

  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(reducer, {})

  return (
    <div className="calc-grid">
      <div className="output">
        <div className="previous-operand">{previousOperand} {operation}</div>
        <div className="current-operand">{currentOperand}</div>
      </div>
      <button className="span-two">AC</button>
      <button>DEL</button>
      <DigitButton digit="/" dispatch={dispatch} />
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button>*</button>
      <button>4</button>
      <button>5</button>
      <button>6</button>
      <button>+</button>
      <button>7</button>
      <button>8</button>
      <button>9</button>
      <button>-</button>
      <button>.</button>
      <button>0</button>
      <button className="span-two">=</button>
    </div>
  )
}

export default App;