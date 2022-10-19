import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import { actionUpdateProfileStatus, addUserList } from 'redux/actions/UsersData';
import utils from 'utils';
import { 
	FETCH_UPDATE_PROFILE, 
	FETCH_USER_LIST_DATA,  
	UPDATE_DATA_BASE_URL, 
	USER_DATA_BASE_URL 
} from 'redux/constants/UsersData';
import { LoadingStatus } from 'constants/ApiConstant';

export function* watchFetchUsersData() {
	yield takeEvery(FETCH_USER_LIST_DATA, fetchUserData)
}

function* fetchUserData () {
	try {
		const data  = yield call(() => {
			return fetch(USER_DATA_BASE_URL)
				.then((response) => {
					if(response.ok) {
						return response.json();
					}
					throw new Error(`${response.status}: ${response.statusText}`);
				});
			}
		)
			const result = data.map((line) => utils.adaptServerData(line));
		yield put(addUserList(result));
	} catch (err) {
		throw err;
	}
}

export function* watchFetchUpdateProfile() {
	yield takeEvery(FETCH_UPDATE_PROFILE, fetchProfileUpdate)
}

function* fetchProfileUpdate (profileUpdate) {
	try {
		const result = yield call(() => {
			return fetch(UPDATE_DATA_BASE_URL, utils.formUpdateRequest(profileUpdate))
				.then((response) => {
					if(response.ok) {
						return LoadingStatus.success;
					}
					throw new Error(`${response.status}: ${response.statusText}`);
				});
			}
		)
		yield put(actionUpdateProfileStatus(result));
	} catch (err) {
		yield put(actionUpdateProfileStatus(LoadingStatus.failed));
		throw err;
	}
}

export default function* rootSaga() {
  yield all([
		fork(watchFetchUsersData),
		fork(watchFetchUpdateProfile),
  ]);
}