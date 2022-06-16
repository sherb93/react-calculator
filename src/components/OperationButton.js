import { ACTIONS } from '../App';

// The components are minimal and mostly just rendering logic thanks to useReducer

// Destructure the props for easier access & readability
export default function OperationButton({ dispatch, operation }) {
    return (
        <button 
            // dispatch will give the reducer in App.js the type and payload so it can determine what to do after this button is clicked
            onClick={ () => dispatch({ type: ACTIONS.CHOOSE_OPERATION , payload: { operation } }) }
        >
            {operation}
        </button>
    )
}