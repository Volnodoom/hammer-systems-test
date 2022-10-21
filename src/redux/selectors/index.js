export const getUserListData = state => ({
  users: state.usersData.users,
  userProfileVisible: state.usersData.userProfileVisible,
  selectedUser: state.usersData.selectedUser,
});

export const getUploadingStatus = state => state.usersData.profileStatus;

