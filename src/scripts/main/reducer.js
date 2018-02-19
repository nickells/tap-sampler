import {
  ON_PRESS_BUTTON,
  ON_RELEASE_BUTTON,
} from './actions'

const initialState = {
  audioData: [],
  pressedButtons: {},
}

export default (state = initialState, action) => {
  switch (action.type) {
  case ON_PRESS_BUTTON:
    return {
      ...state,
      pressedButtons: {
        ...state.pressedButtons,
        [action.index]: true,
      },
    }
  case ON_RELEASE_BUTTON:
    return {
      ...state,
      pressedButtons: {
        ...state.pressedButtons,
        [action.index]: false,
      },
    }
  default:
    return state
  }
}
