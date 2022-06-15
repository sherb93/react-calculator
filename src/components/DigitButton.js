import { ACTIONS } from '../App';

export default function DigitButton({ dispatch, digit }) {

    console.log(digit)
    
    return (
        <button 
            onClick={ () => dispatch({ type: ACTIONS.APPEND_DIGIT , payload: { digit } }) }
        >
            { digit }
        </button>
    )
}