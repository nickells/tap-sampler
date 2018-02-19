export const ON_PRESS_BUTTON = 'ON_PRESS_BUTTON'

export const onPressButton = index => async (dispatch, getState) => {
  console.log('press')
  dispatch({
    type: ON_PRESS_BUTTON,
    index,
  })
}


export const ON_RELEASE_BUTTON = 'ON_RELEASE_BUTTON'

export const onReleaseButton = index => async (dispatch, getState) => {
  dispatch({
    type: ON_RELEASE_BUTTON,
    index,
  })
}
