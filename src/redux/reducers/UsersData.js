import { 
	ADD_USER_LIST_DATA, 
	CHANGE_PROFILE_VISIBILITY, 
	CLOSE_USER, 
	DELETE_USER, 
	SET_PROFILE_UPDATE_STATUS, 
	SET_SELECTED_ID, 
	SHOW_USER 
} from "redux/constants/UsersData";

const initState = {
  users: [],
	userProfileVisible: false,
	selectedUser: null,
	profileStatus: 'idl',
}

const usersData = (state = initState, action) => {
	switch (action.type) {
		case ADD_USER_LIST_DATA:
			return {
				...state,
				users: action.payload,
			}
		case CHANGE_PROFILE_VISIBILITY:
			return {
				...state,
				userProfileVisible: !state.userProfileVisible,
			}
		case SET_SELECTED_ID:
			return {
				...state,
				selectedUser: action.payload,
			}
		case DELETE_USER:
			return {
				...state,
				users: state.users.filter(item => item.id !== action.payload),
			}
		case SHOW_USER:
			return {
				...state,
				userProfileVisible: true,
				selectedUser: action.payload,
			}
		case CLOSE_USER:
			return {
				...state,
				userProfileVisible: false,
				selectedUser: null,
			}
		case SET_PROFILE_UPDATE_STATUS:
			return {
				...state,
				profileStatus: action.payload,
			}
		default:
			return state;
	}
}

export default usersData