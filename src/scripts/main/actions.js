export const ON_PRESS_BUTTON = 'ON_PRESS_BUTTON'
export const ON_RELEASE_BUTTON = 'ON_RELEASE_BUTTON'
export const ENTER_RECORD_MODE = 'ENTER_RECORD_MODE'
export const EXIT_RECORD_MODE = 'ENTER_RECORD_MODE'
export const TOGGLE_RECORD_MODE = 'TOGGLE_RECORD_MODE'

export const onPressButton = index => async (dispatch, getState) => {
  dispatch({
    type: ON_PRESS_BUTTON,
    index,
  })
}

export const onReleaseButton = index => async (dispatch, getState) => {
  dispatch({
    type: ON_RELEASE_BUTTON,
    index,
  })
}

export const enterRecordMode = () => async (dispatch, getState) => {
  dispatch({
    type: ENTER_RECORD_MODE,
  })
}

export const exitRecordMode = () => async (dispatch, getState) => {
  dispatch({
    type: EXIT_RECORD_MODE,
  })
}

export const toggleRecordMode = () => async (dispatch, getState) => {
  dispatch({
    type: TOGGLE_RECORD_MODE
  })
}