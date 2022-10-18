import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import { addUserList } from 'redux/actions/UsersData';
import { FETCH_USER_LIST_DATA, USER_DATA_BASE_URL } from 'redux/constants/UsersData';
import utils from 'utils';

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

export default function* rootSaga() {
  yield all([
		fork(watchFetchUsersData),
  ]);
}