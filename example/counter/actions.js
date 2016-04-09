import {
  INCREMENT,
  DECREMENT
} from '../actionTypes'

// dispatch and evaluate functions are injected for you.
export const increment = ({ dispatch, evaluate }) => () => dispatch(INCREMENT)

export const decrement = ({ dispatch, evaluate }) => () => dispatch(DECREMENT)

