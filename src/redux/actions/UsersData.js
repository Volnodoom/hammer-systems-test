import { 
  ADD_USER_LIST_DATA,
  CHANGE_PROFILE_VISIBILITY, 
  CLOSE_USER, DELETE_USER, 
  FETCH_UPDATE_PROFILE, 
  FETCH_USER_LIST_DATA, 
  SET_PROFILE_UPDATE_STATUS, 
  SET_SELECTED_ID, 
  SHOW_USER 
} from "redux/constants/UsersData";

export const fetchList = () => {
  return {
    type: FETCH_USER_LIST_DATA,
  }
}

export const addUserList = (usersList) => {
  return {
    type: ADD_USER_LIST_DATA,
    payload: usersList
  }
};

export const changeVisibilityOfProfile = () => {
  return {
    type: CHANGE_PROFILE_VISIBILITY,
  }
};

export const setIdAsSelected = (id) => {
  return {
    type: SET_SELECTED_ID,
    payload: id
  }
};

export const actionDeleteUser = (id) => {
  return {
    type: DELETE_USER,
    payload: id
  }
};

export const actionShowUser = (userInfo) => {
  return {
    type: SHOW_USER,
    payload: userInfo
  }
};

export const actionCloseUser = () => {
  return {
    type: CLOSE_USER,
  }
};

export const actionFetchUpdateProfile = (newUserInfo) => {
  return {
    type: FETCH_UPDATE_PROFILE,
    payload: newUserInfo,
  }
};

export const actionUpdateProfileStatus = (status) => {
  return {
    type: SET_PROFILE_UPDATE_STATUS,
    payload: status,
  }
};
