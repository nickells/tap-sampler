import {
  getMedia,
  recordStart,
  recordStop,
  playAudio,
  stopAudio,
} from '../web-audio'

export const ON_PRESS_BUTTON_RECORD_MODE = 'ON_PRESS_BUTTON_RECORD_MODE'
export const ON_RELEASE_BUTTON_RECORD_MODE = 'ON_RELEASE_BUTTON_RECORD_MODE'
export const ON_PRESS_BUTTON_PLAY_MODE = 'ON_PRESS_BUTTON_PLAY_MODE'
export const ON_RELEASE_BUTTON_PLAY_MODE = 'ON_RELEASE_BUTTON_PLAY_MODE'

export const ENTER_RECORD_MODE = 'ENTER_RECORD_MODE'
export const EXIT_RECORD_MODE = 'EXIT_RECORD_MODE'
export const TOGGLE_RECORD_MODE = 'TOGGLE_RECORD_MODE'
export const REQUEST_MEDIA = 'REQUEST_MEDIA'

export const requestMedia = () => async (dispatch, getState) => {
  let media = false
  try {
    media = await getMedia()
  } catch (e) {
    console.log('error getting media')
  }
  dispatch({
    type: REQUEST_MEDIA,
    hasMedia: media,
  })
}

export const onPressButtonPlayMode = (index) => {
  playAudio(index)
  return {
    type: ON_PRESS_BUTTON_PLAY_MODE,
    index,
  }
}

export const onPressButtonRecordMode = (index) => {
  recordStart(index)
  return {
    type: ON_PRESS_BUTTON_RECORD_MODE,
    index,
  }
}

export const onReleaseButtonPlayMode = (index) => {
  stopAudio(index)
  return {
    type: ON_RELEASE_BUTTON_PLAY_MODE,
    index,
  }
}

export const onReleaseButtonRecordMode = (index) => {
  recordStop()
  return {
    type: ON_RELEASE_BUTTON_RECORD_MODE,
    index,
  }
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
