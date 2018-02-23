// 8

import getVisualizationFromBuffer from '../web-audio/getVisualizationFromBuffer'
import {
  getMedia,
  recordStart,
  recordStop,
  playAudio,
  stopAudio,
  getBuffer,
} from '../web-audio'


const pipeFunctionsToValue = (startVal, arrayOfFunctions) => {
  return arrayOfFunctions.reduce((lastVal, currFunc) => currFunc(lastVal), startVal)
}


export const ON_PRESS_BUTTON = 'ON_PRESS_BUTTON'
export const ON_RELEASE_BUTTON = 'ON_RELEASE_BUTTON'

export const ENTER_RECORD_MODE = 'ENTER_RECORD_MODE'
export const EXIT_RECORD_MODE = 'EXIT_RECORD_MODE'
export const TOGGLE_RECORD_MODE = 'TOGGLE_RECORD_MODE'
export const REQUEST_MEDIA = 'REQUEST_MEDIA'

export const STORE_VISUALIZATION = 'STORE_VISUALIZATION'

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

export const storeVisualization = (index) => {
  const visualizationForOneHundredGrid = (data) => getVisualizationFromBuffer(data, 100, 100)
  const data = pipeFunctionsToValue(index, [getBuffer, visualizationForOneHundredGrid])
  return {
    type: STORE_VISUALIZATION,
    data,
    index
  }
}

export const onReleaseButton = (index) => (dispatch, getState) => {
  if (getState().MainReducer.isRecordModeActive) {
    recordStop(index)
    dispatch(storeVisualization(index))
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

// Forces everything to recordstop
export const exitRecordMode = () => (dispatch, getState) => {
  for (let i = 0; i < 9; i++){
    if (getState().MainReducer.pressedButtons[i]) {
      recordStop(i)
      dispatch(storeVisualization(i))
    }
  }
  dispatch({
    type: EXIT_RECORD_MODE,
  })
}

export const toggleRecordMode = () => {
  return {
    type: TOGGLE_RECORD_MODE
  }
}

