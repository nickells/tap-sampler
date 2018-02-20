import {
  getMedia,
  recordStart,
  recordStop,
  playAudio,
  stopAudio,
} from '../web-audio'

// export const ON_PRESS_BUTTON_RECORD_MODE = 'ON_PRESS_BUTTON_RECORD_MODE'
// export const ON_RELEASE_BUTTON_RECORD_MODE = 'ON_RELEASE_BUTTON_RECORD_MODE'
// export const ON_PRESS_BUTTON_PLAY_MODE = 'ON_PRESS_BUTTON_PLAY_MODE'
// export const ON_RELEASE_BUTTON_PLAY_MODE = 'ON_RELEASE_BUTTON_PLAY_MODE'

export const ON_PRESS_BUTTON = 'ON_PRESS_BUTTON'
export const ON_RELEASE_BUTTON = 'ON_RELEASE_BUTTON'

export const ENTER_RECORD_MODE = 'ENTER_RECORD_MODE'
export const EXIT_RECORD_MODE = 'EXIT_RECORD_MODE'
export const TOGGLE_RECORD_MODE = 'TOGGLE_RECORD_MODE'
export const REQUEST_MEDIA = 'REQUEST_MEDIA'

export const requestMedia = () => async (dispatch, getState) => {
  let media = false
  try {
    media = await getMedia()
  } catch (e) {
    console.log('error getting media', e)
  }
  dispatch({
    type: REQUEST_MEDIA,
    hasMedia: media,
  })
}

export const onPressButton = (index) => (dispatch, getState) => {
  if (getState().MainReducer.isRecordModeActive) {
    recordStart(index)
  } else playAudio(index)
  dispatch({
    type: ON_PRESS_BUTTON,
    index,
  })
}

export const onReleaseButton = (index) => (dispatch, getState) => {
  if (getState().MainReducer.isRecordModeActive) {
    recordStop(index)
  } else stopAudio(index)
  dispatch({
    type: ON_RELEASE_BUTTON,
    index,
  })
}


export const enterRecordMode = () => {
  return {
    type: ENTER_RECORD_MODE,
  }
}

export const exitRecordMode = () => {
  recordStop()
  return {
    type: EXIT_RECORD_MODE,
  }
}

export const toggleRecordMode = () => {
  return {
    type: TOGGLE_RECORD_MODE
  }
}
