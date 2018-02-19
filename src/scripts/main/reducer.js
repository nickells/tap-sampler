import {
  ON_PRESS_BUTTON,
  ON_RELEASE_BUTTON,
  ENTER_RECORD_MODE,
  EXIT_RECORD_MODE,
  TOGGLE_RECORD_MODE,
  REQUEST_MEDIA,
} from './actions'

const initialState = {
  pressedButtons: {},
  isRecordModeActive: false,
  hasMedia: false
}

export default (state = initialState, action) => {
  switch (action.type) {
  case REQUEST_MEDIA:
    return {
      ...state,
      hasMedia: action.hasMedia
    }
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
  case ENTER_RECORD_MODE:
    return {
      ...state,
      isRecordModeActive: true,
    }
  case EXIT_RECORD_MODE:
    return {
      ...state,
      isRecordModeActive: false,
    }
  case TOGGLE_RECORD_MODE: 
    return {
      ...state,
      isRecordModeActive: !state.isRecordModeActive
    }
  default:
    return state
  }
}
