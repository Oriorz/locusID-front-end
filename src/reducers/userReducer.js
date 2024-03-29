export const initialState = null

export const reducer = (state, action) => {
  if (action.type === "USER") {
    return action.payload
  }
  if (action.type === "CLEAR") {
    return null
  }
  if (action.type === "UPDATE") {
    return {
      ...state,
      followers:action.payload.followers,
      following:action.payload.following
    }
  }
  if (action.type === "UPDATEPIC") {
    return {
      ...state,
      pic:action.payload.pic
    }
  }
  if (action.type === "UPDATECOVERPIC") {
    return {
      ...state,
      coverPic:action.payload.coverPic
    }
  }
  if (action.type === "UPDATESOCIALS") {
    return {
      ...state,
      [action.payload.theKey]:action.payload.theValue
    }
  }
  if (action.type === "UPDATEADDRESS") {
    return {
      ...state,
      address:action.payload.address,
      maplink:action.payload.maplink
    }
  }
  return state
}